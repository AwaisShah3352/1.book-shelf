import {Injectable} from '@angular/core';
import {User} from '../models/user';
import * as firebase from 'firebase';
import {LoadingController, NavController} from '@ionic/angular';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    constructor(private loadingCtrl: LoadingController,
                private navCtrl: NavController) {
        this.user = new User();
        this.loadAllUser();
    }

    selectedEmail: any;
    user: User;
    allUsers: any = [];

    loading: any;
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
        this.loading = await this.loadingCtrl.create({
            message: 'please wait...'
        });
        this.loading.present();
        firebase.auth().signOut().then((res) => {
            localStorage.clear();
            console.log(localStorage);
            if (this.loading) {
                this.loading.dismiss();
            }
            this.navCtrl.navigateRoot(['']);
        }).catch((error) => {
            alert(error);
            if (this.loading) {
                this.loading.dismiss();
            }
        });
    }
}
