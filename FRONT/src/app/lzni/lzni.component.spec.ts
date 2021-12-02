import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LzniComponent } from './lzni.component';

describe('LzniComponent', () => {
  let component: LzniComponent;
  let fixture: ComponentFixture<LzniComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LzniComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LzniComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
