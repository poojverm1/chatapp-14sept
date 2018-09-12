import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

//routing 
import { RouterModule, Routes } from '@angular/router';
import { UserModule } from './user/user.module';
import { ChatModule } from './chat/chat.module';
import { LoginComponent } from './user/login/login.component';

import { HttpClientModule } from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { ChatService } from './chat.service';
import { ToastrModule } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ChatModule,
    UserModule,
    FormsModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    RouterModule.forRoot([
      { path: 'login', component: LoginComponent, pathMatch: 'full' },
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      { path: '*', component: LoginComponent },
      { path: '**', component: LoginComponent }
    ])
  ],
  providers: [ChatService],
  bootstrap: [AppComponent]
})
export class AppModule { }
