import { Routes } from '@angular/router';
import { ApplicationRoutes } from './core/routes-path-definition/application-routes.enum';
import { MainLayoutComponent } from './layouts/main-layout/components/main-layout/main-layout.component';

export const routes: Routes = [
    {
        path: ApplicationRoutes.Empty,
        pathMatch: 'full',
        redirectTo: ApplicationRoutes.App,
    },
    {
        path: ApplicationRoutes.App,
        component: MainLayoutComponent,
        loadChildren: () => import('./layouts/main-layout/main.routes')
    }
];
