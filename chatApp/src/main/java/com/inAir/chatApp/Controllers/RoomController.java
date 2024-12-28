package com.inAir.chatApp.Controllers;

import com.inAir.chatApp.Entities.Message;
import com.inAir.chatApp.Entities.Room;
import com.inAir.chatApp.Repo.RoomRepo;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/rooms")
@CrossOrigin("*")
public class RoomController {

    private RoomRepo roomRepo;

    public RoomController(RoomRepo roomRepo) {
        this.roomRepo = roomRepo;
    }

    //create room
    @PostMapping
    public ResponseEntity<?> creteRoom(@RequestBody String roomId){

        if(roomRepo.findByRoomId(roomId)!= null){
            //already a room
            return ResponseEntity.badRequest().body("Room Already Exist");

        }
        Room room = new Room();
        room.setRoomId(roomId);
        Room savedRoom = roomRepo.save(room);
        return ResponseEntity.status(HttpStatus.CREATED).body(room);

    }

    //get room:join
    @GetMapping("/{roomId}")
    public ResponseEntity<?> joinRoom(@PathVariable String roomId){
        Room room = roomRepo.findByRoomId(roomId);
        if(room == null){
            return ResponseEntity.badRequest().body("Room not found!!");
        }
        return ResponseEntity.ok(room);
    }

    //get messages
    @GetMapping("/{roomId}/messages")
    public ResponseEntity<List<Message>> getMessages(
            @PathVariable String roomId,
            @RequestParam(value = "page", defaultValue = "0", required = false) int page,
            @RequestParam(value = "size", defaultValue = "20", required = false) int size
    ){
        Room room = roomRepo.findByRoomId(roomId);
        if(room==null){
            return ResponseEntity.badRequest().build();
        }

        //get messages
        List<Message>messages = room.getMessages();
        //pagination
        int start = Math.max(0,messages.size()-(page+1)*size);
        int end = Math.min(messages.size(),start+size);
        List<Message>pages = messages.subList(start,end);


        return ResponseEntity.ok(messages);




    }

}
