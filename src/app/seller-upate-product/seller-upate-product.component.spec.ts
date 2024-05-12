import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SellerUpateProductComponent } from './seller-upate-product.component';

describe('SellerUpateProductComponent', () => {
  let component: SellerUpateProductComponent;
  let fixture: ComponentFixture<SellerUpateProductComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SellerUpateProductComponent]
    });
    fixture = TestBed.createComponent(SellerUpateProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
