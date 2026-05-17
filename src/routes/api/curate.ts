/**
 * POST /api/curate — generate 2 chef's tasting menu options via Lovable AI.
 *
 * Body: ExperienceRequest (see src/lib/experiences.ts)
 * Returns: CurateResponse
 */
import "@tanstack/react-start";
import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import {
  dishesAsCatalog,
  finalizeOption,
  validateMenuOption,
  type CurateResponse,
  type ExperienceRequest,
  type MenuOption,
} from "@/lib/experiences";
import {
  CURATOR_MODEL,
  CURATOR_SYSTEM_PROMPT,
  buildUserPrompt,
} from "@/data/experiences";

const BodySchema = z.object({
  guests: z.number().int().min(1).max(40),
  budgetMin: z.number().min(1).max(2000),
  budgetMax: z.number().min(1).max(2000),
  restrictions: z.array(z.string().max(64)).max(20),
  notes: z.string().max(2000),
});

async function callGateway(
  apiKey: string,
  messages: Array<{ role: string; content: string }>,
): Promise<{ ok: true; data: unknown } | { ok: false; status: number; message: string }> {
  const res = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: CURATOR_MODEL,
      messages,
      response_format: { type: "json_object" },
    }),
  });
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    return { ok: false, status: res.status, message: text || res.statusText };
  }
  const json = (await res.json()) as {
    choices?: Array<{ message?: { content?: string } }>;
  };
  const content = json.choices?.[0]?.message?.content;
  if (!content) {
    return { ok: false, status: 502, message: "Empty completion." };
  }
  try {
    return { ok: true, data: JSON.parse(content) };
  } catch {
    return { ok: false, status: 502, message: "Model returned non-JSON." };
  }
}

export const Route = createFileRoute("/api/curate")({
  server: {
    handlers: {
      POST: async ({ request }: { request: Request }) => {
        const apiKey = process.env.LOVABLE_API_KEY;
        if (!apiKey) {
          return Response.json(
            { error: "AI Gateway not enabled (LOVABLE_API_KEY missing)." },
            { status: 500 },
          );
        }

        let raw: unknown;
        try {
          raw = await request.json();
        } catch {
          return Response.json({ error: "Invalid JSON body." }, { status: 400 });
        }
        const parsed = BodySchema.safeParse(raw);
        if (!parsed.success) {
          return Response.json(
            { error: "Invalid request.", details: parsed.error.issues },
            { status: 400 },
          );
        }
        const req: ExperienceRequest = parsed.data;
        if (req.budgetMin > req.budgetMax) {
          return Response.json(
            { error: "budgetMin must be ≤ budgetMax." },
            { status: 400 },
          );
        }

        const catalog = dishesAsCatalog();
        const catalogJson = JSON.stringify(catalog);
        const userPrompt = buildUserPrompt({
          catalogJson,
          guests: req.guests,
          budgetMin: req.budgetMin,
          budgetMax: req.budgetMax,
          restrictions: req.restrictions,
          notes: req.notes,
        });

        const messages = [
          { role: "system", content: CURATOR_SYSTEM_PROMPT },
          { role: "user", content: userPrompt },
        ];

        // First attempt.
        let result = await callGateway(apiKey, messages);
        if (!result.ok) {
          if (result.status === 429) {
            return Response.json(
              { error: "Rate limited. Please try again in a moment." },
              { status: 429 },
            );
          }
          if (result.status === 402) {
            return Response.json(
              { error: "AI credits exhausted. Add credits in Settings → Workspace → Usage." },
              { status: 402 },
            );
          }
          return Response.json(
            { error: `AI gateway error: ${result.message}` },
            { status: 502 },
          );
        }

        let options = (result.data as Partial<CurateResponse>)?.options ?? [];

        // Validate. If any option fails, retry once with feedback.
        const issuesByOption = options.map((o) => validateMenuOption(o as MenuOption, req));
        const hasIssues = issuesByOption.some((arr) => arr.length > 0);
        if (hasIssues) {
          const feedback = issuesByOption
            .flat()
            .map((i) => `- ${i.message}`)
            .join("\n");
          result = await callGateway(apiKey, [
            ...messages,
            {
              role: "assistant",
              content: JSON.stringify({ options }),
            },
            {
              role: "user",
              content: `Your previous menu had these problems. Fix them and return the same JSON shape:\n${feedback}`,
            },
          ]);
          if (result.ok) {
            options = (result.data as Partial<CurateResponse>)?.options ?? options;
          }
        }

        if (!Array.isArray(options) || options.length === 0) {
          return Response.json(
            { error: "AI did not return any menu options." },
            { status: 502 },
          );
        }

        const finalized = options.map((o) => finalizeOption(o as MenuOption, req.guests));
        return Response.json({ options: finalized } satisfies CurateResponse);
      },
    },
  },
});