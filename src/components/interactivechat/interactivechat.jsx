import React, { useState, useRef, useEffect } from 'react';
import { 
  Box, Typography, TextField, Button, Paper, Avatar,
  CircularProgress, Divider
} from '@mui/material';
import { Send as SendIcon, Person as PersonIcon } from '@mui/icons-material';
import styled from '@emotion/styled';
import geminiService from '../../services/gemini/geminiService';

const ChatContainer = styled(Paper)`
  height: 400px;
  display: flex;
  flex-direction: column;
  padding: 16px;
`;

const MessagesContainer = styled(Box)`
  flex-grow: 1;
  overflow-y: auto;
  margin-bottom: 16px;
  padding: 8px;
`;

const MessageBubble = styled(Box)(({ theme, isuser }) => ({
    maxWidth: '80%',
    margin: '8px 0',
    padding: '12px',
    borderRadius: '12px',
    ...(isuser === 'true' ? {
      backgroundColor: '#e3f2fd',
      marginLeft: 'auto',
    } : {
      backgroundColor: '#f5f5f5',
      marginRight: 'auto',
    })
  }));

const InteractiveChat = ({ activeRegion, weatherData }) => {
  const [messages, setMessages] = useState([{
    type: 'assistant',
    content: 'Olá! Sou seu assistente agrícola. Como posso ajudar você hoje? Posso fornecer informações sobre condições climáticas, risco de incêndio e recomendações para sua região.'
  }]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = {
      type: 'user',
      content: input
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const context = {
        region: activeRegion.name || 'Região não especificada',
        temperature: activeRegion.temperature || 'N/A',
        humidity: activeRegion.humidity || 'N/A',
        riskLevel: activeRegion.riskLevel || 0,
        timeOfDay: new Date().getHours()
      };

      const response = await geminiService.generateContent(input, context);
      
      setMessages(prev => [...prev, {
        type: 'assistant',
        content: response
      }]);
    } catch (error) {
      console.error('Erro ao processar mensagem:', error);
      setMessages(prev => [...prev, {
        type: 'assistant',
        content: 'Desculpe, ocorreu um erro ao processar sua mensagem. Por favor, tente novamente.'
      }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ChatContainer elevation={3}>
      <MessagesContainer>
        {messages.map((message, index) => (
          <Box key={index} sx={{ display: 'flex', alignItems: 'flex-start', mb: 2 }}>
            {message.type === 'assistant' && (
              <Avatar sx={{ mr: 1, bgcolor: 'primary.main' }}>
                <PersonIcon />
              </Avatar>
            )}
            <MessageBubble isUser={message.type === 'user'}>
              <Typography variant="body1">{message.content}</Typography>
            </MessageBubble>
          </Box>
        ))}
        {loading && (
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <CircularProgress size={24} />
          </Box>
        )}
        <div ref={messagesEndRef} />
      </MessagesContainer>
      <Divider />
      <Box sx={{ display: 'flex', mt: 2, gap: 1 }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Digite sua mensagem..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          disabled={loading}
          size="small"
        />
        <Button
          variant="contained"
          onClick={handleSend}
          disabled={loading || !input.trim()}
          sx={{ minWidth: 100 }}
        >
          <SendIcon />
        </Button>
      </Box>
    </ChatContainer>
  );
};

  export default InteractiveChat;