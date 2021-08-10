import {Injectable} from '@angular/core';
import {AlertController, LoadingController, ToastController} from '@ionic/angular';

@Injectable({
    providedIn: 'root'
})
export class UtilsService {

    alert: any;
    loading: any;
    toast: any;

    constructor(private alertCtrl: AlertController,
                private loadingCtrl: LoadingController,
                private toastCtrl: ToastController) {
    }

    async presentAlert(messag) {
        this.alert = await this.alertCtrl.create({
            header: 'Note Please !',
            message: messag,
            buttons: [{
                text: 'Okay',
                cssClass: 'primary',
                handler: () => {
                    console.log('Confirm Okay');
                }
            }
            ]
        });
        this.alert.present();
    }

    async presentLoading(msg) {
        this.loading = await this.loadingCtrl.create({
            message: msg,
            duration: 3000
        });
        this.loading.present();
    }

    async presentToast(msg) {
        this.toast = await this.toastCtrl.create({
            message: msg,
            duration: 3000
        });
        this.toast.present();
    }

    stopLoading() {
        this.loading.dismiss();
    }
}

