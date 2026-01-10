import { createRootRoute, Outlet } from '@tanstack/react-router';
import * as React from 'react';
import NavMenu from './___shared/nav-menu';

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  return (
    <React.Fragment>
      <div className="p-8">
        <Outlet />
      </div>
      <NavMenu />
    </React.Fragment>
  );
}
