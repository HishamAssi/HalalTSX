package com.halaltsx.service;

import com.halaltsx.config.DataModeConfig;
import com.halaltsx.dto.DataModeDto;
import com.halaltsx.repository.ComplianceRepository;
import com.halaltsx.repository.StockRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Slf4j
public class DataModeService {

    private final DataModeConfig dataModeConfig;
    private final StockRepository stockRepository;
    private final ComplianceRepository complianceRepository;

    @Transactional(readOnly = true)
    public DataModeDto getCurrentMode() {
        String mode = dataModeConfig.getMode();
        boolean isTestMode = dataModeConfig.isTestMode();

        long stockCount = isTestMode ?
                stockRepository.countTestModeStocks() :
                stockRepository.countFullModeStocks();

        long compliantCount = isTestMode ?
                complianceRepository.countCompliantTestMode() :
                complianceRepository.countCompliantFullMode();

        if (isTestMode) {
            return DataModeDto.testMode(stockCount, compliantCount, dataModeConfig.isAllowRuntimeSwitch());
        } else {
            return DataModeDto.fullMode(stockCount, compliantCount, dataModeConfig.isAllowRuntimeSwitch());
        }
    }

    public DataModeDto switchMode(String newMode) {
        if (!dataModeConfig.isAllowRuntimeSwitch()) {
            log.warn("Attempted to switch data mode but runtime switching is disabled");
            return getCurrentMode();
        }

        if (!"test".equalsIgnoreCase(newMode) && !"full".equalsIgnoreCase(newMode)) {
            throw new IllegalArgumentException("Invalid mode: " + newMode + ". Must be 'test' or 'full'");
        }

        String previousMode = dataModeConfig.getMode();
        dataModeConfig.setModeIfAllowed(newMode.toLowerCase());
        log.info("Data mode switched from '{}' to '{}'", previousMode, newMode);

        return getCurrentMode();
    }

    public boolean isTestMode() {
        return dataModeConfig.isTestMode();
    }

    public boolean isFullMode() {
        return dataModeConfig.isFullMode();
    }
}
