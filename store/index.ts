import { configureStore } from '@reduxjs/toolkit';
import alertReducer from './features/alerts/alertSlice';
import { communityApi } from './features/community/communityApi';
import { leagueApi } from './features/league/leagueApi';
import loadingReducer from './features/loading/loadingSlice';
import { lookingForApi } from './features/lookingFor/lookingForApi';
import { matchApi } from './features/match/matchApi';
import { playerApi } from './features/player/playerApi'; // Import playerApi
import { teamApi } from './features/team/teamApi';
import { uploadApi } from './features/upload/uploadApi';
import { userApi } from './features/user/userApi';
import userReducer from './features/user/userSlice';

export const store = configureStore({
  reducer: {
    [userApi.reducerPath]: userApi.reducer,  
    [playerApi.reducerPath]: playerApi.reducer,  
    [leagueApi.reducerPath]: leagueApi.reducer,  
    [matchApi.reducerPath]: matchApi.reducer,  
    [teamApi.reducerPath]: teamApi.reducer,  
    [uploadApi.reducerPath]: uploadApi.reducer,  
    [communityApi.reducerPath]: communityApi.reducer,  
    [lookingForApi.reducerPath]: lookingForApi.reducer,  

    user: userReducer,
    alert: alertReducer,
    loading: loadingReducer,
  },
  middleware: (getDefaultMiddleware) => {
    // Ensure you're spreading the default middleware
    return getDefaultMiddleware().concat(
      userApi.middleware,  
      playerApi.middleware,
      matchApi.middleware,
      leagueApi.middleware,
      teamApi.middleware,
      uploadApi.middleware,
      communityApi.middleware,
      lookingForApi.middleware,
    );
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
