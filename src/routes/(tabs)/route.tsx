import { createFileRoute, Outlet } from '@tanstack/react-router';
import React from 'react';
import NavMenu from '../___shared/nav-menu';

export const Route = createFileRoute('/(tabs)')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <React.Fragment>
      <Outlet />
      <NavMenu />
    </React.Fragment>
  );
}
