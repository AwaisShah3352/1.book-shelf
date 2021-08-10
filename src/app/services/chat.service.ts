import {Injectable} from '@angular/core';
import * as firebase from 'firebase';
import {BehaviorSubject, Observable} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ChatService {

    channels: any = [
        {
            name: '1123_physicBookUID_3321'
        },
        {
            name: '1122_chemistryBookUID_3321'
        },
        {
            name: '1123_CSBookUID_3321'
        },
        {
            name: '1123_CSBookUID_3221'
        }
    ];
    collection: BehaviorSubject<any>;

    constructor() {
        this.collection = new BehaviorSubject<any>('data');
        this.getAllChannels();
        // this.isChannelExist('1123', 'CSBookUID');
        // this.isChannelExist('3321', 'CSBookUID');
    }

    isChannelExist(bookUID, userUID): boolean {
        if (this.isNew(`${userUID}_${bookUID}`) || this.isNew(`${bookUID}_${userUID}`)) {
            console.log('exist');
            return true;
        } else {
            console.log('not exits');
            return false;
        }
    }


    isNew(channelName): boolean {
        const channel = this.channels.filter(c => c.name.includes(channelName));
        if (channel.length > 0) {
            return true;
        } else {
            return false;
        }

    }


    getAllChannels() {
        firebase.database().ref('channels').on('value', snapshot => {
            this.channels = [];
            snapshot.forEach((node) => {
                const book = node.val();
                book.show = false;
                this.channels.push(book);
                this.setValue('data');
                console.log('channels: ', this.channels);
            });
        });
    }

    saveChannel(roomName) {


        // chatname
        // channel : userUUID_bookKey_userUUID
        // store channels match fromchannelthat chat is already started or not
    }

    setValue(value) {
        return this.collection.next(value);
    }

    getValue(): Observable<boolean> {
        return this.collection.asObservable();
    }

    sendMessage(channelName) {

    }

    loadMessages() {

    }
}
