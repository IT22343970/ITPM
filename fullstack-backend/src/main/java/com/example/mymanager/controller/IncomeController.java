package com.example.mymanager.controller;

import com.example.mymanager.model.Income;
import com.example.mymanager.service.IncomeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/income")
public class IncomeController {

    @Autowired
    private IncomeService incomeService;
//get endpoint to retrieve all income records
    @GetMapping
    public List<Income> getAllIncome() {
        return incomeService.getAllIncome(); //calling the service method to fetch all records
    }

    @GetMapping("/{id}")
    public Optional<Income> getIncomeById(@PathVariable Long id) {
        return incomeService.getIncomeById(id);
    }

    @GetMapping("/user/{userId}")
    public List<Income> getIncomeByUserId(@PathVariable Long userId) {
        return incomeService.getIncomeByUserId(userId);
    }
// post endpoint to add a new income record
    @PostMapping
    public Income addIncome(@RequestBody Income income) {
        return incomeService.addIncome(income);
    }

    @DeleteMapping("/{id}")
    public void deleteIncome(@PathVariable Long id) {
        incomeService.deleteIncome(id);
    }
//put endpoint to edit an existing income record by its ids
    @PutMapping("/{id}")
    public Income editIncome(@PathVariable Long id, @RequestBody Income income) {
        Optional<Income> existingIncome = incomeService.getIncomeById(id);

        if (existingIncome.isPresent()) {
            Income updatedIncome = existingIncome.get();
            // Update the existing income details with new data
            updatedIncome.setSource(income.getSource());
            updatedIncome.setCategory(income.getCategory());
            updatedIncome.setAmount(income.getAmount());
            updatedIncome.setNote(income.getNote());
            updatedIncome.setDate(income.getDate());

            // Save the updated income
            return incomeService.addIncome(updatedIncome); // You can reuse the addIncome method for saving the updated income
        } else {
            throw new RuntimeException("Income with ID " + id + " not found.");
        }
    }
}
