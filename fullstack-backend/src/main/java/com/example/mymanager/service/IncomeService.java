package com.example.mymanager.service;

import com.example.mymanager.model.Income;
import com.example.mymanager.repository.IncomeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class IncomeService {

    @Autowired
    private IncomeRepository incomeRepository;

    public List<Income> getAllIncome() {
        return incomeRepository.findAll();
    }

    public Optional<Income> getIncomeById(Long id) {
        return incomeRepository.findById(id);
    }

    public List<Income> getIncomeByUserId(Long userId) {
        return incomeRepository.findByUserId(userId);
    }

    public Income addIncome(Income income) {
        return incomeRepository.save(income);
    }

    public void deleteIncome(Long id) {
        incomeRepository.deleteById(id);
    }
    // Add the updateIncome method (optional, if you want a separate method for update)
    public Income updateIncome(Long id, Income income) {
        Optional<Income> existingIncome = incomeRepository.findById(id);

        if (existingIncome.isPresent()) {
            Income updatedIncome = existingIncome.get();
            updatedIncome.setSource(income.getSource());
            updatedIncome.setCategory(income.getCategory());
            updatedIncome.setAmount(income.getAmount());
            updatedIncome.setNote(income.getNote());
            updatedIncome.setDate(income.getDate());
            return incomeRepository.save(updatedIncome);
        } else {
            throw new RuntimeException("Income with ID " + id + " not found.");
        }
    }
}
