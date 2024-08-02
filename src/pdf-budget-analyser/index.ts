import {
  Groq,
  OpenAI,
  LLMAgent,
  Settings,
  FunctionTool,
  QueryEngineTool,
  VectorStoreIndex,
  LlamaParseReader,
  HuggingFaceEmbedding,
} from "llamaindex";
import "dotenv/config";
import { RequestHandler } from "express";

import { MODE } from "./types";

export const pdfBudgetAnalyser: RequestHandler = async (req, res, next) => {
  const { questions, mode = MODE.GROQ }: { questions: string; mode: MODE } =
    req.body;
  try {
    if (!req.file) {
      return res.status(400).json({ error: "PDF file is required" });
    }
    if (!questions) {
      return res.status(400).json({ error: "Please provide questions" });
    }
    Settings.callbackManager.on("llm-tool-call", (event) => {
      console.log(event.detail.payload);
    });
    Settings.callbackManager.on("llm-tool-result", (event) => {
      console.log(event.detail.payload);
    });

    Settings.llm = mode === MODE.GROQ ? new Groq() : new OpenAI();
    Settings.embedModel = new HuggingFaceEmbedding({
      quantized: false,
    });

    const reader = new LlamaParseReader({ resultType: "text" });
    const pdfBuffer = req.file.buffer;
    const documents = await reader.loadDataAsContent(pdfBuffer);

    const index = await VectorStoreIndex.fromDocuments(documents);
    const retriever = index.asRetriever({ similarityTopK: 10 });
    const queryEngine = index.asQueryEngine({
      retriever,
    });

    const sumNumbers = ({ a, b }) => {
      return `${a + b}`;
    };

    const tools = [
      new QueryEngineTool({
        queryEngine: queryEngine,
        metadata: {
          name: "budget_analyser_tool",
          description: `This tool can answer detailed questions about the individual components of the budget of a country.`,
        },
      }),
      FunctionTool.from(sumNumbers, {
        name: "sumNumbers",
        description: "Use this function to sum two numbers",
        parameters: {
          type: "object",
          properties: {
            a: {
              type: "number",
              description: "First number to sum",
            },
            b: {
              type: "number",
              description: "Second number to sum",
            },
          },
          required: ["a", "b"],
        },
      }),
    ];

    const agent = new LLMAgent({
      tools,
    });
    const questionsArray = JSON.parse(questions);
    const questionResponses = await Promise.all(
      questionsArray.map((message: string) =>
        agent.chat({
          message,
        })
      )
    );

    res.json({
      questionResponses,
    });
  } catch (error) {
    console.error("Error during processing:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
