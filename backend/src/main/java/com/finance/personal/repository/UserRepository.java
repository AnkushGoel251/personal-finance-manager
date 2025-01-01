package com.finance.personal.repository;

import com.finance.personal.entity.UserProfile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<UserProfile, String> {
    // Find a user by email (ID in your case)
    Optional<UserProfile> findByEmail(String email);

    // Check if a user exists by email
    boolean existsByEmail(String email);
    
    @Query("SELECT upf FROM UserProfile upf WHERE upf.id = :id AND upf.password = :password")
    Optional<UserProfile> findByIdAndPassword(@Param("id") String id, @Param("password") String password);
}
