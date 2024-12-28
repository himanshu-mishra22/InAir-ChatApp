package com.inAir.chatApp.Controllers;


import com.inAir.chatApp.Entities.Message;
import com.inAir.chatApp.Entities.Room;
import com.inAir.chatApp.Payload.MessageRequest;
import com.inAir.chatApp.Repo.RoomRepo;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;

import java.time.LocalDateTime;

@Controller
@CrossOrigin("*")
public class ChatController {
    private RoomRepo roomRepo;

    public ChatController(RoomRepo roomRepo) {
        this.roomRepo = roomRepo;
    }

    //for sending and recieving messages
    @MessageMapping("/sendMessage/{roomId}")
    @SendTo("/topic/room/{roomId}")
    public Message sendMessage(
            @DestinationVariable String roomId,
            @RequestBody MessageRequest request
    ){
        Room room = roomRepo.findByRoomId(request.getRoomId());
        Message message = new Message();
        message.setContent(request.getContent());
        message.setSender(request.getSender());
        message.setTime(LocalDateTime.now());

        if(room != null){
            room.getMessages().add(message);
            roomRepo.save(room);
        }

        return message;
    }
}
