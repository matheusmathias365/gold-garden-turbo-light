import { createFileRoute } from "@tanstack/react-router";
import { EloCase } from "@/components/elo-stage";
import { RequireAgent } from "@/components/shell";

export const Route = createFileRoute("/x/")({
  component: () => (
    <RequireAgent>
      <EloCase />
    </RequireAgent>
  ),
});
