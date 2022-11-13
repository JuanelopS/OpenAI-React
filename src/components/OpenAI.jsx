import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: import.meta.env.VITE_Open_AI_Key,
});

const openai = new OpenAIApi(configuration);

export const generateImage = async (prompt) => {
  const result = await openai.createImage({
    prompt: prompt,
    n: 1,
    size: "256x256",
  });

  return result.data.data[0].url;
};




