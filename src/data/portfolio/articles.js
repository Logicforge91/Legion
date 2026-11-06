export const articles = [
  {
    slug: 'validate-at-the-boundary',
    topic: 'API design',
    title: 'Validate requests at the boundary',
    summary: 'Turn untrusted input into a clear, typed application contract before business logic runs.',
    readTime: '4 min',
    tags: ['REST APIs', 'Validation', 'Security'],
    sections: [
      {
        heading: 'Start with an explicit contract',
        body: 'Treat every request as untrusted, including requests from your own frontend. Define required fields, types, length limits, allowed values, and cross-field rules before passing data into a service.',
        points: [
          'Reject malformed input with a stable 4xx response and field-level errors.',
          'Normalize only what the contract allows; do not silently repair ambiguous values.',
          'Pass a validated request object into domain logic instead of the raw request.',
        ],
      },
      {
        heading: 'Keep validation separate from authorization',
        body: 'A value can be well formed and still be forbidden. Validate shape first, then check whether the current actor can perform the requested operation on that resource.',
        points: ['Test invalid shape and forbidden access as separate cases.'],
      },
    ],
  },
  {
    slug: 'make-webhooks-idempotent',
    topic: 'Integrations',
    title: 'Make webhook handling safe to retry',
    summary: 'Use signatures, durable event IDs, and explicit state transitions to handle duplicate delivery.',
    readTime: '5 min',
    tags: ['Webhooks', 'Retries', 'Transactions'],
    sections: [
      {
        heading: 'Verify before processing',
        body: 'Check the provider signature against the exact request payload before trusting event fields. Reject invalid signatures and avoid logging secrets or full sensitive payloads.',
        points: [
          'Read the raw body when the signature scheme requires the original bytes.',
          'Use constant-time signature comparison where supported.',
          'Return the provider-required response for invalid or unsupported events.',
        ],
      },
      {
        heading: 'Make duplicate delivery harmless',
        body: 'Providers retry when acknowledgements are delayed or lost. Persist the provider event ID under a unique constraint and make the business state transition conditional.',
        points: [
          'Record an event as received before scheduling expensive work.',
          'Use a transaction or idempotency key around state changes.',
          'Move slow side effects to a queue and make each job safe to retry.',
        ],
      },
    ],
  },
  {
    slug: 'choose-indexes-from-queries',
    topic: 'Data performance',
    title: 'Choose database indexes from real queries',
    summary: 'Read the query shape and execution plan before adding indexes that increase write cost.',
    readTime: '4 min',
    tags: ['MySQL', 'Indexes', 'Query plans'],
    sections: [
      {
        heading: 'Start with the workload',
        body: 'Capture the slow query and its common parameter patterns. An index should support a measured filter, join, or ordering path rather than a column that merely looks important.',
        points: [
          'Use EXPLAIN to inspect access type, chosen keys, and estimated rows.',
          'For a composite index, order columns around equality filters, range filters, and sorting needs.',
          'Check whether the query can use a covering index before widening it.',
        ],
      },
      {
        heading: 'Measure the trade-off',
        body: 'Indexes consume storage and make inserts, updates, and deletes more expensive. Recheck the execution plan and application latency after adding one, then remove redundant indexes.',
        points: ['Include realistic data volume and production-like selectivity in performance checks.'],
      },
    ],
  },
  {
    slug: 'authorize-resource-access',
    topic: 'Security',
    title: 'Authorize access where resources are loaded',
    summary: 'Prevent insecure direct object references by combining identity checks with resource-scoped queries.',
    readTime: '5 min',
    tags: ['Authorization', 'Access control', 'APIs'],
    sections: [
      {
        heading: 'Scope the lookup to the actor',
        body: 'A valid identifier does not prove that the current user may access the record. Load resources through an ownership or permission scope when possible, then apply policy checks for the requested action.',
        points: [
          'Deny by default when no rule grants access.',
          'Check permissions on every request, including background and export paths.',
          'Return a consistent not-found or forbidden response that does not expose private records.',
        ],
      },
      {
        heading: 'Test the boundary directly',
        body: 'Create tests for an owner, an authorized collaborator, and an unrelated user. Try reading, updating, deleting, and listing by guessed identifiers.',
        points: ['Assert that unauthorized attempts do not change data or trigger side effects.'],
      },
    ],
  },
  {
    slug: 'design-observable-failures',
    topic: 'Reliability',
    title: 'Make integration failures diagnosable',
    summary: 'Capture enough structured context to trace a failure without leaking credentials or personal data.',
    readTime: '4 min',
    tags: ['Logging', 'Retries', 'Operations'],
    sections: [
      {
        heading: 'Log the operation, not the secret',
        body: 'Use structured fields such as request ID, provider, operation, result, and duration. Redact authorization headers, tokens, and sensitive payload fields before anything reaches logs.',
        points: [
          'Propagate a correlation ID across API and asynchronous job boundaries.',
          'Record provider status codes and a safe error category.',
          'Keep logs useful for support while limiting personal and confidential data.',
        ],
      },
      {
        heading: 'Make retries visible',
        body: 'Track attempts and final outcomes separately. Retry transient failures with bounded exponential backoff and a dead-letter or manual recovery path for exhausted work.',
        points: ['Alert on sustained failure rates and growing queue age, not on every isolated retry.'],
      },
    ],
  },
];
