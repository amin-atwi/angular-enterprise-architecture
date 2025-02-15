import { ChangeDetectionStrategy, ChangeDetectorRef, Component, DestroyRef, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { NgClass } from '@angular/common';
import { RouteCrumbsList } from '../../../../core/models/bread-crumbs/router-crumbs-list.model';
import { LayoutService } from '../../services/layout.service';
import { RouteCrumb } from '../../../../core/models/bread-crumbs/route-crumb.model';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ApplicationRoutes } from '../../../../core/routes-path-definition/application-routes.enum';

@Component({
    selector: 'app-breadcrumbs',
    templateUrl: './breadcrumbs.component.html',
    styleUrls: ['./breadcrumbs.component.scss'],
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        NgClass,
        TranslateModule,
    ]
})
export class BreadcrumbsComponent implements OnInit {
  
  cdr = inject(ChangeDetectorRef)
  router = inject(Router)
  layoutService = inject(LayoutService)
  private destroyRef = inject(DestroyRef);
  
  routeCrumbsList: RouteCrumbsList | undefined = undefined;

  ngOnInit(): void {
    this.layoutService.breadcrumbsRoutes$
    .pipe(takeUntilDestroyed(this.destroyRef))
    .subscribe(data => {
      if (data) {
        this.routeCrumbsList = data;
        this.cdr.detectChanges();
      }
    })

  }

  getClasses(crumb: RouteCrumb, index: number) {
    if (index === (this.routeCrumbsList?.crumbs?.length || 0) - 1) {
      return crumb.classes + ' cursor-pointer font-medium text-[15px] text-accent';
    }
    return crumb.classes + ' cursor-pointer font-medium text-primary text-[15px]';
  }

  onRouterChanged(crumb: RouteCrumb) {
    this.router.navigate([`${ApplicationRoutes.App}/${crumb.route}`], { queryParams: crumb.queryParameters });
  }
}
