import { Component, OnInit} from '@angular/core';
import { ChatService } from './../../chat.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  public firstName: any;
  public lastName: any;
  public mobile: any;
  public email: any;
  public password: any;
  public apiKey: any ="ZmNjZDU2ZGY1YWM0MGM5NzU5ZWM3ZThkNTU4OWExYWQ4OTk0YmNmNGQxZTI2ODhmM2UxYTA0ZmI2MmQ5ZGE3MzM3NjhhNzY2MjAzNzE3MjkzNjJmMmQ4NzY4ZTVkOWY0MTNmNTUzNmFiOTViNzg4NGRlNjE1NzM2ZjZhMmM0ZTZjMQ==";

  constructor(  
    public chatService: ChatService,
    public router: Router,
    private toastr:ToastrService
   ) {
      
     }

  ngOnInit() {
  }

  public goToSignIn: any = () => {

    this.router.navigate(['/']);

  } // end goToSignIn

  public signupFunction: any = () => {

    if (!this.firstName) {
      this.toastr.warning('enter first name')
     

    } else if (!this.lastName) {
      this.toastr.warning('enter last name')

    } else if (!this.mobile) {
      this.toastr.warning('enter mobile')

    } else if (!this.email) {
      this.toastr.warning('enter email')

    } else if (!this.password) {
      this.toastr.warning('enter password')
     

    } else if (!this.apiKey) {
      this.toastr.warning('Enter your API key')

    } else {

      let data = {
        firstName: this.firstName,
        lastName: this.lastName,
        mobile: this.mobile,
        email: this.email,
        password: this.password,
        apiKey: this.apiKey
      }

      console.log(data);

      this.chatService.signupFunction(data)
        .subscribe((apiResponse) => {

          console.log(apiResponse);

          if (apiResponse.status === 200) {

            this.toastr.success('Signup successful');

            setTimeout(() => {

              this.goToSignIn();

            }, 2000);

          } else {

            this.toastr.error(apiResponse.message);

          }

        }, (err) => {

          this.toastr.error('some error occured');

        });

    } // end condition

  } // end signupFunction

}
