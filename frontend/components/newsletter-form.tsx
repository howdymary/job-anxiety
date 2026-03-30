"use client";

import { useState, useTransition } from "react";

type FormState = {
  status: "idle" | "success" | "error";
  message: string;
};

const initialState: FormState = {
  status: "idle",
  message: "Weekly: the numbers, the context, and what they mean for your career. No hype. No doom. Just the data."
};

export function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<FormState>(initialState);
  const [isPending, startTransition] = useTransition();

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    startTransition(async () => {
      setState(initialState);

      try {
        const response = await fetch("/api/subscribe", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ email })
        });

        const payload = (await response.json()) as { status?: string; error?: string };

        if (!response.ok) {
          setState({
            status: "error",
            message: payload.error ?? "Our data is taking longer than usual to load. Please try again in a few seconds."
          });
          return;
        }

        setEmail("");
        setState({
          status: "success",
          message:
            payload.status === "pending_confirmation"
              ? `Check your email to confirm. We sent a verification link to ${email.trim()}. Check spam if you do not see it.`
              : "You're in. Your first Market Brief arrives Monday at 8am ET."
        });
      } catch {
        setState({
          status: "error",
          message: "Our data is taking longer than usual to load. Please try again in a few seconds."
        });
      }
    });
  };

  return (
    <form
      onSubmit={onSubmit}
      className="grid gap-4 rounded-[var(--ja-radius-lg)] border border-[var(--ja-fog)] bg-[rgba(250,250,249,0.92)] p-[var(--ja-space-5)] sm:grid-cols-[minmax(0,1fr)_auto]"
    >
      <label className="grid gap-2">
        <span className="eyebrow">Email address</span>
        <input
          className="text-input border-x-0 border-t-0 rounded-none bg-transparent px-0"
          type="email"
          placeholder="name@example.com"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
        />
      </label>
      <div className="grid content-end">
        <button type="submit" className="news-button text-[1rem]" disabled={isPending}>
          {isPending ? "Submitting" : "Get the Monday Market Brief"}
        </button>
      </div>
      <p
        aria-live="polite"
        className={`fine-print sm:col-span-2 ${state.status === "error" ? "text-[var(--ja-coral)]" : state.status === "success" ? "text-[var(--ja-emerald)]" : ""}`}
      >
        {state.message}
      </p>
    </form>
  );
}
