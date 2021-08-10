import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdminChatPageRoutingModule } from './admin-chat-routing.module';

import { AdminChatPage } from './admin-chat.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdminChatPageRoutingModule
  ],
  declarations: [AdminChatPage]
})
export class AdminChatPageModule {}
