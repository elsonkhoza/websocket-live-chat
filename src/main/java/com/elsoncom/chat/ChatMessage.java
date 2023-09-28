package com.elsoncom.chat;


import lombok.*;

// These are lombok annotations
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ChatMessage {

    private String message;
    private String sender;
    private MessageType type; // JOIN, CHAT, DISCONNECT
}
