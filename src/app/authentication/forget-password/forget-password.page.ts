import {Component, OnInit} from '@angular/core';
import {FormGroup, Validators, FormBuilder} from '@angular/forms';
import {NavController} from '@ionic/angular';
import * as firebase from 'firebase';
import { UtilsService } from 'src/app/services/utils.service';
@Component({
    selector: 'app-forget-password',
    templateUrl: './forget-password.page.html',
    styleUrls: ['./forget-password.page.scss'],
})
export class ForgetPasswordPage implements OnInit {

    resetForm: FormGroup;
    constructor(private formBuilder: FormBuilder,
                private utils: UtilsService,
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
      this.utils.presentLoading('Loading...');
      const email = this.resetForm.value.email;
      firebase.auth().sendPasswordResetEmail(email).then(res => {
        alert('Password reset email sent, please check email...');
        this.navCtrl.navigateRoot(['']);
        this.utils.stopLoading();
        console.log('res: ', res);
      }).catch(err => {
        this.utils.stopLoading();
      });
    }
}
