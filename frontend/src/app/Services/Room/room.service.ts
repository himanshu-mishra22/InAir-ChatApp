import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import apiRooms from '../api';

@Injectable({
  providedIn: 'root'
})
export class RoomService {
  constructor(private http: HttpClient) { }

  createRoom(roomId:any) : Observable<any>{
    const header = new HttpHeaders({'Content-Type':'text/plain'});
    return this.http.post(`${apiRooms}`,roomId);
  }

  joinRoom(roomId:any) : Observable<any>{
    return this.http.get(`${apiRooms}/${roomId}`);
  }

  
}
