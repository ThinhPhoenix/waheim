import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/about/')({
  component: RouteComponent,
});

function RouteComponent() {
  return <a href="https://lordicon.com/">Icons by Lordicon.com</a>;
}
