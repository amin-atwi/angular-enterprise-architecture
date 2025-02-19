
import { importProvidersFrom, provideZoneChangeDetection } from "@angular/core";
import { provideRouter, Routes, withRouterConfig } from "@angular/router";
import { IconSvgModule } from "./icon-registry/icon-registry.module";
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient, HttpClientModule} from "@angular/common/http";
import { TranslateLoader, TranslateModule } from "@ngx-translate/core";
import { environment } from "../../environments/environment";
import { CoreEffects } from "./store/core.effects";
import { coreReducer } from "./store/core.reducer";

export interface CoreOptions {
    routes: Routes;
}
export function provideCore({ routes }: CoreOptions) {
    return [
        provideZoneChangeDetection({ eventCoalescing: true }),
        provideEffects([CoreEffects]),
        provideStore({
            core: coreReducer
        }),
        provideStoreDevtools({
        maxAge: 25,
        logOnly: environment.production
        }),
        provideRouter(
            routes,
            withRouterConfig({
                onSameUrlNavigation: 'reload',
            }),
        ),
        // other 3rd party libraries providers like NgRx, provideStore()
        // other application specific providers and setup
        // perform initialization, has to be last
        importProvidersFrom(
            TranslateModule.forRoot({
                defaultLanguage: 'en',
                loader: {
                    provide: TranslateLoader,
                    useFactory: (client: HttpClient) =>
                    new TranslateHttpLoader(client, './i18n/', '.json'),
                    deps: [HttpClient],
              },
            }),
            HttpClientModule,
            IconSvgModule,
        ),
    ];
}