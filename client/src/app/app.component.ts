import { Component } from '@angular/core';
import { Socket } from 'ngx-socket-io';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent
{
    public users: Array<string> = [];
    public messages: Array<any> = [];
    public user: any = {
        username: '',
        mail: '',
        avatar: ''
    };
    public logged: boolean = false;
    public currentMessage: string = '';

    constructor(private socket: Socket)
    {
        this.socket.on('newLogin', user => {this.user = user; this.logged = true})
        this.socket.on('users', users => this.users = users)
        this.socket.on('message', message => this.messages.push(message))
    }

    login()
    {
        if (this.user.username.length < 3) {
            return;
        }

        this.socket.emit('login', this.user);
    }

    sendMessage()
    {
        if (!this.currentMessage.length) {
            return;
        }

        this.socket.emit('message', this.currentMessage);
        this.currentMessage = '';
    }
}
