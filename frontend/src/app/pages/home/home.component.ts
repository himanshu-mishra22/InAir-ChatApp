import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { RoomService } from '../../Services/Room/room.service';
import { ToastrService } from 'ngx-toastr';



@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterModule,FormsModule,CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  rooms = {
    roomId: '',
    userName: ''
  }
  roomCreated = false;
constructor(private _room:RoomService,
            private toastr: ToastrService,
            private router:Router) { }
    joinRoom(roomId:any):void {
      // code to join room
      window.localStorage.setItem('joinRoom', JSON.stringify(this.rooms));
      this._room.joinRoom(this.rooms.roomId).subscribe(
        (data)=>{
          this.router.navigate(['/chat',this.rooms.roomId]);
        },
        (error)=>{
          console.log(error);
        }
      )
      }

      create() {
        // code to create room
        // window.localStorage.setItem('createRoom', JSON.stringify(this.rooms));
        const roomId = this.rooms.roomId;
        this._room.createRoom(roomId).subscribe(
          (data)=>{
            this.toastr.success(`${roomId} Created Successfully`,'',{timeOut:3000});
            this.rooms.roomId = '';
            this.roomCreated = true;
            
          },
          (error)=>{
            this.toastr.error(`${roomId} Already Taken!!`, 'Be Creative With The Names', {
              timeOut: 3000,
            });
          }
        )
      }


}
