import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Subscription} from 'rxjs';
import * as firebase from 'firebase';
import {LoadingController, NavController} from '@ionic/angular';
import {UtilsService} from '../../services/utils.service';
import {DataCollectorService} from '../../services/data-collector.service';

@Component({
    selector: 'app-signup',
    templateUrl: './signup.page.html',
    styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
    constructor(private formBuilder: FormBuilder,
                private navCtrl: NavController,
                private utils: UtilsService,
                public dataCollector: DataCollectorService,
                private loadingCtrl: LoadingController
    ) {
    }

    cities = this.dataCollector.cities;
    signupForm: FormGroup;
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
        this.signupForm = this.formBuilder.group({
            fullName: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
            email: [null, [Validators.required, Validators.pattern(EMAILPATTERN)]],
            phone: ['+92', [Validators.required, Validators.maxLength(14)]],
            address: [''],
            city: [null, Validators.required],
            password: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
            confirm_password: ['', [
                Validators.required, Validators.minLength(6),
                this.mismatchedPasswords('password')]],
        });
    }

    signUpUser() {
        this.createUserInDb();
    }

    async createUserInDb() {
        this.utils.presentLoading('please wait...')
        const formData = this.signupForm.value;
        firebase.auth().createUserWithEmailAndPassword(formData.email, formData.password).then(res => {
            this.saveUserInRealTime(res.user.uid, res.user.email);
            const auth = firebase.auth().currentUser;
            auth.sendEmailVerification().then(() => {
                alert('We send you a verification email. Please check your email and verify!');
            });
            console.log(res);
            this.navCtrl.navigateRoot(['']);
        }).catch(err => {
            console.log(err);
        });
    }

    async saveUserInRealTime(uId, mail) {
        this.utils.presentLoading('please wait...');
        const formData = this.signupForm.value;
        firebase.database().ref(`users/${uId}`).set({
            fullName: formData.fullName,
            email: mail,
            uid: uId,
            password: formData.password,
            isActive: true,
            phone: '0' + formData.phone,
            address: formData.address,
            city: formData.city
        });
    }

    mismatchedPasswords(otherControlName: string) {
        return (control: AbstractControl): { [key: string]: any } => {
            const otherControl: AbstractControl = control.root.get(otherControlName);
            if (otherControl) {
                const subscription: Subscription = otherControl.valueChanges.subscribe(
                    () => {
                        control.updateValueAndValidity();
                        subscription.unsubscribe();
                    }
                );
            }
            return otherControl && control.value !== otherControl.value
                ? {match: true}
                : null;
        };
    }
}
