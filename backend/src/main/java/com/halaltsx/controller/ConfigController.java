package com.halaltsx.controller;

import com.halaltsx.dto.DataModeDto;
import com.halaltsx.service.DataModeService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/config")
@RequiredArgsConstructor
@Tag(name = "Configuration", description = "Application configuration operations")
public class ConfigController {

    private final DataModeService dataModeService;

    @GetMapping("/data-mode")
    @Operation(summary = "Get current data mode", description = "Returns the current data mode (test or full) with stock counts")
    public ResponseEntity<DataModeDto> getDataMode() {
        return ResponseEntity.ok(dataModeService.getCurrentMode());
    }

    @PostMapping("/data-mode")
    @Operation(summary = "Switch data mode", description = "Switches between test (~39 stocks) and full (~500+ stocks) data modes")
    public ResponseEntity<DataModeDto> switchDataMode(@RequestBody Map<String, String> request) {
        String newMode = request.get("mode");
        if (newMode == null || newMode.isBlank()) {
            return ResponseEntity.badRequest().build();
        }
        return ResponseEntity.ok(dataModeService.switchMode(newMode));
    }
}
