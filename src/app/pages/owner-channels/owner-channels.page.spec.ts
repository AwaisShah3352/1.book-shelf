import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { OwnerChannelsPage } from './owner-channels.page';

describe('OwnerChannelsPage', () => {
  let component: OwnerChannelsPage;
  let fixture: ComponentFixture<OwnerChannelsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OwnerChannelsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(OwnerChannelsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
