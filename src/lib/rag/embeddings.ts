const EMBEDDING_MODEL = "text-embedding-3-small";

async function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function fetchWithRetry(url: string, options: RequestInit, retries = 3): Promise<Response> {
  for (let i = 0; i < retries; i++) {
    const response = await fetch(url, options);
    if (response.ok) return response;
    if (response.status === 429 && i < retries - 1) {
      const waitMs = (i + 1) * 2000; // 2s, 4s, 6s
      console.log(`OpenAI rate limited, waiting ${waitMs}ms...`);
      await sleep(waitMs);
      continue;
    }
    const body = await response.text();
    throw new Error(`OpenAI embedding error (${response.status}): ${body}`);
  }
  throw new Error("OpenAI embedding: max retries exceeded");
}

export async function getEmbedding(text: string): Promise<number[]> {
  const response = await fetchWithRetry("https://api.openai.com/v1/embeddings", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: EMBEDDING_MODEL,
      input: text.replace(/\n/g, " ").trim(),
    }),
  });

  const data = await response.json();
  return data.data[0].embedding;
}

export async function getEmbeddings(texts: string[]): Promise<number[][]> {
  if (texts.length === 0) return [];

  const response = await fetch("https://api.openai.com/v1/embeddings", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: EMBEDDING_MODEL,
      input: texts.map((t) => t.replace(/\n/g, " ").trim()),
    }),
  });

  if (!response.ok) {
    throw new Error(`OpenAI embedding error: ${response.status}`);
  }

  const data = await response.json();
  return data.data
    .sort((a: { index: number }, b: { index: number }) => a.index - b.index)
    .map((d: { embedding: number[] }) => d.embedding);
}
