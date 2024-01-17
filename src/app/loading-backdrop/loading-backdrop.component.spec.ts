import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadingBackdropComponent } from './loading-backdrop.component';

describe('LoadingBackdropComponent', () => {
  let component: LoadingBackdropComponent;
  let fixture: ComponentFixture<LoadingBackdropComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoadingBackdropComponent]
    });
    fixture = TestBed.createComponent(LoadingBackdropComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
