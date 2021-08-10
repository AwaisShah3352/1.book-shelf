import {Component, OnInit, ViewChild} from '@angular/core';
import {IonContent} from "@ionic/angular";
import * as firebase from 'firebase';
import {UtilsService} from "../../services/utils.service";
import {ChatService} from "../../services/chat.service";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {

  // key: string;
  messages = [];
  // recivedData = [];
  uid;
  user;
  channelName;
  // username;
  newMsg: '';
  @ViewChild(IonContent) content: IonContent;
  constructor(private utils: UtilsService,
              private chatService: ChatService) {
    this.user = JSON.parse(localStorage.getItem('user'));
    console.log('user in chat page', this.user);
    this.loadMessages();

  }

  async loadMessages(){
    this.utils.presentLoading('Loading...');
    const book = localStorage.getItem('bookName');
    const bookuserId = localStorage.getItem('bookUserId');
    let bookName = book.split(' ').join('_');
    this.uid = this.user.uid;
    this.channelName = `${bookuserId}_${bookName}_${this.uid}`;
    if(this.chatService.isNew(`${bookName}_${this.uid}`)){
      const channels = this.chatService.channels.filter(c => c.name.includes(`${bookName}_${this.uid}`));
      if(channels.length>0) {
        const ref = channels[0].name;
        firebase.database().ref(`chat/${ref}/messages`).orderByChild('time').on('value', snapshot => {
          this.messages = [];
          snapshot.forEach((node) => {
            this.messages.push(node.val());
          });
          console.log(this.messages);
        }, err => {
        });
      }
    } else if(this.chatService.isNew(`${this.uid}_${bookName}`)){
      const channels = this.chatService.channels.filter(c => c.name.includes(`${this.uid}_${bookName}`));
      if(channels.length>0) {
        const ref = channels[0].name;
      }
    } else {
      firebase.database().ref(`channels/${this.channelName}`).set({
        name: this.channelName,
        time: Date.now(),
        creator: this.user.fullName
      }).then(res => {
      }).catch(err => {
      });
    }
  }

  ngOnInit() {
  }

  async sendMessage() {
    const key = firebase.database().ref().push().key;
    firebase.database().ref(`chat/${this.channelName}/messages`).child(key).set({
      sender: `${this.user.uid}`,
      name: this.user.fullName,
      time: Date.now(),
      message: this.newMsg
    }).then(res => {
    }).catch(err => console.log(err));
    this.newMsg = '';
    setTimeout(() => {
      this.content.scrollToBottom(10);
    });
  }

}
