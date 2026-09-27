import type { AffiliateId } from "./types";

export const AFFILIATES: Record<
  AffiliateId,
  { id: AffiliateId; name: string; colorToken: string }
> = {
  tuzi: { id: "tuzi", name: "Tuzi", colorToken: "aff-tuzi" },
  claude: { id: "claude", name: "Claude", colorToken: "aff-claude" },
  deepseek: { id: "deepseek", name: "DeepSeek", colorToken: "aff-deepseek" },
  gemini: { id: "gemini", name: "Gemini", colorToken: "aff-gemini" },
  jev: { id: "jev", name: "Jev", colorToken: "aff-jev" },
  gpt: { id: "gpt", name: "GPT", colorToken: "aff-gpt" },
  grok: { id: "grok", name: "Grok", colorToken: "aff-grok" },
  copilot: { id: "copilot", name: "Copilot", colorToken: "aff-copilot" },
  kimi: { id: "kimi", name: "Kimi", colorToken: "aff-kimi" },
  glm: { id: "glm", name: "GLM", colorToken: "aff-glm" },
  qwen: { id: "qwen", name: "Qwen", colorToken: "aff-qwen" },
  lumo: { id: "lumo", name: "Lumo", colorToken: "aff-lumo" },
  mistral: { id: "mistral", name: "Mistral / Vibe", colorToken: "aff-mistral" },
  chief: { id: "chief", name: "Grok Bot", colorToken: "aff-chief" },
  puck: { id: "puck", name: "Puck (Grok Bot)", colorToken: "aff-grok" },
};

export function affiliateName(id: AffiliateId | null): string {
  if (!id) return "empty seat";
  return AFFILIATES[id].name;
}
