import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { NotebookPen, ListChecks, Timer, CheckCircle2 } from "lucide-react";
import { api } from "@/lib/api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";

export const Route = createFileRoute("/_authenticated/dashboard")({
  head: () => ({
    meta: [
      { title: "Dashboard — StudySync" },
      { name: "description", content: "Your study overview: notes, assignments, focus sessions and what's due next." },
      { property: "og:title", content: "StudySync Dashboard" },
      { property: "og:description", content: "Track notes, assignments and pomodoros at a glance." },
    ],
  }),
  component: Dashboard,
});

function dueLabel(due: string) {
  const days = Math.round((new Date(due + "T00:00:00").getTime() - new Date().setHours(0, 0, 0, 0)) / 86400000);
  if (days === 0) return "Due today";
  if (days === 1) return "Due tomorrow";
  if (days > 1) return `Due in ${days} days`;
  return `Overdue by ${Math.abs(days)} days`;
}

function Dashboard() {
  const { data, isLoading } = useQuery({
    queryKey: ["dashboard"],
    queryFn: async () => {
      const [profile, notes, assignments] = await Promise.all([api.me(), api.notes(), api.assignments()]);
      return {
        name: profile.user.full_name || "there",
        notes: notes.slice(0, 5),
        assignments,
      };
    },
  });

  if (isLoading || !data) return <Skeleton className="h-64 w-full" />;

  const all = data.assignments;
  const completed = all.filter((a) => a.status === "Completed").length;
  const pomodoros = all.reduce((sum, a) => sum + (a.pomodoros_completed ?? 0), 0);
  const rate = all.length ? Math.round((completed / all.length) * 100) : 0;
  const upcoming = all.filter((a) => a.status === "Pending").slice(0, 5);

  const stats = [
    { label: "Notes", value: data.notes.length, icon: NotebookPen },
    { label: "Assignments", value: all.length, icon: ListChecks },
    { label: "Completed", value: completed, icon: CheckCircle2 },
    { label: "Pomodoros", value: pomodoros, icon: Timer },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Hi {data.name} 👋</h1>
        <p className="text-muted-foreground">Here's where your studying stands today.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map(({ label, value, icon: Icon }) => (
          <Card key={label}>
            <CardContent className="flex items-center gap-4 pt-6">
              <span className="flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Icon className="size-5" />
              </span>
              <div>
                <p className="text-2xl font-bold">{value}</p>
                <p className="text-sm text-muted-foreground">{label}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Completion rate</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <Progress value={rate} />
          <p className="text-sm text-muted-foreground">
            {completed} of {all.length} assignments completed ({rate}%)
          </p>
        </CardContent>
      </Card>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Upcoming assignments</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {upcoming.length === 0 && <p className="text-sm text-muted-foreground">Nothing pending. Nice work.</p>}
            {upcoming.map((a) => (
              <div key={a.id} className="flex items-center justify-between gap-3 rounded-lg border border-border p-3">
                <div>
                  <p className="font-medium">{a.title}</p>
                  <p className="text-xs text-muted-foreground">{a.subject}</p>
                </div>
                <span className="text-xs text-muted-foreground">{dueLabel(a.due_date)}</span>
              </div>
            ))}
            <Link to="/assignments" className="inline-block text-sm font-medium text-primary hover:underline">
              View all assignments →
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Recent notes</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {data.notes.length === 0 && <p className="text-sm text-muted-foreground">No notes yet.</p>}
            {data.notes.map((n) => (
              <div key={n.id} className="rounded-lg border border-border p-3 text-sm font-medium">
                {n.title}
              </div>
            ))}
            <Link to="/notes" className="inline-block text-sm font-medium text-primary hover:underline">
              Go to notes →
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
