package com.halaltsx.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "compliance_result")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ComplianceResult {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "stock_id", nullable = false, unique = true)
    private Stock stock;

    @Column(name = "business_activity_compliant")
    private Boolean businessActivityCompliant;

    @Column(name = "business_activity_reason", length = 500)
    private String businessActivityReason;

    @Column(name = "debt_ratio", precision = 8, scale = 4)
    private BigDecimal debtRatio;

    @Column(name = "debt_ratio_compliant")
    private Boolean debtRatioCompliant;

    @Column(name = "liquidity_ratio", precision = 8, scale = 4)
    private BigDecimal liquidityRatio;

    @Column(name = "liquidity_ratio_compliant")
    private Boolean liquidityRatioCompliant;

    @Column(name = "income_ratio", precision = 8, scale = 4)
    private BigDecimal incomeRatio;

    @Column(name = "income_ratio_compliant")
    private Boolean incomeRatioCompliant;

    @Column(name = "is_compliant", nullable = false)
    private Boolean isCompliant;

    @Column(name = "requires_purification")
    @Builder.Default
    private Boolean requiresPurification = false;

    @Column(name = "purification_percentage", precision = 6, scale = 4)
    private BigDecimal purificationPercentage;

    @Enumerated(EnumType.STRING)
    @Column(name = "screening_status", nullable = false, length = 20)
    private ScreeningStatus screeningStatus;

    @Column(name = "screened_at", nullable = false)
    private LocalDateTime screenedAt;

    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @Column(name = "updated_at", nullable = false)
    private LocalDateTime updatedAt;

    public enum ScreeningStatus {
        COMPLIANT,
        NON_COMPLIANT,
        UNABLE_TO_VERIFY
    }

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
        if (screenedAt == null) {
            screenedAt = LocalDateTime.now();
        }
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }
}
