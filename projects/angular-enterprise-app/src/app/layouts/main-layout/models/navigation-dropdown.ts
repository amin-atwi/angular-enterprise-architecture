

import { Permission } from '../../../core/permissions/enums/premission.enum';
import { ApplicationRoutes } from '../../../core/routes-path-definition/application-routes.enum';
import { NavigationLink } from './navigation-link';

export class NavigationDropdown {
    type: 'link' | 'dropdown' | undefined;
    icon: string | undefined;
    translationKey: string | undefined;
    subRouteItems: NavigationLink[] | undefined;
    sidenavLink?: string;
    route: ApplicationRoutes | undefined;
    permission: Permission | undefined;
}
