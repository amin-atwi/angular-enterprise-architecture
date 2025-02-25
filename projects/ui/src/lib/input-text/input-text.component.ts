import { Component, ElementRef, forwardRef, Renderer2, SecurityContext, viewChild } from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
    selector: 'ui-input-text',
    templateUrl: './input-text.component.html',
    styleUrl: './input-text.component.scss',
    standalone: true,
    imports: [FormsModule],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => InputTextComponent),
            multi: true
        }
    ]
})
export class InputTextComponent implements ControlValueAccessor  {

  // This is a *signal-based* ViewChild,
  // which means inputElement is actually a function you call
  inputElement = viewChild<ElementRef<HTMLInputElement>>('inputElement');

  // OnChange / OnTouched placeholders
  private onChangeFn: (value: string) => void = () => {};
  private onTouchedFn: () => void = () => {};

  constructor(
    private renderer: Renderer2,
    private sanitizer: DomSanitizer,
  ) { }

  /** Called by Angular when the model updates (write the new value to the <input> element). */
  writeValue(obj: string): void {
    const sanitizedValue = this.sanitizer.sanitize(SecurityContext.HTML, obj) || '';
    if (this.inputElement()) {
      this.renderer.setProperty(this.inputElement()?.nativeElement, 'value', sanitizedValue);
    }
  }

  /**
   * Angular will call this method and pass in a function ("fn") that you
   * should call ANY time your <input> value changes.
  */
  registerOnChange(fn:  (value: string) => void): void {
    this.onChangeFn = fn;
    // If <input> already exists in the view, attach listener
    if (this.inputElement()) {
      this.renderer.listen(this.inputElement()?.nativeElement, 'input', (event: Event) => {
        const newValue = (event.target as HTMLInputElement).value;
        this.onChangeFn(newValue);
      });
    }

  }

  /**
   * Angular will call this method and pass in a function ("fn") that you
   * should call ANY time the user "touches" the component (e.g., on blur).
  */
  registerOnTouched(fn: () => void): void {
    this.onTouchedFn = fn;
    // If <input> already exists, attach blur (touched) listener
    if (this.inputElement()) {
      this.renderer.listen(this.inputElement()?.nativeElement, 'blur', () => {
        this.onTouchedFn();
      });
    }
  }

  /**
   * If the form sets the input as disabled (e.g. formControl.disable()),
   * you must update the underlying <input> element to reflect that.
   */
  setDisabledState?(isDisabled: boolean): void {
    if (!this.inputElement()) return;
    
    if (isDisabled) {
      this.renderer.setAttribute(this.inputElement()?.nativeElement, 'disabled', 'true');
    } else {
      this.renderer.removeAttribute(this.inputElement()?.nativeElement, 'disabled');
    }
  }
}