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
                        this.service.logOutFromFirebase();
                    }
                }
            ]
        });
        await alert.present();
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
