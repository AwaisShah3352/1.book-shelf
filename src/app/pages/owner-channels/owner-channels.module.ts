import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OwnerChannelsPageRoutingModule } from './owner-channels-routing.module';

import { OwnerChannelsPage } from './owner-channels.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OwnerChannelsPageRoutingModule
  ],
  declarations: [OwnerChannelsPage]
})
export class OwnerChannelsPageModule {}
