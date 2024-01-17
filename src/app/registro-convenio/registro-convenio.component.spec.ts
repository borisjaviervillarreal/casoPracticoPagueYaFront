import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroConvenioComponent } from './registro-convenio.component';

describe('RegistroConvenioComponent', () => {
  let component: RegistroConvenioComponent;
  let fixture: ComponentFixture<RegistroConvenioComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegistroConvenioComponent]
    });
    fixture = TestBed.createComponent(RegistroConvenioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
