package com.inAir.chatApp.Config;

import com.inAir.chatApp.AppConstants;
import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;

@Configuration
@EnableWebSocketMessageBroker
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {

    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
        // establishing connection through this endpoint
        registry.addEndpoint("/chat").setAllowedOrigins(AppConstants.FRONT_END_URL).withSockJS();
    }

    @Override
    public void configureMessageBroker(MessageBrokerRegistry config) {
        // /topic/messages
        config.enableSimpleBroker("/topic");

        // /app/chat
        config.setApplicationDestinationPrefixes("/app");
    }
}
