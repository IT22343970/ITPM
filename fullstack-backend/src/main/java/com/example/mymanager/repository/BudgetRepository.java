package com.example.mymanager.repository;

import com.example.mymanager.model.Budget;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

public interface BudgetRepository extends JpaRepository<Budget, Long> {
    List<Budget> findByEndDate(LocalDate endDate);
    // Custom query to find budgets where spentOver >= 80% of limitAmount
    @Query("SELECT b FROM Budget b WHERE b.user.id = :userId AND (b.spentOver / b.limitAmount) > 0.8")
    List<Budget> findBudgetsWhereSpentOver80PercentByUserId(@Param("userId") Long userId);

    List<Budget> findByUserId(Long userId);
}
