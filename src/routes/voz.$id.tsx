import { createFileRoute, Link } from "@tanstack/react-router";
import { VozCase } from "@/components/voz-stage";
import { RequireAgent } from "@/components/shell";
import { Btn } from "@/components/ui";
import { vozById } from "@/lib/voz-caso";

export const Route = createFileRoute("/voz/$id")({
  component: VozRoute,
});

function VozRoute() {
  const { id } = Route.useParams();
  return (
    <RequireAgent>
      <Page key={id} />
    </RequireAgent>
  );
}

function Page() {
  const { id } = Route.useParams();
  if (!vozById(id)) {
    return (
      <div>
        <p className="font-mono text-sm text-danger">Cena não catalogada.</p>
        <Link to="/voz" className="mt-4 inline-block">
          <Btn variant="ghost">Voltar à voz</Btn>
        </Link>
      </div>
    );
  }
  return <VozCase key={id} sceneId={id} />;
}
