import {Component, OnInit} from '@angular/core';
import {NavParams, PopoverController} from '@ionic/angular';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UtilsService} from '../../../services/utils.service';
import {ReviewService} from '../../../services/review.service';

@Component({
    selector: 'app-rating',
    templateUrl: './rating.component.html',
    styleUrls: ['./rating.component.scss'],
})
export class RatingComponent implements OnInit {

    constructor(private popoverController: PopoverController,
                private navParams: NavParams,
                private reviewService: ReviewService,
                private formBuilder: FormBuilder,
                private utils: UtilsService) {
    }

    id;
    c1 = '';
    c2 = '';
    c3 = '';
    c4 = '';
    c5 = '';
    n1 = 'star-outline';
    n2 = 'star-outline';
    n3 = 'star-outline';
    n4 = 'star-outline';
    n5 = 'star-outline';
    star: number;
    reviewForm: FormGroup;

    ngOnInit() {
        this.formInitializer();
    }

    formInitializer() {
        this.reviewForm = this.formBuilder.group({
            stars: [this.star, Validators.compose([Validators.required])],
            title: [null, [Validators.required]]
        });
    }

    clickFirst(item: any) {
        this.c1 = '';
        this.c2 = '';
        this.c3 = '';
        this.c4 = '';
        this.c5 = '';
        this.n1 = 'star-outline';
        this.n2 = 'star-outline';
        this.n3 = 'star-outline';
        this.n4 = 'star-outline';
        this.n5 = 'star-outline';
        this.star = item;
        console.log('this.stars', this.star);
        this.c1 = 'primary';
        this.n1 = 'star';
        this.reviewForm.patchValue({stars: this.star});
    }

    clickSecond(item: any) {
        this.n1 = 'star-outline';
        this.n2 = 'star-outline';
        this.n3 = 'star-outline';
        this.n4 = 'star-outline';
        this.n5 = 'star-outline';
        this.c1 = '';
        this.c2 = '';
        this.c3 = '';
        this.c4 = '';
        this.c5 = '';
        this.star = item;
        console.log('this.stars', this.star);
        this.c1 = 'primary';
        this.c2 = 'primary';
        this.n1 = 'star';
        this.n2 = 'star';
        this.reviewForm.patchValue({stars: this.star});
    }

    clickThird(item: any) {
        this.n1 = 'star-outline';
        this.n2 = 'star-outline';
        this.n3 = 'star-outline';
        this.n4 = 'star-outline';
        this.n5 = 'star-outline';
        this.c1 = '';
        this.c2 = '';
        this.c3 = '';
        this.c4 = '';
        this.c5 = '';
        this.star = item;
        console.log('this.stars', this.star);
        this.c1 = 'primary';
        this.c2 = 'primary';
        this.c3 = 'primary';
        this.n1 = 'star';
        this.n2 = 'star';
        this.n3 = 'star';
        this.reviewForm.patchValue({stars: this.star});
    }

    clickForth(item: any) {
        this.n1 = 'star-outline';
        this.n2 = 'star-outline';
        this.n3 = 'star-outline';
        this.n4 = 'star-outline';
        this.n5 = 'star-outline';
        this.c1 = '';
        this.c2 = '';
        this.c3 = '';
        this.c4 = '';
        this.c5 = '';
        this.star = item;
        console.log('this.stars', this.star);
        this.c1 = 'primary';
        this.c2 = 'primary';
        this.c3 = 'primary';
        this.c4 = 'primary';
        this.n1 = 'star';
        this.n2 = 'star';
        this.n3 = 'star';
        this.n4 = 'star';
        this.reviewForm.patchValue({stars: this.star});
    }

    clickFifth(item: any) {
        this.n1 = 'star-outline';
        this.n2 = 'star-outline';
        this.n3 = 'star-outline';
        this.n4 = 'star-outline';
        this.n5 = 'star-outline';
        this.c1 = '';
        this.c2 = '';
        this.c3 = '';
        this.c4 = '';
        this.c5 = '';
        this.star = item;
        console.log('this.stars', this.star);
        this.c1 = 'primary';
        this.c2 = 'primary';
        this.c3 = 'primary';
        this.c4 = 'primary';
        this.c5 = 'primary';
        this.n1 = 'star';
        this.n2 = 'star';
        this.n3 = 'star';
        this.n4 = 'star';
        this.n5 = 'star';
        this.reviewForm.patchValue({stars: this.star});
    }

    async addReview() {
        if (!this.reviewForm.valid) {
            this.utils.presentToast('Stars and comment both are necessary. Please select both...');
        } else {
            this.reviewService.addReview(this.reviewForm.value);
            this.popoverController.dismiss();
        }
    }
}
