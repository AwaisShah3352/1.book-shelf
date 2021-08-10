import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import {UserService} from '../../services/user.service';
import {NavController} from '@ionic/angular';

@Component({
  selector: 'app-channels',
  templateUrl: './channels.page.html',
  styleUrls: ['./channels.page.scss'],
})
export class ChannelsPage implements OnInit {

  channels = [];
  constructor(private navCtrl: NavController) { }

  ngOnInit() {
    this.loadChannels();
  }
  loadChannels() {
    firebase.database().ref(`chat`).on('value', snapshot => {
      this.channels = [];
      // tslint:disable-next-line:no-
      ;
      snapshot.forEach((node) => {
        this.channels.push(node.val());
        console.log(this.channels);
      });
    }, err => {
      alert(err);
    });
  }

  openChat(email) {
    localStorage.setItem('selectedEmail', email);
    this.navCtrl.navigateForward(['/admin-chat']);
  }
}
