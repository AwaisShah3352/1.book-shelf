import {Component, OnInit} from '@angular/core';
import {AlertController, NavController} from '@ionic/angular';
import {DataCollectorService} from '../services/data-collector.service';
import {UtilsService} from '../services/utils.service';
import {UserService} from '../services/user.service';

@Component({
    selector: 'app-tab1',
    templateUrl: 'tab1.page.html',
    styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

    searchText: any;
    books: any = [];
    searchedBooks: any = [];

    constructor(private alertController: AlertController,
                private dataCollector: DataCollectorService,
                private utils: UtilsService,
                private service: UserService,
                private navCtrl: NavController) {
    }

    ngOnInit() {
        this.loadData();

    }

    loadData() {
        this.utils.presentLoading('Loading...');
        this.dataCollector.getValue().subscribe(data => {
            this.books = this.dataCollector.books;
            this.books.sort((a, b) => {
                const dateA = new Date(a.publishDate); const dateB = new Date(b.publishDate);
                return +dateA - +dateB;
            });
            this.searchedBooks = this.dataCollector.books;
        });
    }

    searchBook() {
        if (this.searchText) {
            this.searchedBooks = this.books.filter(book => book.name.toLowerCase().includes(this.searchText.toLowerCase()));
        } else {
            this.searchedBooks = this.books;
        }
    }

    closeSearch() {
        this.searchedBooks = this.books;
    }

    expandCLick(item) {
        item.show = !item.show;
    }

    openDetail(book) {
        localStorage.setItem('book', JSON.stringify(book));
        this.navCtrl.navigateForward(['book-detail']);
    }
}
