"use client";

import { useState, useCallback, useId } from "react";

import { AppShell } from "@/components/app-shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface Task {
  id: string;
  text: string;
  done: boolean;
}

export default function TasksPage() {
  const baseId = useId();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [input, setInput] = useState("");

  const addTask = useCallback(() => {
    const trimmed = input.trim();
    if (!trimmed) return;

    setTasks((prev) => [
      ...prev,
      { id: `${baseId}-${Date.now()}`, text: trimmed, done: false },
    ]);
    setInput("");
  }, [input, baseId]);

  const toggleTask = useCallback((id: string) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t))
    );
  }, []);

  const removeTask = useCallback((id: string) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const pending = tasks.filter((t) => !t.done).length;
  const completed = tasks.filter((t) => t.done).length;

  return (
    <AppShell className="items-center justify-center py-12">
      <Card className="w-full max-w-lg">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Task Tracker</span>
            <div className="flex gap-2">
              <Badge variant="outline">{pending} pending</Badge>
              <Badge variant="secondary">{completed} done</Badge>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <form
            className="flex gap-2"
            onSubmit={(e) => {
              e.preventDefault();
              addTask();
            }}
          >
            <Input
              placeholder="Add a new task…"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              aria-label="New task"
            />
            <Button type="submit" disabled={!input.trim()}>
              Add
            </Button>
          </form>

          {tasks.length === 0 && (
            <p className="py-6 text-center text-muted-foreground text-sm">
              No tasks yet. Add one above to get started!
            </p>
          )}

          <ul className="space-y-2">
            {tasks.map((task) => (
              <li
                key={task.id}
                className="flex items-center gap-3 rounded-lg border p-3"
              >
                <button
                  type="button"
                  role="checkbox"
                  aria-checked={task.done}
                  onClick={() => toggleTask(task.id)}
                  className="flex size-5 shrink-0 items-center justify-center rounded border border-primary"
                >
                  {task.done && (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={3}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="size-3"
                    >
                      <path d="M20 6 9 17l-5-5" />
                    </svg>
                  )}
                </button>
                <span
                  className={`flex-1 text-sm ${task.done ? "text-muted-foreground line-through" : ""}`}
                >
                  {task.text}
                </span>
                <Button
                  variant="ghost"
                  size="icon-xs"
                  onClick={() => removeTask(task.id)}
                  aria-label={`Remove ${task.text}`}
                >
                  ✕
                </Button>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </AppShell>
  );
}
