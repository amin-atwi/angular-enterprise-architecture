import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputReactiveFormsComponent } from './input-reactive-forms.component';

describe('InputReactiveFormsComponent', () => {
  let component: InputReactiveFormsComponent;
  let fixture: ComponentFixture<InputReactiveFormsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InputReactiveFormsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InputReactiveFormsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
