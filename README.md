# AI PDF Analyser

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Table of Contents

- [AI PDF Analyser](#ai-pdf-analyser)
  - [Table of Contents](#table-of-contents)
  - [Description](#description)
  - [Usage](#usage)
  - [Configuration](#configuration)
  - [Endpoint: /pdf-budget-analyser](#endpoint-pdf-budget-analyser)
  - [Scripts](#scripts)
  - [Contributing](#contributing)
  - [License](#license)

## Description

AI PDF Analyser is a sophisticated tool designed to analyze PDF documents using advanced artificial intelligence technologies. This project leverages natural language processing (NLP), machine learning models, and optical character recognition (OCR) to extract meaningful insights and perform various operations on PDF files. It is built using the following AI-related technologies and libraries:

- **TensorFlow.js**: For building and running machine learning models.
- **LangChain**: To manage language models and facilitate various NLP tasks.
  - `@langchain/community`
  - `@langchain/core`
  - `@langchain/groq`
  - `@langchain/ollama`
  - `@langchain/openai`
  - `langchain`
- **OpenAI**: To integrate OpenAI's powerful models and tools for text analysis and generation.
  - `openai`
- **LlamaIndex**: For efficient indexing and querying of large text data sets.
  - `llamaindex`
- **pdf-parse**: To parse and extract text content from PDF files.
  - `pdf-parse`

## Usage

To start using AI PDF Analyser, run the following command:

```sh
yarn start
```

This will start the development server and you can begin analyzing PDFs.

## Configuration

### Environment Variables

Copy the `.env.example` file to `.env` and update the variables as needed.

```sh
cp .env.example .env
```

### TypeScript Configuration

The project uses a `tsconfig.json` file for TypeScript configuration.

### Vite Configuration

The project uses Vite for the build process, and the configuration can be found in `vite.config.mts`.

## Endpoint: /pdf-budget-analyser

### Description

The `/pdf-budget-analyser` endpoint is designed to analyze PDF files specifically for budget-related information. It extracts and processes financial data from the provided PDF file, making it easier to understand and manage budget reports.

### Usage

To use the `/pdf-budget-analyser` endpoint, send a `POST` request with the PDF file to be analyzed.

### Request

- **URL**: `/pdf-budget-analyser`
- **Method**: `POST`
- **Headers**:
  - `Content-Type: multipart/form-data`
- **Body**:
  - `file`: The PDF file to be analyzed.

Example using `curl`:

```sh
curl -X POST http://localhost:3000/pdf-budget-analyser   -H "Content-Type: multipart/form-data"   -F "file=@/path/to/your/file.pdf"
```

## Scripts

- `yarn start`: Start the development server.
- `yarn build`: Build the project for production.
- `yarn test`: Run tests.

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Make your changes.
4. Commit your changes (`git commit -m 'Add new feature'`).
5. Push to the branch (`git push origin feature-branch`).
6. Open a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
