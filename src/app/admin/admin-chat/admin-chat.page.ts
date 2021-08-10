import {Component, OnInit, ViewChild} from '@angular/core';
import {IonContent, LoadingController, ToastController} from '@ionic/angular';
import * as firebase from 'firebase';
import {UserService} from '../../services/user.service';

@Component({
    selector: 'app-admin-chat',
    templateUrl: './admin-chat.page.html',
    styleUrls: ['./admin-chat.page.scss'],
})
export class AdminChatPage implements OnInit {
    messages = [];
    user: any;
    uid;
    newMsg: '';
    loading: any;
    @ViewChild(IonContent) content: IonContent;

    constructor(private readonly loadingCtrl: LoadingController,
                private service: UserService,
                private readonly toastCtrl: ToastController) {
        this.user = this.service.getUser();
        this.uid = this.user.uid;
    }

    ngOnInit() {
        this.loadMessages();
    }

    loadMessages() {
        const ref = 'admin-' + this.uid;
        firebase.database().ref(`admin-chat/${ref}/messages`).orderByChild('time').on('value', snapshot => {
            this.messages = [];
            snapshot.forEach((node) => {
                this.messages.push(node.val());
            });
            console.log(this.messages);
        }, err => {
            alert(err);
        });
    }

    sendMessage() {
        const ref = 'admin-' + this.uid;
        const key = firebase.database().ref().push().key;
        if (!this.messages.length) {
            firebase.database().ref(`admin-channels/${key}`).set({
                name: ref,
                sender: this.user.fullName,
                email: this.user.email,
                image: this.user.profileImage ? this.user.profileImage : '',
                time: Date.now(),
                key: key
            }).then(res => {
            }).catch(err => console.log(err));
        } else {

        }
        firebase.database().ref(`admin-chat/${ref}/messages`).child(key).set({
            sender: 'app-user',
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
