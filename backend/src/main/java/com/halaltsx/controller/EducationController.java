package com.halaltsx.controller;

import com.halaltsx.dto.EducationResponse;
import com.halaltsx.dto.ScreeningCriterionDto;
import com.halaltsx.service.EducationService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/education")
@RequiredArgsConstructor
@Tag(name = "Education", description = "Educational content about Halal screening criteria")
public class EducationController {

    private final EducationService educationService;

    @GetMapping("/criteria")
    @Operation(summary = "Get all screening criteria with explanations")
    public ResponseEntity<EducationResponse> getScreeningCriteria() {
        EducationResponse response = educationService.getScreeningCriteria();
        return ResponseEntity.ok(response);
    }

    @GetMapping("/criteria/{criterionId}")
    @Operation(summary = "Get a specific screening criterion by ID")
    public ResponseEntity<ScreeningCriterionDto> getCriterionById(
            @PathVariable String criterionId) {
        ScreeningCriterionDto criterion = educationService.getCriterionById(criterionId);
        if (criterion == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(criterion);
    }
}
