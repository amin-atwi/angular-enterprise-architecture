import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

type LengthParams = {
  actualLength?: number;
  requiredLength?: number;
}

type NumberSizeParams = {
  actual?: number;
  max?: number;
  min?: number;
}

export type ErrorMessages = {
  required: () => string;
  email: () => string;
  minlength: (params: LengthParams) => string;
  maxlength: (params: LengthParams) => string;
  max: (params: NumberSizeParams) => string;
  min: (params: NumberSizeParams) => string;
  nonEmptyString: () => string;
  invalidSearchTerm: () => string;
  regularExpression: () => string;
  invalidDateError: () => string;
};

@Injectable({
  providedIn: 'root',
})
export class ValidationErrorMappingService {
  
  errorMessages: ErrorMessages;

  constructor(public translate: TranslateService) {
    this.errorMessages = {
      required: () => this.translate.instant('validation.required'),
      minlength: ({ actualLength, requiredLength }: LengthParams) =>
        this.translate.instant('validation.minlength', {
          actualLength,
          requiredLength,
        }),
      maxlength: ({ actualLength, requiredLength }: LengthParams) =>
        this.translate.instant('validation.maxlength', {
          actualLength,
          requiredLength,
        }),
      max: ({ actual, max }: NumberSizeParams) =>
        this.translate.instant('validation.max', { actual, max }),
      min: ({ actual, min }: NumberSizeParams) =>
        this.translate.instant('validation.min', { actual, min }),
      email: () => this.translate.instant('validation.invalidEmailError'),
      nonEmptyString: () => this.translate.instant('validation.nonEmptyString'),
      invalidSearchTerm: () => this.translate.instant('validation.invalidSearchTerm'),
      regularExpression: () => this.translate.instant('validation.regularExpression'),
      invalidDateError: () => this.translate.instant('validation.invalidDateError'),
    };
  }
}
