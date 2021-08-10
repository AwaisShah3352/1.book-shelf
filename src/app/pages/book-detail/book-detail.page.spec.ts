import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BookDetailPage } from './book-detail.page';

describe('BookDetailPage', () => {
  let component: BookDetailPage;
  let fixture: ComponentFixture<BookDetailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookDetailPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(BookDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
