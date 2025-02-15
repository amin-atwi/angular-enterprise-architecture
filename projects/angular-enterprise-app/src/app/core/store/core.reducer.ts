import { createReducer, on } from "@ngrx/store";
import * as CoreActions from './core.actions';
import { PageDirection } from "../translation/enums/page-direction.enum";

export interface CoreState {
    isLeftSideNavOpen: boolean;
    pageDirection: PageDirection
}

export const initialState: CoreState = {
    isLeftSideNavOpen: true,
    pageDirection: PageDirection.LTR
};

export const coreReducer = createReducer(
  initialState,

  on(CoreActions.toggleLeftSideNav, (state) => ({
    ...state,
    isLeftSideNavOpen: !state.isLeftSideNavOpen,
  })),

  on(CoreActions.togglePageDirection, (state, { direction }) => ({
    ...state,
    pageDirection: direction
  }))
);
