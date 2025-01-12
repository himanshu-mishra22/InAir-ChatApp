import { Injectable } from '@angular/core';
import apiRooms from '../api';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Message {
  content: string;
  sender: string;
  time: string;
}

@Injectable({
  providedIn: 'root'
})
export class MessagesService {

  constructor(private http: HttpClient) { }

  /**
   * Fetch all messages for a specific room.
   * @param roomId The ID of the room.
   * @returns Observable of the full message list.
   */
  getMessages(roomid:any):Observable<any>{
    return this.http.get(`${apiRooms}/${roomid}/messages`);
  }

  /**
   * Fetch paginated messages for a specific room.
   * @param roomId The ID of the room.
   * @param page The page number (default is 0).
   * @param size The size of each page (default is 20).
   * @returns Observable of the paginated message list.
   */
  getPaginatedMessages(roomId: string, page: number = 0, size: number = 20): Observable<Message[]> {
    const url = `${apiRooms}/${roomId}/messages`;

    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());

    return this.http.get<Message[]>(url, { params });
  }
}

