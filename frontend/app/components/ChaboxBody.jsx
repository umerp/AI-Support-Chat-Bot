"use client";
import React, { useState } from 'react';
import {
  Container,
  Box,
  TextField,
  IconButton,
  Paper,
  Typography,
  Grid,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';

export default function Home() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (input.trim()) {
      setMessages([...messages, { text: input, type: 'user' }]);
      setInput('');
      // Simulate AI response
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          { text: 'Thank you for your message. How can I assist you further?', type: 'bot' },
        ]);
      }, 1000);
    }
  };

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  return (
    <Container maxWidth="sm" style={{ marginTop: '2rem' }}>
      <Paper elevation={3} style={{ padding: '1rem', height: '75vh', display: 'flex', flexDirection: 'column' }}>
        <Typography variant="h5" align="center" gutterBottom>
         Customer Service Chatbot
        </Typography>
        <Box style={{ flexGrow: 1, overflowY: 'auto', marginBottom: '1rem' }}>
          <List>
            {messages.map((message, index) => (
              <ListItem key={index}>
                <Grid container spacing={2} justifyContent={message.type === 'user' ? 'flex-end' : 'flex-start'}>
                  <Grid item xs={12} sm={8}>
                    <Paper
                      style={{
                        padding: '0.5rem 1rem',
                        backgroundColor: message.type === 'user' ? '#1976d2' : '#f5f5f5',
                        color: message.type === 'user' ? '#fff' : '#000',
                        borderRadius: '20px',
                      }}
                    >
                      <ListItemText primary={message.text} />
                    </Paper>
                  </Grid>
                </Grid>
              </ListItem>
            ))}
          </List>
        </Box>
        <Box display="flex">
          <TextField
            variant="outlined"
            fullWidth
            value={input}
            onChange={handleInputChange}
            placeholder="Type your message here..."
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                handleSend();
              }
            }}
          />
          <IconButton color="primary" onClick={handleSend}>
            <SendIcon />
          </IconButton>
        </Box>
      </Paper>
    </Container>
  );
}


