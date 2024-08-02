import "dotenv/config";
import path from "path";
import multer from "multer";
import express from "express";

import { pdfBudgetAnalyser } from "./pdf-budget-analyser";

const app = express();
app.use(express.json());
const port = process.env.PORT;
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

app.post("/pdf-budget-analyser", upload.single("pdf"), pdfBudgetAnalyser);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
