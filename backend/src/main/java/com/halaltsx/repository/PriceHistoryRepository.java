package com.halaltsx.repository;

import com.halaltsx.model.PriceHistory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Repository
public interface PriceHistoryRepository extends JpaRepository<PriceHistory, Long> {

    List<PriceHistory> findByStockIdOrderByDateDesc(Long stockId);

    Optional<PriceHistory> findByStockIdAndDate(Long stockId, LocalDate date);

    @Query("SELECT ph FROM PriceHistory ph WHERE ph.stock.id = :stockId AND ph.date >= :startDate ORDER BY ph.date ASC")
    List<PriceHistory> findByStockIdAndDateAfter(@Param("stockId") Long stockId, @Param("startDate") LocalDate startDate);

    @Query("SELECT ph FROM PriceHistory ph WHERE ph.stock.id = :stockId AND ph.date BETWEEN :startDate AND :endDate ORDER BY ph.date ASC")
    List<PriceHistory> findByStockIdAndDateBetween(
            @Param("stockId") Long stockId,
            @Param("startDate") LocalDate startDate,
            @Param("endDate") LocalDate endDate);

    @Query("SELECT ph FROM PriceHistory ph WHERE ph.stock.symbol = :symbol ORDER BY ph.date DESC")
    List<PriceHistory> findByStockSymbolOrderByDateDesc(@Param("symbol") String symbol);

    @Query("SELECT ph FROM PriceHistory ph WHERE ph.stock.symbol = :symbol AND ph.date >= :startDate ORDER BY ph.date ASC")
    List<PriceHistory> findByStockSymbolAndDateAfter(
            @Param("symbol") String symbol,
            @Param("startDate") LocalDate startDate);

    @Query("SELECT ph FROM PriceHistory ph WHERE ph.stock.id = :stockId ORDER BY ph.date DESC LIMIT 1")
    Optional<PriceHistory> findLatestByStockId(@Param("stockId") Long stockId);
}
