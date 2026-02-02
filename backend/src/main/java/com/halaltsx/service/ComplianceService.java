package com.halaltsx.service;

import com.halaltsx.model.ComplianceResult;
import com.halaltsx.model.FinancialMetrics;
import com.halaltsx.model.Stock;
import com.halaltsx.repository.ComplianceRepository;
import com.halaltsx.repository.FinancialMetricsRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Slf4j
public class ComplianceService {

    private final ComplianceRepository complianceRepository;
    private final FinancialMetricsRepository financialMetricsRepository;

    private static final BigDecimal DEBT_RATIO_THRESHOLD = new BigDecimal("0.33");
    private static final BigDecimal LIQUIDITY_RATIO_THRESHOLD = new BigDecimal("0.33");
    private static final BigDecimal INCOME_RATIO_THRESHOLD = new BigDecimal("0.05");

    private static final List<String> PROHIBITED_SECTORS = Arrays.asList(
            "Financials",
            "Banks",
            "Insurance",
            "Diversified Financial Services"
    );

    private static final List<String> PROHIBITED_INDUSTRIES = Arrays.asList(
            "Brewers",
            "Distillers & Vintners",
            "Tobacco",
            "Casinos & Gaming",
            "Aerospace & Defense",
            "Adult Entertainment"
    );

    @Transactional
    public ComplianceResult screenStock(Stock stock) {
        log.info("Screening stock for Halal compliance: {}", stock.getSymbol());

        Optional<FinancialMetrics> latestMetrics = financialMetricsRepository
                .findLatestByStockId(stock.getId());

        ComplianceResult.ComplianceResultBuilder builder = ComplianceResult.builder()
                .stock(stock)
                .screenedAt(LocalDateTime.now());

        // Business Activity Screening
        ScreeningResult businessResult = screenBusinessActivity(stock);
        builder.businessActivityCompliant(businessResult.compliant)
                .businessActivityReason(businessResult.reason);

        if (latestMetrics.isEmpty()) {
            log.warn("No financial metrics available for stock: {}", stock.getSymbol());
            return buildUnableToVerifyResult(builder);
        }

        FinancialMetrics metrics = latestMetrics.get();
        BigDecimal marketCap = stock.getMarketCap();

        if (marketCap == null || marketCap.compareTo(BigDecimal.ZERO) <= 0) {
            log.warn("Invalid market cap for stock: {}", stock.getSymbol());
            return buildUnableToVerifyResult(builder);
        }

        // Debt Ratio Screening
        ScreeningResult debtResult = screenDebtRatio(metrics, marketCap);
        builder.debtRatio(debtResult.value)
                .debtRatioCompliant(debtResult.compliant);

        // Liquidity Ratio Screening
        ScreeningResult liquidityResult = screenLiquidityRatio(metrics, marketCap);
        builder.liquidityRatio(liquidityResult.value)
                .liquidityRatioCompliant(liquidityResult.compliant);

        // Income Ratio Screening
        ScreeningResult incomeResult = screenIncomeRatio(metrics);
        builder.incomeRatio(incomeResult.value)
                .incomeRatioCompliant(incomeResult.compliant);

        // Calculate Purification
        PurificationResult purificationResult = calculatePurification(incomeResult.value);
        builder.requiresPurification(purificationResult.required)
                .purificationPercentage(purificationResult.percentage);

        // Determine Overall Compliance
        boolean isCompliant = businessResult.compliant &&
                debtResult.compliant &&
                liquidityResult.compliant &&
                incomeResult.compliant;

        ComplianceResult.ScreeningStatus status = isCompliant ?
                ComplianceResult.ScreeningStatus.COMPLIANT :
                ComplianceResult.ScreeningStatus.NON_COMPLIANT;

        builder.isCompliant(isCompliant)
                .screeningStatus(status);

        ComplianceResult result = builder.build();

        Optional<ComplianceResult> existing = complianceRepository.findByStockId(stock.getId());
        if (existing.isPresent()) {
            result.setId(existing.get().getId());
        }

        return complianceRepository.save(result);
    }

