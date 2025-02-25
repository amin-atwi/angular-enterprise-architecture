import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
    // eslint-disable-next-line @angular-eslint/directive-selector
    selector: '[appValidationMessageContainer]',
    exportAs: 'appValidationMessageContainer',
    standalone: true,
})
export class ErrorMessageContainerDirective {
  
  constructor(private vcr: ViewContainerRef) {}

  getVcr() {
    return this.vcr;
  }
}
