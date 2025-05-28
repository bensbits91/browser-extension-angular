import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PopupComponent } from './popup.component';

describe('PopupComponent', () => {
  let component: PopupComponent;
  let fixture: ComponentFixture<PopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PopupComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the popup component', () => {
    expect(component).toBeTruthy();
  });

  it('should have darkMode default to false', () => {
    expect(component.darkMode).toBeFalse();
  });

  it('should have forms as an array', () => {
    expect(Array.isArray(component.forms)).toBeTrue();
  });
});
