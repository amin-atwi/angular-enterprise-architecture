import { ChangeDetectionStrategy, Component, inject  } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { Store } from '@ngrx/store';
import { BreadcrumbsComponent } from '../breadcrumbs/breadcrumbs.component';
import { MatDialog } from '@angular/material/dialog';

import {MatButtonModule} from '@angular/material/button';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { SettingsComponent } from './settings/settings.component';
import { toggleLeftSideNav } from '../../../../core/store/core.actions';

@Component({
    selector: 'app-header',
    standalone: true,
    imports: [
        MatToolbarModule,
        BreadcrumbsComponent,
        MatIconModule,
        UserProfileComponent,
        MatButtonModule,
        SettingsComponent,
    ],
    templateUrl: './header.component.html',
    styleUrl: './header.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent {
  
  readonly dialog = inject(MatDialog);
  readonly store = inject(Store);

  toggleLeftSideBar(): void {
    this.store.dispatch(toggleLeftSideNav());
  }

  openSettingsDialog(): void {
    this.dialog.open(SettingsComponent, {restoreFocus: false});
  }
  
}
