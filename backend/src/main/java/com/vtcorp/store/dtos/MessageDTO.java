package com.vtcorp.store.dtos;

import com.vtcorp.store.constants.Status;
import lombok.*;

import java.util.Date;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
public class MessageDTO {
    private String senderName;
    private String receiverName;
    private String message;
    private Date date;
    private Status status;
}
