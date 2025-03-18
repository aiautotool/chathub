import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import passport from "passport";
import { storage } from "./storage";
import { chatRequestSchema, ChatResponse, modelType } from "@shared/schema";
import { DeepSeekClient } from "./api/deepseek";
import { AnthropicClient } from "./api/anthropic";
import { GeminiClient } from "./api/gemini";
import { OpenAIClient } from "./api/openai";
import { GrokClient } from "./api/grok";
import { configurePassport } from "./auth";
import { log } from "./vite";

export async function registerRoutes(app: Express): Promise<Server> {
  // Configure passport authentication
  const passportInstance = configurePassport();
  app.use(passport.initialize());
  app.use(passport.session());

  // Initialize API clients
  const deepseekClient = new DeepSeekClient();
  const anthropicClient = new AnthropicClient();
  const geminiClient = new GeminiClient();
  const openaiClient = new OpenAIClient();
  const grokClient = new GrokClient();
  
  // Set up auth routes only if Google credentials are available
  if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET) {
    // Auth routes
    app.get('/auth/google', 
      passport.authenticate('google', { scope: ['profile', 'email'] })
    );
    
    app.get('/auth/google/callback', 
      passport.authenticate('google', { 
        failureRedirect: '/login',
        successRedirect: '/'
      })
    );
    
    log('Google authentication routes registered', 'auth');
  }
  
  // User info route - works with or without Google auth
  app.get('/api/user', (req, res) => {
    if (req.isAuthenticated()) {
      const user = req.user;
      // Strip sensitive information
      const safeUser = {
        id: (user as any).id,
        username: (user as any).username,
        displayName: (user as any).displayName,
        email: (user as any).email,
        profilePicture: (user as any).profilePicture,
        isGoogleUser: (user as any).isGoogleUser
      };
      res.json({ authenticated: true, user: safeUser });
    } else {
      res.json({ authenticated: false });
    }
  });
  
  // Logout route - works with or without Google auth
  app.get('/auth/logout', (req, res) => {
    req.logout((err) => {
      if (err) {
        return res.status(500).json({ error: 'Error logging out' });
      }
      res.redirect('/');
    });
  });

  // Chat API endpoint
  app.post('/api/chat', async (req, res) => {
    try {
      // Validate request body
      const result = chatRequestSchema.safeParse(req.body);
      if (!result.success) {
        return res.status(400).json({ 
          message: "Invalid request format", 
          errors: result.error.errors 
        });
      }

      const { model, messages } = result.data;

      // Process the request based on the model
      let response: ChatResponse;

      switch (model) {
        case 'deepseek-r1':
        case 'deepseek-v3':
          response = await deepseekClient.chat(model, messages);
          break;
        
        case 'claude-3-7-sonnet':
        case 'claude-3-5-haiku':
          response = await anthropicClient.chat(model, messages);
          break;
        
        case 'gemini-2-0-flash':
          response = await geminiClient.chat(model, messages);
          break;
        
        case 'openai-o3-mini':
        case 'openai-o1':
        case 'openai-o1-mini':
          response = await openaiClient.chat(model, messages);
          break;
        
        case 'grok-2':
          response = await grokClient.chat(model, messages);
          break;
        
        default:
          return res.status(400).json({ message: `Model '${model}' is not supported` });
      }

      return res.json(response);
    } catch (error) {
      console.error('Error processing chat request:', error);
      return res.status(500).json({ 
        message: error instanceof Error ? error.message : "An unknown error occurred"
      });
    }
  });

  // API health check endpoint
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok' });
  });
  
  const httpServer = createServer(app);
  return httpServer;
}
