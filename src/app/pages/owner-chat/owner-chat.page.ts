import {Component, OnInit, ViewChild} from '@angular/core';
import {IonContent} from '@ionic/angular';
import * as firebase from 'firebase';
import {UtilsService} from '../../services/utils.service';
import {ChatService} from '../../services/chat.service';

@Component({
    selector: 'app-owner-chat',
    templateUrl: './owner-chat.page.html',
    styleUrls: ['./owner-chat.page.scss'],
})
export class OwnerChatPage implements OnInit {

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
        this.uid = this.user.uid;
        console.log('user in chat page', this.user);
    }

    ngOnInit() {
        this.loadMessages();
    }

    async loadMessages() {
        this.utils.presentLoading('Loading...');
        this.channelName = localStorage.getItem('channelName');
        firebase.database().ref(`chat/${this.channelName}/messages`).orderByChild('time').on('value', snapshot => {
            this.messages = [];
            snapshot.forEach((node) => {
                this.messages.push(node.val());
            });
            console.log(this.messages);
        }, err => {
        });
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
