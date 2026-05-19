import { createFileRoute } from "@tanstack/react-router";
import { SiteNav } from "@/components/SiteNav";
import { StudySession } from "@/components/StudySession";
import { getFoodStudyItems } from "@/lib/study";

export const Route = createFileRoute("/food_/study")({
  component: FoodStudyPage,
});

function FoodStudyPage() {
  const items = getFoodStudyItems();
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteNav title="Bottega Pro · Food" subtitle="Study mode" />
      <main className="mx-auto max-w-2xl px-4 pb-24 pt-4">
        <StudySession
          items={items}
          backTo="/food"
          backLabel="Back to menu"
          noun="dish"
        />
      </main>
    </div>
  );
}