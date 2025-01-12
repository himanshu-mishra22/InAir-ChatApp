import { Injectable } from '@angular/core';
import { Client, Stomp } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  private stompClient: Client | null = null;
  private readonly webSocketUrl = 'http://localhost:8080/chat'; // Replace with your backend WebSocket URL
  private readonly topicUrl = '/topic/room'; // Topic to subscribe to for messages

  constructor() {
    this.initializeWebSocketClient();
  }

  // Initialize WebSocket Client
  private initializeWebSocketClient(): void {
    this.stompClient = new Client({
      webSocketFactory: () => new SockJS(this.webSocketUrl), // SockJS connection
      reconnectDelay: 5000, // Auto-reconnect after 5 seconds
      debug: (str) => console.log(str), // Debug messages
    });
  }

  // Connect to WebSocket and Subscribe to Room
  connect(roomId: string, onMessageReceived: (message: any) => void): void {
    if (this.stompClient) {
      this.stompClient.onConnect = () => {
        console.log('Connected to WebSocket');

        // Subscribe to the room topic
        this.stompClient?.subscribe(`${this.topicUrl}/${roomId}`, (message) => {
          console.log('Message received:', message.body);
          const parsedMessage = JSON.parse(message.body);
          console.log(parsedMessage);
          
          onMessageReceived(parsedMessage);
        });
      };

      this.stompClient.activate(); // Activate the WebSocket connection
    } else {
      console.error('WebSocket client is not initialized.');
    }
  }

  // Disconnect WebSocket
  disconnect(): void {
    if (this.stompClient) {
      this.stompClient.deactivate();
      console.log('Disconnected from WebSocket');
    }
  }

  // Send Message to the Server
  sendMessage(roomId: string, messageRequest: { roomId: string; content: string; sender: string }): void {
    if (this.stompClient && this.stompClient.connected) {
      this.stompClient.publish({
        destination: `/app/sendMessage/${roomId}`, // Backend MessageMapping endpoint
        body: JSON.stringify(messageRequest),
      });
    } else {
      console.error('WebSocket connection is not established.');
    }
  }
}
