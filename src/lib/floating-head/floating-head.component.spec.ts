import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FloatingHeadComponent } from './floating-head.component';

describe('FloatingHeadComponent', () => {
  let component: FloatingHeadComponent;
  let fixture: ComponentFixture<FloatingHeadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FloatingHeadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FloatingHeadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
