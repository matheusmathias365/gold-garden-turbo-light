import { createFileRoute, Link } from "@tanstack/react-router";
import { LabStage } from "@/components/lab-stage";
import { RequireAgent } from "@/components/shell";
import { TerminalSoc } from "@/components/terminal-soc";
import { Btn } from "@/components/ui";
import { labById } from "@/lib/lab-data";

export const Route = createFileRoute("/lab/$id")({
  component: () => (
    <RequireAgent>
      <Page />
    </RequireAgent>
  ),
});

function Page() {
  const { id } = Route.useParams();
  if (id === "soc") return <TerminalSoc />;
  const lab = labById(id);
  if (!lab) {
    return (
      <div>
        <p className="font-mono text-sm text-danger">Evidência não catalogada.</p>
        <Link to="/lab" className="mt-4 inline-block">
          <Btn variant="ghost">Voltar ao laboratório</Btn>
        </Link>
      </div>
    );
  }
  return <LabStage lab={lab} />;
}
