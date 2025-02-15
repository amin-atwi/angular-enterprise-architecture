import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { NavigationItemComponent } from './navigation-item/navigation-item.component';
import { NavigationLink } from '../../models/navigation-link';
import { NavigationDropdown } from '../../models/navigation-dropdown';
import { navigationItems } from '../../models/navigationItems';

@Component({
    selector: 'app-left-side-bar',
    templateUrl: './left-side-bar.component.html',
    styleUrls: ['./left-side-bar.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [NavigationItemComponent]
})
export class LeftSideBarComponent {

  navigationList: Array<NavigationLink | NavigationDropdown> = navigationItems;
  extended = false;

  route = inject(Router);
  cdr = inject(ChangeDetectorRef);

  navigate(url: string): void {
    this.route.navigate([url]);
  }
}
