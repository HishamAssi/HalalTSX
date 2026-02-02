package com.halaltsx.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class EducationResponse {

    private String title;
    private String introduction;
    private List<ScreeningCriterionDto> criteria;
    private List<String> additionalResources;
    private String disclaimer;

    public static EducationResponse create(List<ScreeningCriterionDto> criteria) {
        return EducationResponse.builder()
                .title("Understanding Halal Stock Screening")
                .introduction("Halal investing follows Islamic principles that prohibit earning income from " +
                        "activities considered harmful or exploitative. The screening methodology used in this " +
                        "application is based on AAOIFI (Accounting and Auditing Organization for Islamic " +
                        "Financial Institutions) Sharia Standards, which are widely recognized in the global " +
                        "Islamic finance industry. Stocks must pass both business activity screening and " +
                        "financial ratio screening to be considered Sharia-compliant.")
                .criteria(criteria)
                .additionalResources(List.of(
                        "AAOIFI Sharia Standards - www.aaoifi.com",
                        "Islamic Finance News - www.islamicfinancenews.com",
                        "Mufti Taqi Usmani - 'An Introduction to Islamic Finance'",
                        "Securities Commission Malaysia - Islamic Capital Market Guidelines"
                ))
                .disclaimer("This screening is provided for educational and informational purposes only. " +
                        "It should not be considered as religious advice or a fatwa. Please consult with a " +
                        "qualified Islamic scholar or Sharia advisor for specific guidance on your investments. " +
                        "Financial data used for screening may be delayed or incomplete, and compliance status " +
                        "can change as companies update their financial reports.")
                .build();
    }
}
