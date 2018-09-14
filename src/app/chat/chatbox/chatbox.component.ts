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
  public messageText: any; 
  public authToken: any;
  public userInfo: any;
  public userList: any = [];
  public disconnectedSocket: boolean; 
  public messageList: any = []; // stores the current message list display in chat box
  public pageValue: number = 0;
  public loadingPreviousChat: boolean = false;
  public scrollToChatTop:boolean;

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
 this.getMessageFromAUser();
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

  public sendMessageUsingKeypress:any=(event:any)=>{
    if(event.keyCode == 13){
      this.sendMessage();
    }

  }
  public sendMessage:any=()=>{
    if(this.messageText){
      let chatMsgObject = {
        senderName: this.userInfo.firstName + " " + this.userInfo.lastName,
        senderId: this.userInfo.userId,
        receiverName: Cookie.get('receiverName'),
        receiverId: Cookie.get('receiverId'),
        message: this.messageText,
        createdOn: new Date()
      } // end chatMsgObject
      console.log(chatMsgObject);
      this.SocketService.SendChatMessage(chatMsgObject)
      this.pushToChatWindow(chatMsgObject)
    }
  }
  public pushToChatWindow : any =(data)=>{

    this.messageText="";
    this.messageList.push(data);
    this.scrollToChatTop = false;


  }// end push to chat window

  

  public getMessageFromAUser :any =()=>{

    this.SocketService.chatByUserId(this.userInfo.userId)
    .subscribe((data)=>{
     

      (this.receiverId==data.senderId)?this.messageList.push(data):'';

      this.toastr.success(`${data.senderName} says : ${data.message}`)

      this.scrollToChatTop=false;

    });//end subscribe

}// end get message from a user 

public userSelectedToChat: any = (id, name) => {

  console.log("setting user as active") 

  // setting that user to chatting true   
  this.userList.map((user)=>{
      if(user.userId==id){
        user.chatting=true;
      }
      else{
        user.chatting = false;
      }
  })

  Cookie.set('receiverId', id);

  Cookie.set('receiverName', name);


  this.receiverName = name;

  this.receiverId = id;

  this.messageList = [];

  this.pageValue = 0;

  let chatDetails = {
    userId: this.userInfo.userId,
    senderId: id
  }


  this.SocketService.markChatAsSeen(chatDetails);



} // end userBtnClick function

  }


