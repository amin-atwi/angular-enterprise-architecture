import {  Inject, Injectable } from '@angular/core';
import { Lang } from '../enums/languages.enum';
import { DOCUMENT } from '@angular/common';
import { Title } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';
import { PageDirection } from '../enums/page-direction.enum';
import { Store } from '@ngrx/store';

@Injectable({ providedIn: 'root' })
export class ChangeLanguageService {
    lang = Lang;

    constructor(
        public translate: TranslateService,
        @Inject(DOCUMENT) private document: Document,
        private titleService: Title,
        private store: Store
    ) { }

    async changeLang(lang: Lang, appTitle: string) {
        try {
            localStorage.setItem('language', lang === this.lang.Arabic ? Lang.Arabic : Lang.English);
            await this.translate.use(lang).toPromise();
            const pageDirection = lang === this.lang.Arabic ? PageDirection.RTL : PageDirection.LTR;
            this.document.body.dir = pageDirection;
            this.titleService.setTitle(this.translate.instant(appTitle));
        } catch (error ) {
            console.error(error);
        }
    }
}
