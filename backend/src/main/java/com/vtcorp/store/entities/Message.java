package com.vtcorp.store.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "message")
public class Message {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long messageId;

    private String message;
    private Date date;
    private boolean isCustomer;

    @ManyToOne
    @JoinColumn(name = "fk_customer_id", nullable = false)
    private User belongTo;

}
