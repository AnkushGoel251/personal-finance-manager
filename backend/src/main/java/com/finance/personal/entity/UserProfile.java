package com.finance.personal.entity;
import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

@Entity
@Table(name = "user_profile")
public class UserProfile {

    @Id
    @Column(name = "id")
    private String id; // This will be equal to the email column.

    @Column(name = "name")
    @Size(max = 255)
    private String name;

    @Column(name = "email")
    @NotBlank
    private String email;

    @Column(name = "password")
    @NotBlank
    private String password;

    @Column(name = "phone_no")
    private String phoneNo;
    
    @Column(name = "address")
    private String address;
    

    public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

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

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getPhoneNo() {
        return phoneNo;
    }

    public void setPhoneNo(String phoneNo) {
        this.phoneNo = phoneNo;
    }
}