import { Component, OnInit } from '@angular/core';
import { SocketService } from './../../socket.service';
import { ChatService } from './../../chat.service';

import { Router } from '@angular/router';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-chatbox',
  templateUrl: './chatbox.component.html',
  styleUrls: ['./chatbox.component.css']
})
export class ChatboxComponent implements OnInit {

  public receiverId: any;
  public receiverName: any;

  public authToken: any;
  public userInfo: any;
  public userList: any = [];
  public disconnectedSocket: boolean; 

  constructor(
 public chatService: ChatService,
    public SocketService: SocketService,
    public router: Router,
    private toastr: ToastrService,
  ) { }



  ngOnInit() {

    this.authToken = Cookie.get('authtoken');

    this.userInfo = this.chatService.getUserInfoFromLocalstorage();

    this.receiverId = Cookie.get("receiverId");

    this.receiverName =  Cookie.get('receiverName');

    console.log(this.receiverId,this.receiverName)
   

    this.checkStatus();

    this.verifyUserConfirmation();
    this.getOnlineUserList()

  }

  public checkStatus: any = () => {

    if (Cookie.get('authtoken') === undefined || Cookie.get('authtoken') === '' || Cookie.get('authtoken') === null) {

      this.router.navigate(['/']);

      return false;

    } else {

      return true;

    }

  } // end checkStatus



  public verifyUserConfirmation: any = () => {

    this.SocketService.verifyUser()
      .subscribe((data) => {

        this.disconnectedSocket = false;

        this.SocketService.setUser(this.authToken);

      });
    }
  
  public getOnlineUserList :any =()=>{

    this.SocketService.onlineUserList()
      .subscribe((userList) => {

        this.userList = [];

        for (let x in userList) {

          let temp = { 'userId': x, 'name': userList[x], 'unread': 0, 'chatting': false };

          this.userList.push(temp);          

        }
        
        console.log(this.userList);

      }); // end online-user-list
  }

  }

}
