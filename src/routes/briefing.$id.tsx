import { createFileRoute, Link } from "@tanstack/react-router";
import { LessonView } from "@/components/lesson-view";
import { RequireAgent } from "@/components/shell";
import { Btn } from "@/components/ui";
import { LESSONS } from "@/lib/course";

export const Route = createFileRoute("/briefing/$id")({
  component: () => (
    <RequireAgent>
      <Page />
    </RequireAgent>
  ),
});

function Page() {
  const { id } = Route.useParams();
  const lesson = LESSONS.find((l) => l.id === id);
  if (!lesson) {
    return (
      <div>
        <p className="font-mono text-sm text-danger">Arquivo não catalogado.</p>
        <Link to="/briefing" className="mt-4 inline-block">
          <Btn variant="ghost">Voltar ao dossiê</Btn>
        </Link>
      </div>
    );
  }
  return <LessonView lesson={lesson} />;
}
