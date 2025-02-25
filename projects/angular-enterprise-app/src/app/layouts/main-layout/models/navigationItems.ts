
import { Permission } from '../../../core/permissions/enums/premission.enum';
import { ApplicationRoutes } from '../../../core/routes-path-definition/application-routes.enum';
import { NavigationDropdown } from '../models/navigation-dropdown';
import { NavigationLink } from '../models/navigation-link';

export const navigationItems: Array<NavigationDropdown | NavigationLink> = [
    {
        icon: 'coming-soon',
        type: 'link',
        route: `${ApplicationRoutes.ComingSoon}`,
        translationKey: 'core.left-side-bar.coming-soon',
        permission: Permission.CanAccessComingSoon
    }, 
    {
        type: 'dropdown',
        icon: 'forms',
        translationKey: 'core.left-side-bar.forms',
        route: `${ApplicationRoutes.Forms}`,
        permission: Permission.CanAccessForms,
        sidenavLink: 'forms',
        subRouteItems: [
            {
                icon: 'forms',
                type: 'link',
                translationKey: 'core.left-side-bar.input-reactive-forms',
                route: `${ApplicationRoutes.InputReactiveForms}`,
                permission: Permission.CanAccessInputReactiveForms
            }
        ]
    } as NavigationDropdown
];
