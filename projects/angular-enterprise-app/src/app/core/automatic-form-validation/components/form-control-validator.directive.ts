import {
  Directive,
  OnInit,
  OnDestroy,
  Optional,
  Host,
  ComponentRef,
  ViewContainerRef,
  Input,
  Renderer2,
  ElementRef,
} from '@angular/core';
import { NgControl } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { ErrorDynamicGeneratorService } from '../services/dynamic-error-message-generator.service';
import { ValidationErrorMappingService } from '../services/validation-message-generator.service';
import { ErrorMessageContainerDirective } from './error-message-container.directive';
import { ValidationMessageComponent } from './validation-error-message.component';

@Directive({
    // eslint-disable-next-line @angular-eslint/directive-selector
    selector: '[formControlName], [formControl], [appFormControl]',
    providers: [ValidationErrorMappingService, ErrorDynamicGeneratorService],
    standalone: true,
})
export class FormControlValidatorDirective implements OnInit, OnDestroy {
  @Input() errorContainer!: ErrorMessageContainerDirective;
  destroy$ = new Subject();
  ref: ComponentRef<ValidationMessageComponent> | undefined;
  vcr: ViewContainerRef;

  constructor(
    private control: NgControl,
    public renderer: Renderer2,
    public elementRef: ElementRef,
    private viewContainerRef: ViewContainerRef,
    @Optional() @Host() private errorMessageContainerDirective: ErrorMessageContainerDirective,
    private errorDynamicGeneratorService: ErrorDynamicGeneratorService
  ) {
    if (errorMessageContainerDirective) {
      this.vcr = this.errorMessageContainerDirective.getVcr();
    } else {
      this.vcr = this.viewContainerRef;
    }
  }

  ngOnInit() {
    //TODO double check if we need the errorContainer
    if (this.errorContainer) {
      this.vcr = this.errorContainer.getVcr();
    }
    
    if(this.control?.control)
      this.control.control.valueChanges
        .pipe(takeUntil(this.destroy$))
        .subscribe(() => {
          if(this.control?.control) {
            const controlErrors = this.control.control.dirty ? this.control.control.errors : null;
            this.errorDynamicGeneratorService.onErrorOccurred(
              controlErrors,
              this.control,
              this.vcr
            );
          }
      });
  }

  ngOnDestroy() {
    this.destroy$.next(null);
    this.ref?.destroy();
  }
}
