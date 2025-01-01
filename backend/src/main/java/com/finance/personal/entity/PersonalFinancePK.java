package com.finance.personal.entity;

import java.io.Serializable;
import java.util.Objects;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;

@Embeddable
public class PersonalFinancePK implements Serializable {
	
	@Column(name = "id")
    private String id;

    @Column(name = "type")
    private String type;

    @Column(name = "name")
    private String name;

	public String getId() {
		return id;
	}
	
	public PersonalFinancePK() {}

	public PersonalFinancePK(String id, String type, String name) {
		super();
		this.id = id;
		this.type = type;
		this.name = name;
	}

	@Override
	public int hashCode() {
		return Objects.hash(id, name, type);
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		PersonalFinancePK other = (PersonalFinancePK) obj;
		return Objects.equals(id, other.id) && Objects.equals(name, other.name) && Objects.equals(type, other.type);
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

    
}