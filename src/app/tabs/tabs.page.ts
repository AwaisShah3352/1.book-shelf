import {Component} from '@angular/core';
import {User} from '../models/user';
import {UserService} from '../services/user.service';

@Component({
    selector: 'app-tabs',
    templateUrl: 'tabs.page.html',
    styleUrls: ['tabs.page.scss']
})
export class TabsPage {

    user: User;

    constructor(private service: UserService) {
        this.user = service.getUser();
        console.log(this.user);
    }

}
