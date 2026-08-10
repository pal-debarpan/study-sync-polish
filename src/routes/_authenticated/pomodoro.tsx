import { createFileRoute } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";
import { Play, Pause, RotateCcw } from "lucide-react";
import { toast } from "sonner";
import { z } from "zod";
import { api } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const FOCUS_SECONDS = 25 * 60;

export const Route = createFileRoute("/_authenticated/pomodoro")({
  validateSearch: z.object({ assignment: z.string().optional() }),
  head: () => ({
    meta: [
      { title: "Pomodoro Timer — StudySync" },
      { name: "description", content: "Run 25-minute focus sessions and log them against your assignments." },
      { property: "og:title", content: "StudySync Pomodoro" },
      { property: "og:description", content: "Focus in 25-minute blocks and watch your progress build." },
    ],
  }),
  component: PomodoroPage,
});

function PomodoroPage() {
  const qc = useQueryClient();
  const search = Route.useSearch();
  const navigate = Route.useNavigate();
  const [secondsLeft, setSecondsLeft] = useState(FOCUS_SECONDS);
  const [running, setRunning] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const { data: assignments } = useQuery({
    queryKey: ["assignments"],
    queryFn: async () => {
      return api.assignments();
    },
  });

  const selectedId = search.assignment;
  const selected = assignments?.find((a) => a.id === selectedId);

  useEffect(() => {
    if (!running) return;
    intervalRef.current = setInterval(() => {
      setSecondsLeft((s) => (s <= 1 ? 0 : s - 1));
    }, 1000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [running]);

  useEffect(() => {
    if (secondsLeft !== 0) return;
    setRunning(false);
    setSecondsLeft(FOCUS_SECONDS);
    toast.success("Session complete — take a break!");
    if (!selectedId || !selected) return;
    void api.updateAssignment(selectedId, { pomodoros_completed: (selected.pomodoros_completed ?? 0) + 1 }).then(() => {
        qc.invalidateQueries({ queryKey: ["assignments"] });
        qc.invalidateQueries({ queryKey: ["dashboard"] });
      });
  }, [secondsLeft, selectedId, selected, qc]);

  const pct = ((FOCUS_SECONDS - secondsLeft) / FOCUS_SECONDS) * 100;
  const circumference = 2 * Math.PI * 110;
  const mm = String(Math.floor(secondsLeft / 60)).padStart(2, "0");
  const ss = String(secondsLeft % 60).padStart(2, "0");

  return (
    <div className="mx-auto max-w-xl space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight">Pomodoro</h1>
        <p className="text-muted-foreground">25 minutes of focus, logged where it counts.</p>
      </div>

      <Card>
        <CardContent className="flex flex-col items-center gap-6 pt-8">
          <div className="relative">
            <svg width="248" height="248" viewBox="0 0 248 248" className="-rotate-90">
              <circle cx="124" cy="124" r="110" fill="none" strokeWidth="12" className="stroke-muted" />
              <circle
                cx="124"
                cy="124"
                r="110"
                fill="none"
                strokeWidth="12"
                strokeLinecap="round"
                className="stroke-primary transition-[stroke-dashoffset] duration-1000 ease-linear"
                strokeDasharray={circumference}
                strokeDashoffset={circumference - (pct / 100) * circumference}
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-5xl font-bold tabular-nums">
                {mm}:{ss}
              </span>
              <span className="text-sm text-muted-foreground">{running ? "Focusing" : "Ready"}</span>
            </div>
          </div>

          <div className="flex gap-2">
            <Button onClick={() => setRunning((r) => !r)}>
              {running ? <Pause className="size-4" /> : <Play className="size-4" />}
              {running ? "Pause" : "Start"}
            </Button>
            <Button
              variant="outline"
              onClick={() => {
                setRunning(false);
                setSecondsLeft(FOCUS_SECONDS);
              }}
            >
              <RotateCcw className="size-4" /> Reset
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Working on</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <Select
            value={selectedId ?? "none"}
            onValueChange={(v) =>
              navigate({ search: v === "none" ? {} : { assignment: v } })
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="No assignment" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="none">No assignment</SelectItem>
              {(assignments ?? []).map((a) => (
                <SelectItem key={a.id} value={a.id}>
                  {a.title} — {a.subject}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {selected && (
            <p className="text-sm text-muted-foreground">
              {selected.pomodoros_completed ?? 0} pomodoros logged so far.
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
