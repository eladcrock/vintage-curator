import { createFileRoute } from "@tanstack/react-router";
import { SiteNav } from "@/components/SiteNav";
import { StudySession } from "@/components/StudySession";
import { getBarStudyItems } from "@/lib/study";

export const Route = createFileRoute("/bar_/study")({
  component: BarStudyPage,
});

function BarStudyPage() {
  const items = getBarStudyItems();
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteNav title="Bottega Pro · Bar" subtitle="Study mode" />
      <main className="mx-auto max-w-2xl px-4 pb-24 pt-4">
        <StudySession
          items={items}
          backTo="/bar"
          backLabel="Back to menu"
          noun="cocktail"
        />
      </main>
    </div>
  );
}