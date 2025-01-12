import { CommonModule} from '@angular/common';
import { format } from 'date-fns';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NavComponent } from '../nav/nav.component';
import { ActivatedRoute } from '@angular/router';
import { ChatService } from '../../Services/chat/chat.service';
import { MessagesService } from '../../Services/Messages/messages.service';


interface Message {
  content: string;
  time: Date;
  sender: string;
}

@Component({
  selector: 'app-chats',
  standalone: true,
  imports: [CommonModule,FormsModule,NavComponent],
  templateUrl: './chats.component.html',
  styleUrl: './chats.component.css'
})
export class ChatsComponent implements OnInit,OnDestroy {
  constructor(private _route: ActivatedRoute,
              private _chat: ChatService,
              private _message: MessagesService) { }
  
  roomId:any
  username = JSON.parse(window.localStorage.getItem('joinRoom') || '{}');
  newMessage: string = '';
  messages: Message[] = [];
  isUser?= false;


  ngOnInit(): void {
    this.roomId = this._route.snapshot.params['roomId'];
    this._chat.connect(this.roomId,(message)=>{
      this.messages = [...this.messages, message];
    })

    this.fetchMessages();
  }


  fetchMessages() {
    this._message.getMessages(this.roomId).subscribe((data: any) => {
      this.messages = data;
    });
  }

  sendMessage(): void {
    if (!this.newMessage.trim()) return;
    else{
      this.isUser = true;
      this._chat.sendMessage(this.roomId, {
        roomId: this.roomId,
        content: this.newMessage,
        sender: this.username.userName,
      });
      ;
    }
    this.isUser = false;
    this.newMessage = '';

  }

  formatTimestamp(timestamp: any): string {
    if (!timestamp) return "Invalid time";
    return format(new Date(timestamp), "HH:mm:ss"); 
}


  ngOnDestroy(): void {
    this._chat.disconnect();
  }
}
