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
        // Ensure routePath is defined and clean
        const routePath = child.route?.replace(/^\//, '') ?? ''; // Remove leading `/` if present
        const pathSegments = routePath.split('/'); // Convert into an array of segments
  
        // Get the base route dynamically from the current URL
        const currentUrlSegments = this.router.url.split('/').filter(Boolean); // Remove empty segments
  
        // Find index of the last matching segment in the current URL
        let baseSegments: string[] = [];
        for (let i = 0; i < currentUrlSegments.length; i++) {
          if (routePath.startsWith(currentUrlSegments[i])) {
            baseSegments = currentUrlSegments.slice(0, i);
            break;
          }
        }
  
        // Construct the full route dynamically
        const fullRoute = [...baseSegments, ...pathSegments];

        // Generate URL tree
        const urlTree = this.router.createUrlTree(fullRoute);
  
        // Check if route is active
        const routeIsActive = this.router.isActive(urlTree, {
          paths: 'subset', // Allow partial matching
          matrixParams: 'ignored',
          queryParams: 'ignored',
          fragment: 'ignored',
        });
  
        return routeIsActive;
      }
      return false;
    });
  }
  

  onRouteChanged(route?: string) {
    this.router.navigate([`${ApplicationRoutes.App}/${route}`]);
  }

}
