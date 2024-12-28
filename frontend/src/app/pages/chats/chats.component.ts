import { CommonModule} from '@angular/common';
import { format } from 'date-fns';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NavComponent } from '../nav/nav.component';

interface Message {
  id: number;
  content: string;
  timestamp: number;
  isUser: boolean;
  userName: string;
  avatar: string;
}

@Component({
  selector: 'app-chats',
  standalone: true,
  imports: [CommonModule,FormsModule,NavComponent],
  templateUrl: './chats.component.html',
  styleUrl: './chats.component.css'
})
export class ChatsComponent {
  messages: Message[] = [
    { id: 1, content: 'How do we handle this deployment error?', timestamp: Date.now(), isUser: true, userName: 'You', avatar: 'https://via.placeholder.com/150' },
    { id: 2, content: 'Try checking the server configurations.', timestamp: Date.now(), isUser: false, userName: 'Jane Doe', avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTF8fHVzZXIlMjBwcm9maWxlfGVufDB8fDB8fHww' },
    { id: 3, content: 'I think there might be an issue with our CDN configuration.', timestamp: Date.now(), isUser: true, userName: 'You', avatar: 'https://via.placeholder.com/150' },
    { id: 4, content: "Yes, James is right. Let's check that as well.", timestamp: Date.now(), isUser: false, userName: 'Emily White', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTh8fHVzZXIlMjBwcm9maWxlfGVufDB8fDB8fHww' },
    { id: 5, content: 'Deployment error fixed. Good job, team!', timestamp: Date.now(), isUser: false, userName: 'Michael Brown', avatar: 'https://images.unsplash.com/photo-1584999734482-0361aecad844?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NzV8fHVzZXIlMjBwcm9maWxlfGVufDB8fDB8fHww' },
  ];

  newMessage: string = '';

  sendMessage(): void {
    if (!this.newMessage.trim()) return;
    const newMsg: Message = {
      id: this.messages.length + 1,
      content: this.newMessage,
      timestamp: Date.now(),
      isUser: true,
      userName: 'You',
      avatar: 'https://via.placeholder.com/150',
    };
    this.messages = [...this.messages, newMsg];
    this.newMessage = '';
  }

  formatTimestamp(timestamp: number): string {
    return format(new Date(timestamp), 'p');
  }
}
