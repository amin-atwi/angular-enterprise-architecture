import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { RouteCrumbsList } from "../../../core/models/bread-crumbs/router-crumbs-list.model";

@Injectable({
    providedIn: 'root',
})
export class LayoutService {

    breadcrumbsRoutesSubject = new BehaviorSubject<RouteCrumbsList | undefined>(undefined);
    breadcrumbsRoutes$ = this.breadcrumbsRoutesSubject.asObservable();

    updateBreadCrumbsRouter(data: RouteCrumbsList): void {
        this.breadcrumbsRoutesSubject.next(data);
    }
}