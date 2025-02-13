// @ts-nocheck
import React from 'react';
import { ApplyPluginsType } from 'C:/Users/ASUS/Documents/Gitlab/B23DCCC121_NguyenHuuNam_THLapTrinhWEB/node_modules/@umijs/runtime';
import * as umiExports from './umiExports';
import { plugin } from './plugin';

export function getRoutes() {
  const routes = [
  {
    "path": "/TodoList",
    "exact": true,
    "component": require('@/pages/TodoList/index.tsx').default
  }
];

  // allow user to extend routes
  plugin.applyPlugins({
    key: 'patchRoutes',
    type: ApplyPluginsType.event,
    args: { routes },
  });

  return routes;
}
