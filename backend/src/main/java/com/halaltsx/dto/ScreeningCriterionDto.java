package com.halaltsx.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ScreeningCriterionDto {

    private String id;
    private String name;
    private String description;
    private String threshold;
    private BigDecimal thresholdValue;
    private String rationale;
    private String category;
    private String source;
    private int displayOrder;

    /**
     * Create a criterion for business activity screening
     */
    public static ScreeningCriterionDto businessActivity() {
        return ScreeningCriterionDto.builder()
                .id("business-activity")
                .name("Business Activity Screening")
                .description("The company's primary business must not involve prohibited (haram) activities. " +
                        "This includes alcohol production or sales, pork-related products, conventional banking and insurance, " +
                        "gambling, adult entertainment, weapons manufacturing, and tobacco.")
                .threshold("Core business must be halal")
                .thresholdValue(null)
                .rationale("Islam prohibits earning income from activities that cause harm to individuals or society. " +
                        "This includes intoxicants (alcohol), gambling (maysir), interest-based transactions (riba), " +
                        "and businesses that exploit or harm people. By screening out companies with prohibited core activities, " +
                        "investors ensure their earnings come from permissible sources.")
                .category("Primary Screening")
                .source("AAOIFI Sharia Standards (SS 21)")
                .displayOrder(1)
                .build();
    }

    /**
     * Create a criterion for debt ratio screening
     */
    public static ScreeningCriterionDto debtRatio() {
        return ScreeningCriterionDto.builder()
                .id("debt-ratio")
                .name("Debt Ratio (Interest-Bearing Debt)")
                .description("The ratio of interest-bearing debt to total market capitalization must be less than 33%. " +
                        "This measures the company's reliance on conventional (interest-based) financing.")
                .threshold("< 33% of market capitalization")
                .thresholdValue(new BigDecimal("33"))
                .rationale("Islam prohibits riba (interest/usury). When a company takes on interest-bearing loans, " +
                        "a portion of its income goes toward paying interest, which is considered haram. " +
                        "The 33% threshold allows for companies operating in a conventional economy while " +
                        "limiting exposure to interest-based financing. This threshold comes from the hadith " +
                        "where one-third is considered the maximum acceptable limit.")
                .category("Financial Ratio Screening")
                .source("AAOIFI Sharia Standards (SS 21)")
                .displayOrder(2)
                .build();
    }

    /**
     * Create a criterion for liquidity ratio screening
     */
    public static ScreeningCriterionDto liquidityRatio() {
        return ScreeningCriterionDto.builder()
                .id("liquidity-ratio")
                .name("Liquidity Ratio (Cash and Receivables)")
                .description("The ratio of cash and interest-bearing securities plus receivables to total assets " +
                        "must be less than 33%. This measures illiquid assets versus liquid/near-cash assets.")
                .threshold("< 33% of total assets")
                .thresholdValue(new BigDecimal("33"))
                .rationale("Shares represent ownership in a company's underlying assets. If a company's assets " +
                        "are primarily cash or receivables (which are essentially debt owed to the company), " +
                        "then trading those shares becomes more like trading money for money, which must be done " +
                        "at par value. The 33% threshold ensures the company has substantial real/tangible assets, " +
                        "making share trading permissible.")
                .category("Financial Ratio Screening")
                .source("AAOIFI Sharia Standards (SS 21)")
                .displayOrder(3)
                .build();
    }

    /**
     * Create a criterion for income ratio screening
     */
    public static ScreeningCriterionDto incomeRatio() {
        return ScreeningCriterionDto.builder()
                .id("income-ratio")
                .name("Income Ratio (Non-Permissible Income)")
                .description("The ratio of non-permissible income to total revenue must be less than 5%. " +
                        "This includes interest income, income from haram activities, and other prohibited earnings.")
                .threshold("< 5% of total revenue")
                .thresholdValue(new BigDecimal("5"))
                .rationale("While a company may pass business activity screening (halal core business), " +
                        "it may still earn some income from impermissible sources such as bank interest " +
                        "on deposits or small side businesses in prohibited areas. The 5% threshold sets " +
                        "a strict limit on such income. Any impermissible income earned must be purified " +
                        "by donating that percentage of dividends to charity.")
                .category("Financial Ratio Screening")
                .source("AAOIFI Sharia Standards (SS 21)")
                .displayOrder(4)
                .build();
    }

    /**
     * Create a criterion explaining purification
     */
    public static ScreeningCriterionDto purification() {
        return ScreeningCriterionDto.builder()
                .id("purification")
                .name("Dividend Purification")
                .description("When a halal-compliant company has some non-permissible income (under 5%), " +
                        "investors must purify their dividends by donating a proportional amount to charity. " +
                        "The purification percentage is calculated based on the company's impure income ratio.")
                .threshold("Purification = (Non-permissible Income / Total Revenue) × Dividend")
                .thresholdValue(null)
                .rationale("Even when investing in compliant companies, Muslims are obligated to ensure " +
                        "their earnings are completely halal. The purification process removes any tainted " +
                        "portion of income by directing it to charitable causes. This amount should be donated " +
                        "without expecting reward, as it is considered impure wealth that must be disposed of.")
                .category("Purification")
                .source("AAOIFI Sharia Standards (SS 21)")
                .displayOrder(5)
                .build();
    }
}
