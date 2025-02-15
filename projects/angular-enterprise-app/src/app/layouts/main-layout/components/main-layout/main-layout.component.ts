import { ChangeDetectionStrategy, ChangeDetectorRef, Component, DestroyRef, inject, OnInit } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { AsyncPipe } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RouterOutlet } from '@angular/router';
import { Observable } from 'rxjs';
import { MatSidenavModule } from '@angular/material/sidenav';
import { LeftSideBarComponent } from '../left-side-bar/left-side-bar.component';
import { BidiModule } from '@angular/cdk/bidi';
import { Store } from '@ngrx/store';
import * as CoreSelectors from '../../../../core/store/core.selectors';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { PageDirection } from '../../../../core/translation/enums/page-direction.enum';

@Component({
    selector: 'app-main-layout',
    standalone: true,
    imports: [
        HeaderComponent,
        RouterOutlet,
        MatSidenavModule,
        MatProgressSpinnerModule,
        AsyncPipe,
        BidiModule,
        LeftSideBarComponent
    ],
    templateUrl: './main-layout.component.html',
    styleUrl: './main-layout.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainLayoutComponent implements OnInit{

  store = inject(Store)
  cdr = inject(ChangeDetectorRef)

  isSpinning$: Observable<boolean> | undefined;
  isLeftSideNavOpen$!: Observable<boolean>;
  destroyRef = inject(DestroyRef);
  pageDirection: PageDirection | 'auto' = 'auto';

  ngOnInit(): void {
    this.isLeftSideNavOpen$ = this.store.select(CoreSelectors.selectIsLeftSideNavOpen);

    this.store.select(CoreSelectors.selectPageDirection)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((pageDirection) => {
        this.pageDirection = pageDirection;
        this.cdr.detectChanges();
      })
  }

}
