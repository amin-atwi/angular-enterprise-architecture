import { createFeatureSelector, createSelector } from "@ngrx/store";
import { CoreState } from "./core.reducer";

export const selectCoreState = createFeatureSelector<CoreState>('core');

export const selectIsLeftSideNavOpen = createSelector(
    selectCoreState,
    (state) => state.isLeftSideNavOpen
)

export const selectPageDirection = createSelector(
    selectCoreState,
    (state) => state.pageDirection
)