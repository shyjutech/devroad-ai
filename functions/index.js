import { onRequest } from "firebase-functions/v2/https";
import { defineSecret } from "firebase-functions/params";
import * as logger from "firebase-functions/logger";
import corsLib from "cors";
import { GoogleGenerativeAI } from "@google/generative-ai";

const cors = corsLib({ origin: true });
const GEMINI_API_KEY = defineSecret("GEMINI_API_KEY");

// No database writes currently; Firestore removed per user preference

export const generateRoadmap = onRequest({ cors: true, region: "us-central1", maxInstances: 2, secrets: [GEMINI_API_KEY] }, async (req, res) => {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  try {
    await new Promise((resolve) => cors(req, res, resolve));

    const { category, experience, known_languages, goal } = req.body || {};
    if (!category || !experience || !goal) {
      res.status(400).json({ error: "Missing required fields: category, experience, goal" });
      return;
    }

    const apiKey = GEMINI_API_KEY.value();
    if (!apiKey) {
      logger.error("GEMINI_API_KEY is not set");
      res.status(500).json({ error: "Server misconfiguration" });
      return;
    }

    const genAI = new GoogleGenerativeAI(apiKey);

    const systemPrompt = `You are an expert software mentor and career coach.\nGenerate a detailed learning roadmap for the given input.\nEach roadmap must include:\n\n1. Overview (why learn this, who it suits)\n2. Step-by-step learning roadmap (beginner → advanced)\n3. Tools & Technologies to learn\n4. Free & paid resources (documentation, YouTube, GitHub, Udemy, etc.)\n5. 2–3 project ideas per stage\n6. Approx. learning time (in weeks)\n7. Motivation & community tips`;

    const roadmapSchema = {
      type: "object",
      properties: {
        overview: { type: "string" },
        steps: {
          type: "array",
          items: {
            type: "object",
            properties: {
              title: { type: "string" },
              details: { type: "string" },
              resources: { type: "array", items: { type: "string" } }
            },
            required: ["title"]
          }
        },
        tools: { type: "array", items: { type: "string" } },
        projects: { type: "array", items: { type: "string" } },
        duration_weeks: { type: "number" },
        bonus_tips: { type: "array", items: { type: "string" } }
      },
      required: ["overview", "steps", "tools", "projects", "duration_weeks", "bonus_tips"]
    };

    const userInput = {
      category,
      experience,
      known_languages: known_languages || "",
      goal
    };

    const prompt = `${systemPrompt}\n\nOutput JSON must match the provided schema.\n\nUser input JSON:\n${JSON.stringify(userInput, null, 2)}`;

    // Try valid model names in order
    let result;
    let lastError;
    const modelNames = ["gemini-2.5-pro", "gemini-1.5-pro", "gemini-1.5-flash", "gemini-pro"];
    
    for (const modelName of modelNames) {
      try {
        const model = genAI.getGenerativeModel({
          model: modelName,
          generationConfig: { responseMimeType: "application/json", temperature: 0.7, responseSchema: roadmapSchema },
          systemInstruction: systemPrompt
        });
        result = await model.generateContent(prompt);
        break; // Success, exit loop
      } catch (apiErr) {
        lastError = apiErr;
        logger.warn(`Model ${modelName} failed`, { status: apiErr.status, statusText: apiErr.statusText });
        if (modelNames.indexOf(modelName) < modelNames.length - 1) {
          continue; // Try next model
        }
      }
    }
    
    if (!result) {
      throw lastError || new Error("All model attempts failed");
    }
    const text = result.response.text();

    let data;
    try {
      data = JSON.parse(text);
    } catch (err) {
      logger.error("Failed to parse model JSON", { textSnippet: text?.slice(0, 200) });
      // Attempt to fix common JSON issues
      const sanitized = text
        .replace(/^```json\n?/i, "")
        .replace(/```$/i, "")
        .trim();
      try {
        data = JSON.parse(sanitized);
      } catch (e2) {
        res.status(502).json({ error: "Invalid AI response", raw: text });
        return;
      }
    }

    res.status(200).json(data);
  } catch (error) {
    logger.error("Unhandled error in generateRoadmap", { error });
    res.status(500).json({ error: "Internal server error" });
  }
});


