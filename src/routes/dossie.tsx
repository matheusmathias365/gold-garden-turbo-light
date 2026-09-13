import { createFileRoute } from "@tanstack/react-router";
import { Dossie001 } from "@/components/dossie-001";
import { RequireAgent } from "@/components/shell";

export const Route = createFileRoute("/dossie")({
  component: () => (
    <RequireAgent>
      <Dossie001 />
    </RequireAgent>
  ),
});
