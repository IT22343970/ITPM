package com.example.budget.dto;

import java.math.BigDecimal;
import java.time.LocalDate;

public class BudgetDTO {
    private Long budgetId;
    private String category;
    private BigDecimal limitAmount;
    private BigDecimal spentOver;
    private LocalDate startDate;
    private LocalDate endDate;

    // Getters and Setters
    public Long getBudgetId() {
        return budgetId;
    }

    public void setBudgetId(Long budgetId) {
        this.budgetId = budgetId;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public BigDecimal getLimitAmount() {
        return limitAmount;
    }

    public void setLimitAmount(BigDecimal limitAmount) {
        this.limitAmount = limitAmount;
    }

    public BigDecimal getSpentOver() {
        return spentOver;
    }

    public void setSpentOver(BigDecimal spentOver) {
        this.spentOver = spentOver;
    }

    public LocalDate getStartDate() {
        return startDate;
    }

    public void setStartDate(LocalDate startDate) {
        this.startDate = startDate;
    }

    public LocalDate getEndDate() {
        return endDate;
    }

    public void setEndDate(LocalDate endDate) {
        this.endDate = endDate;
    }
}
