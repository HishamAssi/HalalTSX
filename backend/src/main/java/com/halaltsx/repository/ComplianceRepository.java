package com.halaltsx.repository;

import com.halaltsx.model.ComplianceResult;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ComplianceRepository extends JpaRepository<ComplianceResult, Long> {

    Optional<ComplianceResult> findByStockId(Long stockId);

    Optional<ComplianceResult> findByStockSymbol(String symbol);

    @Query("SELECT c FROM ComplianceResult c WHERE c.screeningStatus = :status")
    Page<ComplianceResult> findByScreeningStatus(
            @Param("status") ComplianceResult.ScreeningStatus status,
            Pageable pageable);

    @Query("SELECT c FROM ComplianceResult c WHERE c.isCompliant = true")
    Page<ComplianceResult> findAllCompliant(Pageable pageable);

    @Query("SELECT c FROM ComplianceResult c WHERE c.isCompliant = false")
    Page<ComplianceResult> findAllNonCompliant(Pageable pageable);

    @Query("SELECT c FROM ComplianceResult c WHERE c.requiresPurification = true")
    Page<ComplianceResult> findAllRequiringPurification(Pageable pageable);

    @Query("SELECT COUNT(c) FROM ComplianceResult c WHERE c.isCompliant = true AND c.stock.sector = :sector")
    long countCompliantBySector(@Param("sector") String sector);

    @Query("SELECT COUNT(c) FROM ComplianceResult c WHERE c.screeningStatus = :status")
    long countByScreeningStatus(@Param("status") ComplianceResult.ScreeningStatus status);

    // Data mode queries
    @Query("SELECT COUNT(c) FROM ComplianceResult c WHERE c.isCompliant = true AND c.stock.isTestData = true AND c.stock.isActive = true")
    long countCompliantTestMode();

    @Query("SELECT COUNT(c) FROM ComplianceResult c WHERE c.isCompliant = true AND c.stock.isActive = true")
    long countCompliantFullMode();
}
