import { createFileRoute, Link } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { Trash2, Plus, Timer } from "lucide-react";
import { toast } from "sonner";
import { api } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Checkbox } from "@/components/ui/checkbox";
import { Skeleton } from "@/components/ui/skeleton";

export const Route = createFileRoute("/_authenticated/assignments")({
  head: () => ({
    meta: [
      { title: "Assignments — StudySync" },
      { name: "description", content: "Track assignment subjects, due dates and completion progress in StudySync." },
      { property: "og:title", content: "StudySync Assignments" },
      { property: "og:description", content: "Never miss a deadline again." },
    ],
  }),
  component: AssignmentsPage,
});

function AssignmentsPage() {
  const qc = useQueryClient();
  const [title, setTitle] = useState("");
  const [subject, setSubject] = useState("");
  const [dueDate, setDueDate] = useState("");

  const { data: assignments, isLoading } = useQuery({
    queryKey: ["assignments"],
    queryFn: async () => {
      return api.assignments();
    },
  });

  const invalidate = () => {
    qc.invalidateQueries({ queryKey: ["assignments"] });
    qc.invalidateQueries({ queryKey: ["dashboard"] });
  };

  const add = useMutation({
    mutationFn: async () => {
      await api.createAssignment(title, subject, dueDate);
    },
    onSuccess: () => {
      toast.success("Assignment added");
      setTitle("");
      setSubject("");
      setDueDate("");
      invalidate();
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const toggle = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: string }) => {
      await api.updateAssignment(id, { status: status === "Completed" ? "Pending" : "Completed" });
    },
    onSuccess: invalidate,
  });

  const remove = useMutation({
    mutationFn: async (id: string) => {
      await api.deleteAssignment(id);
    },
    onSuccess: () => {
      toast.success("Assignment deleted");
      invalidate();
    },
  });

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Assignments</h1>
        <p className="text-muted-foreground">Deadlines, subjects and focus progress.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">New assignment</CardTitle>
        </CardHeader>
        <CardContent>
          <form
            className="grid gap-3 sm:grid-cols-[1fr_1fr_auto_auto]"
            onSubmit={(e) => {
              e.preventDefault();
              add.mutate();
            }}
          >
            <Input placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
            <Input placeholder="Subject" value={subject} onChange={(e) => setSubject(e.target.value)} required />
            <Input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} required />
            <Button type="submit" disabled={add.isPending}>
              <Plus className="size-4" /> Add
            </Button>
          </form>
        </CardContent>
      </Card>

      {isLoading ? (
        <Skeleton className="h-40 w-full" />
      ) : assignments && assignments.length > 0 ? (
        <div className="space-y-3">
          {assignments.map((a) => {
            const progress = Math.min(100, ((a.pomodoros_completed ?? 0) / 10) * 100);
            return (
              <Card key={a.id}>
                <CardContent className="flex flex-wrap items-center gap-4 pt-6">
                  <Checkbox
                    checked={a.status === "Completed"}
                    onCheckedChange={() => toggle.mutate({ id: a.id, status: a.status })}
                    aria-label="Toggle completed"
                  />
                  <div className="min-w-40 flex-1">
                    <p className={a.status === "Completed" ? "font-medium line-through opacity-60" : "font-medium"}>
                      {a.title}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {a.subject} · due {a.due_date}
                    </p>
                    <div className="mt-2 flex items-center gap-2">
                      <Progress value={progress} className="h-2 max-w-48" />
                      <span className="text-xs text-muted-foreground">{a.pomodoros_completed ?? 0}/10 focus sessions</span>
                    </div>
                  </div>
                  <Badge variant={a.status === "Completed" ? "default" : "secondary"}>{a.status}</Badge>
                  <Button asChild size="sm" variant="outline">
                    <Link to="/pomodoro" search={{ assignment: a.id }}>
                      <Timer className="size-4" /> Focus
                    </Link>
                  </Button>
                  <Button size="icon" variant="ghost" aria-label="Delete" onClick={() => remove.mutate(a.id)}>
                    <Trash2 className="size-4 text-destructive" />
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      ) : (
        <p className="text-sm text-muted-foreground">No assignments yet — add one above.</p>
      )}
    </div>
  );
}
