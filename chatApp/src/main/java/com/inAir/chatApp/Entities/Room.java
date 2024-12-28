package com.inAir.chatApp.Entities;


import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;
import java.util.List;

@Document(collection = "rooms")
@NoArgsConstructor
@AllArgsConstructor
public class Room {
    @Id
    private String id; //Mongo db: unique identifier
    private String roomId;

    private List<Message> messages = new ArrayList<>();

    public void setId(String id) {
        this.id = id;
    }

    public void setRoomId(String roomId) {
        this.roomId = roomId;
    }

    public void setMessages(List<Message> messages) {
        this.messages = messages;
    }

    public String getId() {
        return id;
    }

    public String getRoomId() {
        return roomId;
    }

    public List<Message> getMessages() {
        return messages;
    }
}
