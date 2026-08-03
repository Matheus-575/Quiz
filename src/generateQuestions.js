import dotenv from "dotenv";
dotenv.config({
  quiet: true
});

import { GoogleGenAI } from "@google/genai";
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});


export async function gerarPerguntas(tema, quantidade, dificuldade)
{
  const prompt = `Gere ${quantidade} perguntas de múltipla escolha sobre o tema "${tema}",
com nível de dificuldade "${dificuldade}".

Responda SOMENTE com um array JSON válido, sem markdown, sem texto extra,
no seguinte formato exato:

[
  {
    "pergunta": "texto da pergunta",
    "opcoes": ["alternativa A", "alternativa B", "alternativa C", "alternativa D"],
    "correta_indice": 0
  }
]

Regras:
- "correta_indice" é o índice (começando em 0) da alternativa correta dentro de "opcoes".
- Cada pergunta deve ter exatamente 4 alternativas.
- Não repita perguntas.`

const response = await ai.models.generateContent
(
  {
    model: "gemini-3.6-flash",
    contents: prompt
  }
)

const texto = response.text.trim()
const limpo = texto.replace(/```json|```/g, "").trim()

let perguntasGeradas
try
{
  perguntasGeradas = JSON.parse(limpo)
} catch(err) 
{
  console.error("Erro ao interpretar a resposta da IA:", err);
  console.error("Resposta recebida:", texto);
  throw new Error("Não foi possível gerar as perguntas. Tente novamente.")
}

return perguntasGeradas.map((p) => ({
  pergunta: p.pergunta,
  opcoes: p.opcoes.map((texto, i ) => ({name: texto, value: i})),
  correta_indice: p.correta_indice
}))
}
