import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MobileSideBarComponent } from './mobile-side-bar.component';

describe('MobileSideBarComponent', () => {
  let component: MobileSideBarComponent;
  let fixture: ComponentFixture<MobileSideBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MobileSideBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MobileSideBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
