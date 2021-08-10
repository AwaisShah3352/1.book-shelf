import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouteReuseStrategy} from '@angular/router';

import {IonicModule, IonicRouteStrategy} from '@ionic/angular';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {StatusBar} from '@ionic-native/status-bar/ngx';
import {Camera} from '@ionic-native/camera/ngx';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {EmailComposer} from '@ionic-native/email-composer/ngx';
import * as firebase from 'firebase';
import {HttpClientModule} from '@angular/common/http';
import {ChartsModule} from 'ng2-charts';
import {AppLauncher} from '@ionic-native/app-launcher/ngx';

const firebaseConfig = {
    apiKey: 'AIzaSyBYicFIdi9b2nJbsyIE4oL7EeYT5gOhz3c',
    authDomain: 'book-shelf-7341f.firebaseapp.com',
    databaseURL: 'https://book-shelf-7341f-default-rtdb.firebaseio.com',
    projectId: 'book-shelf-7341f',
    storageBucket: 'book-shelf-7341f.appspot.com',
    messagingSenderId: '276175535248',
    appId: '1:276175535248:web:0723e282abf154f433ac15',
    measurementId: 'G-NQ94VTFP9V'
};
firebase.initializeApp(firebaseConfig);

@NgModule({
    declarations: [AppComponent],
    entryComponents: [],
    imports: [BrowserModule,
        HttpClientModule,
        ChartsModule,
        IonicModule.forRoot(), AppRoutingModule],
    providers: [
        StatusBar,
        SplashScreen,
        Camera,
        EmailComposer,
        AppLauncher,
        {provide: RouteReuseStrategy, useClass: IonicRouteStrategy}
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
