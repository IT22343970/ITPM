package com.example.mymanager.controller;

import com.example.mymanager.dto.BudgetDTO;
import com.example.mymanager.dto.BudgetRequest;
import com.example.mymanager.model.Budget;
import com.example.mymanager.model.Expense;
import com.example.mymanager.model.User;
import com.example.mymanager.repository.BudgetRepository;
import com.example.mymanager.repository.ExpenseRepository;
import com.example.mymanager.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/budgets")
@CrossOrigin(origins = "http://localhost:5173") // Allow frontend origin
public class BudgetController {

    @Autowired
    private BudgetRepository budgetRepository;

    @Autowired
    private ExpenseRepository expenseRepository;

    @Autowired
    private UserRepository userRepository;

    /**
     * Create a new budget
     */
    @PostMapping("/create")
    public ResponseEntity<?> createBudget(@RequestBody BudgetRequest request) {
        try {
            // Find the user by ID
            User user = userRepository.findById(request.getUserId())
                    .orElseThrow(() -> new RuntimeException("User not found"));

            // Create a new budget
            Budget budget = new Budget();
            budget.setUser(user);
            budget.setCategory(request.getCategory());
            budget.setLimitAmount(request.getLimitAmount());
            budget.setStartDate(request.getStartDate());
            budget.setEndDate(request.getEndDate());
            budget.setSpentOver(BigDecimal.ZERO); // Default value

            // Save the budget
            Budget savedBudget = budgetRepository.save(budget);
            return ResponseEntity.ok(convertToDTO(savedBudget)); // Return DTO
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    /**
     * Update an existing budget by ID
     */
    @PutMapping("/update/{id}")
    public ResponseEntity<?> updateBudget(@PathVariable Long id, @RequestBody Budget updatedBudget) {
        try {
            Optional<Budget> optionalBudget = budgetRepository.findById(id);
            if (optionalBudget.isPresent()) {
                Budget budget = optionalBudget.get();
                budget.setCategory(updatedBudget.getCategory());
                budget.setLimitAmount(updatedBudget.getLimitAmount());
                budget.setStartDate(updatedBudget.getStartDate());
                budget.setEndDate(updatedBudget.getEndDate());
                Budget savedBudget = budgetRepository.save(budget);
                return ResponseEntity.ok(convertToDTO(savedBudget)); // Return DTO
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    /**
     * Delete a budget by ID
     */
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteBudget(@PathVariable Long id) {
        if (budgetRepository.existsById(id)) {
            budgetRepository.deleteById(id);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    /**
     * Get a budget by ID
     */
    @GetMapping("/{id}")
    public ResponseEntity<?> getBudgetById(@PathVariable Long id) {
        try {
            Optional<Budget> optionalBudget = budgetRepository.findById(id);
            return optionalBudget.map(budget -> ResponseEntity.ok(convertToDTO(budget)))
                    .orElseGet(() -> ResponseEntity.notFound().build());
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    /**
     * Get all budgets
     */
    @GetMapping("/all/{id}")
    public ResponseEntity<List<BudgetDTO>> getAllBudgetsByUserId(@PathVariable Long id) {
        // Fetch budgets filtered by user_id
        List<Budget> budgets = budgetRepository.findByUserId(id);

        // Convert the list of Budget entities to BudgetDTOs
        List<BudgetDTO> budgetDTOs = budgets.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());

        // Return the filtered DTOs
        return ResponseEntity.ok(budgetDTOs);
    }

    /**
     * Mark an expense against a budget
     */
    @PostMapping("/mark/{id}")
    public ResponseEntity<?> markBudget(@PathVariable Long id, @RequestParam BigDecimal amount, @RequestParam String note) {
        try {
            Optional<Budget> optionalBudget = budgetRepository.findById(id);
            if (optionalBudget.isPresent()) {
                Budget budget = optionalBudget.get();

                // Update spentOver in the budget
                BigDecimal updatedSpentOver = budget.getSpentOver().add(amount);
                budget.setSpentOver(updatedSpentOver);
                budgetRepository.save(budget);

                // Add the expense to the expense table
                Expense expense = new Expense();
                expense.setUser(budget.getUser());
                expense.setCategory(budget.getCategory());
                expense.setAmount(amount);
                expense.setNote(note);
                expense.setDate(LocalDate.now());
                expenseRepository.save(expense);

                return ResponseEntity.ok("Expense marked successfully.");
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    /**
     * Get budgets where spending exceeds 80% of the limit
     */
    @GetMapping("/over-80-percent/{userId}")
    public ResponseEntity<List<BudgetDTO>> getBudgetsOver80PercentByUserId(@PathVariable Long userId) {
        // Fetch budgets filtered by user_id and spent > 80%
        List<Budget> budgets = budgetRepository.findBudgetsWhereSpentOver80PercentByUserId(userId);

        // Convert the list of Budget entities to BudgetDTOs
        List<BudgetDTO> budgetDTOs = budgets.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());

        // Return the filtered DTOs
        return ResponseEntity.ok(budgetDTOs);
    }

    /**
     * Helper method to convert Budget entity to BudgetDTO
     */
    private BudgetDTO convertToDTO(Budget budget) {
        BudgetDTO dto = new BudgetDTO();
        dto.setBudgetId(budget.getId());
        dto.setCategory(budget.getCategory());
        dto.setLimitAmount(budget.getLimitAmount());
        dto.setSpentOver(budget.getSpentOver());
        dto.setStartDate(budget.getStartDate());
        dto.setEndDate(budget.getEndDate());
        return dto;
    }
}