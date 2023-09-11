import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GadingComponent } from './gading.component';

describe('GadingComponent', () => {
  let component: GadingComponent;
  let fixture: ComponentFixture<GadingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GadingComponent]
    });
    fixture = TestBed.createComponent(GadingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
