import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { Store } from '@ngrx/store';
import { TranslateModule } from '@ngx-translate/core';
import * as CoreSelectors from '../../../../../core/store/core.selectors';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { PageDirection } from '../../../../../core/translation/enums/page-direction.enum';

@Component({
    selector: 'app-user-profile',
    standalone: true,
    imports: [
        MatMenuModule,
        MatIconModule,
        MatButtonModule,
        TranslateModule,
        AsyncPipe
    ],
    templateUrl: './user-profile.component.html',
    styleUrl: './user-profile.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserProfileComponent implements OnInit {
  
  pageDirection$: Observable<PageDirection> | undefined;
  store = inject(Store);

  ngOnInit(): void {
    this.pageDirection$ = this.store.select(CoreSelectors.selectPageDirection)
  }
}
