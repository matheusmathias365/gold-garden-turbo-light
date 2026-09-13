import { createFileRoute } from "@tanstack/react-router";
import { VozCase } from "@/components/voz-stage";
import { RequireAgent } from "@/components/shell";

export const Route = createFileRoute("/voz/")({
  component: () => (
    <RequireAgent>
      <VozCase />
    </RequireAgent>
  ),
});
