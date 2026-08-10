import { createFileRoute, Link } from "@tanstack/react-router";
import { BookOpen, NotebookPen, ListChecks, Timer, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "StudySync — Notes, Assignments & Pomodoro in One Place" },
      {
        name: "description",
        content:
          "StudySync keeps your notes, assignment deadlines and focus sessions in one calm workspace, so you always know what to study next.",
      },
      { property: "og:title", content: "StudySync — Your study workspace" },
      {
        property: "og:description",
        content: "Notes, assignment tracking and a Pomodoro timer that logs focus time against your work.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Landing,
});

const features = [
  { icon: NotebookPen, title: "Notes", body: "Capture lecture notes and revise them anywhere, always in sync." },
  { icon: ListChecks, title: "Assignments", body: "Track subjects, due dates and completion at a glance." },
  { icon: Timer, title: "Pomodoro", body: "Focus in 25-minute blocks logged against the assignment you're on." },
  { icon: BarChart3, title: "Progress", body: "See completion rate, pomodoro count and what's due next." },
];

function Landing() {
  return (
    <div className="min-h-screen bg-background">
      <header className="mx-auto flex h-16 max-w-6xl items-center px-4">
        <span className="flex items-center gap-2 font-bold tracking-tight">
          <span className="flex size-8 items-center justify-center rounded-xl bg-primary text-primary-foreground">
            <BookOpen className="size-4" />
          </span>
          StudySync
        </span>
        <div className="ml-auto">
          <Button asChild size="sm">
            <Link to="/auth">Sign in</Link>
          </Button>
        </div>
      </header>

      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-primary/15 via-transparent to-transparent" />
        <div className="relative mx-auto max-w-3xl px-4 py-24 text-center">
          <p className="mb-4 inline-flex rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-muted-foreground">
            Built for students who juggle a lot
          </p>
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-6xl">
            Everything you study, <span className="text-primary">in sync</span>.
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-lg text-muted-foreground">
            Notes, assignment deadlines and focus sessions living together — so you spend your energy studying instead
            of organising.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button asChild size="lg">
              <Link to="/auth">Get started free</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link to="/auth">I already have an account</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-24">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {features.map(({ icon: Icon, title, body }) => (
            <Card key={title}>
              <CardHeader>
                <span className="mb-2 flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Icon className="size-5" />
                </span>
                <CardTitle className="text-lg">{title}</CardTitle>
                <CardDescription>{body}</CardDescription>
              </CardHeader>
              <CardContent />
            </Card>
          ))}
        </div>
      </section>

      <footer className="border-t border-border py-8 text-center text-sm text-muted-foreground">
        © {new Date().getFullYear()} StudySync
      </footer>
    </div>
  );
}
