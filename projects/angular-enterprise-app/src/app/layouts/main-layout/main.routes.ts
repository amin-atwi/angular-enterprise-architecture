import { Routes } from "@angular/router";
import { ApplicationRoutes } from "../../core/routes-path-definition/application-routes.enum";

export default <Routes> [
    {
        path: ApplicationRoutes.ComingSoon,
        loadComponent: () => import('../../features/coming-soon/components/coming-soon/coming-soon.component').then(c => c.ComingSoonComponent)
    }
]