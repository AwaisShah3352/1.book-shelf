import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AdminChatPage } from './admin-chat.page';

describe('AdminChatPage', () => {
  let component: AdminChatPage;
  let fixture: ComponentFixture<AdminChatPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminChatPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AdminChatPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
