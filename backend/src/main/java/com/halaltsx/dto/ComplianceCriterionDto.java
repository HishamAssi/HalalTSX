package com.halaltsx.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ComplianceCriterionDto {

    private String name;
    private String description;
    private Boolean passed;
    private String threshold;
    private String currentValue;
    private String reason;
}
