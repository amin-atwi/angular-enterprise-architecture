import {
  Injectable,
  ComponentRef,
  ComponentFactoryResolver,
  ViewContainerRef,
} from '@angular/core';
import { ControlContainer, NgControl, ValidationErrors } from '@angular/forms';
import { ValidationMessageComponent } from '../components/validation-error-message.component';
import { ErrorMessages, ValidationErrorMappingService } from './validation-message-generator.service';

@Injectable({
  providedIn: 'root',
})
export class ErrorDynamicGeneratorService {
  ref: ComponentRef<ValidationMessageComponent> | undefined;
  vcr: ViewContainerRef | undefined;

  constructor(
    private errorsValidator: ValidationErrorMappingService,
    private resolver: ComponentFactoryResolver
  ) {}

  onErrorOccurred(
    controlErrors: ValidationErrors | null,
    control: NgControl | ControlContainer,
    vcr: ViewContainerRef
  ) {
    if (controlErrors) {
      // Get all errors keys
      const controlErrorsKeys = Object.keys(controlErrors);
      const controlFirstError = controlErrorsKeys[0] as keyof ErrorMessages;
      // Get the corresponding function to create message from map
      const errorMessageFunc =  this.errorsValidator.errorMessages[controlFirstError];  
      if (errorMessageFunc && control.errors) {
        //Get the message from function by passing the corresponding error object
        const message = errorMessageFunc(control.errors[controlFirstError]);
        if (message) { 
          //Create a new component to handle the message
          this.displayError(vcr, message);
        }
      }
    } else {
      if (this.ref !== null) {
        this.displayError(vcr);
      }
    }
  }

  displayError(vcr: ViewContainerRef, message?: string) {
    //Create a new component of ValidationMessageComponent
    if (this.ref === undefined) {
      const factory = this.resolver.resolveComponentFactory(
        ValidationMessageComponent
      );
      //If the optional container was empty, create the component within the wrapper   container
      vcr.clear();
      this.ref = vcr.createComponent(factory);
    }
    if(this.ref)
      this.ref.instance.text = message || "";
  }
}
