import { Link, useRouter } from "@tanstack/react-router";
import { useEffect, useState, type ReactNode } from "react";
import { BookOpen, LayoutDashboard, NotebookPen, ListChecks, Timer, LogOut, Moon, Sun, Menu } from "lucide-react";
import { api } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const links = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/notes", label: "Notes", icon: NotebookPen },
  { to: "/assignments", label: "Assignments", icon: ListChecks },
  { to: "/pomodoro", label: "Pomodoro", icon: Timer },
] as const;

function ThemeToggle() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("studysync-theme") === "dark";
    setDark(stored);
    document.documentElement.classList.toggle("dark", stored);
  }, []);

  const toggle = () => {
    const next = !dark;
    setDark(next);
    localStorage.setItem("studysync-theme", next ? "dark" : "light");
    document.documentElement.classList.toggle("dark", next);
  };

  return (
    <Button variant="ghost" size="icon" onClick={toggle} aria-label="Toggle dark mode">
      {dark ? <Sun className="size-4" /> : <Moon className="size-4" />}
    </Button>
  );
}

export function AppShell({ children }: { children: ReactNode }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const signOut = async () => {
    await api.logout();
    router.navigate({ to: "/auth" });
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-6xl items-center gap-3 px-4">
          <Link to="/dashboard" className="flex items-center gap-2 font-bold tracking-tight">
            <span className="flex size-8 items-center justify-center rounded-xl bg-primary text-primary-foreground">
              <BookOpen className="size-4" />
            </span>
            StudySync
          </Link>

          <nav className="ml-auto hidden items-center gap-1 md:flex">
            {links.map(({ to, label, icon: Icon }) => (
              <Link
                key={to}
                to={to}
                className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
                activeProps={{ className: "bg-accent text-accent-foreground" }}
              >
                <Icon className="size-4" />
                {label}
              </Link>
            ))}
            <ThemeToggle />
            <Button variant="ghost" size="sm" onClick={signOut}>
              <LogOut className="size-4" /> Sign out
            </Button>
          </nav>

          <div className="ml-auto flex items-center gap-1 md:hidden">
            <ThemeToggle />
            <Button variant="ghost" size="icon" aria-label="Menu" onClick={() => setOpen((v) => !v)}>
              <Menu className="size-4" />
            </Button>
          </div>
        </div>

        <div className={cn("border-t border-border px-4 pb-3 md:hidden", open ? "block" : "hidden")}>
          {links.map(({ to, label, icon: Icon }) => (
            <Link
              key={to}
              to={to}
              onClick={() => setOpen(false)}
              className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-accent hover:text-accent-foreground"
              activeProps={{ className: "bg-accent text-accent-foreground" }}
            >
              <Icon className="size-4" />
              {label}
            </Link>
          ))}
          <Button variant="ghost" size="sm" className="mt-1 w-full justify-start" onClick={signOut}>
            <LogOut className="size-4" /> Sign out
          </Button>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-8">{children}</main>
    </div>
  );
}
