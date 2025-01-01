package com.finance.personal.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.finance.personal.entity.PersonalFinance;
import com.finance.personal.entity.PersonalFinancePK;
import com.finance.personal.model.PersonalFinanceRequestModel;
import com.finance.personal.model.PersonalFinanceResultModel;
import com.finance.personal.service.PersonalFinanceService;

@RestController
@RequestMapping("/api/finance")
@CrossOrigin(origins = "http://localhost:4200")
public class PersonalFinanceController {

    @Autowired
    private PersonalFinanceService personalFinanceService;

 // Get all finances by user ID (using @RequestBody to receive data)
    @PostMapping("/by-user")
    public ResponseEntity<List<PersonalFinanceResultModel>> getFinancesByUser(@RequestBody PersonalFinanceRequestModel financeRequest) {
        return ResponseEntity.ok(personalFinanceService.getAllFinancesByUserId(financeRequest.getId()));
    }

    // Get finances by user ID and type (using @RequestBody to receive data)
    @PostMapping("/by-type")
    public ResponseEntity<List<PersonalFinanceResultModel>> getFinancesByType(@RequestBody PersonalFinanceRequestModel financeRequest) {
        return ResponseEntity.ok(personalFinanceService.getFinancesByUserIdAndType(financeRequest.getId(),financeRequest.getType()));
    }

    // Add a new finance entry
    @PostMapping("/add")
    public ResponseEntity<Void> addFinance(@RequestBody PersonalFinanceRequestModel financeRequest) {
        personalFinanceService.saveFinance(financeRequest);
        return ResponseEntity.noContent().build();
    }

    // Delete a finance entry by ID (using @RequestBody for delete)
    @PostMapping("/delete")
    public ResponseEntity<Void> deleteFinance(@RequestBody PersonalFinanceRequestModel financeRequest) {    	
        personalFinanceService.deleteFinanceById(new PersonalFinancePK(financeRequest.getId(),financeRequest.getType(),financeRequest.getName()));
        return ResponseEntity.noContent().build();
    }
}
