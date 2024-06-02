package com.vtcorp.store.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.util.Date;
import java.util.List;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "voucher")
public class Voucher {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long voucherId;
    private String title;
    private Integer limit;
    private Integer appliedCount;
    private Integer type;
    private String description;
    private Double discountRate;
    private Double validMaxDiscount;
    private Double discountPrice;
    private Double validMinPrice;
    private Date expiryDate;
    private boolean active;

    @JsonIgnore
    @OneToMany(mappedBy = "voucher", cascade = CascadeType.ALL)
    private List<Order> orders;

    @JsonIgnore
    @ManyToMany(mappedBy = "vouchers")
    private List<User> users;

}
