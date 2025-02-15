import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as CoreActions from './core.actions'

@Injectable()
export class CoreEffects {
    coreToggle$;
    constructor(private actions$: Actions) {
        this.coreToggle$ = createEffect(
          () =>
            this.actions$.pipe(
              ofType(
                CoreActions.toggleLeftSideNav,
                CoreActions.togglePageDirection
              ),
            ),
          { dispatch: false }
        );
    }
}