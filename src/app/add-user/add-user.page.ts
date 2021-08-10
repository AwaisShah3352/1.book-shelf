import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Subscription} from 'rxjs';
import * as firebase from 'firebase';
import {LoadingController, NavController} from '@ionic/angular';
import {UtilsService} from '../services/utils.service';

@Component({
    selector: 'app-add-user',
    templateUrl: './add-user.page.html',
    styleUrls: ['./add-user.page.scss'],
})
export class AddUserPage implements OnInit {

    constructor(private formBuilder: FormBuilder,
                private navCtrl: NavController,
                private utils: UtilsService,
                private loadingCtrl: LoadingController,
    ) {
    }

    addUserForm: FormGroup;
    passwordType = 'password';
    passwordIcon = 'eye-off';
    loading: any;
    roles = ['Teacher', 'Student'];
    isStudent = false;
    isTeacher = false;

    ngOnInit() {
        this.formInitializer();
    }

    hideShowPassword() {
        this.passwordType = this.passwordType === 'text' ? 'password' : 'text';
        this.passwordIcon = this.passwordIcon === 'eye-off' ? 'eye' : 'eye-off';
    }

    formInitializer() {
        const EMAILPATTERN = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/;
        this.addUserForm = this.formBuilder.group({
            fullName: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
            email: [null, [Validators.required, Validators.pattern(EMAILPATTERN)]],
            user_name: [null, [Validators.required]],
            role: [null, Validators.required],
            regNo: [null, Validators.required],
            password: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
            confirm_password: ['', [
                Validators.required, Validators.minLength(6),
                this.mismatchedPasswords('password')]],
            phone: ['+92', [Validators.required, Validators.maxLength(14)]]
        });
    }

    async addUser() {
        this.loading = await this.loadingCtrl.create({
            message: 'please wait...'
        });
        this.loading.present();
        const formData = this.addUserForm.value;
        firebase.auth().createUserWithEmailAndPassword(formData.email, formData.password).then(res => {
            this.saveUserInRealTime(res.user.uid, res.user.email);
            const auth = firebase.auth().currentUser;
            console.log(res);
            this.navCtrl.back();
            if (this.loading) {
                this.loading.dismiss();
            }
        }).catch(err => {
            if (this.loading) {
                this.loading.dismiss();
            }
            console.log(err);
        });
    }

    async saveUserInRealTime(uId, mail) {
        this.loading = await this.loadingCtrl.create({
            message: 'please wait...'
        });
        this.loading.present();
        const formData = this.addUserForm.value;
        this.decideRole(formData.role);
        firebase.database().ref(`users/${uId}`).set({
            fullName: formData.fullName,
            email: mail,
            username: formData.user_name,
            uid: uId,
            password: formData.password,
            isAdmin: false,
            isStudent: this.isStudent,
            isTeacher: this.isTeacher,
            enable: true,
            phone: '0' + formData.phone,
        }).then(res => this.utils.presentToast('User have been created successfully...'));
        if (this.loading) {
            this.loading.dismiss();
        }
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

    decideRole(role) {
        if (role === 'Teacher') {
            this.isTeacher = true;
            this.isStudent = false;
            this.addUserForm.controls.regNo.setValue('no Reg No.');
        } else {
            this.isTeacher = false;
            this.isStudent = true;
            this.addUserForm.controls.regNo.setValue('');
        }
    }

    changeOption(role) {
        console.log(role.detail.value);
        this.decideRole(role.detail.value);
    }

}
