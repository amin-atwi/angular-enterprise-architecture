# Automatic Form Validation

The `AutomaticFormValidationModule` centralizes error handling for reactive forms. Once imported, every element with a `formControlName` or `formControl` attribute automatically gets validation feedback without manually wiring validators in each template.

## Key pieces

- **FormControlValidatorDirective** – Attached to form controls through its `[formControlName]`/`[formControl]` selector. It listens to value changes, asks the `ErrorDynamicGeneratorService` to generate a message and inserts a `ValidationMessageComponent` in the control's view container.
- **ErrorMessageContainerDirective** – Optional directive (`[appValidationMessageContainer]`) that exposes a `ViewContainerRef`. When present, error messages are rendered in this container instead of directly inside the control component.
- **ValidationMessageComponent** – Displays the translated error text. It simply shows a `<span>` that is hidden when no error exists.
- **ErrorDynamicGeneratorService** – Creates/destroys `ValidationMessageComponent` instances and passes them the message text retrieved from the mapping service.
- **ValidationErrorMappingService** – Maps `ValidationErrors` keys to functions producing translated messages via `@ngx-translate/core`.

## Example usage

`InputReactiveFormsComponent` imports `AutomaticFormValidationModule` and declares a reactive form with several fields.

```ts
import { AutomaticFormValidationModule } from '../../../../core/automatic-form-validation/automatic-form-validation.module';

@Component({
  selector: 'app-input-reactive-forms',
  standalone: true,
  imports: [ReactiveFormsModule, TranslateModule, InputTextComponent, AutomaticFormValidationModule],
  templateUrl: './input-reactive-forms.component.html',
  styleUrl: './input-reactive-forms.component.scss'
})
export class InputReactiveFormsComponent {
  form!: FormGroup;
  // ...
}
```

In the template each custom `<ui-input-text>` simply uses `formControlName`:

```html
<form [formGroup]="form">
  <ui-input-text formControlName="email"></ui-input-text>
</form>
```

No extra markup for validation is required. The directive will inject a `ValidationMessageComponent` under the input whenever a validation error occurs.

## Translation keys

Validation messages are translated using keys from `projects/angular-enterprise-app/public/i18n/en.json` such as:

```json
"validation": {
  "required": "This field is required",
  "invalidEmailError": "Please enter a valid email address",
  "maxlength": "Please enter a value with no more than {{requiredLength}} characters. ({{actualLength}}/{{requiredLength}})",
  "minlength": "Please enter a value more than {{requiredLength}} characters. ({{actualLength}}/{{requiredLength}})"
}
```

The mapping service calls `translate.instant('validation.required')`, `translate.instant('validation.minlength', { requiredLength, actualLength })` and so on, allowing the same keys to be used across the application.
