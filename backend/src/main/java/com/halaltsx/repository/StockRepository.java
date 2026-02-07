package com.halaltsx.repository;

import com.halaltsx.model.ComplianceResult.ScreeningStatus;
import com.halaltsx.model.Stock;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface StockRepository extends JpaRepository<Stock, Long> {

    Optional<Stock> findBySymbol(String symbol);

    @Query("SELECT s FROM Stock s WHERE s.isActive = true")
    Page<Stock> findAllActive(Pageable pageable);

    @Query("SELECT s FROM Stock s WHERE s.isActive = true AND " +
            "(LOWER(s.symbol) LIKE LOWER(CONCAT('%', :search, '%')) OR " +
            "LOWER(s.name) LIKE LOWER(CONCAT('%', :search, '%')))")
    Page<Stock> searchBySymbolOrName(@Param("search") String search, Pageable pageable);

    @Query("SELECT s FROM Stock s WHERE s.isActive = true AND s.sector = :sector")
    Page<Stock> findBySector(@Param("sector") String sector, Pageable pageable);

    @Query("SELECT DISTINCT s.sector FROM Stock s WHERE s.sector IS NOT NULL AND s.isActive = true ORDER BY s.sector")
    List<String> findAllSectors();

    @Query("SELECT s FROM Stock s LEFT JOIN FETCH s.complianceResult WHERE s.symbol = :symbol")
    Optional<Stock> findBySymbolWithCompliance(@Param("symbol") String symbol);

    @Query("SELECT COUNT(s) FROM Stock s WHERE s.sector = :sector AND s.isActive = true")
    long countBySector(@Param("sector") String sector);

    @Query("SELECT s FROM Stock s LEFT JOIN s.complianceResult c WHERE s.isActive = true " +
            "AND (:search IS NULL OR :search = '' OR LOWER(s.symbol) LIKE LOWER(CONCAT('%', :search, '%')) OR LOWER(s.name) LIKE LOWER(CONCAT('%', :search, '%'))) " +
            "AND (:sector IS NULL OR :sector = '' OR s.sector = :sector) " +
            "AND (:compliance IS NULL OR c.screeningStatus = :compliance)")
    Page<Stock> findWithFilters(
            @Param("search") String search,
            @Param("sector") String sector,
            @Param("compliance") ScreeningStatus compliance,
            Pageable pageable);

    @Query("SELECT s.sector, COUNT(s), SUM(CASE WHEN c.screeningStatus = 'COMPLIANT' THEN 1 ELSE 0 END) " +
            "FROM Stock s LEFT JOIN s.complianceResult c " +
            "WHERE s.isActive = true AND s.sector IS NOT NULL " +
            "GROUP BY s.sector ORDER BY s.sector")
    List<Object[]> findSectorStats();

    // Data mode queries
    @Query("SELECT COUNT(s) FROM Stock s WHERE s.isActive = true AND s.isTestData = true")
    long countTestModeStocks();

    @Query("SELECT COUNT(s) FROM Stock s WHERE s.isActive = true")
    long countFullModeStocks();

    @Query("SELECT s FROM Stock s LEFT JOIN s.complianceResult c WHERE s.isActive = true " +
            "AND (:testModeOnly = false OR s.isTestData = true) " +
            "AND (:search IS NULL OR :search = '' OR LOWER(s.symbol) LIKE LOWER(CONCAT('%', :search, '%')) OR LOWER(s.name) LIKE LOWER(CONCAT('%', :search, '%'))) " +
            "AND (:sector IS NULL OR :sector = '' OR s.sector = :sector) " +
            "AND (:compliance IS NULL OR c.screeningStatus = :compliance)")
    Page<Stock> findWithFiltersAndMode(
            @Param("testModeOnly") boolean testModeOnly,
            @Param("search") String search,
            @Param("sector") String sector,
            @Param("compliance") ScreeningStatus compliance,
            Pageable pageable);

    @Query("SELECT s.sector, COUNT(s), SUM(CASE WHEN c.screeningStatus = 'COMPLIANT' THEN 1 ELSE 0 END) " +
            "FROM Stock s LEFT JOIN s.complianceResult c " +
            "WHERE s.isActive = true AND s.sector IS NOT NULL " +
            "AND (:testModeOnly = false OR s.isTestData = true) " +
            "GROUP BY s.sector ORDER BY s.sector")
    List<Object[]> findSectorStatsWithMode(@Param("testModeOnly") boolean testModeOnly);
}
