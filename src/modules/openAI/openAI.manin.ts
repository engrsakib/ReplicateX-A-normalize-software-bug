import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export const AIServices = {
  async generateEmbedding(text: string) {
    const response = await openai.embeddings.create({
      model: "text-embedding-3-small",
      input: text,
    });
    return response.data[0].embedding;
  },

  async generateComparisonComment(newPost: string, oldPost: string) {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: "You are a helpful assistant for a Help Desk system.",
        },
        {
          role: "user",
          content: `Compare these two issues. 
          New Issue: "${newPost}"
          Existing Issue: "${oldPost}"
          
          If they are about the same topic, write a short, polite comment for the user explaining that this issue is already being tracked under the existing post. Keep it under 30 words.`,
        },
      ],
    });
    return completion.choices[0].message.content;
  },
};
