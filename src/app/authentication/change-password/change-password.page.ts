import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Subscription} from 'rxjs';
import * as firebase from 'firebase';
import {User} from '../../models/user';
import {UserService} from '../../services/user.service';
import {LoadingController, NavController} from '@ionic/angular';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.page.html',
  styleUrls: ['./change-password.page.scss'],
})
export class ChangePasswordPage implements OnInit {

  changePasswordForm: FormGroup;
  constructor(private formBuilder: FormBuilder,
              private navCtrl: NavController,
              private loadingCtrl: LoadingController,
              private service: UserService) {
    this.user = service.getUser();
  }
  passwordType = 'password';
  passwordIcon = 'eye-off';
  loading: any;

  user: User;
  ngOnInit() {
    this.formInitializer();
  }

  hideShowPassword() {
    this.passwordType = this.passwordType === 'text' ? 'password' : 'text';
    this.passwordIcon = this.passwordIcon === 'eye-off' ? 'eye' : 'eye-off';
  }

  formInitializer() {
    const EMAILPATTERN = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/;
    this.changePasswordForm = this.formBuilder.group({
      oldPassword: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
      confirm_password: ['', [Validators.required, Validators.minLength(6),
        this.mismatchedPasswords('password')]]
    });
  }

  async changePassword() {
    this.loading = await this.loadingCtrl.create({
      message: 'please wait...'
    });
    this.loading.present();
    const oldPassword = this.changePasswordForm.value.oldPassword;
    const newPassword = this.changePasswordForm.value.password;
    const email = this.user.email;
    firebase.auth().signInWithEmailAndPassword(email, oldPassword).then(() => {
      this.updatePassword(newPassword);
      if (this.loading) {
        this.loading.dismiss();
      }
    }).catch((err) => {
      if (this.loading) {
        this.loading.dismiss();
      }
      alert(err);
    });
  }

  async updatePassword(newPassword) {
    this.loading = await this.loadingCtrl.create({
      message: 'please wait...'
    });
    this.loading.present();
    firebase.auth().currentUser.updatePassword(newPassword).then(() => {
      this.navCtrl.navigateRoot(['tabs/tab2']);
      if (this.loading) {
        this.loading.dismiss();
      }
    }).catch((err) => {
      if (this.loading) {
        this.loading.dismiss();
      }
      alert(err);
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
