import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NavController} from '@ionic/angular';
import {UtilsService} from '../../../services/utils.service';
import {ReviewService} from '../../../services/review.service';

@Component({
    selector: 'app-send-report',
    templateUrl: './send-report.page.html',
    styleUrls: ['./send-report.page.scss'],
})
export class SendReportPage implements OnInit {
    constructor(public navCtrl: NavController,
                public utils: UtilsService,
                public reviewService: ReviewService,
                private formBuilder: FormBuilder) {
    }

    reportForm: FormGroup;
    types = ['Spam', 'Harassment', 'nudity', 'violence', 'other'];

    ngOnInit() {
        this.formInitializer();
    }

    formInitializer() {
        const EMAILPATTERN = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/;
        this.reportForm = this.formBuilder.group({
            email: [null, [Validators.required, Validators.pattern(EMAILPATTERN)]],
            type: [null, [Validators.required]],
            reportMessage: [null, [Validators.required]]
        });
    }

    async sendReport() {
        if (this.reportForm.valid) {
            this.reviewService.addReport(this.reportForm.value);
            this.navCtrl.back();
        } else {
            this.utils.presentToast('All fields are required with valid data...');
        }
    }
}
