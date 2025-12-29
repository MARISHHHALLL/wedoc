import { NextRequest, NextResponse } from "next/server";

/**
 * Instagram Webhook Callback Route
 * 
 * GET: Used for webhook verification (Instagram sends a GET request with challenge)
 * POST: Used for receiving webhook events from Instagram
 * 
 * Requirements:
 * - Must be publicly accessible
 * - Must use HTTPS (Netlify satisfies this)
 * - Must return 200 OK response
 */

/**
 * GET /api/instagram/webhook
 * Webhook verification endpoint
 * Instagram sends a GET request with hub.mode, hub.challenge, and hub.verify_token
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const mode = searchParams.get("hub.mode");
    const challenge = searchParams.get("hub.challenge");
    const verifyToken = searchParams.get("hub.verify_token");

    // Verify the webhook token (optional but recommended)
    const expectedToken = process.env.INSTAGRAM_WEBHOOK_VERIFY_TOKEN;
    
    if (mode === "subscribe" && verifyToken) {
      // If verify token is configured, validate it
      if (expectedToken && verifyToken !== expectedToken) {
        console.error("Webhook verification failed: Invalid verify token");
        return NextResponse.json(
          { error: "Forbidden" },
          { status: 403 }
        );
      }

      // Return the challenge to verify the webhook
      if (challenge) {
        return new NextResponse(challenge, {
          status: 200,
          headers: {
            "Content-Type": "text/plain",
          },
        });
      }
    }

    // Default response for GET requests (for testing accessibility)
    return NextResponse.json(
      { 
        message: "Instagram webhook endpoint is active",
        status: "ok",
        timestamp: new Date().toISOString(),
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in Instagram webhook GET handler:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

/**
 * POST /api/instagram/webhook
 * Webhook event handler
 * Instagram sends POST requests with webhook events
 */
export async function POST(request: NextRequest) {
  try {
    // Verify webhook signature if configured (recommended for production)
    const signature = request.headers.get("x-hub-signature-256");
    const secret = process.env.INSTAGRAM_WEBHOOK_SECRET;

    if (secret && signature) {
      // In production, you should verify the signature here
      // This ensures the request is actually from Instagram
      // For now, we'll log it but not enforce it
      console.log("Webhook signature received:", signature);
    }

    const body = await request.json();
    
    // Log the webhook event (you can process it as needed)
    console.log("Instagram webhook event received:", JSON.stringify(body, null, 2));

    // Handle different webhook event types
    if (body.object === "instagram") {
      // Process Instagram webhook events
      for (const entry of body.entry || []) {
        // Handle different event types (messages, comments, etc.)
        if (entry.messaging) {
          // Handle messaging events
          for (const event of entry.messaging) {
            console.log("Messaging event:", event);
            // Process the messaging event here
          }
        }
        
        if (entry.changes) {
          // Handle other changes (comments, mentions, etc.)
          for (const change of entry.changes) {
            console.log("Change event:", change);
            // Process the change event here
          }
        }
      }
    }

    // Always return 200 OK to acknowledge receipt
    return NextResponse.json(
      { 
        success: true,
        message: "Webhook event received",
        timestamp: new Date().toISOString(),
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error processing Instagram webhook:", error);
    
    // Still return 200 OK to prevent Instagram from retrying
    // (unless you want to handle retries differently)
    return NextResponse.json(
      { 
        success: false,
        error: "Error processing webhook",
        timestamp: new Date().toISOString(),
      },
      { status: 200 }
    );
  }
}

