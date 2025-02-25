import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputTextComponent } from '../../../../../../../ui/src/public-api';
import { AutomaticFormValidationModule } from '../../../../core/automatic-form-validation/automatic-form-validation.module';
import { ApplicationRoutes } from '../../../../core/routes-path-definition/application-routes.enum';
import { LayoutService } from '../../../../layouts/main-layout/services/layout.service';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-input-reactive-forms',
  standalone: true,
  imports: [ReactiveFormsModule, TranslateModule, InputTextComponent, AutomaticFormValidationModule],
  templateUrl: './input-reactive-forms.component.html',
  styleUrl: './input-reactive-forms.component.scss'
})
export class InputReactiveFormsComponent {
  
  form!: FormGroup;
  layoutService = inject(LayoutService)
  formBuilder = inject(FormBuilder)


  ngOnInit(): void {
    this.layoutService.updateBreadCrumbsRouter({
      crumbs: [
        {
          route: `${ApplicationRoutes.Forms}/${ApplicationRoutes.InputReactiveForms}`,
          translationKey: 'core.left-side-bar.input-reactive-forms',
        }
      ],
    });

    this.form = this.formBuilder.group({
      fristName: new FormControl({ value: '', disabled: false }, [Validators.required, Validators.minLength(3)]),
      lastName: new FormControl({ value: '', disabled: false }, [Validators.required, Validators.minLength(3)]),
      email: new FormControl({ value: '', disabled: false }, [Validators.required, Validators.email]),
      fathersName: new FormControl({value: '', disabled: false}, [Validators.required, Validators.minLength(3)]),
      mothersName: new FormControl({value: '', disabled: false}, [Validators.required, Validators.minLength(3)]),
    });

  }

  submit() {
    console.log(this.form.value);
  }
}
