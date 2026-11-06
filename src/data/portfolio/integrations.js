export const integrations = [
  {
    "icon": "bi-credit-card-2-front",
    "title": "Money movement",
    "description": "Treat payment callbacks as distributed events: verify the source, protect state transitions, tolerate retries, and keep reconciliation explainable.",
    "tools": [
      "Stripe",
      "Razorpay",
      "Webhooks"
    ]
  },
  {
    "icon": "bi-chat-dots",
    "title": "Message delivery",
    "description": "Hide provider differences behind one internal contract, move slow work off-request, and retain enough delivery context to support users later.",
    "tools": [
      "SMS APIs",
      "Email",
      "Notifications"
    ]
  },
  {
    "icon": "bi-arrow-left-right",
    "title": "Partner boundaries",
    "description": "Keep external APIs outside the core domain through adapters that own authentication, validation, timeouts, response mapping, and failure context.",
    "tools": [
      "REST",
      "OAuth",
      "JSON"
    ]
  },
  {
    "icon": "bi-person-lock",
    "title": "Identity & access",
    "description": "Treat sign-in and authorization as explicit boundaries: validate identity claims, enforce permissions server-side, and make session and access failures safe to recover from.",
    "tools": [
      "OAuth 2.0 / OIDC",
      "SSO",
      "RBAC",
      "MFA"
    ]
  },
  {
    "icon": "bi-diagram-3",
    "title": "Work that can wait",
    "description": "Use queues and schedules when immediacy is less important than resilience, throughput, controlled retries, and a fast response to the user.",
    "tools": [
      "Redis",
      "Queues",
      "Cron"
    ]
  },
  {
    "icon": "bi-activity",
    "title": "Operational visibility",
    "description": "Make failures diagnosable across service boundaries with structured events, useful context, and health signals that support investigation.",
    "tools": [
      "Structured logs",
      "Metrics",
      "Tracing"
    ]
  },
  {
    "icon": "bi-lightning-charge",
    "title": "Fast, repeatable reads",
    "description": "Use caching for data that can be safely reused, with clear expiration and invalidation rules so speed does not outlive correctness.",
    "tools": [
      "Redis",
      "TTL",
      "Invalidation"
    ]
  },
  {
    "icon": "bi-file-earmark-arrow-up",
    "title": "File and media storage",
    "description": "Keep file handling outside core request logic with validation, controlled access, and explicit metadata and lifecycle boundaries.",
    "tools": [
      "Object storage",
      "Signed URLs",
      "Lifecycle"
    ]
  },
  {
    "icon": "bi-search",
    "title": "Search and discovery",
    "description": "Shape searchable records around user intent, with consistent indexing, filtering, and update behavior as source data changes.",
    "tools": [
      "Indexing",
      "Filtering",
      "Relevance"
    ]
  },
  {
    "icon": "bi-geo-alt",
    "title": "Location services",
    "description": "Handle coordinates and address lookups through explicit provider boundaries, with validation and sensible behavior when location data is unavailable.",
    "tools": [
      "Geocoding",
      "Coordinates",
      "Distance queries"
    ]
  },
  {
    "icon": "bi-bar-chart-line",
    "title": "Product analytics",
    "description": "Send purposeful product events through a controlled boundary, keeping event names, useful context, and privacy expectations consistent.",
    "tools": [
      "Event tracking",
      "Funnels",
      "Privacy controls"
    ]
  }
];
