import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { TranslateModule } from '@ngx-translate/core';
import { Observable } from 'rxjs/internal/Observable';
import { Store } from '@ngrx/store';
import * as CoreSelectors from '../../../../../core/store/core.selectors';
import { Lang } from '../../../../../core/translation/enums/languages.enum';
import { togglePageDirection } from '../../../../../core/store/core.actions';
import { ChangeLanguageService } from '../../../../../core/translation/services/change-language.service';
import { PageDirection } from '../../../../../core/translation/enums/page-direction.enum';

@Component({
    selector: 'app-settings',
    standalone: true,
    imports: [
        MatMenuModule,
        MatIconModule,
        MatButtonModule,
        TranslateModule,
        AsyncPipe
    ],
    templateUrl: './settings.component.html',
    styleUrl: './settings.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SettingsComponent implements OnInit {

  readonly changeLanguageService = inject(ChangeLanguageService);
  pageDirection$: Observable<PageDirection> | undefined;
  store = inject(Store);


  ngOnInit(): void {
    this.pageDirection$ = this.store.select(CoreSelectors.selectPageDirection)
  }

  changeLanguage(lang: string, pageDirection: string) {
    this.changeLanguageService.changeLang(lang as Lang, 'core.title');
    this.store.dispatch(togglePageDirection({direction: pageDirection as PageDirection}));
  }
  
}
