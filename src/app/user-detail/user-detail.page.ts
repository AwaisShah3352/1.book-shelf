import {Component, OnInit} from '@angular/core';
import * as firebase from 'firebase';
import {AlertController, LoadingController, NavController} from '@ionic/angular';
import {UtilsService} from '../services/utils.service';

@Component({
    selector: 'app-user-detail',
    templateUrl: './user-detail.page.html',
    styleUrls: ['./user-detail.page.scss'],
})
export class UserDetailPage implements OnInit {

    user: any;
    loading: any;
    show = false;
    phone: any;
    phoneUpdated = false;

    constructor(private loadingCtrl: LoadingController,
                private navCtrl: NavController,
                private utils: UtilsService,
                private alertCtrl: AlertController) {
        this.user = JSON.parse(localStorage.getItem('detailUser'));
    }

    ngOnInit() {
    }

    async getName() {
        const [alert] = await Promise.all([this.alertCtrl.create({
            cssClass: 'primary',
            header: 'Change full name!',
            inputs: [
                {
                    name: `name`,
                    type: 'text',
                    value: this.user.fullName ? this.user.fullName : '',
                    placeholder: 'Enter full name...'
                },
            ],
            buttons: [
                {
                    text: 'Cancel',
                    role: 'cancel',
                    cssClass: 'secondary',
                    handler: () => {
                        console.log('Confirm Cancel');
                    }
                }, {
                    text: 'Ok',
                    handler: (alertData) => {
                        this.user.fullName = alertData.name;
                    }
                }
            ]
        })]);
        await alert.present();
    }

    async getPhone() {
        const [alert] = await Promise.all([this.alertCtrl.create({
            cssClass: 'my-custom-class',
            header: 'Change phone number!',
            inputs: [
                {
                    name: `phone`,
                    type: 'number',
                    value: this.user.phone ? this.user.phone : '',
                    placeholder: ' Enter Phone number...'
                },
            ],
            buttons: [
                {
                    text: 'Cancel',
                    role: 'cancel',
                    cssClass: 'secondary',
                    handler: () => {
                        console.log('Confirm Cancel');
                    }
                }, {
                    text: 'Ok',
                    handler: (alertData) => {
                        if (this.user.phone !== this.phone) {
                            this.user.phone = alertData.phone;
                            this.phoneUpdated = true;
                        }
                    }
                }
            ]
        })]);
        await alert.present();
    }

    async updateUser() {
        this.loading = await this.loadingCtrl.create({
            message: 'please wait...'
        });
        this.loading.present();
        firebase.database().ref(`users/${this.user.uid}`).set(this.user)
            .then(res => {
                console.log(res);
                this.loading.dismiss();
                this.utils.presentToast('User have been updated successfully...');
                this.navCtrl.back();
            })
            .catch(err => {
                console.log(err);
                this.loading.dismiss();
            });
    }

    async getUsername() {
        const [alert] = await Promise.all([this.alertCtrl.create({
            cssClass: 'my-custom-class',
            header: 'Change username!',
            inputs: [
                {
                    name: `username`,
                    type: 'text',
                    value: this.user.username ? this.user.username : '',
                    placeholder: 'Enter username...'
                },
            ],
            buttons: [
                {
                    text: 'Cancel',
                    role: 'cancel',
                    cssClass: 'secondary',
                    handler: () => {
                        console.log('Confirm Cancel');
                    }
                }, {
                    text: 'Ok',
                    handler: (alertData) => {
                        this.user.username = alertData.username;
                    }
                }
            ]
        })]);
        await alert.present();
    }

    async getPassword() {
        const [alert] = await Promise.all([this.alertCtrl.create({
            cssClass: 'my-custom-class',
            header: 'Change Password!',
            inputs: [
                {
                    name: `password`,
                    type: 'text',
                    value: this.user.password ? this.user.password : '',
                    placeholder: 'Enter Password...'
                },
            ],
            buttons: [
                {
                    text: 'Cancel',
                    role: 'cancel',
                    cssClass: 'secondary',
                    handler: () => {
                        console.log('Confirm Cancel');
                    }
                }, {
                    text: 'Ok',
                    handler: (alertData) => {
                        this.user.password = alertData.password;
                    }
                }
            ]
        })]);
        await alert.present();
    }

    changeValue() {
        this.user.isActive = !this.user.isActive;
    }

  getEmail() {
    this.utils.presentToast('User authentication based on email, That\'s why You can\'t change email' +
        ' directly. Please, Delete this user first and then create new user with new email.');
  }
}
