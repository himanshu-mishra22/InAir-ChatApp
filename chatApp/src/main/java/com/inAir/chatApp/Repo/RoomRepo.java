package com.inAir.chatApp.Repo;


import com.inAir.chatApp.Entities.Room;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface RoomRepo extends MongoRepository<Room,String> {
    //get room using roomId
    Room findByRoomId(String roomId);


}
