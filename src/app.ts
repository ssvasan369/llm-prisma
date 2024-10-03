import express, { Request, Response } from 'express';
import { GenerateResponse, Ollama } from 'ollama';
import { systemPrompt } from './exampleInput';

const app = express();
const port = 3000;

// Middleware to parse JSON request bodies
app.use(express.json());

app.get('/', (req: Request, res: Response) => {
    res.send('Hello World');
});

app.post('/query', async (req: Request, res: Response) => {
    try {
        const queryPrompt = req.body.prompt;

        if (!queryPrompt || typeof queryPrompt !== 'string') {
            res.status(400).json({ error: 'Valid prompt is required' });
            return;
        }

        const generatedQuery = await randomQueryGenerator(queryPrompt);

        // const parsedQuery = parsePrismaQuery(generatedQuery);
        // console.log(parsedQuery);
        

        res.status(200).json({ query: generatedQuery });
    } catch (error) {
        console.error('Error generating query:', error.message);
        res.status(500).json({ error: 'Error generating query' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

async function randomQueryGenerator(input: string): Promise<string> {
    try {
        const ollama = new Ollama({ host: 'https://ollama-demo.fly.dev' });
        const queryResponse: GenerateResponse = await promptAndAnswer(input, ollama);

        console.log('Generated Query Response:', queryResponse);

        return queryResponse.response; // Assuming response contains a `response` field with the query
    } catch (error) {
        console.error('Error generating random query:', error.message);
        throw error;
    }
}

const promptAndAnswer = async (input: string, ollama: Ollama): Promise<GenerateResponse> => {
    try {
        // Pass the correct system prompt with user's input to the AI model
        const response = await ollama.generate({
            model: 'qwen2:7b',
            system: systemPrompt(input), // Passing user input to generate correct system prompt
            prompt: input,
        });

        return response;
    } catch (error) {
        console.error('Error processing prompt:', input, error);
        throw error;
    }
};

// A function that extracts query details from the query string
// function parsePrismaQuery(queryString: string) {
//     // Extract model and operation (e.g., "user" and "findMany")
//     const modelMatch = queryString.match(/prisma\.(\w+)\.(\w+)/);
//     const model = modelMatch ? modelMatch[1] : null;
//     const operation = modelMatch ? modelMatch[2] : null;
    
//     // Extract "where" clause (if present)
//     const whereMatch = queryString.match(/where:\s*{([^}]+)}/);
//     const where = whereMatch ? JSON.parse(`{${whereMatch[1].replace(/(\w+):/g, '"$1":')}}`) : {};
  
//     // Extract "select" clause (if present)
//     const selectMatch = queryString.match(/select:\s*{([^}]+)}/);
//     const select = selectMatch ? JSON.parse(`{${selectMatch[1].replace(/(\w+):/g, '"$1":')}}`) : {};
  
//     // Extract "take" clause (if present)
//     const takeMatch = queryString.match(/take:\s*(\d+)/);
//     const take = takeMatch ? parseInt(takeMatch[1], 10) : null;
  
//     // Extract "skip" clause (if present)
//     const skipMatch = queryString.match(/skip:\s*(\d+)/);
//     const skip = skipMatch ? parseInt(skipMatch[1], 10) : null;
  
//     // Extract "orderBy" clause (if present)
//     const orderByMatch = queryString.match(/orderBy:\s*{([^}]+)}/);
//     const orderBy = orderByMatch ? JSON.parse(`{${orderByMatch[1].replace(/(\w+):/g, '"$1":')}}`) : {};
  
//     // Return the parsed components
//     return {
//       model,
//       operation,
//       where,
//       select,
//       take,
//       skip,
//       orderBy
//     };
//   }

