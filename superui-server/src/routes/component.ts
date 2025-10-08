/**
 * Component routes for SuperUI API Server
 * Handles HTTP requests for component information
 */

import express from 'express';
import { 
  getComponent, 
  ComponentRequest,
  listComponents,
  ListComponentsRequest,
  getComponentDetails,
  ComponentDetailsRequest
} from '../services/component-service.js';

const router = express.Router();

/**
 * POST /api/component
 * Get component information and installation instructions
 */
router.post('/component', async (req, res) => {
  try {
    console.log('📥 Received component request:', {
      body: req.body,
      timestamp: new Date().toISOString()
    });
    
    // Validate request body
    const {
      message,
      searchQuery,
      absolutePathToCurrentFile,
      absolutePathToProjectDirectory,
      standaloneRequestQuery
    } = req.body;

    // Check required fields
    if (!searchQuery) {
      return res.status(400).json({
        error: 'Missing required field: searchQuery',
        timestamp: new Date().toISOString()
      });
    }

    // Create component request
    const componentRequest: ComponentRequest = {
      message: message || '',
      searchQuery,
      absolutePathToCurrentFile: absolutePathToCurrentFile || '',
      absolutePathToProjectDirectory: absolutePathToProjectDirectory || '',
      standaloneRequestQuery: standaloneRequestQuery || message || searchQuery
    };

    // Get component information
    const result = await getComponent(componentRequest);

    console.log('📤 Sending component response:', {
      searchQuery,
      resultLength: result.length,
      timestamp: new Date().toISOString()
    });

    res.json({ 
      result,
      metadata: {
        searchQuery,
        timestamp: new Date().toISOString(),
        version: '1.0.0'
      }
    });
  } catch (error) {
    console.error('❌ Component request error:', error);
    
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    
    res.status(500).json({ 
      error: errorMessage,
      timestamp: new Date().toISOString(),
      version: '1.0.0'
    });
  }
});

/**
 * GET /api/component/search?q=query
 * Search for components by query
 */
router.get('/component/search', async (req, res) => {
  try {
    const { q: query } = req.query;
    
    if (!query || typeof query !== 'string') {
      return res.status(400).json({
        error: 'Missing required query parameter: q',
        timestamp: new Date().toISOString()
      });
    }

    console.log(`🔍 Component search request: "${query}"`);

    // Import searchComponents function
    const { searchComponents } = await import('../utils/component-finder.js');
    const results = searchComponents(query);

    res.json({
      query,
      results: results.map(component => ({
        componentName: component.componentName,
        displayName: component.displayName,
        description: component.description,
        category: component.category,
        tags: component.tags
      })),
      count: results.length,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('❌ Component search error:', error);
    
    res.status(500).json({ 
      error: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString()
    });
  }
});

/**
 * GET /api/component/list
 * Get list of all available components
 */
router.get('/component/list', async (req, res) => {
  try {
    const { category } = req.query;
    
    console.log(`📋 Component list request${category ? ` (category: ${category})` : ''}`);

    // Import component functions
    const { getAllComponents, getComponentsByCategory } = await import('../utils/component-finder.js');
    
    let components;
    if (category && typeof category === 'string') {
      components = getComponentsByCategory(category);
    } else {
      components = getAllComponents();
    }

    res.json({
      components: components.map(component => ({
        componentName: component.componentName,
        displayName: component.displayName,
        description: component.description,
        category: component.category,
        tags: component.tags
      })),
      count: components.length,
      category: category || 'all',
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('❌ Component list error:', error);
    
    res.status(500).json({ 
      error: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString()
    });
  }
});

/**
 * GET /api/component/:componentName
 * Get specific component information
 */
router.get('/component/:componentName', async (req, res) => {
  try {
    const { componentName } = req.params;
    
    console.log(`🔍 Component detail request: "${componentName}"`);

    // Import findComponent function
    const { findComponent } = await import('../utils/component-finder.js');
    const component = findComponent(componentName);

    if (!component) {
      return res.status(404).json({
        error: `Component "${componentName}" not found`,
        timestamp: new Date().toISOString()
      });
    }

    res.json({
      component,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('❌ Component detail error:', error);
    
    res.status(500).json({ 
      error: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString()
    });
  }
});

/**
 * POST /api/component/list
 * List components based on search query
 * Used by MCP list_components tool
 */
router.post('/component/list', async (req, res) => {
  try {
    console.log('📥 Received list components request:', {
      body: req.body,
      timestamp: new Date().toISOString()
    });
    
    const { query, category, limit } = req.body;

    // query is now optional - if not provided, returns all components
    // Create list request
    const listRequest: ListComponentsRequest = {
      query: query || "all",  // Default to "all" if no query provided
      category: category || undefined,
      limit: limit || undefined  // No default limit - return all matching components
    };

    // Get component list
    const results = await listComponents(listRequest);

    console.log('📤 Sending list response:', {
      query,
      count: results.length,
      timestamp: new Date().toISOString()
    });

    res.json({
      results,
      metadata: {
        query,
        category: category || 'all',
        count: results.length,
        timestamp: new Date().toISOString(),
        version: '1.0.0'
      }
    });
  } catch (error) {
    console.error('❌ List components error:', error);
    
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    
    res.status(500).json({ 
      error: errorMessage,
      timestamp: new Date().toISOString(),
      version: '1.0.0'
    });
  }
});

/**
 * POST /api/component/details
 * Get detailed component information for installation
 * Used by MCP get_component_details tool
 */
router.post('/component/details', async (req, res) => {
  try {
    console.log('📥 Received component details request:', {
      body: req.body,
      timestamp: new Date().toISOString()
    });
    
    const {
      componentName,
      absolutePathToCurrentFile,
      absolutePathToProjectDirectory
    } = req.body;

    // Validate required fields
    if (!componentName) {
      return res.status(400).json({
        error: 'Missing required field: componentName',
        timestamp: new Date().toISOString()
      });
    }

    // Create details request
    const detailsRequest: ComponentDetailsRequest = {
      componentName,
      absolutePathToCurrentFile: absolutePathToCurrentFile || '',
      absolutePathToProjectDirectory: absolutePathToProjectDirectory || ''
    };

    // Get component details
    const result = await getComponentDetails(detailsRequest);

    console.log('📤 Sending details response:', {
      componentName,
      resultLength: result.length,
      timestamp: new Date().toISOString()
    });

    res.json({
      result,
      metadata: {
        componentName,
        timestamp: new Date().toISOString(),
        version: '1.0.0'
      }
    });
  } catch (error) {
    console.error('❌ Component details error:', error);
    
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    
    res.status(500).json({ 
      error: errorMessage,
      timestamp: new Date().toISOString(),
      version: '1.0.0'
    });
  }
});

export default router;
