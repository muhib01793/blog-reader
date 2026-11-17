export const posts = [
  {
    id: "understanding-react-server-components",
    title: "Understanding React Server Components: Architecture, Mental Models & Gotchas",
    slug: "understanding-react-server-components",
    excerpt: "A complete guide to why React Server Components exist, how the wire format streams to the browser, and the key architectural trade-offs you must know.",
    category: "web-architecture",
    categoryName: "Web Architecture",
    tags: ["React", "Architecture", "JavaScript", "Next.js"],
    featured: true,
    coverImage: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&w=1200&q=80",
    coverCaption: "React Server Components bridge zero-bundle-size server execution with rich client interactivity.",
    publishDate: "November 12, 2024",
    readTime: "7 min read",
    views: "5.4k",
    initialLikes: 218,
    audioDuration: "5:45",
    author: {
      name: "Marcus Vance",
      role: "Staff Frontend Architect",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
      bio: "Marcus has spent 12 years building high-throughput web architectures and currently leads frontend infrastructure at a global cloud provider.",
      twitter: "@marcusvance",
      github: "marcusvance"
    },
    content: `
      <h2>The Genesis of Server Components</h2>
      <p>For nearly a decade, the standard React mental model was simple: your components execute in JavaScript on the client side, render into a virtual DOM, and re-render whenever state or props change. While Server-Side Rendering (SSR) added an initial HTML snapshot step, every component was still bundled and shipped over the network.</p>
      
      <p>React Server Components (RSC) fundamentally redefine this boundary. They allow developers to write components that run exclusively on the server, never download to the client's JavaScript bundle, and yet can seamlessly nest and render client-interactive components.</p>

      <blockquote>
        "The goal of RSC isn't just faster initial page loads; it is to establish a seamless spectrum between zero-bundle server logic and rich, local client interactivity."
      </blockquote>

      <h2>How the RSC Wire Format Actually Works</h2>
      <p>Instead of compiling down to pure HTML strings (as traditional SSR does), React Server Components emit a structured JSON-like streaming stream known as the RSC Payload. This stream contains:</p>

      <ul>
        <li><strong>Rendered tree nodes</strong>: HTML-compatible component tags and resolved properties.</li>
        <li><strong>Client component references</strong>: Pointers (chunks) to client-side bundles that need hydration.</li>
        <li><strong>Server state payloads</strong>: Serializable data fetched directly on the server without extra client roundtrips.</li>
      </ul>

      <pre><code>// Example: A pure Server Component fetching directly from Postgres
import db from '@/lib/database';
import { ProductGallery } from './ProductGallery'; // Client Component

export default async function ProductPage({ params }) {
  // Direct DB access — no API endpoint needed, 0 KB client bundle!
  const product = await db.products.findUnique({
    where: { id: params.id }
  });

  return (
    <article className="product-layout">
      <h1>{product.name}</h1>
      <p className="description">{product.description}</p>
      {/* Interactive client component hydrates seamlessly */}
      <ProductGallery items={product.images} />
    </article>
  );
}</code></pre>

      <h2>Key Architectural Advantages</h2>
      <p>When evaluated against traditional SPA and SSR patterns, Server Components shine across three primary dimensions:</p>
      
      <ol>
        <li><strong>Zero Client Bundle Overhead:</strong> Heavy markdown parsers, syntax highlighters, or date manipulation libraries stay completely on the server.</li>
        <li><strong>Direct Data Layer Access:</strong> No internal REST or GraphQL roundtrips between the client and server to fetch secondary relational data.</li>
        <li><strong>Preserved Client State:</strong> Unlike traditional page navigations, server tree updates stream in without wiping out existing client form inputs or scroll positions.</li>
      </ol>

      <h2>Common Gotchas to Avoid</h2>
      <p>Transitioning to the RSC mental model requires unlearning a few ingrained habits. Remember that Server Components cannot access browser APIs (like <code>window</code> or <code>localStorage</code>) and cannot hold React lifecycle hooks like <code>useState</code> or <code>useEffect</code>. When you need interactivity, mark the file with <code>'use client'</code> at the very top.</p>
      
      <h3>Summary Checklist</h3>
      <p>Always keep components as server components by default, and push the <code>'use client'</code> boundary as far down your component tree leaves as possible to maximize your performance gains.</p>
    `
  },
  {
    id: "autonomous-ai-agents-production-reality",
    title: "Autonomous AI Agents in Production: From Demos to Reliable Systems",
    slug: "autonomous-ai-agents-production-reality",
    excerpt: "Moving beyond naive prompt loops: how top engineering teams architect resilient state machines, tool evaluation safeguards, and deterministic fallbacks for AI agents.",
    category: "ai-ml",
    categoryName: "AI & Machine Learning",
    tags: ["AI", "LLMs", "System Design", "Python", "Agents"],
    featured: true,
    coverImage: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80",
    coverCaption: "Modern production agents combine probabilistic reasoning with deterministic execution guarantees.",
    publishDate: "November 10, 2024",
    readTime: "9 min read",
    views: "8.1k",
    initialLikes: 342,
    audioDuration: "7:15",
    author: {
      name: "Dr. Elena Rostova",
      role: "Principal AI Research Scientist",
      avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80",
      bio: "Elena researches reinforcement learning and agent architectures. Previously at DeepMind and Stanford AI Lab.",
      twitter: "@elena_ai",
      github: "erostova"
    },
    content: `
      <h2>The Demise of Naive ReAct Loops</h2>
      <p>In early 2023, the software community fell in love with simple reasoning-and-action (ReAct) loops. You fed an LLM a prompt, gave it access to three Python tools, and let it call itself in a while-loop. While impressive in 30-second demos, deploying this to mission-critical business workflows revealed staggering failure modes: infinite hallucination loops, brittle parsing, and cascading token cost explosions.</p>

      <blockquote>
        "An AI agent is only as reliable as the deterministic state machine that constrains its freedom."
      </blockquote>

      <h2>The Three Pillars of Production-Grade Agents</h2>
      <p>Over the past 18 months, our team has deployed agents serving millions of weekly workflows across enterprise customer support, database reconciliation, and automated code review. We identified three non-negotiable architectural layers:</p>

      <h3>1. Explicit State Machines (Finite State Agents)</h3>
      <p>Instead of letting an open-ended model decide what phase comes next, model your business workflow as a deterministic DAG (Directed Acyclic Graph) or state chart. The LLM's role is strictly confined to selecting transitions within defined nodes and generating structured payload outputs.</p>

      <pre><code>// Pseudocode of a Constrained Agent Node
interface AgentNodeState {
  currentStage: 'RESEARCH' | 'VALIDATION' | 'EXECUTION' | 'REVIEW';
  stepHistory: StepRecord[];
  toolPermissions: Set<string>;
  maxRetries: number;
}

async function executeAgentNode(state: AgentNodeState) {
  // Validate preconditions before invocation
  assertAllowedTransitions(state.currentStage);
  
  const step = await llm.generateStructuredOutput({
    schema: TransitionSchema,
    systemPrompt: getStageConstraints(state.currentStage)
  });
  
  return verifyAndCommitTransition(state, step);
}</code></pre>

      <h3>2. Dual-Verification Tool Sandboxing</h3>
      <p>Never permit an LLM to invoke irreversible side-effect operations (like database updates or outbound email dispatches) in the same call where it plans the action. Separate the <em>intent generation</em> from the <em>execution verification</em>.</p>

      <ul>
        <li><strong>Intent Generation:</strong> The model proposes a structured change plan (dry run).</li>
        <li><strong>Deterministic Policy Engine:</strong> A non-AI rules engine inspects the plan against permission boundaries, budget quotas, and sanity checks.</li>
        <li><strong>Execution:</strong> Only after verification does the runtime perform the atomic action.</li>
      </ul>

      <h2>Observability & Tracing: The Secret Weapon</h2>
      <p>You cannot improve what you cannot trace. High-velocity agent teams instrument every token, tool call argument, and latency percentile with open telemetry frameworks. When an agent hallucinates, having a single replayable session ID allows engineering teams to reproduce the failure deterministically.</p>

      <h3>Conclusion</h3>
      <p>Autonomous intelligence in production isn't about giving language models free rein—it's about building sophisticated scaffolding that channels generative power into reliable, predictable outcomes.</p>
    `
  },
  {
    id: "the-psychology-of-minimalist-interfaces",
    title: "The Cognitive Psychology Behind High-Converting Minimalist Interfaces",
    slug: "the-psychology-of-minimalist-interfaces",
    excerpt: "Why removing elements often yields higher comprehension and user delight: exploring cognitive load theory, Miller's law, and intentional whitespace in digital design.",
    category: "design-ux",
    categoryName: "Design & UX",
    tags: ["UI/UX", "Design Systems", "Psychology", "Product Design"],
    featured: false,
    coverImage: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1200&q=80",
    coverCaption: "Minimalism is not the lack of something; it is the perfect amount of everything.",
    publishDate: "November 08, 2024",
    readTime: "5 min read",
    views: "4.2k",
    initialLikes: 195,
    audioDuration: "4:20",
    author: {
      name: "Sofia Al-Mansoor",
      role: "Head of Product Design",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80",
      bio: "Sofia designs consumer and enterprise software focused on spatial ergonomics, accessibility, and human-computer symbiosis.",
      twitter: "@sofia_ux",
      github: "sofiadesign"
    },
    content: `
      <h2>The Illusion of More Information</h2>
      <p>When stakeholders review an interface, there is an almost universal instinct to request more: "Can we add an extra badge here?", "What if we include a helper tooltip?", "Let's put three additional primary buttons on the hero section!"</p>

      <p>While each request is well-intentioned, every added visual stimulus incurs a micro-tax on the human user's working memory. Cognitive Load Theory posits that humans have a strictly limited reservoir of conscious attention. When interfaces demand too much cognitive decoding, users feel friction and bounce.</p>

      <blockquote>
        "Perfection is achieved, not when there is nothing more to add, but when there is nothing left to take away." — Antoine de Saint-Exupéry
      </blockquote>

      <h2>Hick's Law in Modern Micro-Interactions</h2>
      <p>Hick's Law states that the time required to make a decision increases logarithmically with the number and complexity of choices. When designing clean navigation patterns:</p>

      <ul>
        <li><strong>Limit top-level navigation</strong> to no more than 4 to 5 core destinations.</li>
        <li><strong>Progressive Disclosure:</strong> Keep advanced knobs and filters tucked away until the user explicitly requests them.</li>
        <li><strong>Single Primary Action:</strong> Each screen or modal should feature exactly one undeniable visual focal point.</li>
      </ul>

      <h2>Whitespace as an Active Architectural Element</h2>
      <p>Untrained eyes see whitespace as 'empty waste'. Veteran designers understand whitespace as visual oxygen. Generous margins and breathing room physically dictate visual hierarchy, guiding the human eye effortlessly down the information hierarchy without requiring clunky dividing lines.</p>

      <h3>Key Takeaway for Engineers & Designers</h3>
      <p>Before introducing a new container, border, or button, ask: <em>"What happens if I remove this entirely?"</em> If comprehension remains intact, leave it out.</p>
    `
  },
  {
    id: "building-resilient-distributed-systems",
    title: "Building Resilient Distributed Systems: Circuit Breakers, Bulkheads & Graceful Degradation",
    slug: "building-resilient-distributed-systems",
    excerpt: "Real-world strategies for keeping your systems standing when downstream microservices inevitably fail under unexpected peak traffic loads.",
    category: "engineering",
    categoryName: "Engineering",
    tags: ["Distributed Systems", "Backend", "DevOps", "Reliability"],
    featured: false,
    coverImage: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80",
    coverCaption: "Resilience isn't preventing failures; it is containing failures gracefully.",
    publishDate: "November 05, 2024",
    readTime: "8 min read",
    views: "6.7k",
    initialLikes: 289,
    audioDuration: "6:50",
    author: {
      name: "Tariq K. Rahman",
      role: "VP of Cloud Engineering",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
      bio: "Tariq previously managed high-frequency trading infrastructure and cloud migrations across distributed data centers.",
      twitter: "@tariqrahman",
      github: "tkrahman"
    },
    content: `
      <h2>The Law of Distributed Systems</h2>
      <p>In a monolithic architecture running on a single server, failure is binary: either your application is online, or the process has crashed. In distributed microservice environments, failure is continuous, subtle, and omnipresent. At any given second, a network switch is dropping packets, a third-party payment gateway is timing out, or a database replica is lagging.</p>

      <blockquote>
        "Everything fails, all the time." — Werner Vogels, CTO of Amazon
      </blockquote>

      <h2>The Circuit Breaker Pattern Explained</h2>
      <p>When a downstream service becomes unresponsive, continuing to bombard it with requests will only guarantee that it cannot recover. Worse, calling threads in your upstream services will hang while waiting for timeouts, causing resource exhaustion cascades across your entire cluster.</p>

      <pre><code>// Conceptual Circuit Breaker State Transition
class CircuitBreaker {
  constructor(failureThreshold = 5, cooldownPeriodMs = 10000) {
    this.state = 'CLOSED'; // Healthy
    this.failureCount = 0;
    this.lastFailureTime = null;
    this.threshold = failureThreshold;
    this.cooldown = cooldownPeriodMs;
  }

  async execute(requestFn, fallbackFn) {
    if (this.state === 'OPEN') {
      if (Date.now() - this.lastFailureTime > this.cooldown) {
        this.state = 'HALF_OPEN'; // Probe health with one attempt
      } else {
        return fallbackFn(); // Fast-fail immediately!
      }
    }

    try {
      const response = await requestFn();
      this.reset();
      return response;
    } catch (err) {
      this.recordFailure();
      return fallbackFn();
    }
  }
}</code></pre>

      <h2>The Bulkhead Isolation Strategy</h2>
      <p>Borrowed from nautical architecture, bulkheads segment a ship's hull into watertight compartments so that a single puncture does not sink the vessel. In software engineering, assign dedicated connection pools, worker threads, and memory allocations to individual critical features so that non-critical analytics logging can never monopolize database sockets away from user checkout.</p>

      <h2>Practical Takeaways</h2>
      <ul>
        <li>Never issue an outbound HTTP call without an explicit socket timeout.</li>
        <li>Always introduce exponential backoff with full jitter to avoid thundering herds.</li>
        <li>Design UI screens to display stale cached data rather than blank error screens whenever downstream calls fail.</li>
      </ul>
    `
  },
  {
    id: "senior-engineer-mindset-beyond-code",
    title: "The Staff & Senior Engineer Mindset: The Value You Deliver Beyond Code",
    slug: "senior-engineer-mindset-beyond-code",
    excerpt: "What really separates junior coders from senior technical leaders? Strategic communication, cross-functional leverage, and knowing what NOT to build.",
    category: "career-growth",
    categoryName: "Career & Insights",
    tags: ["Leadership", "Career", "Mentorship", "Productivity"],
    featured: false,
    coverImage: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80",
    coverCaption: "Code is a liability; the value you provide is the business outcomes you unlock.",
    publishDate: "November 02, 2024",
    readTime: "6 min read",
    views: "9.3k",
    initialLikes: 412,
    audioDuration: "5:10",
    author: {
      name: "Sarah Jenkins",
      role: "Distinguished Engineer & Author",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80",
      bio: "Sarah is a staff mentor, keynote speaker, and author of books on software engineering organizational culture.",
      twitter: "@sarah_eng",
      github: "sarahjenkins"
    },
    content: `
      <h2>The Shift From Output to Outcome</h2>
      <p>Early in our careers, success feels linear: you are assigned a ticket, you write 200 lines of clean code, you open a Pull Request, and the ticket moves to 'Done'. The metric of contribution is visible output.</p>

      <p>However, as you transition into senior and staff engineering roles, the most impactful day of your week might be the day you write zero lines of code. Instead, you spent two hours in a technical spec review, asked the right architectural questions, and persuaded product management that building a proposed 4-month feature was unnecessary because existing platform primitives could solve the underlying user pain point today.</p>

      <blockquote>
        "The most cost-effective and defect-free line of code is the line that was never written."
      </blockquote>

      <h2>The Three Superpowers of Senior Engineers</h2>
      
      <h3>1. Navigating Ambiguity</h3>
      <p>Juniors need well-specified requirements: <em>"Implement button X that calls endpoint Y."</em> Staff engineers are given fuzzy challenges: <em>"Our checkout abandonment spiked 14% on mobile last month—diagnose and fix it."</em> High-level engineering is about synthesizing ambiguous problem spaces into concrete roadmaps.</p>

      <h3>2. Amplifying Others Through Multiplicative Leverage</h3>
      <p>An extraordinary 10x individual coder can only ever produce the work of 10 people. A leader who mentors 15 mid-level engineers, establishes reusable architectural primitives, and unblocks organizational bottlenecks provides 50x compound value to the company.</p>

      <h3>3. Writing As A Thinking Tool</h3>
      <p>Amazon's 6-page narrative memos became legendary for a reason. Great engineers write with clarity. Writing an RFC (Request for Comments) forces you to encounter flaws in your reasoning long before your teammates waste weeks coding against a faulty foundation.</p>
    `
  },
  {
    id: "optimizing-core-web-vitals-modern-guide",
    title: "Optimizing Core Web Vitals in 2025: LCP, INP & CLS Mastery",
    slug: "optimizing-core-web-vitals-modern-guide",
    excerpt: "Everything you need to know about Interaction to Next Paint (INP), mastering sub-second Largest Contentful Paint, and preventing layout shifts.",
    category: "web-architecture",
    categoryName: "Web Architecture",
    tags: ["Web Performance", "Frontend", "SEO", "Vitals"],
    featured: false,
    coverImage: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80",
    coverCaption: "Web speed directly correlates with user conversion and search ranking authority.",
    publishDate: "October 28, 2024",
    readTime: "7 min read",
    views: "4.8k",
    initialLikes: 176,
    audioDuration: "6:10",
    author: {
      name: "Marcus Vance",
      role: "Staff Frontend Architect",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
      bio: "Marcus has spent 12 years building high-throughput web architectures and leads frontend infrastructure.",
      twitter: "@marcusvance",
      github: "marcusvance"
    },
    content: `
      <h2>The New Benchmark: Goodbye FID, Welcome INP</h2>
      <p>In March 2024, Google officially retired First Input Delay (FID) and replaced it with Interaction to Next Paint (INP). While FID only measured the initial delay before an event handler started executing, INP evaluates the entire responsiveness lifecycle across every single user interaction throughout the entire session.</p>

      <h2>How to Crush INP Delays</h2>
      <p>Long main-thread JavaScript tasks are the number one culprit behind poor INP scores. When a user taps a filter or button, if the main thread is busy recalculating a heavy dataset, the UI freezes.</p>

      <ul>
        <li><strong>Break up Long Tasks:</strong> Utilize modern browser APIs like <code>scheduler.yield()</code> or <code>requestIdleCallback()</code> to surrender execution back to the browser compositor.</li>
        <li><strong>Offload to Web Workers:</strong> Heavy client computations (like client-side sorting of 10,000 items) should be moved completely off the main thread.</li>
        <li><strong>Debounce & Throttle Responsively:</strong> Avoid triggering massive DOM mutations synchronously on rapid keystroke inputs.</li>
      </ul>

      <h2>Achieving Sub-1.5s Largest Contentful Paint (LCP)</h2>
      <p>To optimize your LCP element (typically a hero banner image or headline):</p>
      
      <ol>
        <li>Preload your priority image using <code>&lt;link rel="preload" as="image" fetchpriority="high" /&gt;</code>.</li>
        <li>Serve modern image formats like AVIF or WebP with responsive <code>srcset</code> attributes.</li>
        <li>Eliminate render-blocking external font sheets by inlining critical font faces.</li>
      </ol>
    `
  },
  {
    id: "mastering-modern-design-tokens-and-tailwind",
    title: "Design Tokens in Modern Teams: Bridging Figma and Tailwind CSS",
    slug: "mastering-modern-design-tokens-and-tailwind",
    excerpt: "How to automate token synchronization between design files and frontend codebases, eliminating design drift forever.",
    category: "design-ux",
    categoryName: "Design & UX",
    tags: ["TailwindCSS", "Design Systems", "Figma", "CSS"],
    featured: false,
    coverImage: "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?auto=format&fit=crop&w=1200&q=80",
    coverCaption: "Design tokens are the single source of truth across product design and engineering.",
    publishDate: "October 22, 2024",
    readTime: "5 min read",
    views: "3.9k",
    initialLikes: 204,
    audioDuration: "4:40",
    author: {
      name: "Sofia Al-Mansoor",
      role: "Head of Product Design",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80",
      bio: "Sofia designs consumer and enterprise software focused on spatial ergonomics and human-computer symbiosis.",
      twitter: "@sofia_ux",
      github: "sofiadesign"
    },
    content: `
      <h2>The Endless Battle of Inconsistency</h2>
      <p>Every engineering team has experienced this dialogue: A designer asks, <em>"Why is this button using #2563EB when our design system specifies #1D4ED8?"</em> And the engineer replies, <em>"Because in our CSS, primary-600 was hardcoded six months ago."</em></p>

      <p>Design tokens solve this by treating visual parameters (colors, spacing units, border radii, font curves) as structured data stored in version-controlled JSON schemas.</p>

      <h2>The Automated Synchronization Pipeline</h2>
      <p>Modern product teams leverage GitHub Actions that automatically export design tokens from Figma Variables directly into JSON, which transforms into Tailwind config variables via Style Dictionary:</p>

      <pre><code>// tokens/colors.json
{
  "color": {
    "brand": {
      "primary": { "value": "#2563eb", "type": "color" },
      "surface": { "value": "#f8fafc", "type": "color" },
      "accent": { "value": "#38bdf8", "type": "color" }
    }
  }
}</code></pre>

      <p>When design tokens change in Figma, a pull request is automatically opened against the repository, updating the Tailwind configuration without a single manual line of code being touched.</p>
    `
  },
  {
    id: "scaling-nodejs-event-loop-internals",
    title: "Demystifying the Node.js Event Loop: What Every Backend Dev Must Know",
    slug: "scaling-nodejs-event-loop-internals",
    excerpt: "A deep dive into timers, poll phase, microtask queues, process.nextTick, and avoiding catastrophic event loop blockages under load.",
    category: "engineering",
    categoryName: "Engineering",
    tags: ["Node.js", "Backend", "Performance", "JavaScript"],
    featured: false,
    coverImage: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80",
    coverCaption: "Understanding the underlying libuv thread pool is key to high-concurrency Node.js servers.",
    publishDate: "October 15, 2024",
    readTime: "8 min read",
    views: "5.1k",
    initialLikes: 257,
    audioDuration: "7:00",
    author: {
      name: "Tariq K. Rahman",
      role: "VP of Cloud Engineering",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
      bio: "Tariq previously managed high-frequency trading infrastructure and cloud migrations across distributed data centers.",
      twitter: "@tariqrahman",
      github: "tkrahman"
    },
    content: `
      <h2>The Single-Threaded Myth</h2>
      <p>People often describe Node.js as purely single-threaded. That is only half-true. Your JavaScript application logic runs on a single main thread, but asynchronous I/O operations (file system reads, DNS lookups, compression) are handled by a multi-threaded C library named <strong>libuv</strong>.</p>

      <h2>The Six Phases of the Event Loop</h2>
      <p>During each revolution of the loop, Node processes distinct priority queues:</p>
      
      <ol>
        <li><strong>Timers:</strong> Executes callbacks scheduled by <code>setTimeout()</code> and <code>setInterval()</code>.</li>
        <li><strong>Pending Callbacks:</strong> Executes I/O callbacks deferred to the next loop iteration.</li>
        <li><strong>Idle, Prepare:</strong> Internal libuv operational routines.</li>
        <li><strong>Poll:</strong> Retrieves new I/O events; executes I/O related callbacks.</li>
        <li><strong>Check:</strong> <code>setImmediate()</code> callbacks run right here.</li>
        <li><strong>Close Callbacks:</strong> e.g., <code>socket.on('close', ...)</code>.</li>
      </ol>

      <h2>The Microtask Trap: Promise vs nextTick</h2>
      <p>Crucially, <code>process.nextTick()</code> and Promise resolution microtasks run <em>immediately</em> after the current operation finishes, before the event loop advances to the next phase. Recursively calling <code>process.nextTick()</code> can starve the event loop entirely, preventing any incoming network connections from ever being accepted.</p>
    `
  }
];

