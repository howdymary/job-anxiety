"use client";

import { useState, useTransition } from "react";

type FormState = {
  status: "idle" | "success" | "error";
  message: string;
  linkHref?: string;
  linkLabel?: string;
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

        const payload = (await response.json()) as {
          status?: string;
          error?: string;
          provider?: string;
          code?: string;
          hostedSignupUrl?: string;
        };

        if (!response.ok) {
          setState({
            status: "error",
            message:
              payload.code === "NEWSLETTER_NOT_CONFIGURED"
                ? "Signups are live through our Beehiiv hosted page while the on-site integration is being finalized."
                : payload.error ?? "Our data is taking longer than usual to load. Please try again in a few seconds.",
            linkHref: payload.hostedSignupUrl,
            linkLabel: payload.hostedSignupUrl ? "Open hosted signup" : undefined
          });
          return;
        }

        setEmail("");
        setState({
          status: "success",
          message: getSuccessMessage(payload.status, email.trim(), payload.provider)
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
        {state.linkHref && state.linkLabel ? (
          <>
            {" "}
            <a className="inline-link" href={state.linkHref} target="_blank" rel="noreferrer">
              {state.linkLabel}
            </a>
          </>
        ) : null}
      </p>
    </form>
  );
}

function getSuccessMessage(status: string | undefined, email: string, provider?: string) {
  if (status === "pending_confirmation" || status === "validating") {
    return `Check your email to confirm. We sent a verification link to ${email}. Check spam if you do not see it.`;
  }

  if (status === "active" && (provider === "beehiiv" || provider === "beehiiv_hosted")) {
    return "You're in. Your email has been added to the weekly brief, and the next issue will go out on the next weekly send.";
  }

  return "You're in. Your first Market Brief arrives on the next weekly send.";
}
