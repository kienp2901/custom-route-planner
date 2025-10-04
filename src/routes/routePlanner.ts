import express, { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import GoogleService from '../services/googleService';

const router = express.Router();

// Validation middleware
const validateRouteRequest = [
  body('destinations')
    .isArray({ min: 2 })
    .withMessage('At least 2 destinations are required'),
  body('destinations.*')
    .isString()
    .trim()
    .notEmpty()
    .withMessage('Each destination must be a non-empty string'),
  body('mode')
    .isIn(['driving', 'walking'])
    .withMessage('Mode must be either "driving" or "walking"')
];

/**
 * POST /api/route
 * Calculate route between multiple destinations
 */
router.post('/route', validateRouteRequest, async (req: Request, res: Response) => {
  try {
    // Check validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        error: 'Validation failed',
        details: errors.array()
      });
    }

    const { destinations, mode } = req.body;

    // Check if Google Maps API key is configured
    if (!process.env.GOOGLE_MAPS_API_KEY) {
      return res.status(500).json({
        error: 'Google Maps API key not configured'
      });
    }

    // Initialize Google service
    const googleService = new GoogleService();

    // Get route information
    const routeData = await googleService.getRoute(destinations, mode);

    res.json({
      success: true,
      data: routeData
    });

  } catch (error) {
    console.error('Route calculation error:', error);
    
    // Handle specific error types
    if (error instanceof Error) {
      if (error.message.includes('Geocoding failed')) {
        return res.status(400).json({
          error: 'Invalid address provided',
          message: error.message
        });
      }
      
      if (error.message.includes('Directions API failed')) {
        return res.status(400).json({
          error: 'Unable to calculate route',
          message: error.message
        });
      }
    }

    res.status(500).json({
      error: 'Internal server error',
      message: 'Failed to calculate route'
    });
  }
});

export default router;
