package com.halaltsx.service;

import com.halaltsx.config.DataModeConfig;
import com.halaltsx.dto.StockDetailDto;
import com.halaltsx.dto.StockListResponse;
import com.halaltsx.model.ComplianceResult;
import com.halaltsx.model.Stock;
import com.halaltsx.repository.ComplianceRepository;
import com.halaltsx.repository.StockRepository;
import jakarta.persistence.EntityNotFoundException;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class StockServiceTest {

    @Mock
    private StockRepository stockRepository;

    @Mock
    private ComplianceRepository complianceRepository;

    @Mock
    private DataModeConfig dataModeConfig;

    @InjectMocks
    private StockService stockService;

    private Stock testStock;
    private ComplianceResult testCompliance;

    @BeforeEach
    void setUp() {
        testStock = Stock.builder()
                .id(1L)
                .symbol("TEST")
                .name("Test Company")
                .sector("Technology")
                .marketCap(new BigDecimal("1000000000"))
                .currentPrice(new BigDecimal("50.00"))
                .priceUpdatedAt(LocalDateTime.now())
                .isTestData(true)
                .build();

        testCompliance = ComplianceResult.builder()
                .id(1L)
                .stock(testStock)
                .isCompliant(true)
                .screeningStatus(ComplianceResult.ScreeningStatus.COMPLIANT)
                .businessActivityCompliant(true)
                .debtRatioCompliant(true)
                .liquidityRatioCompliant(true)
                .incomeRatioCompliant(true)
                .build();

        testStock.setComplianceResult(testCompliance);
    }

    @Nested
    @DisplayName("Stock Retrieval")
    class StockRetrievalTests {

        @Test
        @DisplayName("Should get stock by symbol")
        void shouldGetStockBySymbol() {
            when(stockRepository.findBySymbolWithCompliance("TEST"))
                    .thenReturn(Optional.of(testStock));

            var result = stockService.getStockBySymbol("TEST");

            assertThat(result).isNotNull();
            assertThat(result.getSymbol()).isEqualTo("TEST");
            assertThat(result.getName()).isEqualTo("Test Company");
        }

        @Test
        @DisplayName("Should throw exception when stock not found")
        void shouldThrowWhenStockNotFound() {
            when(stockRepository.findBySymbolWithCompliance("UNKNOWN"))
                    .thenReturn(Optional.empty());

            assertThatThrownBy(() -> stockService.getStockBySymbol("UNKNOWN"))
                    .isInstanceOf(EntityNotFoundException.class)
                    .hasMessageContaining("UNKNOWN");
        }

        @Test
        @DisplayName("Should get stock detail with compliance info")
        void shouldGetStockDetailWithCompliance() {
            when(stockRepository.findBySymbolWithCompliance("TEST"))
                    .thenReturn(Optional.of(testStock));

            StockDetailDto result = stockService.getStockDetail("TEST");

            assertThat(result).isNotNull();
            assertThat(result.getSymbol()).isEqualTo("TEST");
            assertThat(result.getComplianceStatus()).isEqualTo("COMPLIANT");
        }
    }

    @Nested
    @DisplayName("Data Mode Filtering")
    class DataModeFilteringTests {

        @Test
        @DisplayName("Should filter test data when in test mode")
        void shouldFilterTestDataInTestMode() {
            when(dataModeConfig.isTestMode()).thenReturn(true);
            Pageable pageable = PageRequest.of(0, 10);
            Page<Stock> stockPage = new PageImpl<>(List.of(testStock), pageable, 1);

            when(stockRepository.findWithFiltersAndMode(eq(true), any(), any(), any(), eq(pageable)))
                    .thenReturn(stockPage);
            when(complianceRepository.findByStockId(testStock.getId()))
                    .thenReturn(Optional.of(testCompliance));

            StockListResponse result = stockService.getStocks(null, null, null, pageable);

            assertThat(result.getContent()).hasSize(1);
            assertThat(result.getTotalElements()).isEqualTo(1);
        }

        @Test
        @DisplayName("Should show all data when in full mode")
        void shouldShowAllDataInFullMode() {
            Stock fullStock = Stock.builder()
                    .id(2L)
                    .symbol("FULL")
                    .name("Full Company")
                    .isTestData(false)
                    .build();

            when(dataModeConfig.isTestMode()).thenReturn(false);
            Pageable pageable = PageRequest.of(0, 10);
            Page<Stock> stockPage = new PageImpl<>(Arrays.asList(testStock, fullStock), pageable, 2);

            when(stockRepository.findWithFiltersAndMode(eq(false), any(), any(), any(), eq(pageable)))
                    .thenReturn(stockPage);
            when(complianceRepository.findByStockId(any())).thenReturn(Optional.empty());

            StockListResponse result = stockService.getStocks(null, null, null, pageable);

            assertThat(result.getContent()).hasSize(2);
        }
    }

    @Nested
    @DisplayName("Search and Filtering")
    class SearchFilteringTests {

        @Test
        @DisplayName("Should filter by search term")
        void shouldFilterBySearchTerm() {
            when(dataModeConfig.isTestMode()).thenReturn(true);
            Pageable pageable = PageRequest.of(0, 10);
            Page<Stock> stockPage = new PageImpl<>(List.of(testStock), pageable, 1);

            when(stockRepository.findWithFiltersAndMode(eq(true), eq("TEST"), any(), any(), eq(pageable)))
                    .thenReturn(stockPage);
            when(complianceRepository.findByStockId(testStock.getId()))
                    .thenReturn(Optional.of(testCompliance));

            StockListResponse result = stockService.getStocks("TEST", null, null, pageable);

            assertThat(result.getContent()).hasSize(1);
        }

        @Test
        @DisplayName("Should filter by sector")
        void shouldFilterBySector() {
            when(dataModeConfig.isTestMode()).thenReturn(true);
            Pageable pageable = PageRequest.of(0, 10);
            Page<Stock> stockPage = new PageImpl<>(List.of(testStock), pageable, 1);

            when(stockRepository.findWithFiltersAndMode(eq(true), any(), eq("Technology"), any(), eq(pageable)))
                    .thenReturn(stockPage);
            when(complianceRepository.findByStockId(testStock.getId()))
                    .thenReturn(Optional.of(testCompliance));

            StockListResponse result = stockService.getStocks(null, null, "Technology", pageable);

            assertThat(result.getContent()).hasSize(1);
        }

        @Test
        @DisplayName("Should filter by compliance status")
        void shouldFilterByComplianceStatus() {
            when(dataModeConfig.isTestMode()).thenReturn(true);
            Pageable pageable = PageRequest.of(0, 10);
            Page<Stock> stockPage = new PageImpl<>(List.of(testStock), pageable, 1);

            when(stockRepository.findWithFiltersAndMode(
                    eq(true), any(), any(),
                    eq(ComplianceResult.ScreeningStatus.COMPLIANT), eq(pageable)))
                    .thenReturn(stockPage);
            when(complianceRepository.findByStockId(testStock.getId()))
                    .thenReturn(Optional.of(testCompliance));

            StockListResponse result = stockService.getStocks(null, "COMPLIANT", null, pageable);

            assertThat(result.getContent()).hasSize(1);
        }

        @Test
        @DisplayName("Should normalize empty search to null")
        void shouldNormalizeEmptySearchToNull() {
            when(dataModeConfig.isTestMode()).thenReturn(true);
            Pageable pageable = PageRequest.of(0, 10);
            Page<Stock> stockPage = new PageImpl<>(List.of(testStock), pageable, 1);

            when(stockRepository.findWithFiltersAndMode(eq(true), eq(null), any(), any(), eq(pageable)))
                    .thenReturn(stockPage);
            when(complianceRepository.findByStockId(testStock.getId()))
                    .thenReturn(Optional.of(testCompliance));

            StockListResponse result = stockService.getStocks("  ", null, null, pageable);

            assertThat(result.getContent()).hasSize(1);
        }
    }

    @Nested
    @DisplayName("Sector Stats")
    class SectorStatsTests {

        @Test
        @DisplayName("Should get sector stats with mode filtering")
        void shouldGetSectorStatsWithModeFiltering() {
            when(dataModeConfig.isTestMode()).thenReturn(true);
            when(stockRepository.findSectorStatsWithMode(true))
                    .thenReturn(Arrays.asList(
                            new Object[]{"Technology", 10L, 8L},
                            new Object[]{"Healthcare", 5L, 4L}
                    ));

            var result = stockService.getSectorStats();

            assertThat(result.getSectors()).hasSize(2);
            assertThat(result.getTotalSectors()).isEqualTo(2);
        }
    }
}
