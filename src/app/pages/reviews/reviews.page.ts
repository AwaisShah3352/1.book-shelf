import {Component, OnInit} from '@angular/core';
import {ReviewService} from '../../services/review.service';
import * as firebase from 'firebase';

@Component({
    selector: 'app-reviews',
    templateUrl: './reviews.page.html',
    styleUrls: ['./reviews.page.scss'],
})
export class ReviewsPage implements OnInit {

    totalStars = 0;
    totalRating = 0;
    reviews: any = [];
    bookKey: any;

    constructor(public reviewService: ReviewService) {
    }

    ngOnInit() {
        this.bookKey = this.reviewService.bookKey;
        this.getReviews();
    }

    getReviews() {
        const ref = `${this.bookKey}_book_reviews`;
        firebase.database().ref(`reviews/${ref}`).once('value', snapshot => {
            this.reviews = [];
            snapshot.forEach((node) => {
                const review = node.val();
                this.totalStars = this.totalStars + review.stars;
                this.reviews.push(review);
            });
            this.totalRating = this.totalStars / this.reviews.length;
            console.log('rating', this.totalRating);
            console.log('reviews', this.reviews);
        });
    }
}
