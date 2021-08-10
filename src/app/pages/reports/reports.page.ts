import {Component, OnInit} from '@angular/core';
import {ReviewService} from '../../services/review.service';
import * as firebase from 'firebase';

@Component({
    selector: 'app-reports',
    templateUrl: './reports.page.html',
    styleUrls: ['./reports.page.scss'],
})
export class ReportsPage implements OnInit {

    reports: any = [];
    bookKey: any;
    constructor(public reviewService: ReviewService) {
    }

    ngOnInit() {
      this.bookKey = this.reviewService.bookKey;
      this.getReports();
    }

    getReports() {
        const ref = `${this.bookKey}_book_reports`;
        firebase.database().ref(`reports/${ref}`).once('value', snapshot => {
            this.reports = [];
            snapshot.forEach((node) => {
                const report = node.val();
                this.reports.push(report);
            });
            console.log('reports', this.reports);
        });
    }

}
