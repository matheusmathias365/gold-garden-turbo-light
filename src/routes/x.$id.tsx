import { createFileRoute } from "@tanstack/react-router";
import { EloCase } from "@/components/elo-stage";
import { RequireAgent } from "@/components/shell";

export const Route = createFileRoute("/x/$id")({
  component: XRoute,
});

function XRoute() {
  const { id } = Route.useParams();
  return (
    <RequireAgent>
      <EloCase key={id} evId={id} />
    </RequireAgent>
  );
}
