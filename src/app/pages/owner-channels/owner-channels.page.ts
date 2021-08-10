import {Component, OnInit} from '@angular/core';
import {UtilsService} from '../../services/utils.service';
import {ChatService} from '../../services/chat.service';
import {NavController} from '@ionic/angular';

@Component({
    selector: 'app-owner-channels',
    templateUrl: './owner-channels.page.html',
    styleUrls: ['./owner-channels.page.scss'],
})
export class OwnerChannelsPage implements OnInit {

    uid: string;
    channels: any = [];

    constructor(private utils: UtilsService,
                private navCtrl: NavController,
                private chatService: ChatService) {
    }

    ngOnInit() {
        this.loadchannels();
    }

    loadchannels() {
        this.utils.presentLoading('Loading...');
        const book = localStorage.getItem('bookName');
        let bookName = book.split(' ').join('_');
        const bookuserId = localStorage.getItem('bookUserId');
        this.channels = this.chatService.channels.filter(c => c.name.includes(`${bookuserId}_${bookName}`));
        console.log('channels: ', this.channels);
    }

    openChant(name) {
        localStorage.setItem('channelName', name);
        this.navCtrl.navigateForward((['owner-chat']));
    }

}
