import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ErrorMessageContainerDirective } from './components/error-message-container.directive';
import { FormControlValidatorDirective } from './components/form-control-validator.directive';
import { ValidationMessageComponent } from './components/validation-error-message.component';

@NgModule({
    imports: [
        CommonModule,
        MatFormFieldModule,
        ValidationMessageComponent,
        FormControlValidatorDirective,
        ErrorMessageContainerDirective,
    ],
    exports: [
        ValidationMessageComponent,
        FormControlValidatorDirective,
        ErrorMessageContainerDirective,
    ],
})
export class AutomaticFormValidationModule { }
