import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IonicModule } from '@ionic/angular';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { SignupPageRoutingModule } from './signup-routing.module';
import { SignupPage } from './signup.page';
import {HttpClientModule} from '@angular/common/http';
import {AndroidPermissions} from '@ionic-native/android-permissions/ngx';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    HttpClientModule,
    SignupPageRoutingModule
  ],
  declarations: [SignupPage]
})
export class SignupPageModule {}
