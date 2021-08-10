import {Component} from '@angular/core';
import {User} from '../models/user';
import {UserService} from '../services/user.service';
import {ActionSheetController, AlertController, LoadingController, NavController} from '@ionic/angular';
import {Camera, CameraOptions} from '@ionic-native/camera/ngx';
import * as firebase from 'firebase';

@Component({
    selector: 'app-tab3',
    templateUrl: 'tab3.page.html',
    styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

    user: User;
    loading: any;

    constructor(private service: UserService,
                private camera: Camera,
                private loadingCtrl: LoadingController,
                private alertCtrl: AlertController,
                private actionCtrl: ActionSheetController,
                private navCtrl: NavController) {
        this.user = new User();
        this.user = service.getUser();
    }

    img: any;

    async logOut() {
        const alert = await this.alertCtrl.create({
            cssClass: 'my-custom-class',
            message: 'Are you sure to logout?',
            buttons: [
                {
                    text: 'Cancel',
                    cssClass: 'secondary',
                    handler: () => {
                    }
                }, {
                    text: 'Ok',
                    handler: () => {
                        this.logOutFromFirebase();
                    }
                }
            ]
        });
        await alert.present();
    }

    async logOutFromFirebase() {
        this.loading = await this.loadingCtrl.create({
            message: 'please wait...'
        });
        this.loading.present();
        firebase.auth().signOut().then((res) => {
            console.log(res);
            localStorage.clear();
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

    async moreOptions() {
        const alert = await this.actionCtrl.create({
            mode: 'ios',
            cssClass: 'my-custom-class',
            buttons: [
                {
                    text: 'Log Out',
                    icon: 'log-out',
                    cssClass: 'secondary',
                    handler: () => {
                        this.logOut();
                    }
                },
                {
                    text: 'Settings',
                    icon: 'settings',
                    cssClass: 'primary',
                    handler: () => {
                        this.navCtrl.navigateRoot(['/tabs/tab1']);
                    }
                },
                {
                    text: 'Help Desk',
                    icon: 'mail',
                    cssClass: 'primary',
                    handler: () => {
                        this.navCtrl.navigateForward(['/admin-chat']);
                    }
                },
                {
                    text: 'Change Password',
                    icon: 'lock-closed',
                    cssClass: 'primary',
                    handler: () => {
                        this.navCtrl.navigateForward(['/change-password']);
                        console.log('Destructive clicked');
                    }
                },
                {
                    text: 'Cancel',
                    icon: 'backspace',
                    cssClass: 'primary',
                    role: 'cancel',
                    handler: () => {
                        console.log('Cancel clicked');
                    }
                }
            ]
        });
        await alert.present();
    }

    goToPrivacy() {
        this.navCtrl.navigateForward((['/privacy']));
    }

    goToContactUs() {
        this.navCtrl.navigateForward(['/contact-us']);
    }

    goToNotifications() {
        this.navCtrl.navigateForward(['/notifications']);
    }

    goToEditProfile() {
        this.navCtrl.navigateForward(['/edit-profile']);
    }

    goToChangePassword() {
        this.navCtrl.navigateForward(['/change-password']);
    }

    goToTerms() {
        this.navCtrl.navigateForward(['/terms']);
    }
}