    private ScreeningResult screenBusinessActivity(Stock stock) {
        String sector = stock.getSector();
        String subIndustry = stock.getSubIndustry();

        if (sector != null && PROHIBITED_SECTORS.contains(sector)) {
            return new ScreeningResult(false, null,
                    "Operates in prohibited sector: " + sector);
        }

        if (subIndustry != null) {
            for (String prohibited : PROHIBITED_INDUSTRIES) {
                if (subIndustry.toLowerCase().contains(prohibited.toLowerCase())) {
                    return new ScreeningResult(false, null,
                            "Operates in prohibited industry: " + subIndustry);
                }
            }
        }

        return new ScreeningResult(true, null, null);
    }

    private ScreeningResult screenDebtRatio(FinancialMetrics metrics, BigDecimal marketCap) {
        BigDecimal interestBearingDebt = metrics.getInterestBearingDebt();

        if (interestBearingDebt == null) {
            interestBearingDebt = BigDecimal.ZERO;
        }

        BigDecimal debtRatio = interestBearingDebt.divide(marketCap, 4, RoundingMode.HALF_UP);
        boolean compliant = debtRatio.compareTo(DEBT_RATIO_THRESHOLD) < 0;

        return new ScreeningResult(compliant, debtRatio,
                compliant ? null : "Debt ratio exceeds 33% threshold");
    }

    private ScreeningResult screenLiquidityRatio(FinancialMetrics metrics, BigDecimal marketCap) {
        BigDecimal cash = metrics.getCashAndEquivalents();
        BigDecimal interestSecurities = metrics.getInterestBearingSecurities();

        if (cash == null) cash = BigDecimal.ZERO;
        if (interestSecurities == null) interestSecurities = BigDecimal.ZERO;

        BigDecimal totalLiquidity = cash.add(interestSecurities);
        BigDecimal liquidityRatio = totalLiquidity.divide(marketCap, 4, RoundingMode.HALF_UP);
        boolean compliant = liquidityRatio.compareTo(LIQUIDITY_RATIO_THRESHOLD) < 0;

        return new ScreeningResult(compliant, liquidityRatio,
                compliant ? null : "Liquidity ratio exceeds 33% threshold");
    }

    private ScreeningResult screenIncomeRatio(FinancialMetrics metrics) {
        BigDecimal totalRevenue = metrics.getTotalRevenue();
        BigDecimal nonHalalRevenue = metrics.getNonHalalRevenue();

        if (totalRevenue == null || totalRevenue.compareTo(BigDecimal.ZERO) <= 0) {
            return new ScreeningResult(true, BigDecimal.ZERO, null);
        }

        if (nonHalalRevenue == null) {
            nonHalalRevenue = BigDecimal.ZERO;
        }

        BigDecimal incomeRatio = nonHalalRevenue.divide(totalRevenue, 4, RoundingMode.HALF_UP);
        boolean compliant = incomeRatio.compareTo(INCOME_RATIO_THRESHOLD) < 0;

        return new ScreeningResult(compliant, incomeRatio,
                compliant ? null : "Non-halal income exceeds 5% threshold");
    }

    private PurificationResult calculatePurification(BigDecimal incomeRatio) {
        if (incomeRatio == null || incomeRatio.compareTo(BigDecimal.ZERO) <= 0) {
            return new PurificationResult(false, BigDecimal.ZERO);
        }

        if (incomeRatio.compareTo(INCOME_RATIO_THRESHOLD) >= 0) {
            return new PurificationResult(false, BigDecimal.ZERO);
        }

        BigDecimal percentage = incomeRatio.multiply(new BigDecimal("100"))
                .setScale(2, RoundingMode.HALF_UP);

        return new PurificationResult(true, percentage);
    }

    private ComplianceResult buildUnableToVerifyResult(ComplianceResult.ComplianceResultBuilder builder) {
        return builder
                .isCompliant(false)
                .screeningStatus(ComplianceResult.ScreeningStatus.UNABLE_TO_VERIFY)
                .build();
    }

    public Optional<ComplianceResult> getComplianceBySymbol(String symbol) {
        return complianceRepository.findByStockSymbol(symbol);
    }

    private record ScreeningResult(boolean compliant, BigDecimal value, String reason) {}

    private record PurificationResult(boolean required, BigDecimal percentage) {}
}
