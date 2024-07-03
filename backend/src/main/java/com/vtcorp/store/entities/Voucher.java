package com.vtcorp.store.entities;

import com.fasterxml.jackson.annotation.JsonFormat;
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
@Table(name = "voucher")
public class Voucher {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @JsonView(Views.Order.class)
    private long voucherId;

    @JsonView(Views.Order.class)
    private String title;
    private Integer limit;
    private Integer appliedCount;
    private String type;

    @JsonView(Views.Order.class)
    private String description;
    private Double discountPercentage;
    private Double maxDiscountAmount;
    private Double discountAmount;
    private Double minOrderAmount;
    private Double shipDiscountAmount;
    @JsonFormat(pattern = "dd-MM-yyyy", timezone = "Asia/Ho_Chi_Minh")
    private Date startDate;
    private Date endDate;
    private boolean active;

    @OneToMany(mappedBy = "voucher", cascade = CascadeType.ALL)
    private List<Order> orders;

    @ManyToMany(mappedBy = "vouchers")
    private List<User> users;

}
