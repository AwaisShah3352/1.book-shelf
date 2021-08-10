import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { OwnerChatPage } from './owner-chat.page';

describe('OwnerChatPage', () => {
  let component: OwnerChatPage;
  let fixture: ComponentFixture<OwnerChatPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OwnerChatPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(OwnerChatPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
