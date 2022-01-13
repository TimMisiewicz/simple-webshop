import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserOrderLineComponent } from './user-order-line.component';

describe('UserOrderLineComponent', () => {
  let component: UserOrderLineComponent;
  let fixture: ComponentFixture<UserOrderLineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserOrderLineComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserOrderLineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
