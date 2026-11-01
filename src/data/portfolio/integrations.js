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
    "icon": "bi-diagram-3",
    "title": "Work that can wait",
    "description": "Use queues and schedules when immediacy is less important than resilience, throughput, controlled retries, and a fast response to the user.",
    "tools": [
      "Redis",
      "Queues",
      "Cron"
    ]
  }
];
