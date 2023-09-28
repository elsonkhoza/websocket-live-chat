package com.elsoncom.chat.config;

import com.elsoncom.chat.ChatMessage;
import com.elsoncom.chat.MessageType;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.event.EventListener;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.messaging.SessionDisconnectEvent;

@Component
@RequiredArgsConstructor
@Slf4j
public class WebSocketEventListener {

    private final SimpMessageSendingOperations simpMessageSendingOperations;

    /**
     * Handle The WebSocket Disconnect Sessions
     * Get Notified when a user leaves the chat
     */
    @EventListener
    public void handleWebSocketDisconnectListener(SessionDisconnectEvent event) {
        StompHeaderAccessor stompHeaderAccessor
                =StompHeaderAccessor.wrap(event.getMessage());
        String username= stompHeaderAccessor
                .getSessionAttributes()
                .get("username").toString();
        if(username!=null)
        {
            log.info("{} disconnected",username);
            ChatMessage chatMessage=ChatMessage.builder()
                    .sender(username)
                    .type(MessageType.DISCONNECT)
                    .build();

            // Inform other users that someone has left the chat
            simpMessageSendingOperations.convertAndSend(chatMessage);
        }
    }
}
