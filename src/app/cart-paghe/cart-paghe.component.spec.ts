import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartPagheComponent } from './cart-paghe.component';

describe('CartPagheComponent', () => {
  let component: CartPagheComponent;
  let fixture: ComponentFixture<CartPagheComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CartPagheComponent]
    });
    fixture = TestBed.createComponent(CartPagheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