export const teamMembers = [
  {
    name: "Marcus Vance",
    role: "Staff Frontend Architect & Co-Founder",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80",
    bio: "Marcus oversees technical architecture, web standards, and developer productivity tooling.",
    twitter: "@marcusvance",
    github: "marcusvance",
    linkedin: "marcusvance"
  },
  {
    name: "Dr. Elena Rostova",
    role: "Head of AI Research",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=300&q=80",
    bio: "Pioneering research in neural architectures, autonomous systems, and generative human-AI interfaces.",
    twitter: "@elena_ai",
    github: "erostova",
    linkedin: "elenarostova"
  },
  {
    name: "Sofia Al-Mansoor",
    role: "Lead Product Designer & Design Systems",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80",
    bio: "Passionate about cognitive accessibility, interaction ergonomics, and design token automation.",
    twitter: "@sofia_ux",
    github: "sofiadesign",
    linkedin: "sofiaalmansoor"
  },
  {
    name: "Tariq K. Rahman",
    role: "Distributed Systems & Reliability Director",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80",
    bio: "Specializing in cloud resilience, low-latency messaging, and disaster recovery orchestration.",
    twitter: "@tariqrahman",
    github: "tkrahman",
    linkedin: "tariqrahman"
  }
];

export const initialCommentsData = {
  "understanding-react-server-components": [
    {
      id: "c1",
      author: "David Miller",
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80",
      date: "2 days ago",
      text: "This is easily the cleanest explanation of the RSC wire format I have encountered. The mental model of keeping 'use client' at the leaves changed how our team structures our Next.js pages."
    },
    {
      id: "c2",
      author: "Priya Sharma",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80",
      date: "Yesterday",
      text: "Great point about DB access directly in server components. Eliminating internal API endpoints cut our latency noticeably."
    }
  ],
  "autonomous-ai-agents-production-reality": [
    {
      id: "c3",
      author: "Carlos Santana",
      avatar: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=150&q=80",
      date: "3 days ago",
      text: "Separating intent generation from the execution verification engine saved our team from multiple high-severity incidents. Highly recommended reading!"
    }
  ],
  "the-psychology-of-minimalist-interfaces": [
    {
      id: "c4",
      author: "Liam O'Connor",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80",
      date: "4 days ago",
      text: "Hick's law is so frequently ignored by PMs who want to cram 10 CTAs onto a single landing page. Sending this directly to our product guild."
    }
  ]
};
