import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnualreportComponent } from './anualreport.component';

describe('AnualreportComponent', () => {
  let component: AnualreportComponent;
  let fixture: ComponentFixture<AnualreportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnualreportComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AnualreportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
