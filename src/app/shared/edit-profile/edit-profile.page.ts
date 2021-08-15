import {Component, OnInit} from '@angular/core';
import {UserService} from '../../services/user.service';
import {Camera, CameraOptions} from '@ionic-native/camera/ngx';
import * as firebase from 'firebase';
import {AlertController, LoadingController, NavController} from '@ionic/angular';
import {DataCollectorService} from '../../services/data-collector.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
    selector: 'app-edit-profile',
    templateUrl: './edit-profile.page.html',
    styleUrls: ['./edit-profile.page.scss'],
})
export class EditProfilePage implements OnInit {
    user: any;
    show = false;
    base64Image: any;

    constructor(private utils: UtilsService,
                private service: UserService,
                private camera: Camera,
                private dataCollector: DataCollectorService,
                private alertCtrl: AlertController) {
        this.user = this.service.getUser();
    }

    cities = this.dataCollector.cities;

    ngOnInit() {
    }

    async getPicture() {
        const alert = await this.alertCtrl.create({
            cssClass: 'my-custom-class',
            message: 'Select Profile Picture !',
            buttons: [
                {
                    text: 'Camera',
                    cssClass: 'secondary',
                    handler: () => {
                        this.openCamera(1);
                    }
                }, {
                    text: 'Gallery',
                    handler: () => {
                        this.openCamera(2);
                    }
                }
            ]
        });
        await alert.present();
    }

    openCamera(type) {
        const options: CameraOptions = {
            quality: 40,
            sourceType: type,
            destinationType: this.camera.DestinationType.DATA_URL,
            encodingType: this.camera.EncodingType.JPEG,
            mediaType: this.camera.MediaType.PICTURE
        };
        this.camera.getPicture(options).then((imageData) => {
            this.base64Image = 'data:image/jpeg;base64,' + imageData;
            this.user.profileImage = this.base64Image;
        }, (err) => {
            alert(err);
        });
    }

    async uploadImageInFireStorage(image) {
        this.utils.presentLoading('Loading...');
        const name: string = Date.now().toString() + '.jpg';
        firebase.storage().ref(`/profileImages/${name}`)
            .putString(image, firebase.storage.StringFormat.DATA_URL).then((snapshot) => {
            firebase.storage().ref(`/profileImages/` + snapshot.metadata.name)
                .getDownloadURL().then(urL => {
                this.user.profileImage = urL;
                this.updateUserInFirebase();
                this.utils.stopLoading();
            }).catch(err => alert(err));
        }).catch(err => alert(err));
    }

    async getName() {
        const [alert] = await Promise.all([this.alertCtrl.create({
            cssClass: 'my-custom-class',
            header: 'Edit Your Name!',
            inputs: [
                {
                    name: `name`,
                    type: 'text',
                    value: this.user.fullName ? this.user.fullName : '',
                    placeholder: 'Enter full name'
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
                        this.updateUser();
                    }
                }
            ]
        })]);
        await alert.present();
    }

    async getPhone() {
        const [alert] = await Promise.all([this.alertCtrl.create({
            cssClass: 'my-custom-class',
            header: 'Edit Your Phone!',
            inputs: [
                {
                    name: `phone`,
                    type: 'text',
                    value: this.user.phone ? this.user.phone : '',
                    placeholder: 'Phone number...'
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
                        this.user.phone = alertData.phone;
                        console.log(alertData.phone);
                        this.updateUser();
                    }
                }
            ]
        })]);
        await alert.present();
    }

    updateUser() {
        if (this.base64Image) {
            this.uploadImageInFireStorage(this.base64Image);
        } else {
            this.updateUserInFirebase();
        }
    }

    async updateUserInFirebase() {
        this.utils.presentLoading('Loading...');
        firebase.database().ref(`users/${this.user.uid}`).set(this.user)
            .then(res => {
                this.utils.stopLoading();
                this.service.setUser(this.user);
            })
            .catch(err => {
                this.utils.stopLoading();
            });
    }

    async getAddress() {
        const [alert] = await Promise.all([this.alertCtrl.create({
            cssClass: 'my-custom-class',
            header: 'Edit Your Address!',
            inputs: [
                {
                    name: `address`,
                    type: 'text',
                    value: this.user.address ? this.user.address : '',
                    placeholder: 'Address...'
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
                        this.user.address = alertData.address;
                        this.updateUser();
                    }
                }
            ]
        })]);
        await alert.present();
    }

    async getCity() {
    }

    changeCity(event: any) {
        const city = event.detail.value;
        this.user.city = city;
        console.log(event.detail.value);
    }
}
