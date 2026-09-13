import { createFileRoute, Link } from "@tanstack/react-router";
import { QrCase } from "@/components/qr-stage";
import { RequireAgent } from "@/components/shell";
import { Btn } from "@/components/ui";
import { qrById } from "@/lib/qr-caso";

export const Route = createFileRoute("/qr/$id")({
  component: QrRoute,
});

function QrRoute() {
  const { id } = Route.useParams();
  return (
    <RequireAgent>
      <Page key={id} />
    </RequireAgent>
  );
}

function Page() {
  const { id } = Route.useParams();
  if (!qrById(id)) {
    return (
      <div>
        <p className="font-mono text-sm text-danger">Cena não catalogada.</p>
        <Link to="/qr" className="mt-4 inline-block">
          <Btn variant="ghost">Voltar ao QR</Btn>
        </Link>
      </div>
    );
  }
  return <QrCase key={id} sceneId={id} />;
}
