import {Injectable} from '@angular/core';
import * as firebase from 'firebase';
import {UtilsService} from './utils.service';
import {UserService} from './user.service';

@Injectable({
    providedIn: 'root'
})
export class ReviewService {

    bookKey: any;
    reviews: any = [];
    reports: any = [];

    user: any;
    constructor(private utils: UtilsService,
                private userService: UserService) {
        this.user = userService.getUser();
    }

    addReview(review) {
        const ref = `${this.bookKey}_book_reviews`;
        const key = firebase.database().ref('/reviews').push().key;
        firebase.database().ref(`reviews/${ref}/${key}`).set({
            from: this.user.email,
            stars: review.stars,
            feedback: review.title,
            timestamp: Date.now(),
        }).then(() => {
            this.utils.presentToast('Your feedback have recorded successfully. Thanks...');
        });
    }

    addReport(report) {
        const ref = `${this.bookKey}_book_reports`;
        const key = firebase.database().ref('/reports').push().key;
        firebase.database().ref(`reports/${ref}/${key}`).set({
            type: report.type,
            email: report.email,
            reportMessage: report.reportMessage,
            timestamp: Date.now(),
        }).then(() => {
            this.utils.presentToast('Your Report have successfully submitted. Thanks...');
        });
    }
}
