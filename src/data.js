export const journey = [
  { period: 'Apr 2021', title: 'Learned production by shipping into it', company: 'Socialbytes Technologies', companyUrl: 'https://thesocialbytes.com/', text: 'Moved from PHP fundamentals into live Laravel systems—authentication, SQL-backed workflows, integrations, and the everyday debugging that turns framework knowledge into engineering judgment.' },
  { period: '2022', title: 'From isolated features to connected workflows', text: 'Took on REST endpoints, validation boundaries, reusable modules, and multi-step data flows where one backend decision affected operators, customers, reports, and downstream systems.' },
  { period: 'Aug 2023', title: 'Expanded ownership as a Laravel Developer', company: 'Swipewire Technologies', companyUrl: 'https://theswipewire.com/', text: 'Worked across scalable application features, third-party APIs, MySQL performance, access control, and the reliability details required after software reaches real users.' },
  { period: '2024', title: 'Optimized the paths users never see', text: 'Focused on query behavior, permissions, integration failures, operational visibility, and production issue resolution—the invisible work that makes a product feel dependable.' },
  { period: '2025-26', title: 'Carrying production discipline into Java', text: 'Extending the same backend principles into Java, Spring Boot, Redis, Docker, and service-oriented design while keeping Laravel delivery sharp and practical.' },
];

export const integrations = [
  { icon: 'bi-credit-card-2-front', title: 'Money movement', description: 'Treat payment callbacks as distributed events: verify the source, protect state transitions, tolerate retries, and keep reconciliation explainable.', tools: ['Stripe', 'Razorpay', 'Webhooks'] },
  { icon: 'bi-chat-dots', title: 'Message delivery', description: 'Hide provider differences behind one internal contract, move slow work off-request, and retain enough delivery context to support users later.', tools: ['SMS APIs', 'Email', 'Notifications'] },
  { icon: 'bi-arrow-left-right', title: 'Partner boundaries', description: 'Keep external APIs outside the core domain through adapters that own authentication, validation, timeouts, response mapping, and failure context.', tools: ['REST', 'OAuth', 'JSON'] },
  { icon: 'bi-diagram-3', title: 'Work that can wait', description: 'Use queues and schedules when immediacy is less important than resilience, throughput, controlled retries, and a fast response to the user.', tools: ['Redis', 'Queues', 'Cron'] },
];

export const skills = [
  ['bi-hdd-network', 'Shape the application boundary', 'Laravel services, middleware, validation, authentication, permissions, queues, and API contracts that keep business rules explicit.'],
  ['bi-database-check', 'Make data paths intentional', 'MySQL schemas, indexes, query plans, transactions, Redis caching, pagination, and reports designed around actual access patterns.'],
  ['bi-arrow-repeat', 'Connect unreliable worlds safely', 'Webhooks, payment gateways, messaging providers, scheduled work, retries, idempotency, and failure states with operational context.'],
  ['bi-cloud-check', 'Build toward Java services', 'Spring Boot controllers, DTOs, validation, service layers, persistence, and clean boundaries informed by production backend experience.'],
  ['bi-window-stack', 'Design usable API contracts', 'React integration, admin workflows, forms, tables, loading states, and predictable responses that reduce frontend guesswork.'],
  ['bi-activity', 'Operate what gets shipped', 'Structured logs, useful metrics, safe defaults, incident debugging, release awareness, and documentation written for the next person on call.'],
];

export const projects = [
  { category: 'Healthcare', icon: 'bi-heart-pulse', title: 'A care platform where access is part of the data model', text: 'Patient records, appointments, and staff workflows designed around privacy, role boundaries, and fast retrieval under daily operational pressure.', points: ['Permission-aware service boundaries', 'Search paths shaped for appointment and patient lookup', 'Cache strategy for frequently accessed screens'], tags: ['Laravel', 'MySQL', 'Redis', 'RBAC'], filters: ['backend', 'product'], className: 'featured' },
  { category: 'Education ERP', icon: 'bi-building-gear', title: 'An operations backbone for a busy campus', text: 'Admissions, fees, audits, reports, and administrative workflows connected as one dependable institutional data flow.', points: ['Scheduled automation for repetitive operations', 'Module-to-module REST contracts', 'Validation that protects downstream reports'], tags: ['PHP', 'Laravel', 'Cron', 'REST'], filters: ['backend', 'product'] },
  { category: 'Commerce', icon: 'bi-cart-check', title: 'An order lifecycle built for imperfect payment networks', text: 'Cart, checkout, payment callbacks, order transitions, and support visibility treated as one traceable transactional workflow.', points: ['Stripe and Razorpay provider boundaries', 'Retry-safe callback processing', 'Order states that support reconciliation'], tags: ['Laravel', 'Stripe', 'Razorpay', 'Webhooks'], filters: ['backend', 'integration', 'product'] },
  { category: 'Integration Hub', icon: 'bi-node-plus', title: 'One internal language for many external providers', text: 'SMS, email, payment, and notification services normalized behind contracts the rest of the product can use without provider-specific branching.', points: ['Consistent request and response mapping', 'Queue-ready handling for slow providers', 'Failure context designed for diagnosis'], tags: ['REST', 'Queues', 'Webhooks', 'Logs'], filters: ['backend', 'integration'] },
  { category: 'Collaboration', icon: 'bi-kanban', title: 'A task system that treats status as a business rule', text: 'Ownership, priorities, deadlines, transitions, and workload reporting modeled through explicit backend behavior rather than loose UI state.', points: ['Guarded state transitions and ownership', 'Workload-focused dashboard contracts', 'Java, React, and MySQL delivery'], tags: ['Java', 'Backend APIs', 'React', 'MySQL'], filters: ['backend', 'product'] },
  { category: 'Realtime Product', icon: 'bi-controller', title: 'A game platform built around live room state', text: 'Player identity, rooms, matches, scores, history, and administration framed as concurrent state with clear persistence boundaries.', points: ['Event-oriented realtime interactions', 'Redis-backed room and leaderboard state', 'Request guards and accountable player history'], tags: ['Node.js', 'WebSockets', 'Redis', 'MySQL', 'React'], filters: ['backend', 'realtime', 'product'], className: 'project-card-wide' },
];

export const proof = [
  [50, '+', 'Backend surfaces delivered', 'APIs, admin workflows, integrations, scheduled jobs, and product features carried from requirement to working behavior.'],
  [15, '+', 'Product contexts supported', 'Experience moving between domains while preserving the same fundamentals: clear rules, reliable data, and maintainable delivery.'],
  [5, '+', 'Years inside production systems', 'Enough time to value failure paths, query behavior, supportability, and calm debugging as much as the happy path.'],
  [4, '', 'System concerns held together', 'Application logic, data, integrations, and operations treated as one backend responsibility rather than separate checklists.'],
];
