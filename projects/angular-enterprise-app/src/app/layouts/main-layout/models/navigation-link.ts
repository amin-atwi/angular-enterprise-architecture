import { Permission } from "../../../core/permissions/enums/premission.enum";

export class NavigationLink {
    type: 'link' | 'dropdown' | undefined;
    route: string | undefined;
    translationKey: string | undefined;
    permission: Permission | undefined;
    icon?: string;
}
