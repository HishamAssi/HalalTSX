package com.halaltsx.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "financial_metrics",
        uniqueConstraints = @UniqueConstraint(columnNames = {"stock_id", "fiscal_period"}))
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class FinancialMetrics {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "stock_id", nullable = false)
    private Stock stock;

    @Column(name = "fiscal_period", nullable = false, length = 10)
    private String fiscalPeriod;

    @Column(name = "total_debt", precision = 18, scale = 2)
    private BigDecimal totalDebt;

    @Column(name = "interest_bearing_debt", precision = 18, scale = 2)
    private BigDecimal interestBearingDebt;

    @Column(name = "cash_and_equivalents", precision = 18, scale = 2)
    private BigDecimal cashAndEquivalents;

    @Column(name = "interest_bearing_securities", precision = 18, scale = 2)
    private BigDecimal interestBearingSecurities;

    @Column(name = "total_revenue", precision = 18, scale = 2)
    private BigDecimal totalRevenue;

    @Column(name = "non_halal_revenue", precision = 18, scale = 2)
    private BigDecimal nonHalalRevenue;

    @Column(name = "report_date", nullable = false)
    private LocalDate reportDate;

    @Column(name = "data_source", length = 50)
    private String dataSource;

    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @Column(name = "updated_at", nullable = false)
    private LocalDateTime updatedAt;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }
}
