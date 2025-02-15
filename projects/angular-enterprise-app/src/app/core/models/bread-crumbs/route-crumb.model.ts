export interface RouteCrumb {
    translationKey: string;
    route: string;
    isRootBlock?: boolean;
    classes?: string;
    queryParameters?: object;
}
