

import { createAction, props } from '@ngrx/store';
import { PageDirection } from '../translation/enums/page-direction.enum';

export const toggleLeftSideNav = createAction('[Layout] Toggle Left Side Nav');

export const togglePageDirection = createAction('[Layout] Toggle Page Directon', props<{ direction: PageDirection }>());
