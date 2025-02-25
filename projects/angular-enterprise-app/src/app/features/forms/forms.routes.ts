import { Routes } from '@angular/router';
import { ApplicationRoutes } from '../../core/routes-path-definition/application-routes.enum';
import { FormsComponent } from './components/forms/forms.component';

export default <Routes>  [
    {
        path: ApplicationRoutes.Empty,
        pathMatch: 'full',
        redirectTo: ApplicationRoutes.InputReactiveForms,
    },
    {
        path: ApplicationRoutes.InputReactiveForms,
        loadComponent: () => import('./components/input-reactive-forms/input-reactive-forms.component').then(c => c.InputReactiveFormsComponent)
    }
];
