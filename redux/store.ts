import { configureStore } from '@reduxjs/toolkit';
import themeState from './themeState';
import sheetState from './sheetState';
import premiumPlanState from './premiumPlanState';
import calendarState from './calendarState';
import iconState from './iconState';
import modalState from './modalState';
import toolBarState from './toolBarState';
import drawingToolsState from './drawingToolsState';
import searchState from './searchState';
import onBoardState from './onBoardState';
import curdDiaryState from './curdDiaryState';
import affirmationState from './affirmationState';
import moodBoardState from './moodBoardState';
import passwordState from './passwordState';
import userState from './userState';
import backupState from './backupState';
import reminderState from './reminderState';

export const store = configureStore({
  reducer:{
    themeState:themeState,
    sheetState:sheetState,
    premiumPlanState:premiumPlanState,
    calendarState:calendarState,
    iconState:iconState,
    modalState:modalState,
    toolBarState:toolBarState,
    drawingToolState:drawingToolsState,
    searchState:searchState,
    onBoardState:onBoardState,
    curdDiaryState:curdDiaryState,
    affirmationState:affirmationState,
    moodBoardState:moodBoardState,
    passwordState:passwordState,
    userState:userState,
    backupState:backupState,
    reminderState:reminderState
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck:false
    }),
})