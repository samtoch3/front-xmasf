import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnregComponent } from './enreg.component';

describe('EnregComponent', () => {
  let component: EnregComponent;
  let fixture: ComponentFixture<EnregComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EnregComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EnregComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
