package com.vtcorp.store.dtos;

import com.fasterxml.jackson.annotation.JsonFormat;
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

    @JsonFormat(pattern = "dd-MM-yyyy HH:mm:ss", timezone = "Asia/Ho_Chi_Minh")
    private Date date;
    private Status status;
}
