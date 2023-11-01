import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SocketService {
  constructor(private socket: Socket) {}

  connectToServer() {
    this.socket.on('connect', () => {
      console.log('Connected to socket server');
    });
  }

  sendMessage(message: string) {
    this.socket.emit('data', message);
  }
  getMessage() {
    let payload: string = '';
    this.socket.on('data', (message: string) => {
      payload = message;
      console.log('🚀 ~ payload:', payload);
    });
    return payload;
  }
}
