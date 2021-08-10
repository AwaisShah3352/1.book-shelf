import {Component, OnInit} from '@angular/core';
import {ActionSheetController, AlertController, NavController} from '@ionic/angular';
import {DataCollectorService} from '../services/data-collector.service';
import {UtilsService} from '../services/utils.service';
import {UserService} from '../services/user.service';
import {ReviewService} from '../services/review.service';
import * as firebase from 'firebase';

@Component({
    selector: 'app-tab2',
    templateUrl: 'tab2.page.html',
    styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {

    required = true;
    donated = false;
    myDonatedBooks: any = [];
    myRequiredBooks: any = [];
    user: any;

    constructor(private actionCtrl: ActionSheetController,
                private dataCollector: DataCollectorService,
                private alertCtrl: AlertController,
                private utils: UtilsService,
                public userService: UserService,
                public reviewService: ReviewService,
                private navCtrl: NavController) {
    }

    ngOnInit() {
        this.user = this.userService.getUser();
        if (this.user) {
            this.loadData(this.user.uid);
        } else {
            this.utils.presentToast('An error occurred while getting Your book');
        }
    }

    loadData(uid) {
        this.dataCollector.getUserBooks(uid);
        this.dataCollector.getValue().subscribe(data => {
            this.myDonatedBooks = this.dataCollector.myDonatedBooks;
            this.myRequiredBooks = this.dataCollector.myRequiredBooks;
            console.log('my donated book', this.myDonatedBooks);
            console.log('my required books', this.myRequiredBooks);
        });
    }

    segmentChanged($event: CustomEvent) {
        this.required = !this.required;
        this.donated = !this.donated;
    }

    expandCLick(book) {
        book.show = !book.show;
    }

    async moreOptions(book) {
        const alert = await this.actionCtrl.create({
            mode: 'ios',
            header: 'More Options !!!',
            cssClass: 'primary',
            buttons: [
                {
                    text: 'Edit',
                    icon: 'pencil-sharp',
                    cssClass: 'primary',
                    handler: () => {
                        localStorage.setItem('isEditing', JSON.stringify(true));
                        localStorage.setItem('editBook', JSON.stringify(book));
                        this.navCtrl.navigateForward(['add-book']);
                    }
                },
                {
                    text: 'Delete',
                    icon: 'trash-outline',
                    cssClass: 'danger',
                    handler: () => {
                        this.deleteFromDatabase(book.bookKey);
                    }
                },
                {
                    text: 'Messages',
                    icon: 'mail',
                    cssClass: 'primary',
                    handler: () => {
                        localStorage.setItem('bookName', book.name);
                        localStorage.setItem('bookUserId', book.uid);
                        this.navCtrl.navigateForward(['owner-channels']);
                    }
                },
                {
                    text: 'Reports',
                    icon: 'chatbox',
                    cssClass: 'primary',
                    handler: () => {
                        this.reviewService.bookKey = book.bookKey;
                        this.navCtrl.navigateForward(['/reports']);
                    }
                },
                {
                    text: 'Reviews',
                    icon: 'list',
                    cssClass: 'primary',
                    handler: () => {
                        this.reviewService.bookKey = book.bookKey;
                        this.navCtrl.navigateForward(['/reviews']);
                    }
                },
                {
                    text: 'Cancel',
                    icon: 'backspace',
                    cssClass: 'primary',
                    role: 'cancel',
                    handler: () => {
                        console.log('Cancel clicked');
                    }
                }
            ]
        });
        await alert.present();
    }

    deleteFromDatabase(uid) {
        firebase.database().ref(`/books`).child(uid).remove().then(res => {
            const ref = 'books-' + this.user.uid;
            firebase.database().ref(`${ref}`).child(uid).remove().then(res => {
                this.utils.presentToast('User have been deleted successfully...');
            }).catch(err => console.log(err));
        }).catch(err => console.log(err));
    }

    addBook() {
        this.navCtrl.navigateForward(['/add-book']);
    }
}

