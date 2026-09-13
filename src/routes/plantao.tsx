import { createFileRoute } from "@tanstack/react-router";
import { PlantaoShift } from "@/components/plantao-shift";
import { RequireAgent } from "@/components/shell";

export const Route = createFileRoute("/plantao")({
  component: () => (
    <RequireAgent>
      <PlantaoShift />
    </RequireAgent>
  ),
});
