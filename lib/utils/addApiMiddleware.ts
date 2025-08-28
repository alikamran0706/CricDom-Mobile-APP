// src/utils/addApiMiddleware.ts
export const addApiMiddleware = (getDefaultMiddleware: any, apis: any[]) =>
  apis.reduce((middleware, api) => middleware.concat(api.middleware), getDefaultMiddleware());
