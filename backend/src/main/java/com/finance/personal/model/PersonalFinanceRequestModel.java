package com.finance.personal.model;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public class PersonalFinanceRequestModel {

    @NotBlank
    private String id;

    @NotBlank
    private String name;

    @NotBlank
    private String type;

    @NotNull
    private Double amount;

    private Double growth; // Nullable for types like expense

    // Getters and Setters
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
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
