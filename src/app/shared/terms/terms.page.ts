import {Component, OnInit} from '@angular/core';
import {NavController} from '@ionic/angular';

@Component({
    selector: 'app-terms',
    templateUrl: './terms.page.html',
    styleUrls: ['./terms.page.scss'],
})
export class TermsPage implements OnInit {

    constructor(private navCtrl: NavController) {
    }

    ngOnInit() {
    }

    goBack() {
        this.navCtrl.navigateRoot(['/tabs/tab3']);
    }
}
