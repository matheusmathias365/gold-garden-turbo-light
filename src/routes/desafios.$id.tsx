import { createFileRoute, Link } from "@tanstack/react-router";
import { ChallengeView } from "@/components/challenge-view";
import { RequireAgent } from "@/components/shell";
import { Btn } from "@/components/ui";
import { challengeById } from "@/lib/challenges";

export const Route = createFileRoute("/desafios/$id")({
  component: ChallengeRoute,
});

function ChallengeRoute() {
  const { id } = Route.useParams();
  return (
    <RequireAgent>
      <Page key={id} />
    </RequireAgent>
  );
}

function Page() {
  const { id } = Route.useParams();
  const challenge = challengeById(id);
  if (!challenge) {
    return (
      <div>
        <p className="font-mono text-sm text-danger">Prova não catalogada.</p>
        <Link to="/desafios" className="mt-4 inline-block">
          <Btn variant="ghost">Voltar aos desafios</Btn>
        </Link>
      </div>
    );
  }
  return <ChallengeView key={challenge.id} challenge={challenge} />;
}
