package com.finance.personal.repository;

import com.finance.personal.entity.PersonalFinance;
import com.finance.personal.entity.PersonalFinancePK;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PersonalFinanceRepository extends JpaRepository<PersonalFinance, PersonalFinancePK> {
    // Find all finance records for a specific user by their ID
	@Query("SELECT pf FROM PersonalFinance pf WHERE pf.comp_id.id = :id")
	List<PersonalFinance> findById(@Param("id") String id);


    // Find all finance records by type (savings, expense, investment)
	@Query("SELECT pf FROM PersonalFinance pf WHERE pf.comp_id.type = :type")
	List<PersonalFinance> findByType(@Param("type") String type);


    // Find all finance records for a user by type
	@Query("SELECT pf FROM PersonalFinance pf WHERE pf.comp_id.id = :id AND pf.comp_id.type = :type")
	List<PersonalFinance> findByIdAndType(@Param("id") String id, @Param("type") String type);

}