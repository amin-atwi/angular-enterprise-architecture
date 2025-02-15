import { ChangeDetectionStrategy, Component, inject, Input, OnInit } from '@angular/core';
import { Router, RouterLinkActive, RouterLink } from '@angular/router';
import { Observable } from 'rxjs';
import { NgClass, AsyncPipe } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { NavigationDropdown } from '../../../models/navigation-dropdown';
import { NavigationLink } from '../../../models/navigation-link';
import { TranslateModule } from '@ngx-translate/core';
import { MatMenuModule } from '@angular/material/menu';
import { Store } from '@ngrx/store';
import * as CoreSelectors from '../../../../../core/store/core.selectors';
import { ApplicationRoutes } from '../../../../../core/routes-path-definition/application-routes.enum';

@Component({
    selector: 'app-navigation-item',
    templateUrl: './navigation-item.component.html',
    styleUrls: ['./navigation-item.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [
        RouterLinkActive,
        RouterLink,
        MatIconModule,
        NgClass,
        AsyncPipe,
        TranslateModule,
        MatMenuModule
    ]
})
export class NavigationItemComponent implements OnInit {
  
  @Input({ required: true }) item: NavigationLink | NavigationDropdown | undefined;
  @Input() isSubItem = false;
  @Input({ required: true }) extended: boolean | undefined;

  router = inject(Router);
  store = inject(Store);

  isSideNavOpened$: Observable<boolean> | undefined;

  ngOnInit(): void {
    this.isSideNavOpened$ = this.store.select(CoreSelectors.selectIsLeftSideNavOpen);
  }

  isLink(item: NavigationLink | NavigationDropdown | undefined ): item is NavigationLink {
    return item?.type === 'link';
  }

  isDropDown(item: NavigationLink | NavigationDropdown | undefined): item is NavigationDropdown {
    return item?.type === 'dropdown';
  }

  hasActiveChild(parent: NavigationDropdown): boolean | undefined {
    return parent.subRouteItems?.some((child) => {
      if (this.isDropDown(child)) {
        return this.hasActiveChild(child);
      }

      if (this.isLink(child)) {
        const urlTree = this.router.createUrlTree(['app', child.route]);
        const routeIsActive = this.router.isActive(urlTree , {
          matrixParams: 'subset',
          queryParams: 'ignored',
          paths: 'subset',
          fragment: 'ignored',
        });
        return routeIsActive;
      }
      return false;
    });
  }

  onRouteChanged(item: NavigationLink) {
    this.router.navigate([`${ApplicationRoutes.App}/${item.route}`]);
  }

}
