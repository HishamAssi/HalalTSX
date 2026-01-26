package com.halaltsx.repository;

import com.halaltsx.model.FinancialMetrics;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface FinancialMetricsRepository extends JpaRepository<FinancialMetrics, Long> {

    List<FinancialMetrics> findByStockIdOrderByReportDateDesc(Long stockId);

    Optional<FinancialMetrics> findByStockIdAndFiscalPeriod(Long stockId, String fiscalPeriod);

    @Query("SELECT fm FROM FinancialMetrics fm WHERE fm.stock.id = :stockId ORDER BY fm.reportDate DESC LIMIT 1")
    Optional<FinancialMetrics> findLatestByStockId(@Param("stockId") Long stockId);

    @Query("SELECT fm FROM FinancialMetrics fm WHERE fm.stock.symbol = :symbol ORDER BY fm.reportDate DESC")
    List<FinancialMetrics> findByStockSymbolOrderByReportDateDesc(@Param("symbol") String symbol);

    @Query("SELECT fm FROM FinancialMetrics fm WHERE fm.stock.symbol = :symbol ORDER BY fm.reportDate DESC LIMIT 1")
    Optional<FinancialMetrics> findLatestByStockSymbol(@Param("symbol") String symbol);
}
