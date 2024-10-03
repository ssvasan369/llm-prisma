# Ollama Query Generator API

This project is an Express.js application that serves as a simple API for generating queries using the Ollama AI model. The application listens for incoming requests, processes the provided prompts, and returns generated queries based on user input.

## Features

- **Hello World Endpoint**: A basic GET endpoint to confirm that the server is running.
- **Query Generation Endpoint**: A POST endpoint that accepts a prompt and returns a generated query.
- **Error Handling**: Provides error responses for invalid prompts and internal server errors.

## Prerequisites

To run this project, you'll need the following:

- Node.js (v14 or higher)
- TypeScript
- An Ollama API setup (access to the Ollama service)

## Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/your-username/ollama-query-generator.git
   cd ollama-query-generator
