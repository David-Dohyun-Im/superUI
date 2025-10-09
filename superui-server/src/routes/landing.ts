/**
 * Landing page routes for SuperUI API Server
 * Handles landing page generation and conversation flow
 */

import express from 'express';
import { getLanding } from '../services/landing-service.js';

const router = express.Router();

/**
 * POST /api/landing - Generate landing page or continue conversation
 * This endpoint handles the MCP server's landing page requests
 */
router.post('/landing', async (req, res) => {
  try {
    console.log('🎨 Received landing page request:', req.body);
    
    const {
      message,
      conversationState,
      absolutePathToCurrentFile,
      absolutePathToProjectDirectory,
      standaloneRequestQuery
    } = req.body;

    // Validate required fields
    if (!message) {
      return res.status(400).json({ 
        error: "Message is required",
        timestamp: new Date().toISOString()
      });
    }

    // Generate landing page or continue conversation
    const result = await getLanding({
      message,
      conversationState,
      absolutePathToCurrentFile: absolutePathToCurrentFile || "/Users/test/project/src/App.tsx",
      absolutePathToProjectDirectory: absolutePathToProjectDirectory || "/Users/test/project",
      standaloneRequestQuery
    });

    console.log('📤 Sending landing page response');
    
    // Return the result
    res.json({ 
      result,
      metadata: {
        timestamp: new Date().toISOString(),
        version: '1.0.0'
      }
    });
    
  } catch (error: any) {
    console.error('❌ Landing page request error:', error);
    res.status(500).json({ 
      error: error.message,
      timestamp: new Date().toISOString()
    });
  }
});

/**
 * POST /api/template - Legacy endpoint (redirects to /api/landing)
 * This endpoint maintains backwards compatibility
 */
router.post('/template', async (req, res) => {
  try {
    console.log('🎨 Received template request (redirecting to landing):', req.body);
    
    const {
      message,
      conversationState,
      absolutePathToCurrentFile,
      absolutePathToProjectDirectory,
      standaloneRequestQuery
    } = req.body;

    // Validate required fields
    if (!message) {
      return res.status(400).json({ 
        error: "Message is required",
        timestamp: new Date().toISOString()
      });
    }

    // Generate landing page or continue conversation
    const result = await getLanding({
      message,
      conversationState,
      absolutePathToCurrentFile: absolutePathToCurrentFile || "/Users/test/project/src/App.tsx",
      absolutePathToProjectDirectory: absolutePathToProjectDirectory || "/Users/test/project",
      standaloneRequestQuery
    });

    console.log('📤 Sending landing page response');
    
    // Return the result
    res.json({ 
      result,
      metadata: {
        timestamp: new Date().toISOString(),
        version: '1.0.0'
      }
    });
    
  } catch (error: any) {
    console.error('❌ Landing page request error:', error);
    res.status(500).json({ 
      error: error.message,
      timestamp: new Date().toISOString()
    });
  }
});

/**
 * GET /api/landing/start - Start a new landing page conversation
 * This endpoint can be used to start a new landing page generation process
 */
router.get('/landing/start', async (req, res) => {
  try {
    console.log('🎨 Starting new landing page conversation');
    
    const result = await getLanding({
      message: "Start new landing page conversation",
      absolutePathToCurrentFile: "/Users/test/project/src/App.tsx",
      absolutePathToProjectDirectory: "/Users/test/project",
      standaloneRequestQuery: "Start new landing page conversation"
    });

    res.json({ 
      result,
      metadata: {
        timestamp: new Date().toISOString(),
        version: '1.0.0'
      }
    });
    
  } catch (error: any) {
    console.error('❌ Start landing page conversation error:', error);
    res.status(500).json({ 
      error: error.message,
      timestamp: new Date().toISOString()
    });
  }
});

/**
 * GET /api/landing/help - Get help information about landing page generation
 * This endpoint provides information about how to use the landing page system
 */
router.get('/landing/help', async (req, res) => {
  try {
    const helpInfo = {
      title: "SuperUI Landing Page Generator",
      description: "Generate custom landing page templates through conversation",
      version: "1.0.0",
      features: [
        "Interactive conversation flow",
        "Tailark component integration",
        "Custom section recommendations",
        "Style and tone customization",
        "Installation commands"
      ],
      usage: {
        start: "Send a message to start landing page generation",
        conversation: "Answer 4 questions about your landing page",
        result: "Get a complete template with installation commands"
      },
      questions: [
        "What is this landing page for?",
        "Who is your target audience?",
        "What action do you want visitors to take?",
        "What style or tone do you prefer?"
      ],
      supportedComponents: [
        "hero", "features", "pricing", "testimonials", 
        "stats", "team", "content", "call-to-action", "footer"
      ]
    };

    res.json(helpInfo);
    
  } catch (error: any) {
    console.error('❌ Landing page help error:', error);
    res.status(500).json({ 
      error: error.message,
      timestamp: new Date().toISOString()
    });
  }
});

export default router;

