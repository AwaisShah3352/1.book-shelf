import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OwnerChatPageRoutingModule } from './owner-chat-routing.module';

import { OwnerChatPage } from './owner-chat.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OwnerChatPageRoutingModule
  ],
  declarations: [OwnerChatPage]
})
export class OwnerChatPageModule {}
