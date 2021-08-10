import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {LoadingController, NavController} from '@ionic/angular';

import * as firebase from 'firebase';
import {UserService} from '../../services/user.service';
import {UtilsService} from '../../services/utils.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.page.html',
    styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
    constructor(private formBuilder: FormBuilder,
                private service: UserService,
                private navCtrl: NavController,
                private utils: UtilsService,
                private readonly loadingCtrl: LoadingController) {
    }

    loginForm: FormGroup;
    passwordType = 'password';
    passwordIcon = 'eye-off';

    ngOnInit() {
        this.formInitializer();
    }

    hideShowPassword() {
        this.passwordType = this.passwordType === 'text' ? 'password' : 'text';
        this.passwordIcon = this.passwordIcon === 'eye-off' ? 'eye' : 'eye-off';
    }

    formInitializer() {
        const EMAILPATTERN = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/;
        this.loginForm = this.formBuilder.group({
            email: [null, [Validators.required, Validators.pattern(EMAILPATTERN)]],
            password: ['', Validators.compose([Validators.required, Validators.minLength(6)])]
        });
    }

    async login() {
        this.utils.presentLoading('please wait...');
        const formData = this.loginForm.value;
        firebase.auth().signInWithEmailAndPassword(formData.email, formData.password).then(res => {
            console.log(res);
            if (res.user.emailVerified) {
                this.saveUser(res.user.uid);
            } else {
                this.utils.presentToast('Please verify your email first.');
            }
        }).catch(error => {
            alert(error);
        });
    }

    async saveUser(id) {
        this.utils.presentLoading('please wait...');
        firebase.database().ref(`users/${id}`).on('value', snapshot => {
            this.service.setUser(snapshot.val());
            this.navCtrl.navigateForward(['/tabs']);
        });
    }

    registerUser() {
        this.navCtrl.navigateForward(['/signup']);
    }

    forgotPassword() {
        this.navCtrl.navigateForward(['/forget-password']);
    }
}
