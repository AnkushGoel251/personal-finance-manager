package com.finance.personal.service;

import com.finance.personal.entity.PersonalFinance;
import com.finance.personal.entity.PersonalFinancePK;
import com.finance.personal.model.PersonalFinanceRequestModel;
import com.finance.personal.model.PersonalFinanceResultModel;
import com.finance.personal.repository.PersonalFinanceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class PersonalFinanceService {

    @Autowired
    private PersonalFinanceRepository personalFinanceRepository;

    public List<PersonalFinanceResultModel> getAllFinancesByUserId(String userId) {
        List<PersonalFinance> resultList = personalFinanceRepository.findById(userId);
    	List<PersonalFinanceResultModel> resultModel = new ArrayList<>();
    	for(PersonalFinance result: resultList) {
    		PersonalFinanceResultModel res = new PersonalFinanceResultModel();
    		res.setId(result.getComp_id().getId());
    		res.setName(result.getComp_id().getName());
    		res.setType(result.getComp_id().getType());
    		res.setAmount(result.getAmount());
    		res.setGrowth(result.getGrowth());
    		resultModel.add(res);
    	}
        return resultModel;
    }
    
    public void createDefaultExpenses(String userEmail) {
    	 // Define expense categories
        String[] expenseCategories = {"Food", "Travel", "Entertainment", "Shopping", "Miscellaneous"};
        // Define savings categories
        String[] savingsCategories = {"Retirement Savings", "Emergency Fund"};
        // Define investments categories
        String[] investmentCategories = {"Stock Investments", "Real Estate Investments"};
        
        // Create expense records
        for (String category : expenseCategories) {
        	PersonalFinance personalFinance = new PersonalFinance(new PersonalFinancePK(userEmail,"1", category),0.0,0.0);

            // Save the investment record in the database
            personalFinanceRepository.save(personalFinance);
        }

        // Create savings records
        for (String category : savingsCategories) {
        	PersonalFinance personalFinance = new PersonalFinance(new PersonalFinancePK(userEmail,"0", category),0.0,0.0);

            // Save the investment record in the database
            personalFinanceRepository.save(personalFinance);
        }

        // Create investments records
        for (String category : investmentCategories) {
            PersonalFinance personalFinance = new PersonalFinance(new PersonalFinancePK(userEmail,"2", category),0.0,0.0);

            // Save the investment record in the database
            personalFinanceRepository.save(personalFinance);
        }
    }

    public List<PersonalFinanceResultModel> getFinancesByUserIdAndType(String userId, String type) {
    	List<PersonalFinance> resultList = personalFinanceRepository.findByIdAndType(userId, type);
    	List<PersonalFinanceResultModel> resultModel = new ArrayList<>();
    	for(PersonalFinance result: resultList) {
    		PersonalFinanceResultModel res = new PersonalFinanceResultModel();
    		res.setId(result.getComp_id().getId());
    		res.setName(result.getComp_id().getName());
    		res.setType(result.getComp_id().getType());
    		res.setAmount(result.getAmount());
    		res.setGrowth(result.getGrowth());
    		resultModel.add(res);
    	}
        return resultModel;
    }

    public PersonalFinance saveFinance(PersonalFinanceRequestModel financeRequest) {
    	PersonalFinance personalFinance = 
    			new PersonalFinance(new PersonalFinancePK(financeRequest.getId(),financeRequest.getType(),financeRequest.getName()), 
    					financeRequest.getAmount(), financeRequest.getGrowth());
        return personalFinanceRepository.save(personalFinance);
    }

    public void deleteFinanceById(PersonalFinancePK personalFinancePK) {
        personalFinanceRepository.deleteById(personalFinancePK);;
    }
}