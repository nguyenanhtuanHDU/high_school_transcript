import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlockTempComponent } from './block-temp.component';

describe('BlockTempComponent', () => {
  let component: BlockTempComponent;
  let fixture: ComponentFixture<BlockTempComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BlockTempComponent]
    });
    fixture = TestBed.createComponent(BlockTempComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
