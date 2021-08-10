import {Component, OnInit} from '@angular/core';
import {FormGroup, Validators, FormBuilder} from '@angular/forms';
import {LoadingController, NavController} from '@ionic/angular';
import * as firebase from 'firebase';
@Component({
    selector: 'app-forget-password',
    templateUrl: './forget-password.page.html',
    styleUrls: ['./forget-password.page.scss'],
})
export class ForgetPasswordPage implements OnInit {

    resetForm: FormGroup;
    loading: any;
    constructor(private formBuilder: FormBuilder,
                private loadingCtrl: LoadingController,
                private navCtrl: NavController) {
    }

    ngOnInit() {
        this.formInitializer();
    }

    formInitializer() {
        const EMAILPATTERN = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/;
        this.resetForm = this.formBuilder.group({
            email: [null, [Validators.required, Validators.pattern(EMAILPATTERN)]]
        });
    }

    async resetPassword() {
      this.loading = await this.loadingCtrl.create({
        message: 'please wait...'
      });
      this.loading.present();
      const email = this.resetForm.value.email;
      firebase.auth().sendPasswordResetEmail(email).then(res => {
        alert('Password reset email sent, please check email...');
        this.navCtrl.navigateRoot(['']);
        if (this.loading) {
          this.loading.dismiss();
        }
        console.log('res: ', res);
      }).catch(err => {
        console.log(err);
        if (this.loading) {
          this.loading.dismiss();
        }
      });
    }
}
