export function NewsletterForm() {
  return (
    <form className="grid gap-4 border border-[var(--color-border)] bg-[var(--color-bg-elevated)] p-6 sm:grid-cols-[minmax(0,1fr)_auto]">
      <label className="grid gap-2">
        <span className="eyebrow">Email</span>
        <input className="text-input border-x-0 border-t-0 rounded-none bg-transparent px-0" type="email" placeholder="name@example.com" />
      </label>
      <div className="grid content-end">
        <button type="submit" className="news-button text-[1rem]">
          Subscribe
        </button>
      </div>
      <p className="fine-print sm:col-span-2">No spam. One weekly brief. Unsubscribe anytime.</p>
    </form>
  );
}
