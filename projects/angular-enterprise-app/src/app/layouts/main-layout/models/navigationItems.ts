
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
    }
];
