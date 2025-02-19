import { ApplicationConfig } from '@angular/core';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { routes } from './app.routes';
import { provideCore } from './core/core';

export const appConfig: ApplicationConfig = {
  providers: [provideCore({ routes }), provideAnimationsAsync()],
};
