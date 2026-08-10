import { createFileRoute, useRouter, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { BookOpen } from "lucide-react";
import { toast } from "sonner";
import { api } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const Route = createFileRoute("/auth")({ component: AuthPage });

function AuthPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  useEffect(() => { api.me().then(() => router.navigate({ to: "/dashboard" })).catch(() => undefined); }, [router]);

  const submit = async (event: React.FormEvent<HTMLFormElement>, kind: "signin" | "signup") => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    setLoading(true);
    try {
      if (kind === "signin") {
        await api.login(String(form.get("email")), String(form.get("password")));
        router.navigate({ to: "/dashboard" });
      } else {
        await api.signup(String(form.get("full_name")), String(form.get("email")), String(form.get("password")));
        toast.success("Account created — you can sign in now.");
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Unable to continue.");
    } finally { setLoading(false); }
  };

  return <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-primary/10 via-background to-background px-4 py-12"><div className="w-full max-w-md">
    <Link to="/" className="mb-6 flex items-center justify-center gap-2 text-lg font-bold"><span className="flex size-9 items-center justify-center rounded-xl bg-primary text-primary-foreground"><BookOpen className="size-5" /></span>StudySync</Link>
    <Card><CardHeader><CardTitle>Welcome back</CardTitle><CardDescription>Sign in or create an account to sync your study life.</CardDescription></CardHeader><CardContent><Tabs defaultValue="signin"><TabsList className="grid w-full grid-cols-2"><TabsTrigger value="signin">Sign in</TabsTrigger><TabsTrigger value="signup">Sign up</TabsTrigger></TabsList>
      <TabsContent value="signin"><form onSubmit={(event) => submit(event, "signin")} className="space-y-4 pt-4"><div className="space-y-2"><Label htmlFor="si-email">Email</Label><Input id="si-email" name="email" type="email" required autoComplete="email" /></div><div className="space-y-2"><Label htmlFor="si-password">Password</Label><Input id="si-password" name="password" type="password" required autoComplete="current-password" /></div><Button type="submit" className="w-full" disabled={loading}>Sign in</Button></form></TabsContent>
      <TabsContent value="signup"><form onSubmit={(event) => submit(event, "signup")} className="space-y-4 pt-4"><div className="space-y-2"><Label htmlFor="su-name">Full name</Label><Input id="su-name" name="full_name" required autoComplete="name" /></div><div className="space-y-2"><Label htmlFor="su-email">Email</Label><Input id="su-email" name="email" type="email" required autoComplete="email" /></div><div className="space-y-2"><Label htmlFor="su-password">Password</Label><Input id="su-password" name="password" type="password" required minLength={6} autoComplete="new-password" /></div><Button type="submit" className="w-full" disabled={loading}>Create account</Button></form></TabsContent>
    </Tabs></CardContent></Card>
  </div></div>;
}
