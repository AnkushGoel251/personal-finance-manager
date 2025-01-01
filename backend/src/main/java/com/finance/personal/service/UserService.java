package com.finance.personal.service;

import com.finance.personal.entity.UserProfile;
import com.finance.personal.model.UserResultModel;
import com.finance.personal.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;
    
    @Autowired
	private PersonalFinanceService personalFinanceService;

    public UserResultModel findUserByIdAndPasword(String id, String email) {
    	Optional<UserProfile> resultRepo = userRepository.findByIdAndPassword(id, email); 
    	UserResultModel resultModel = new UserResultModel();
    	if(!resultRepo.isEmpty()) {
	    	resultModel.setId(resultRepo.get().getId());
	    	resultModel.setEmail(resultRepo.get().getEmail());
	    	resultModel.setName(resultRepo.get().getName());
	    	resultModel.setPhoneNo(resultRepo.get().getPhoneNo());
    	}
        return resultModel;
    }

    public UserResultModel saveUser(UserProfile user) {
    	UserProfile userProfile = userRepository.save(user);
    	personalFinanceService.createDefaultExpenses(user.getEmail());
    	UserResultModel resultModel = new UserResultModel();
    	resultModel.setId(userProfile.getId());
    	resultModel.setEmail(userProfile.getEmail());
    	resultModel.setName(userProfile.getName());
    	resultModel.setPhoneNo(userProfile.getPhoneNo());
    	resultModel.setAddress(userProfile.getAddress());
    	resultModel.setPassword(userProfile.getPassword());
        return resultModel;
    }

    public boolean existsByEmail(String email) {
        return userRepository.existsByEmail(email);
    }

	public UserResultModel findUserById(String id) {
    	Optional<UserProfile> resultRepo = userRepository.findById(id); 
    	UserResultModel resultModel = new UserResultModel();
    	if(!resultRepo.isEmpty()) {
	    	resultModel.setId(resultRepo.get().getId());
	    	resultModel.setEmail(resultRepo.get().getEmail());
	    	resultModel.setName(resultRepo.get().getName());
	    	resultModel.setPhoneNo(resultRepo.get().getPhoneNo());
	    	resultModel.setAddress(resultRepo.get().getAddress());
	    	resultModel.setPassword(resultRepo.get().getPassword());
    	}
        return resultModel;
    }
}
