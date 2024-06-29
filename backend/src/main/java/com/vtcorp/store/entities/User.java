package com.vtcorp.store.entities;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonView;
import com.vtcorp.store.jsonview.Views;
import jakarta.persistence.*;
import lombok.*;

import java.util.Date;
import java.util.List;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "user")
@JsonIgnoreProperties("password")
public class User {

    @Id
    @JsonView(Views.Order.class)
    private String username;
    private String password;
    private String name;
    private String mail;
    private String phone;
    private Long cityCode;
    private Long districtId;
    private Long wardCode;
    private String street;
    private Integer point;
    private String role;
    @JsonFormat(pattern = "dd-MM-yyyy")
    private Date registeredDate;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Order> orders;

    @ManyToMany
    @JoinTable(name = "voucher_availability",
            joinColumns = @JoinColumn(name = "fk_username"),
            inverseJoinColumns = @JoinColumn(name = "fk_voucher_id"))
    private List<Voucher> vouchers;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ProductReview> productReviews;

    @OneToMany(mappedBy = "customer", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Conversation> conversationsAsCustomer;

    @OneToMany(mappedBy = "staff", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Conversation> conversationsAsStaff;

}
