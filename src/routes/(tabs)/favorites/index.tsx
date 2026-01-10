import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(tabs)/favorites/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/(tabs)/favorites/"!</div>
}
