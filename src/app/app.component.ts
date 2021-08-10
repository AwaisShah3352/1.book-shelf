import {Component} from '@angular/core';

import {NavController, Platform} from '@ionic/angular';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {StatusBar} from '@ionic-native/status-bar/ngx';
import {UserService} from './services/user.service';
import {DataCollectorService} from './services/data-collector.service';
import {ChatService} from './services/chat.service';

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.scss']
})
export class AppComponent {

    user: any;

    constructor(
        private platform: Platform,
        private splashScreen: SplashScreen,
        private statusBar: StatusBar,
        private dataCollector: DataCollectorService,
        private service: UserService,
        private navCtrl: NavController,
        private chat: ChatService
    ) {
        this.initializeApp();
    }

    initializeApp() {
        this.platform.ready().then(() => {
            this.statusBar.styleDefault();
            this.statusBar.backgroundColorByHexString('#fafafa');
            this.statusBar.styleDefault();
            this.splashScreen.hide();
            this.checkUser();
        });
    }

    checkUser() {
        this.user = this.service.getUser();
        if (this.user) {
            if (this.user.isAdmin) {
                this.navCtrl.navigateRoot(['/tabs/tab2']);
            } else {
                this.navCtrl.navigateRoot(['/tabs/tab1']);
            }
        } else {
            this.navCtrl.navigateRoot(['']);
        }
    }
}
