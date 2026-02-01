package com.halaltsx.dto;

import com.halaltsx.model.ComplianceResult;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ComplianceDto {

    private String status;
    private Boolean isCompliant;
    private Boolean requiresPurification;
    private BigDecimal purificationPercentage;
    private LocalDateTime screenedAt;
    private List<ComplianceCriterionDto> criteria;

    public static ComplianceDto fromEntity(ComplianceResult result) {
        if (result == null) {
            return null;
        }

        List<ComplianceCriterionDto> criteria = new ArrayList<>();

        // Business Activity criterion
        criteria.add(ComplianceCriterionDto.builder()
                .name("Business Activity")
                .description("Company's primary business must not involve prohibited activities (alcohol, gambling, tobacco, weapons, adult entertainment, conventional financial services)")
                .passed(result.getBusinessActivityCompliant())
                .threshold("No prohibited business activities")
                .currentValue(result.getBusinessActivityCompliant() ? "Compliant" : "Non-compliant")
                .reason(result.getBusinessActivityReason())
                .build());

        // Debt Ratio criterion
        criteria.add(ComplianceCriterionDto.builder()
                .name("Debt Ratio")
                .description("Total debt divided by trailing 36-month average market capitalization must be less than 33%")
                .passed(result.getDebtRatioCompliant())
                .threshold("< 33%")
                .currentValue(formatPercentage(result.getDebtRatio()))
                .reason(result.getDebtRatioCompliant() ? "Within acceptable range" : "Exceeds 33% threshold")
                .build());

        // Liquidity Ratio criterion
        criteria.add(ComplianceCriterionDto.builder()
                .name("Liquidity Ratio")
                .description("Cash and interest-bearing securities divided by trailing 36-month average market capitalization must be less than 33%")
                .passed(result.getLiquidityRatioCompliant())
                .threshold("< 33%")
                .currentValue(formatPercentage(result.getLiquidityRatio()))
                .reason(result.getLiquidityRatioCompliant() ? "Within acceptable range" : "Exceeds 33% threshold")
                .build());

        // Income Ratio criterion
        criteria.add(ComplianceCriterionDto.builder()
                .name("Income Ratio")
                .description("Interest income and other non-permissible income divided by total revenue must be less than 5%")
                .passed(result.getIncomeRatioCompliant())
                .threshold("< 5%")
                .currentValue(formatPercentage(result.getIncomeRatio()))
                .reason(result.getIncomeRatioCompliant() ? "Within acceptable range" : "Exceeds 5% threshold")
                .build());

        return ComplianceDto.builder()
                .status(result.getScreeningStatus().name())
                .isCompliant(result.getIsCompliant())
                .requiresPurification(result.getRequiresPurification())
                .purificationPercentage(result.getPurificationPercentage())
                .screenedAt(result.getScreenedAt())
                .criteria(criteria)
                .build();
    }

    private static String formatPercentage(BigDecimal value) {
        if (value == null) {
            return "N/A";
        }
        return value.multiply(BigDecimal.valueOf(100)).setScale(2, java.math.RoundingMode.HALF_UP) + "%";
    }
}
