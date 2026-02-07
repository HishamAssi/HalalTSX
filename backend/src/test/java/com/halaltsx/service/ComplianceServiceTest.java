package com.halaltsx.service;

import com.halaltsx.model.ComplianceResult;
import com.halaltsx.model.FinancialMetrics;
import com.halaltsx.model.Stock;
import com.halaltsx.repository.ComplianceRepository;
import com.halaltsx.repository.FinancialMetricsRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.math.BigDecimal;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class ComplianceServiceTest {

    @Mock
    private ComplianceRepository complianceRepository;

    @Mock
    private FinancialMetricsRepository financialMetricsRepository;

    @InjectMocks
    private ComplianceService complianceService;

    private Stock testStock;
    private FinancialMetrics testMetrics;

    @BeforeEach
    void setUp() {
        testStock = Stock.builder()
                .id(1L)
                .symbol("TEST")
                .name("Test Company")
                .sector("Technology")
                .marketCap(new BigDecimal("1000000000")) // 1 billion
                .build();

        testMetrics = FinancialMetrics.builder()
                .id(1L)
                .stock(testStock)
                .interestBearingDebt(new BigDecimal("200000000")) // 200 million (20% of market cap)
                .cashAndEquivalents(new BigDecimal("100000000")) // 100 million
                .interestBearingSecurities(new BigDecimal("50000000")) // 50 million
                .totalRevenue(new BigDecimal("500000000")) // 500 million
                .nonHalalRevenue(new BigDecimal("10000000")) // 10 million (2% of revenue)
                .build();
    }

    @Nested
    @DisplayName("Business Activity Screening")
    class BusinessActivityScreeningTests {

        @Test
        @DisplayName("Should mark stock as non-compliant when in prohibited sector")
        void shouldFailForProhibitedSector() {
            testStock.setSector("Financials");
            setupMocks();

            ComplianceResult result = complianceService.screenStock(testStock);

            assertThat(result.getBusinessActivityCompliant()).isFalse();
            assertThat(result.getBusinessActivityReason()).contains("prohibited sector");
        }

        @Test
        @DisplayName("Should mark stock as non-compliant for Banks sector")
        void shouldFailForBanksSector() {
            testStock.setSector("Banks");
            setupMocks();

            ComplianceResult result = complianceService.screenStock(testStock);

            assertThat(result.getBusinessActivityCompliant()).isFalse();
        }

        @Test
        @DisplayName("Should mark stock as non-compliant for Insurance sector")
        void shouldFailForInsuranceSector() {
            testStock.setSector("Insurance");
            setupMocks();

            ComplianceResult result = complianceService.screenStock(testStock);

            assertThat(result.getBusinessActivityCompliant()).isFalse();
        }

        @Test
        @DisplayName("Should mark stock as non-compliant when in prohibited industry")
        void shouldFailForProhibitedIndustry() {
            testStock.setSubIndustry("Brewers");
            setupMocks();

            ComplianceResult result = complianceService.screenStock(testStock);

            assertThat(result.getBusinessActivityCompliant()).isFalse();
            assertThat(result.getBusinessActivityReason()).contains("prohibited industry");
        }

        @Test
        @DisplayName("Should mark stock as non-compliant for Tobacco industry")
        void shouldFailForTobaccoIndustry() {
            testStock.setSubIndustry("Tobacco Products");
            setupMocks();

            ComplianceResult result = complianceService.screenStock(testStock);

            assertThat(result.getBusinessActivityCompliant()).isFalse();
        }

        @Test
        @DisplayName("Should mark stock as non-compliant for Casinos & Gaming")
        void shouldFailForCasinosGaming() {
            testStock.setSubIndustry("Casinos & Gaming");
            setupMocks();

            ComplianceResult result = complianceService.screenStock(testStock);

            assertThat(result.getBusinessActivityCompliant()).isFalse();
        }

        @Test
        @DisplayName("Should pass business activity screening for compliant sector")
        void shouldPassForCompliantSector() {
            testStock.setSector("Technology");
            testStock.setSubIndustry("Software");
            setupMocks();

            ComplianceResult result = complianceService.screenStock(testStock);

            assertThat(result.getBusinessActivityCompliant()).isTrue();
        }
    }

    @Nested
    @DisplayName("Debt Ratio Screening")
    class DebtRatioScreeningTests {

        @Test
        @DisplayName("Should pass when debt ratio is below 33%")
        void shouldPassWhenDebtBelowThreshold() {
            // 20% debt ratio (200M / 1B)
            setupMocks();

            ComplianceResult result = complianceService.screenStock(testStock);

            assertThat(result.getDebtRatioCompliant()).isTrue();
            assertThat(result.getDebtRatio()).isEqualByComparingTo(new BigDecimal("0.2000"));
        }

        @Test
        @DisplayName("Should fail when debt ratio exceeds 33%")
        void shouldFailWhenDebtExceedsThreshold() {
            testMetrics.setInterestBearingDebt(new BigDecimal("400000000")); // 40%
            setupMocks();

            ComplianceResult result = complianceService.screenStock(testStock);

            assertThat(result.getDebtRatioCompliant()).isFalse();
            assertThat(result.getDebtRatio()).isEqualByComparingTo(new BigDecimal("0.4000"));
        }

        @Test
        @DisplayName("Should fail when debt ratio is exactly 33%")
        void shouldFailWhenDebtExactlyAtThreshold() {
            testMetrics.setInterestBearingDebt(new BigDecimal("330000000")); // exactly 33%
            setupMocks();

            ComplianceResult result = complianceService.screenStock(testStock);

            // Exactly at threshold is non-compliant (< 33%, not <=)
            assertThat(result.getDebtRatioCompliant()).isFalse();
        }

        @Test
        @DisplayName("Should pass when debt ratio is just below 33%")
        void shouldPassWhenDebtJustBelowThreshold() {
            testMetrics.setInterestBearingDebt(new BigDecimal("329000000")); // 32.9%
            setupMocks();

            ComplianceResult result = complianceService.screenStock(testStock);

            assertThat(result.getDebtRatioCompliant()).isTrue();
        }

        @Test
        @DisplayName("Should handle null debt as zero")
        void shouldHandleNullDebtAsZero() {
            testMetrics.setInterestBearingDebt(null);
            setupMocks();

            ComplianceResult result = complianceService.screenStock(testStock);

            assertThat(result.getDebtRatioCompliant()).isTrue();
            assertThat(result.getDebtRatio()).isEqualByComparingTo(BigDecimal.ZERO);
        }
    }

    @Nested
    @DisplayName("Liquidity Ratio Screening")
    class LiquidityRatioScreeningTests {

        @Test
        @DisplayName("Should pass when liquidity ratio is below 33%")
        void shouldPassWhenLiquidityBelowThreshold() {
            // 15% liquidity (100M + 50M = 150M / 1B)
            setupMocks();

            ComplianceResult result = complianceService.screenStock(testStock);

            assertThat(result.getLiquidityRatioCompliant()).isTrue();
            assertThat(result.getLiquidityRatio()).isEqualByComparingTo(new BigDecimal("0.1500"));
        }

        @Test
        @DisplayName("Should fail when liquidity ratio exceeds 33%")
        void shouldFailWhenLiquidityExceedsThreshold() {
            testMetrics.setCashAndEquivalents(new BigDecimal("300000000")); // 300M
            testMetrics.setInterestBearingSecurities(new BigDecimal("100000000")); // 100M = 40%
            setupMocks();

            ComplianceResult result = complianceService.screenStock(testStock);

            assertThat(result.getLiquidityRatioCompliant()).isFalse();
        }

        @Test
        @DisplayName("Should fail when liquidity ratio is exactly 33%")
        void shouldFailWhenLiquidityExactlyAtThreshold() {
            testMetrics.setCashAndEquivalents(new BigDecimal("280000000"));
            testMetrics.setInterestBearingSecurities(new BigDecimal("50000000")); // = 33%
            setupMocks();

            ComplianceResult result = complianceService.screenStock(testStock);

            assertThat(result.getLiquidityRatioCompliant()).isFalse();
        }

        @Test
        @DisplayName("Should pass when liquidity ratio is just below 33%")
        void shouldPassWhenLiquidityJustBelowThreshold() {
            testMetrics.setCashAndEquivalents(new BigDecimal("279000000"));
            testMetrics.setInterestBearingSecurities(new BigDecimal("50000000")); // = 32.9%
            setupMocks();

            ComplianceResult result = complianceService.screenStock(testStock);

            assertThat(result.getLiquidityRatioCompliant()).isTrue();
        }

        @Test
        @DisplayName("Should handle null values as zero")
        void shouldHandleNullValuesAsZero() {
            testMetrics.setCashAndEquivalents(null);
            testMetrics.setInterestBearingSecurities(null);
            setupMocks();

            ComplianceResult result = complianceService.screenStock(testStock);

            assertThat(result.getLiquidityRatioCompliant()).isTrue();
            assertThat(result.getLiquidityRatio()).isEqualByComparingTo(BigDecimal.ZERO);
        }
    }

    @Nested
    @DisplayName("Income Ratio Screening")
    class IncomeRatioScreeningTests {

        @Test
        @DisplayName("Should pass when income ratio is below 5%")
        void shouldPassWhenIncomeBelowThreshold() {
            // 2% income ratio (10M / 500M)
            setupMocks();

            ComplianceResult result = complianceService.screenStock(testStock);

            assertThat(result.getIncomeRatioCompliant()).isTrue();
            assertThat(result.getIncomeRatio()).isEqualByComparingTo(new BigDecimal("0.0200"));
        }

        @Test
        @DisplayName("Should fail when income ratio exceeds 5%")
        void shouldFailWhenIncomeExceedsThreshold() {
            testMetrics.setNonHalalRevenue(new BigDecimal("30000000")); // 6%
            setupMocks();

            ComplianceResult result = complianceService.screenStock(testStock);

            assertThat(result.getIncomeRatioCompliant()).isFalse();
        }

        @Test
        @DisplayName("Should fail when income ratio is exactly 5%")
        void shouldFailWhenIncomeExactlyAtThreshold() {
            testMetrics.setNonHalalRevenue(new BigDecimal("25000000")); // exactly 5%
            setupMocks();

            ComplianceResult result = complianceService.screenStock(testStock);

            assertThat(result.getIncomeRatioCompliant()).isFalse();
        }

        @Test
        @DisplayName("Should pass when income ratio is just below 5%")
        void shouldPassWhenIncomeJustBelowThreshold() {
            testMetrics.setNonHalalRevenue(new BigDecimal("24500000")); // 4.9%
            setupMocks();

            ComplianceResult result = complianceService.screenStock(testStock);

            assertThat(result.getIncomeRatioCompliant()).isTrue();
        }

        @Test
        @DisplayName("Should handle null non-halal revenue as zero")
        void shouldHandleNullNonHalalRevenueAsZero() {
            testMetrics.setNonHalalRevenue(null);
            setupMocks();

            ComplianceResult result = complianceService.screenStock(testStock);

            assertThat(result.getIncomeRatioCompliant()).isTrue();
            assertThat(result.getIncomeRatio()).isEqualByComparingTo(BigDecimal.ZERO);
        }

        @Test
        @DisplayName("Should handle zero total revenue")
        void shouldHandleZeroTotalRevenue() {
            testMetrics.setTotalRevenue(BigDecimal.ZERO);
            setupMocks();

            ComplianceResult result = complianceService.screenStock(testStock);

            assertThat(result.getIncomeRatioCompliant()).isTrue();
        }
    }

    @Nested
    @DisplayName("Purification Calculation")
    class PurificationCalculationTests {

        @Test
        @DisplayName("Should require purification when income ratio is positive but below 5%")
        void shouldRequirePurificationWhenIncomePositive() {
            // 2% income ratio
            setupMocks();

            ComplianceResult result = complianceService.screenStock(testStock);

            assertThat(result.getRequiresPurification()).isTrue();
            assertThat(result.getPurificationPercentage()).isEqualByComparingTo(new BigDecimal("2.00"));
        }

        @Test
        @DisplayName("Should not require purification when income ratio is zero")
        void shouldNotRequirePurificationWhenZeroIncome() {
            testMetrics.setNonHalalRevenue(BigDecimal.ZERO);
            setupMocks();

            ComplianceResult result = complianceService.screenStock(testStock);

            assertThat(result.getRequiresPurification()).isFalse();
            assertThat(result.getPurificationPercentage()).isEqualByComparingTo(BigDecimal.ZERO);
        }

        @Test
        @DisplayName("Should not require purification when income ratio exceeds 5%")
        void shouldNotRequirePurificationWhenExceedsThreshold() {
            testMetrics.setNonHalalRevenue(new BigDecimal("30000000")); // 6%
            setupMocks();

            ComplianceResult result = complianceService.screenStock(testStock);

            assertThat(result.getRequiresPurification()).isFalse();
        }

        @Test
        @DisplayName("Should calculate correct purification percentage")
        void shouldCalculateCorrectPurificationPercentage() {
            testMetrics.setNonHalalRevenue(new BigDecimal("17500000")); // 3.5%
            setupMocks();

            ComplianceResult result = complianceService.screenStock(testStock);

            assertThat(result.getRequiresPurification()).isTrue();
            assertThat(result.getPurificationPercentage()).isEqualByComparingTo(new BigDecimal("3.50"));
        }
    }

    @Nested
    @DisplayName("Overall Compliance")
    class OverallComplianceTests {

        @Test
        @DisplayName("Should be compliant when all criteria pass")
        void shouldBeCompliantWhenAllPass() {
            setupMocks();

            ComplianceResult result = complianceService.screenStock(testStock);

            assertThat(result.getIsCompliant()).isTrue();
            assertThat(result.getScreeningStatus()).isEqualTo(ComplianceResult.ScreeningStatus.COMPLIANT);
        }

        @Test
        @DisplayName("Should be non-compliant when any criterion fails")
        void shouldBeNonCompliantWhenAnyFails() {
            testStock.setSector("Financials");
            setupMocks();

            ComplianceResult result = complianceService.screenStock(testStock);

            assertThat(result.getIsCompliant()).isFalse();
            assertThat(result.getScreeningStatus()).isEqualTo(ComplianceResult.ScreeningStatus.NON_COMPLIANT);
        }

        @Test
        @DisplayName("Should return unable to verify when no financial metrics")
        void shouldReturnUnableToVerifyWhenNoMetrics() {
            when(financialMetricsRepository.findLatestByStockId(testStock.getId()))
                    .thenReturn(Optional.empty());

            ComplianceResult result = complianceService.screenStock(testStock);

            assertThat(result.getScreeningStatus())
                    .isEqualTo(ComplianceResult.ScreeningStatus.UNABLE_TO_VERIFY);
        }

        @Test
        @DisplayName("Should return unable to verify when market cap is invalid")
        void shouldReturnUnableToVerifyWhenMarketCapInvalid() {
            testStock.setMarketCap(BigDecimal.ZERO);
            when(financialMetricsRepository.findLatestByStockId(testStock.getId()))
                    .thenReturn(Optional.of(testMetrics));

            ComplianceResult result = complianceService.screenStock(testStock);

            assertThat(result.getScreeningStatus())
                    .isEqualTo(ComplianceResult.ScreeningStatus.UNABLE_TO_VERIFY);
        }
    }

    private void setupMocks() {
        when(financialMetricsRepository.findLatestByStockId(testStock.getId()))
                .thenReturn(Optional.of(testMetrics));
        when(complianceRepository.findByStockId(any())).thenReturn(Optional.empty());
        when(complianceRepository.save(any())).thenAnswer(i -> i.getArgument(0));
    }
}
