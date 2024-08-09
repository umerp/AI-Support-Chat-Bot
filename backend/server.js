require('dotenv').config()
const express = require('express');
const app = express(); // used to handle requests (posts, get, etc)

app.use(express.json())
const PORT = process.env.PORT || 3001


// processes user message and runs it through openai
app.post('/send-message', async (req, res) => {
    const { message } = req.body; // extract message from client

    // ... open ai logic

})


app.listen(PORT, () => console.log(`Server started on port ${PORT}`));