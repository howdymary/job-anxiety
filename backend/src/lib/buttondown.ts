type NewsletterSubscribeInput = {
  email: string;
  ipAddress?: string | null;
};

type NewsletterSubscribeResult = {
  accepted: true;
  provider: "buttondown" | "stub";
  status: "pending_confirmation";
};

const BUTTONDOWN_SUBSCRIBERS_URL = "https://api.buttondown.com/v1/subscribers";

function getButtondownApiKey() {
  const value = process.env.BUTTONDOWN_API_KEY?.trim();
  return value ? value : null;
}

function isExistingSubscriberResponse(status: number, body: string) {
  return status === 400 && /\b(already|exists|subscribed|unactivated)\b/i.test(body);
}

export async function subscribeToNewsletter({
  email,
  ipAddress
}: NewsletterSubscribeInput): Promise<NewsletterSubscribeResult> {
  const apiKey = getButtondownApiKey();

  if (!apiKey) {
    return {
      accepted: true,
      provider: "stub",
      status: "pending_confirmation"
    };
  }

  const response = await fetch(BUTTONDOWN_SUBSCRIBERS_URL, {
    method: "POST",
    headers: {
      Authorization: `Token ${apiKey}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      email_address: email,
      ...(ipAddress ? { ip_address: ipAddress } : {})
    })
  });

  if (response.ok) {
    return {
      accepted: true,
      provider: "buttondown",
      status: "pending_confirmation"
    };
  }

  const body = await response.text();

  if (isExistingSubscriberResponse(response.status, body)) {
    return {
      accepted: true,
      provider: "buttondown",
      status: "pending_confirmation"
    };
  }

  throw new Error(`Buttondown subscription failed with ${response.status}: ${body.slice(0, 240)}`);
}
