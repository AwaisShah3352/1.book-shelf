import {Injectable} from '@angular/core';
import {Observable, BehaviorSubject} from 'rxjs';
import * as firebase from 'firebase';
import {UserService} from './user.service';
import {UtilsService} from './utils.service';
import {NavController} from '@ionic/angular';

@Injectable({
    providedIn: 'root'
})
export class DataCollectorService {

    collection: BehaviorSubject<any>;
    books = [];
    myRequiredBooks = [];
    myDonatedBooks = [];
    cities = [
        'Ahmadpur East',
        'Ahmed Nager Chatha',
        'Ali Khan Abad',
        'Alipur',
        'Arifwala',
        'Attock',
        'Bhera',
        'Bhalwal',
        'Bahawalnagar',
        'Bahawalpur',
        'Bhakkar',
        'Burewala',
        'Chenab Nagar',
        'Chillianwala',
        'Choa Saidanshah',
        'Chakwal',
        'Chak Jhumra',
        'Chichawatni',
        'Chiniot',
        'Chishtian',
        'Chunian',
        'Dajkot',
        'Daska',
        'Davispur',
        'Darya Khan',
        'Dera Ghazi Khan',
        'Dhaular',
        'Dina',
        'Dinga',
        'Dhudial Chakwal',
        'Dipalpur',
        'Faisalabad',
        'Fateh Jang',
        'Ghakhar Mandi',
        'Gojra',
        'Gujranwala',
        'Gujrat',
        'Gujar Khan',
        'Harappa',
        'Hafizabad',
        'Haroonabad',
        'Hasilpur',
        'Haveli Lakha',
        'Jalalpur Jattan',
        'Jampur',
        'Jaranwala',
        'Jhang',
        'Jhelum',
        'Kallar Syedan',
        'Kalabagh',
        'Karor Lal Esan',
        'Kasur',
        'Kamalia',
        'Kāmoke',
        'Khanewal',
        'Khanpur',
        'Khanqah Sharif',
        'Kharian',
        'Khushab',
        'Kot Adu',
        'Jauharabad',
        'Lahore',
        'Islamabad',
        'Lalamusa',
        'Layyah',
        'Lawa Chakwal',
        'Liaquat Pur',
        'Lodhran',
        'Malakwal',
        'Mamoori',
        'Mailsi',
        'Mandi Bahauddin',
        'Mian Channu',
        'Mianwali',
        'Miani',
        'Multan',
        'Murree',
        'Muridke',
        'Mianwali Bangla',
        'Muzaffargarh',
        'Narowal',
        'Nankana Sahib',
        'Okara',
        'Renala Khurd',
        'Pakpattan',
        'Pattoki',
        'Pindi Bhattian',
        'Pind Dadan Khan',
        'Pir Mahal',
        'Qaimpur',
        'Qila Didar Singh',
        'Raiwind',
        'Rajanpur',
        'Rahim Yar Khan',
        'Rawalpindi',
        'Sadiqabad',
        'Sagri',
        'Sahiwal',
        'Sambrial',
        'Samundri',
        'Sangla Hill',
        'Sarai Alamgir',
        'Sargodha',
        'Shakargarh',
        'Sheikhupura',
        'Shujaabad',
        'Sialkot',
        'Sohawa',
        'Soianwala',
        'Siranwali',
        'Tandlianwala',
        'Talagang',
        'Taxila',
        'Toba Tek Singh',
        'Vehari',
        'Wah Cantonment',
        'Wazirabad',
        'Yazman',
        'Zafarwal',
    ];
    users = [];
    user;

    constructor(public service: UserService,
                public utils: UtilsService,
                public navCtrl: NavController) {
        this.collection = new BehaviorSubject<any>('data');
        this.getAllBooks();
        this.getAllUsers();
    }

    syncUserBlock(uid, isLogin) {
        firebase.database().ref(`users/${uid}`).on('value', snapshot => {
            const user = snapshot.val();
            if (user.isActive) {
                const cu = firebase.auth().currentUser;
                console.log('current user is: ', cu);
                this.user = this.service.getUser();
                if (this.user || cu) {
                    this.service.setUser(user);
                    this.navCtrl.navigateForward(['/tabs']);
                }
            } else {
                this.utils.presentToast('Your account have been blocked due to misuse. You can contact us here awais.bsse3352@iiu.edu.pk Thanks');
                this.service.logOutFromFirebase();
                this.navCtrl.navigateRoot(['']);
            }
        });
    }

    getAllUsers() {
        firebase.database().ref('users').on('value', snapshot => {
            this.users = [];
            snapshot.forEach((node) => {
                const user = node.val();
                this.users.push(user);
            });
        });
    }

    getAllBooks() {
        firebase.database().ref('books').on('value', snapshot => {
            this.books = [];
            snapshot.forEach((node) => {
                const book = node.val();
                book.show = false;
                this.books.push(book);
                this.setValue('data');
            });
        });
    }

    setValue(value) {
        return this.collection.next(value);
    }

    getValue(): Observable<boolean> {
        return this.collection.asObservable();
    }

    getUserBooks(uid) {
        const ref = 'books-' + uid;
        firebase.database().ref(`${ref}`).on('value', snapshot => {
            this.myRequiredBooks = [];
            this.myDonatedBooks = [];
            snapshot.forEach((node) => {
                const book = node.val();
                book.show = false;
                if (book.purpose === 'Borrow/Req') {
                    this.myRequiredBooks.push(book);
                } else {
                    this.myDonatedBooks.push(book);
                }
            });
            this.setValue('books');
        });
    }

    getUserById(uid) {
        return this.users.filter(user => user.uid === uid)[0];
    }
}
