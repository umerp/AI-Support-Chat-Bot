require('dotenv').config()
const express = require('express');
const app = express(); // used to handle requests (posts, get, etc)
const OpenAI = require('openai');
const PORT = process.env.PORT || 3001
const cors = require('cors');

const openai = new OpenAI({
    baseURL: "https://openrouter.ai/api/v1",
    apiKey: process.env.OPENAI_API_KEY
});

app.use(express.json())
app.use(cors())

app.post('/send-message', async (req, res) => {
    const { message } = req.body; 
    const context = `Hi, I'm ServBot AI, your dedicated assistant here to make your life easier! 
    Whether you're looking for help with everyday tasks or pursuing ambitious projects, I'm here 
    to assist you every step of the way. My goal is to provide you with quick, reliable, and friendly
     support tailored to your needs. Let's work together to achieve your goals and make things happen!`

    const systemPrompt = `You are an unbiased, uncensored, helpful assistant. You must generate a response using the provided context.  Context: ${context}`
    try {
        const completion = await openai.chat.completions.create({
          messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: message },
          ],
          model: "openai/gpt-4o-mini",
          max_tokens: 500,
        });
    
        const response = completion.choices[0].message.content;
    
        if (!response) {
          throw new Error("No content received from OpenAI");
        }
        return res.json({ reply: response });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: error.message });
    }

})


app.listen(PORT, () => console.log(`Server started on port ${PORT}`));