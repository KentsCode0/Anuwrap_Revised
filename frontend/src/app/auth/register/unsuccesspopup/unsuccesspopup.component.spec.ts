import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnsuccesspopupComponent } from './unsuccesspopup.component';

describe('UnsuccesspopupComponent', () => {
  let component: UnsuccesspopupComponent;
  let fixture: ComponentFixture<UnsuccesspopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UnsuccesspopupComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UnsuccesspopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
