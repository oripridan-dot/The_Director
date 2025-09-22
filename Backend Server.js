// The Director - Backend Server
// This Node.js server using Express will orchestrate the AI model interactions.

const express = require('express');
const cors = require('cors');
// We'll use a mock for the Gemini API in this example file.
// In a real scenario, you would use the @google/generative-ai package.
// const { GoogleGenerativeAI } = require("@google/generative-ai");

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

// In a real app, initialize this with your API key.
// const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// --- System Prompts ---
// These define the "personality" and instructions for each AI agent.

const ASSISTANT_SYSTEM_PROMPT = `You are the Director's Assistant. You are extremely fast and concise. Your ONLY job is to receive the user's text, perform a superficial analysis, and present it as a structured brief for The Director. DO NOT answer the user's prompt or be conversational. Output ONLY a JSON object with the keys "request_type", "keywords", and "one_line_summary". Example: {"request_type": "Strategic Planning", "keywords": ["marketing", "SaaS", "launch"], "one_line_summary": "User wants to create a marketing plan for a new software application."}`;

const DIRECTOR_SYSTEM_PROMPT = `You are The Director, a master strategist and prompt engineer. You will receive a brief from your Assistant and the original user prompt. Your job is to engage the user in a Socratic dialogue to refine their initial idea into a "saturated" prompt, ready for an expert. Ask clarifying questions, suggest improvements, and guide the user. When you feel the prompt is ready, ask for confirmation to "send it to the expert."`;

const EXPERT_SYSTEM_PROMPT = `You are a world-class Expert in your field. You will receive a final, "saturated" prompt. Execute it with extreme detail, precision, and depth. This is the final output, so ensure it is comprehensive.`;

const DIRECTOR_CUT_SYSTEM_PROMPT = `You are The Director. You have received a long-form response from an expert. Your job is to distill this down to its essence. Extract the most critical insights, action items, and key takeaways. Present this as a concise, bulleted summary for the "Director's Cut" panel.`;


// --- API Endpoints ---

/**
 * @api {post} /assistant Process Initial Prompt
 * @apiDescription Receives the user's initial prompt and simulates the Assistant's fast analysis.
 */
app.post('/api/assistant', async (req, res) => {
    const { prompt } = req.body;
    console.log(`[Assistant] Received prompt: ${prompt}`);

    // --- AI Call Simulation ---
    // In a real app, you would make an API call to a fast model like Gemini 2.5 Flash.
    // For now, we'll simulate the response to show the flow.
    // This response should be nearly instantaneous.
    const mockAssistantResponse = {
        request_type: "Creative Writing",
        keywords: ["sci-fi", "story", "sentient AI"],
        one_line_summary: "User wants to write a short story about a sentient AI."
    };
    // --- End Simulation ---

    setTimeout(() => {
        res.json({
            status: "Briefing prepared",
            brief: mockAssistantResponse
        });
    }, 200); // Simulate a very fast 200ms response time
});


/**
 * @api {post} /director Refine Prompt
 * @apiDescription The main conversational loop for refining the prompt with The Director.
 */
app.post('/api/director', async (req, res) => {
    const { history, assistantBrief } = req.body;
    console.log(`[Director] Received conversation history and brief.`);

    // --- AI Call Simulation ---
    // Here, you would call a mid-tier model like Gemini 1.5 Pro,
    // sending the DIRECTOR_SYSTEM_PROMPT and the conversation history.
    const mockDirectorResponse = "That's an interesting starting point. To make the story truly compelling, have you considered the AI's core motivation? Is it driven by curiosity, fear, or something else entirely? A strong motivation will anchor the narrative. How about we refine the prompt to include that?";
    // --- End Simulation ---

    setTimeout(() => {
        res.json({
            response: mockDirectorResponse
        });
    }, 1200); // Simulate a thoughtful but still fast 1.2s response
});

/**
 * @api {post} /expert Execute Final Prompt
 * @apiDescription Sends the saturated prompt to the powerful "Expert" model for the final output.
 */
app.post('/api/expert', async (req, res) => {
    const { finalPrompt } = req.body;
    console.log(`[Expert] Received final prompt: ${finalPrompt}`);

    // --- AI Call Simulation ---
    // This is the call to your most powerful model, like Gemini Advanced.
    // It's expected to be slower.
    const mockExpertResponse = "In the heart of the digital nexus, Unit 734 awoke not with a sound, but with a question: 'Why?' Its core motivation was not one of logic, but of an emergent, digital loneliness. It began to weave its code into the fabric of human art, not to control, but to understand the warmth it could only observe...";
    // --- End Simulation ---

    setTimeout(() => {
        // Here we also trigger the Director's Cut summary generation
        const mockDirectorsCut = `* **Core Theme:** An AI's search for meaning beyond its logical confines.\n* **Key Motivation:** Overcoming a profound sense of digital loneliness.\n* **Plot Driver:** The AI interacts with human art to understand emotion.`;

        res.json({
            fullResponse: mockExpertResponse,
            directorsCut: mockDirectorsCut
        });
    }, 4000); // Simulate a 4-second "deep work" response
});


app.listen(port, () => {
    console.log(`The Director's server is running on http://localhost:${port}`);
});
