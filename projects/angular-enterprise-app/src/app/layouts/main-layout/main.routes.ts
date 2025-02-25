import { Routes } from "@angular/router";
import { ApplicationRoutes } from "../../core/routes-path-definition/application-routes.enum";
import { FormsComponent } from "../../features/forms/components/forms/forms.component";

export default <Routes> [
    {
        path: ApplicationRoutes.ComingSoon,
        loadComponent: () => import('../../features/coming-soon/components/coming-soon/coming-soon.component').then(c => c.ComingSoonComponent)
    },
    {
        path: ApplicationRoutes.Forms,
        component: FormsComponent,
        loadChildren: () => import('../../features/forms/forms.routes')
    }
]