import { inject, Inject, Injectable } from '@angular/core';
import { InterpolationParameters, TranslateService, Translation, TranslationObject } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { DOCUMENT } from '@angular/common';
import { LayoutService } from '@layouts/main-layout/services/layout.service';
import { PageDirection } from '../enums/page-direction.enum';
import { Lang } from '../enums/languages.enum';

@Injectable({ providedIn: 'root' })
export class TranslationService {

    translateService = inject(TranslateService);
    layoutService = inject(LayoutService);

    constructor(
        @Inject(DOCUMENT) private document: Document,
    ) { }

    use(value: Lang): void {
        this.translateService.use(value);
    }

    init(): void {
        const defaultLanguage: Lang = (localStorage.getItem('language') as Lang) || Lang.English;
        this.use(defaultLanguage);
    }

    getCurrentLang(): Lang {
        return this.translateService.currentLang as Lang;
    }

    translate(key: string, interpolateParams?: InterpolationParameters): Observable<string> {
        return this.translateService.stream(key, interpolateParams);
    }

    instantTranslate(key: string) {
        return this.translateService.instant(key);
    }

    currentLang(): Observable<Lang> {
        return this.translateService.onLangChange.pipe(
            startWith({ lang: this.getCurrentLang() }),
            map((res) => res.lang as Lang)
        );
    }

    get(key: string, interpolateParams?: Translation | TranslationObject): Observable<Translation | TranslationObject> {
        return this.translateService.get(key, interpolateParams);
    }

    setDefaultLanguage() {
        let defaultLanguage: Lang = localStorage.getItem('language') as Lang;
        if (defaultLanguage === Lang.Arabic) {
            defaultLanguage = Lang.Arabic;
            localStorage.setItem('language', defaultLanguage);
        }
        else if (defaultLanguage === null) {
            defaultLanguage = Lang.English;
            localStorage.setItem('language', defaultLanguage);
        }
        this.document.body.dir = defaultLanguage === Lang.Arabic ? PageDirection.RTL : PageDirection.LTR;
        this.use(defaultLanguage);
    }
}
