import { createFileRoute } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { Trash2, Pencil, Plus, X } from "lucide-react";
import { toast } from "sonner";
import { api } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export const Route = createFileRoute("/_authenticated/notes")({
  head: () => ({
    meta: [
      { title: "Notes — StudySync" },
      { name: "description", content: "Write, edit and revise your study notes, synced to your StudySync account." },
      { property: "og:title", content: "StudySync Notes" },
      { property: "og:description", content: "Capture lecture notes and revise them anywhere." },
    ],
  }),
  component: NotesPage,
});

function NotesPage() {
  const qc = useQueryClient();
  const [editing, setEditing] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const { data: notes, isLoading } = useQuery({
    queryKey: ["notes"],
    queryFn: async () => {
      return api.notes();
    },
  });

  const reset = () => {
    setEditing(null);
    setTitle("");
    setContent("");
  };

  const save = useMutation({
    mutationFn: async () => {
      if (editing) {
        await api.updateNote(editing, title, content);
      } else {
        await api.createNote(title, content);
      }
    },
    onSuccess: () => {
      toast.success(editing ? "Note updated" : "Note added");
      reset();
      qc.invalidateQueries({ queryKey: ["notes"] });
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const remove = useMutation({
    mutationFn: async (id: string) => {
      await api.deleteNote(id);
    },
    onSuccess: () => {
      toast.success("Note deleted");
      qc.invalidateQueries({ queryKey: ["notes"] });
    },
  });

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Notes</h1>
        <p className="text-muted-foreground">Everything you need to remember, in one place.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">{editing ? "Edit note" : "New note"}</CardTitle>
        </CardHeader>
        <CardContent>
          <form
            className="space-y-3"
            onSubmit={(e) => {
              e.preventDefault();
              save.mutate();
            }}
          >
            <Input placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
            <Textarea
              placeholder="Write your notes here..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={5}
              required
            />
            <div className="flex gap-2">
              <Button type="submit" disabled={save.isPending}>
                <Plus className="size-4" /> {editing ? "Save changes" : "Add note"}
              </Button>
              {editing && (
                <Button type="button" variant="ghost" onClick={reset}>
                  <X className="size-4" /> Cancel
                </Button>
              )}
            </div>
          </form>
        </CardContent>
      </Card>

      {isLoading ? (
        <Skeleton className="h-40 w-full" />
      ) : notes && notes.length > 0 ? (
        <div className="grid gap-4 md:grid-cols-2">
          {notes.map((n) => (
            <Card key={n.id}>
              <CardHeader className="flex-row items-start justify-between gap-2 space-y-0">
                <CardTitle className="text-lg">{n.title}</CardTitle>
                <div className="flex gap-1">
                  <Button
                    size="icon"
                    variant="ghost"
                    aria-label="Edit note"
                    onClick={() => {
                      setEditing(n.id);
                      setTitle(n.title);
                      setContent(n.content);
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                  >
                    <Pencil className="size-4" />
                  </Button>
                  <Button size="icon" variant="ghost" aria-label="Delete note" onClick={() => remove.mutate(n.id)}>
                    <Trash2 className="size-4 text-destructive" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <p className="whitespace-pre-wrap text-sm text-muted-foreground">{n.content}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <p className="text-sm text-muted-foreground">No notes yet — add your first one above.</p>
      )}
    </div>
  );
}
