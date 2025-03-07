import React from "react";
import "./FinancialTable.css";

const metricCategories = {
  "Income Statement": [
    ["TotalRevenue", "Total Revenue"],
    ["GrossProfit", "Gross Profit"],
    ["OperatingIncomeLoss", "Operating Income (Loss)"],
    ["NetIncomeLoss", "Net Income (Loss)"],
    ["EffectiveIncomeTaxRateContinuingOperations", "Tax Rate"]
  ],
  "Balance Sheet": [
    ["CashAndCashEquivalentsAtCarryingValue", "Cash & Cash Equivalents"],
    ["AccountsReceivableNetCurrent", "Accounts Receivable"],
    ["InventoryNet", "Inventories"],
    ["AssetsCurrent", "Total Current Assets"],
    ["ppe", "Property, Plant, and Equipment"],
    ["Goodwill", "Goodwill"],
    ["Assets", "Total Assets"],
    ["ShortTermBorrowings", "Short-Term Borrowings"],
    ["CommercialPaper", "Commercial Paper (Short-Term Borrowing)"],
    ["LongTermDebtCurrent", "Current Maturities of Long-Term Debt"],
    ["AccountsPayableCurrent", "Accounts Payable"],
    ["LiabilitiesCurrent", "Total Current Liabilities"],
    ["LongTermDebtNoncurrent", "Long-Term Debt, Less Current Maturities"],
    ["Liabilities", "Total Liabilities"],
    ["RetainedEarningsAccumulatedDeficit", "Retained Earnings"],
    ["StockholdersEquity", "Total Stockholders’ Equity"]
  ],
  "Cash Flow Statement": [
    ["DepreciationAmortization", "Depreciation & Amortization"],
    ["ChangeInReceivables", "Change in Accounts Receivable"],
    ["ChangeInPayables", "Change in Accounts Payable"],
    ["IncreaseDecreaseInInventories", "Change in Inventories"],
    ["CapEx", "Purchase of Property, Plant, and Equipment"]
  ]
};

const FinancialTable = ({ data }) => {
  if (!data) return <p className="text-center">No data available.</p>;

  const years = Object.keys(data).sort((a, b) => b - a);

  return (
    <div role="region" aria-labelledby="caption" tabindex="0">
      <table>
        <thead>
          <tr>
            <th>Facts/FY</th>
            {years.map(year => (
              <th key={year}>
                {year}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Object.entries(metricCategories).map(([category, metrics]) => (
            <React.Fragment key={category}>
              {/* Category Header */}
              <tr>
                <td colSpan={years.length + 1}>{category}</td>
              </tr>

              {/* Render Metrics */}
              {metrics.map((metricGroup) => {
                const metricKeys = metricGroup.slice(0, -1); // Extract actual metric keys
                const displayName = metricGroup[metricGroup.length - 1]; // Get display name
                return (
                  <tr key={displayName}>
                    <th>{displayName}</th>
                    {years.map((year) => (
                      <td key={year}>
                        {metricKeys.map((key) => data[year]?.[key]).find((val) => val !== undefined) || "N/A"}
                      </td>
                    ))}
                  </tr>
                );
              })}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FinancialTable;
