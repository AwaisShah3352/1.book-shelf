import {Component, OnInit} from '@angular/core';
import {UtilsService} from '../../services/utils.service';
import {ActionSheetController, NavController, Platform, PopoverController} from '@ionic/angular';
import {RatingComponent} from './rating/rating.component';
import * as firebase from 'firebase';
import {ReviewService} from '../../services/review.service';
import {AppLauncher, AppLauncherOptions} from '@ionic-native/app-launcher/ngx';
import {DataCollectorService} from '../../services/data-collector.service';


@Component({
    selector: 'app-book-detail',
    templateUrl: './book-detail.page.html',
    styleUrls: ['./book-detail.page.scss'],
})
export class BookDetailPage implements OnInit {

    book: any;
    user: any;

    constructor(public utils: UtilsService,
                public actionCtrl: ActionSheetController,
                public navCtrl: NavController,
                private reviewService: ReviewService,
                private appLauncher: AppLauncher,
                private platform: Platform,
                private dataCollector: DataCollectorService,
                public popoverController: PopoverController) {
    }

    ngOnInit() {
        this.book = JSON.parse(localStorage.getItem('book'));
        console.log('---book--', this.book);
        if (this.book) {
            this.user = this.dataCollector.getUserById(this.book.uid);
            console.log(this.user);
        }
    }

    async moreOptions() {
        const alert = await this.actionCtrl.create({
            mode: 'ios',
            header: 'More Options !!!',
            cssClass: 'primary',
            buttons: [
                {
                    text: 'Feedback',
                    icon: 'pencil-sharp',
                    cssClass: 'secondary',
                    handler: () => {
                        this.giveFeedback();
                    }
                },
                {
                    text: 'Report',
                    icon: 'newspaper',
                    cssClass: 'danger',
                    handler: () => {
                        this.reviewService.bookKey = this.book.bookKey;
                        this.navCtrl.navigateForward(['/send-report']);
                    }
                },
                {
                    text: 'Cancel',
                    icon: 'backspace',
                    cssClass: 'primary',
                    handler: () => {
                        console.log('Cancel clicked');
                    }
                }
            ]
        });
        await alert.present();
    }

    openEasyPaisa() {
        const options: AppLauncherOptions = {};
        if (this.platform.is('android')) {
            options.packageName = 'pk.com.telenor.phoenix';
        }

        this.appLauncher.canLaunch(options).then((canLaunch: boolean) => {
            console.log('EP is available');
            this.appLauncher.launch(options);
        }).catch((error: any) => {
            this.utils.presentToast('easypaisa application is not installed in you phone. Please install jazz cash application.');
            console.error('Easypaisa  is not available');
        });
    }

    openJazzCash() {
        const options: AppLauncherOptions = {};
        if (this.platform.is('android')) {
            options.packageName = 'com.techlogix.mobilinkcustomer';
        }

        this.appLauncher.canLaunch(options).then((canLaunch: boolean) => {
            console.log('JC is available');
            this.appLauncher.launch(options);
        }).catch((error: any) => {
            alert(error);
            this.utils.presentToast('Jazz Cash application is not installed in you phone. Please install jazz cash application.');
        });
    }

    async giveFeedback() {
        const review = await this.popoverController.create({
            component: RatingComponent,
            componentProps: {id: 1}
        });
        this.reviewService.bookKey = this.book.bookKey;
        return await review.present();
    }

    expandCLick() {
        this.book.show = !this.book.show;
    }

    openChat(bookName, uid) {
        localStorage.setItem('bookName', bookName);
        localStorage.setItem('bookUserId', uid);
        this.navCtrl.navigateForward(['/chat']);
    }

}
