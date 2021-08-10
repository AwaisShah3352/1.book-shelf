import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import * as firebase from 'firebase';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  pageStateNew = true;
  constructor(private navCtrl: NavController) {
  }

  ngOnInit() {
  }

  ionViewWillEnter() {
  }
  editProfile() {
    this.pageStateNew = false;
    this.navCtrl.navigateForward(['/edit-profile']);
  }

  logOut() {
  }
}
