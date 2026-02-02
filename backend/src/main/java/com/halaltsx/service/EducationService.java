package com.halaltsx.service;

import com.halaltsx.dto.EducationResponse;
import com.halaltsx.dto.ScreeningCriterionDto;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EducationService {

    /**
     * Get all screening criteria with explanations
     */
    public EducationResponse getScreeningCriteria() {
        List<ScreeningCriterionDto> criteria = List.of(
                ScreeningCriterionDto.businessActivity(),
                ScreeningCriterionDto.debtRatio(),
                ScreeningCriterionDto.liquidityRatio(),
                ScreeningCriterionDto.incomeRatio(),
                ScreeningCriterionDto.purification()
        );

        return EducationResponse.create(criteria);
    }

    /**
     * Get a specific criterion by ID
     */
    public ScreeningCriterionDto getCriterionById(String criterionId) {
        return switch (criterionId.toLowerCase()) {
            case "business-activity" -> ScreeningCriterionDto.businessActivity();
            case "debt-ratio" -> ScreeningCriterionDto.debtRatio();
            case "liquidity-ratio" -> ScreeningCriterionDto.liquidityRatio();
            case "income-ratio" -> ScreeningCriterionDto.incomeRatio();
            case "purification" -> ScreeningCriterionDto.purification();
            default -> null;
        };
    }
}
