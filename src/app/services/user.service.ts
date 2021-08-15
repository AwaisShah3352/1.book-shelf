import {Injectable} from '@angular/core';
import {User} from '../models/user';
import * as firebase from 'firebase';
import {NavController} from '@ionic/angular';
import {UtilsService} from './utils.service';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    constructor(private utils: UtilsService,
                private navCtrl: NavController) {
        this.user = new User();
        this.loadAllUser();
    }

    selectedEmail: any;
    user: User;
    allUsers: any = [];

    setUser(user: any) {
        this.user = user;
        localStorage.setItem('user', JSON.stringify(this.user));
    }

    getUser() {
        this.user = JSON.parse(localStorage.getItem('user'));
        return this.user;
    }

    loadAllUser() {
        this.allUsers = [];
        firebase.database().ref('users').once('value', snapshot => {
            const data = snapshot.val();
            snapshot.forEach(node => {
                this.allUsers.push(node.val());
            });
        });
    }

    async logOutFromFirebase() {
        this.utils.presentLoading('Loading...')
        firebase.auth().signOut().then((res) => {
            localStorage.clear();
            console.log(localStorage);
            this.utils.stopLoading();
            this.navCtrl.navigateRoot(['']);
        }).catch((error) => {
            alert(error);
            this.utils.stopLoading();
        });
    }
}
