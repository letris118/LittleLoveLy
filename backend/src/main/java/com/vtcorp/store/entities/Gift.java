package com.vtcorp.store.entities;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "gift")
public class Gift {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long giftId;
    private String name;
    private Integer point;
    private Integer stock;
    private String imagePath;
    private boolean active;

    @JsonIgnoreProperties("gift")
    @OneToMany(mappedBy = "gift", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<GiftIncluding> giftIncludings;

}
