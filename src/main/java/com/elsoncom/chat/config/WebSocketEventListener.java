package com.elsoncom.chat.config;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.messaging.SessionDisconnectEvent;

@Component
@RequiredArgsConstructor
@Slf4j
public class WebSocketEventListener {

    /**
     * Handle The WebSocket Disconnect Sessions
     * Get Notified when a user leaves the chat
     */
    @EventListener
    public void handleWebSocketDisconnectListener(SessionDisconnectEvent event) {


    }
}
