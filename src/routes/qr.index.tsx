import { createFileRoute } from "@tanstack/react-router";
import { QrCase } from "@/components/qr-stage";
import { RequireAgent } from "@/components/shell";

export const Route = createFileRoute("/qr/")({
  component: () => (
    <RequireAgent>
      <QrCase />
    </RequireAgent>
  ),
});
