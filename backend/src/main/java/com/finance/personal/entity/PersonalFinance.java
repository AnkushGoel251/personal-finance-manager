package com.finance.personal.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "personal_finance")
public class PersonalFinance {

    @EmbeddedId
    private PersonalFinancePK comp_id;  // Composite Primary Key

    @Column(name = "amount")
    private Double amount;

    @Column(name = "growth")
    private Double growth;
    
    public PersonalFinance() {}

	public PersonalFinance(PersonalFinancePK comp_id, Double amount, Double growth) {
		super();
		this.comp_id = comp_id;
		this.amount = amount;
		this.growth = growth;
	}

	public PersonalFinancePK getComp_id() {
		return comp_id;
	}

	public void setComp_id(PersonalFinancePK comp_id) {
		this.comp_id = comp_id;
	}

	public Double getAmount() {
		return amount;
	}

	public void setAmount(Double amount) {
		this.amount = amount;
	}

	public Double getGrowth() {
		return growth;
	}

	public void setGrowth(Double growth) {
		this.growth = growth;
	}

  
}

