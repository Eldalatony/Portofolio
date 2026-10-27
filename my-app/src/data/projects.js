import { asset } from "../lib/asset";

export const projects = [
  {
    slug: "shemms",
    title: "SHEMMS — Smart Home Energy Monitor",
    tagline:
      "IoT smart plug that measures, secures, and forecasts household energy use.",
    cover: {
      src: asset("projects/shemms/dashboard-live.png"),
      alt: "SHEMMS live energy dashboard showing real-time wattage and alerts",
      width: 1600,
      height: 824,
    },
    tools: ["ESP32", "Node.js", "Python", "Next.js"],
    featured: true,

    hook:
      "It sits between the wall socket and the appliance: it measures what the device actually draws, encrypts every reading before it leaves the plug, and turns the stream into live cost, per-device forecasts and anomaly alerts. Five services, three databases and a hand-built ESP32 plug, running as one system.",

    showcase: [
      {
        src: asset("projects/shemms/dashboard-insights.png"),
        alt: "Energy trend, cost-by-device and peak-hour charts",
        width: 1600,
        height: 830,
      },
      {
        src: asset("projects/shemms/dashboard-live.png"),
        alt: "Live energy dashboard with per-appliance wattage and alerts",
        width: 1600,
        height: 824,
      },
      {
        src: asset("projects/shemms/prototype-lcd.png"),
        alt: "Breadboard prototype showing live voltage, current and power on its LCD",
        width: 975,
        height: 839,
      },
    ],

    summary:
      "SHEMMS (product name: ISMART Plug) is an end-to-end IoT platform that sits between a wall outlet and an appliance. An ESP32-based smart plug samples voltage and current, encrypts each reading on-device, and publishes it over TLS to an MQTT broker. A Node.js service ingests the stream, derives power/energy/cost, writes to three purpose-picked databases, and pushes live updates to a Next.js dashboard over Socket.IO. A separate Python service trains a per-device anomaly model and forecasts consumption. The sections below document the system as it actually ships in the repository.",

    meta: [
      { label: "Timeline", value: "April – August 2026" },
      { label: "Domain", value: "IoT · Energy" },
      { label: "Status", value: "Working prototype" },
      { label: "Scope", value: "5 services · 3 databases" },
    ],

    links: [
      {
        label: "Source code",
        href: "https://github.com/Eldalatony/graduation_project",
        primary: true,
      },
    ],

    demoVideo: {
      src: asset("projects/shemms/demo.mp4"),
      poster: asset("projects/shemms/dashboard-live.png"),
      caption:
        "A walkthrough of the running system: live readings arriving from the plug, appliance control, and the analytics views.",
    },

    endpointsNote:
      "Everything the dashboard calls. Analytics routes are proxied through the backend, so the Python service is never exposed to a browser directly.",

    dataStoresHeading: "Data stores — and why three",

    stats: [
      {
        value: "±0.3%",
        label: "Measurement accuracy",
        note: "Plug readings vs. a reference meter during bench testing.",
      },
      {
        value: "< 1.2s",
        label: "Relay response",
        note: "Dashboard toggle to physical switch, end to end.",
      },
      {
        value: "97.2%",
        label: "Classifier accuracy",
        note: "Measured over 1,512 labelled training records.",
      },
      {
        value: "±8%",
        label: "Forecast error",
        note: "Linear-regression projection of next-period consumption.",
      },
      {
        value: "33",
        label: "Anomalies caught",
        note: "Flagged automatically during the live test run.",
      },
      {
        value: "5",
        label: "Services orchestrated",
        note: "Frontend, backend, analytics, simulator, broker — one compose file.",
      },
    ],

    problem: {
      heading: "The problem",
      body: [
        "A traditional meter reports one number for the whole house, once a month. You cannot see which appliance is expensive, you get no feedback while the cost is being incurred, and nothing tells you when a device starts behaving abnormally.",
        "Roughly 30% of home energy is wasted for lack of awareness, and residential buildings account for over 30% of global electricity consumption. Real-time, appliance-level visibility is the missing feedback loop — intelligent monitoring can recover an estimated 15–25%.",
        "Existing smart plugs monitor, but stop there: no forecasting, no anomaly detection, no privacy story for what is effectively a minute-by-minute log of when you are home and what you are doing.",
      ],
    },

    approach: {
      heading: "The approach",
      body: [
        "Measure at the plug, not the panel — one ESP32 per appliance gives per-device attribution for the price of a wall adapter.",
        "Encrypt before the data leaves the device. The plug performs AES-256 encryption in firmware and publishes over TLS, so neither the broker nor anyone on the network sees plaintext consumption.",
        "Use the right database for each shape of data instead of forcing one to do all three jobs, and keep the analytics service behind the backend so no client ever reaches it directly.",
      ],
    },

    pipeline: [
      {
        step: "1 · Sense",
        detail:
          "ZMPT101B (voltage, GPIO 35) and ZMCT103C (current, GPIO 34) feed the ESP32 ADC. Firmware smooths the samples and derives wattage.",
      },
      {
        step: "2 · Encrypt & publish",
        detail:
          "The JSON reading is AES-256-CBC encrypted with a random IV, base64-encoded, and published to home/gateway/data over TLS on port 8883.",
      },
      {
        step: "3 · Ingest",
        detail:
          "mqttService.js subscribes, decrypts, resolves the appliance from a 30-second registry cache, and derives current, voltage, kWh and cost from wattage and the user tariff.",
      },
      {
        step: "4 · Store",
        detail:
          "Each reading is field-level AES-GCM encrypted and written to InfluxDB, then fanned out on an internal event bus to the alert engine and Socket.IO.",
      },
      {
        step: "5 · Aggregate",
        detail:
          "An hourly cron reads the last 65 minutes back out of InfluxDB, groups by appliance and hour, and upserts to MongoDB twice — encrypted for the backend, plaintext for the ML service.",
      },
      {
        step: "6 · Analyse",
        detail:
          "Every 30 minutes the Python service scores new intervals against each device's Isolation Forest, writes anomalies, and advances a checkpoint so no interval is scored twice.",
      },
      {
        step: "7 · Serve",
        detail:
          "The dashboard calls the backend; JWT-protected routes proxy chart-shaped responses from analytics, so the browser gets one round-trip per view.",
      },
    ],

    services: [
      {
        name: "frontend",
        role: "Next.js · :3000",
        detail:
          "Dashboard — live readings, appliance control, schedules, analytics, alerts.",
      },
      {
        name: "backend",
        role: "Node.js / Express · :3001",
        detail:
          "REST API, MQTT ingest and control, Socket.IO, alert engine, scheduler, hourly ETL, analytics proxy.",
      },
      {
        name: "analytics",
        role: "Python / Flask · :5000",
        detail:
          "Per-device anomaly detection, forecasting, chart-shaped UI endpoints, homomorphic-encryption demo.",
      },
      {
        name: "simulator",
        role: "Python",
        detail:
          "Publishes synthetic plug readings over MQTT so the stack runs without hardware.",
      },
      {
        name: "mosquitto",
        role: "Eclipse MQTT · :1883",
        detail:
          "Local broker for development; HiveMQ Cloud over TLS for the live demo.",
      },
      {
        name: "firmware",
        role: "ESP32 / Arduino",
        detail:
          "Sampling, AES encryption, MQTT publish/subscribe, relay control, 16×2 I²C LCD readout.",
      },
    ],

    dataStores: [
      {
        name: "PostgreSQL 15",
        role: "Relational source of truth",
        detail:
          "users (with tariff rate), appliances, schedules, alerts. ACID, fast joins.",
      },
      {
        name: "InfluxDB 2.7",
        role: "Time series",
        detail:
          "Every individual reading in the appliance_readings measurement. Power, current, energy and cost fields are AES-GCM encrypted; voltage and status stay plain.",
      },
      {
        name: "MongoDB 7",
        role: "Aggregates & models",
        detail:
          "appliance_history (encrypted hourly aggregates), appliance_data (plaintext ML input), anomaly_alerts, infer_checkpoint, device_models.",
      },
    ],

    hardware: [
      {
        name: "ESP32 DevKit V1",
        role: "Controller",
        detail:
          "Dual-core 240 MHz, built-in Wi-Fi, multiple ADC channels, OTA-capable.",
      },
      {
        name: "ZMPT101B",
        role: "Voltage sensor · GPIO 35",
        detail: "Samples the AC voltage waveform through a calibrated divider.",
      },
      {
        name: "ZMCT103C",
        role: "Current sensor · GPIO 34",
        detail: "Current transformer measuring AC draw on the live conductor.",
      },
      {
        name: "Relay module",
        role: "Actuator",
        detail:
          "Physically switches appliance power on an encrypted command from the backend; state syncs back to the dashboard.",
      },
      {
        name: "16×2 I²C LCD",
        role: "Local readout",
        detail:
          "On-device display of voltage, current, power and sample count for bench verification.",
      },
    ],

    security: {
      heading: "Security",
      body: [
        "Energy data is a behavioural fingerprint: a consumption curve reveals when a household sleeps, when it is empty, and which appliances run. That framing drove a privacy-by-design approach — secure first, then analyse.",
        "Encryption is applied at three distinct points rather than assumed at one. The firmware encrypts before transmission, the backend re-encrypts at field level before storage, and every API route above the health check requires a valid JWT.",
      ],
    },

    securityLayers: [
      {
        name: "In transit",
        role: "AES-256-CBC + TLS",
        detail:
          "Firmware encrypts each JSON payload with a random IV and base64-encodes it, then publishes over TLS on port 8883. The broker only ever relays ciphertext.",
      },
      {
        name: "At rest",
        role: "AES-256-GCM",
        detail:
          "heService.js encrypts power, current, energy and cost per field before the InfluxDB write and on the encrypted Mongo aggregate. Key derived via SHA-256.",
      },
      {
        name: "At the API",
        role: "JWT + bcrypt",
        detail:
          "Passwords hashed with bcrypt; protect middleware validates the bearer token on every route including the analytics proxy.",
      },
      {
        name: "Under analysis",
        role: "CKKS homomorphic encryption",
        detail:
          "he_layer.py uses TenSEAL (poly modulus 8192, 128-bit security) to sum, average and cost-share over encrypted vectors, then verifies against plaintext within tolerance.",
      },
    ],

    intelligence: [
      {
        name: "Anomaly detection",
        role: "Isolation Forest, per device",
        detail:
          "One model + scaler per appliance, trained on engineered features (runtime ratio, power × runtime) and stored in Mongo rather than on disk, so models survive container rebuilds. Contamination 0.003.",
      },
      {
        name: "Anomaly labelling",
        role: "Rule classifier",
        detail:
          "classifier.py turns each raw detection into a named type: power spike, excessive runtime, abnormal idle, or stuck on — so an alert says what happened, not just that something did.",
      },
      {
        name: "Forecasting",
        role: "Linear regression",
        detail:
          "Per-device fit over historical intervals, projecting next-period kWh and the resulting monthly bill.",
      },
      {
        name: "Rule alerts",
        role: "Live stream engine",
        detail:
          "Separate from ML: high-usage, left-on and offline conditions evaluated per reading with per-appliance cooldown, persisted to PostgreSQL and pushed over Socket.IO.",
      },
      {
        name: "Model lifecycle",
        role: "LEARNING → READY",
        detail:
          "model_manager.py gates each device until it has enough history, so a new plug does not produce noise on day one.",
      },
    ],

    endpoints: [
      { method: "POST", path: "/api/auth/signup", purpose: "Create account", auth: false },
      { method: "POST", path: "/api/auth/login", purpose: "Issue JWT", auth: false },
      { method: "GET", path: "/api/users/me", purpose: "Profile", auth: true },
      { method: "PUT", path: "/api/users/me/tariff", purpose: "Update tariff rate", auth: true },
      { method: "GET", path: "/api/appliances", purpose: "List appliances", auth: true },
      { method: "POST", path: "/api/appliances", purpose: "Register a plug", auth: true },
      { method: "PUT", path: "/api/appliances/:id/toggle", purpose: "Publish relay on/off command", auth: true },
      { method: "GET", path: "/api/schedules", purpose: "List cron schedules", auth: true },
      { method: "POST", path: "/api/schedules", purpose: "Create schedule", auth: true },
      { method: "GET", path: "/api/alerts", purpose: "Rule-based alerts", auth: true },
      { method: "PUT", path: "/api/alerts/:id/read", purpose: "Mark alert read", auth: true },
      { method: "GET", path: "/api/analytics/summary", purpose: "Totals, per-device, projected bill, peak hours", auth: true },
      { method: "GET", path: "/api/analytics/:id/daily", purpose: "Per-day energy, cost and power", auth: true },
      { method: "GET", path: "/api/analytics/:id/peak-hours", purpose: "Top N hours by energy", auth: true },
      { method: "GET", path: "/api/analytics/anomalies", purpose: "Paginated anomalies with severity counts", auth: true },
      { method: "GET", path: "/api/analytics/bill-estimate", purpose: "Projected bill over N days", auth: true },
      { method: "GET", path: "/api/ui/dashboard", purpose: "Whole dashboard in one round-trip", auth: true },
      { method: "GET", path: "/api/ui/charts/energy-trend", purpose: "Multi-line series per device", auth: true },
      { method: "GET", path: "/api/ui/charts/cost-breakdown", purpose: "Cost share per device", auth: true },
      { method: "GET", path: "/api/ui/anomalies/heatmap", purpose: "Device × day matrix", auth: true },
      { method: "GET", path: "/api/he/summary", purpose: "Aggregations computed on ciphertext", auth: true },
      { method: "GET", path: "/api/he/verify", purpose: "Encrypted vs plaintext comparison", auth: true },
    ],

    stack: [
      {
        group: "Firmware",
        items: ["C++ / Arduino", "ESP32", "mbedTLS AES", "PubSubClient", "LiquidCrystal I²C"],
      },
      {
        group: "Backend",
        items: [
          "Node.js",
          "Express 4",
          "Socket.IO 4",
          "MQTT.js 5",
          "node-cron",
          "JWT",
          "bcrypt",
          "Mongoose 8",
          "pg",
          "InfluxDB client",
        ],
      },
      {
        group: "Analytics",
        items: [
          "Python 3",
          "Flask 3",
          "scikit-learn 1.3",
          "pandas",
          "NumPy",
          "APScheduler",
          "TenSEAL (CKKS)",
          "PyMongo",
        ],
      },
      { group: "Frontend", items: ["Next.js", "React", "CSS Modules", "Socket.IO client"] },
      { group: "Data", items: ["PostgreSQL 15", "InfluxDB 2.7", "MongoDB 7"] },
      { group: "Infrastructure", items: ["Docker Compose", "Mosquitto", "HiveMQ Cloud", "pgAdmin", "mongo-express"] },
    ],

    gallery: [
      {
        src: asset("projects/shemms/dashboard-live.png"),
        alt: "Live energy dashboard with per-appliance wattage and alert feed",
        width: 1600,
        height: 824,
        caption:
          "Live monitor — current draw, voltage, rate and energy for the selected plug, with a severity-ranked alert feed and an inline toggle that switches the physical relay.",
      },
      {
        src: asset("projects/shemms/dashboard-insights.png"),
        alt: "Dashboard insights: energy trend, cost by device, peak hours",
        width: 1600,
        height: 830,
        caption:
          "Today at a glance — consumption, cost and projected bill, over an energy trend line, a cost-share donut per device, and a peak-hour histogram identifying the busiest hour.",
      },
      {
        src: asset("projects/shemms/analytics-light.png"),
        alt: "Analytics page in light theme with model readiness badges",
        width: 975,
        height: 501,
        caption:
          "Analytics in light theme. The badges show per-device model state, so a user can see which appliances have enough history for anomaly scoring.",
      },
      {
        src: asset("projects/shemms/auth.png"),
        alt: "SHEMMS sign-in screen",
        width: 520,
        height: 565,
        caption: "JWT-backed sign-in; bcrypt-hashed credentials, role assigned on the account.",
      },
      {
        src: asset("projects/shemms/prototype-lcd.png"),
        alt: "Breadboard prototype with LCD showing live voltage, current and power",
        width: 975,
        height: 839,
        caption:
          "The bench prototype reporting V:208 I:0.05 P:11.0 on its local LCD — the same values the backend received over MQTT, which is how sensor calibration was verified.",
      },
      {
        src: asset("projects/shemms/mqtt-encrypted.png"),
        alt: "MQTT broker web client showing base64 ciphertext payloads",
        width: 975,
        height: 502,
        caption:
          "What the broker actually sees: base64 AES ciphertext on home/gateway/data. Consumption is unreadable in transit even to the broker operator.",
      },
    ],

    diagrams: [
      {
        src: asset("projects/shemms/component-diagram.jpg"),
        alt: "Component diagram: smart plug, MQTT broker, backend, databases, AI service, dashboard",
        width: 1536,
        height: 1024,
        caption: "Component diagram — the five moving parts and the traffic between them.",
      },
      {
        src: asset("projects/shemms/deployment-diagram.jpg"),
        alt: "Deployment diagram across edge, network, server, data and client tiers",
        width: 1600,
        height: 877,
        caption: "Deployment view — edge, network, server, data and client tiers, with the protocol on each hop.",
      },
      {
        src: asset("projects/shemms/sequence-diagram.jpg"),
        alt: "Sequence diagram of the real-time monitoring flow",
        width: 1536,
        height: 1024,
        caption: "Sequence diagram — one reading's journey from plug to chart, in eleven steps.",
      },
      {
        src: asset("projects/shemms/security-architecture.png"),
        alt: "Security architecture showing encryption layers against network threats",
        width: 1024,
        height: 559,
        caption: "Security architecture — where each protection sits relative to the threats it answers.",
      },
      {
        src: asset("projects/shemms/requirements.png"),
        alt: "Functional and non-functional requirements breakdown",
        width: 1024,
        height: 559,
        caption: "Requirements analysis — functional capabilities against non-functional targets.",
      },
      {
        src: asset("projects/shemms/lifecycle.png"),
        alt: "Six-phase development lifecycle diagram",
        width: 1662,
        height: 946,
        caption: "The six-phase development lifecycle, from feasibility through deployment.",
      },
    ],

    testing: [
      {
        name: "Hardware & unit",
        role: "Bench verification",
        detail:
          "Sensor readings cross-checked against a reference meter and the on-board LCD; calibration constants tuned until the plug tracked within ±0.3%.",
      },
      {
        name: "Integration",
        role: "End-to-end",
        detail:
          "Plug → broker → backend → database → dashboard exercised as one path, confirming the payload decrypts correctly and surfaces in the UI.",
      },
      {
        name: "Automated suite",
        role: "test_e2e.py",
        detail:
          "50+ assertions across seven layers: Mongo connectivity, schema integrity, feature-engineering math, model availability, API and UI endpoints, HE layer, and cross-layer consistency between raw totals and API totals.",
      },
      {
        name: "Model evaluation",
        role: "evaluate.py",
        detail:
          "Confusion matrix, per-device precision/recall, ROC-AUC and recall by anomaly type against a labelled synthetic set — 14,400 intervals with 40 injected anomalies across four types.",
      },
      {
        name: "Security",
        role: "Transport inspection",
        detail:
          "Subscribed to the live topic with an independent MQTT client to confirm only ciphertext is observable on the wire.",
      },
    ],

    challenges: [
      {
        title: "Encrypting on a microcontroller without dropping readings",
        body: "AES on the ESP32 has to fit alongside sampling, Wi-Fi and TLS in limited RAM. The firmware pads to a fixed 576-byte ceiling, generates a fresh random IV per message, and base64-encodes in place — bounded memory, no allocation per reading, and a payload the broker will accept. Getting the padding scheme to agree exactly with the Node decryption side was the fiddliest part of the whole project.",
      },
      {
        title: "Three databases without three sources of truth",
        body: "Splitting relational, time-series and document data is only a win if something reconciles them. The hourly ETL is that reconciler: it reads back the last 65 minutes — deliberately overlapping the hour so a late reading is never lost — groups by appliance and hour, and upserts on a unique key so a re-run cannot double-count.",
      },
      {
        title: "Encrypted at rest, but the model still needs numbers",
        body: "The ML service cannot train on ciphertext. The ETL writes two aggregate collections: an encrypted one the backend serves from, and a plaintext one only the analytics container can reach — it sits on the internal Docker network with no published route, and the frontend can only reach it through the JWT-protected backend proxy.",
      },
      {
        title: "Scoring incrementally without rescoring history",
        body: "Inference runs every 30 minutes over a growing collection. A checkpoint document holds the last scored interval, so each tick queries only newer records; combined with a per-device readiness gate, a freshly registered plug stays quiet until it has enough history to be judged fairly.",
      },
    ],

    future: [
      "Solar generation input, so the dashboard nets production against consumption",
      "Voice assistant integration for hands-free control",
      "Multi-plug household management with room-level grouping",
      "Large-scale real-world testing beyond the bench prototype",
      "Moving anomaly detection to the edge so the plug can act without the cloud",
    ],
  },
  {
    slug: "cargotrack",
    title: "CargoTrack — Import & Export Logistics",
    tagline:
      "Order, shipping and payment management for a China-to-Egypt consolidated freight office.",
    cover: {
      src: asset("projects/cargotrack/container-shared.png"),
      alt: "A shared container's page: volume and weight capacity split between two clients, its status track and allocated orders",
      width: 2880,
      height: 2696,
    },
    tools: ["NestJS", "Next.js", "PostgreSQL", "BullMQ"],

    hook:
      "It runs the whole journey of a freight office that buys from factories in China for businesses in Egypt: client orders and deposits, factory batches and quality checks, containers shared by several clients, transit legs, documents and payments. Status moves only through a server-side state machine, a shared container can't be overbooked even by two people at once, and no client ever sees another's data.",

    showcase: [
      {
        src: asset("projects/cargotrack/showcase-orders.png"),
        alt: "Office orders dashboard with an in-transit count and a dead-letter banner",
        width: 800,
        height: 500,
      },
      {
        src: asset("projects/cargotrack/showcase-container.png"),
        alt: "Shared container with its volume split between two clients",
        width: 800,
        height: 500,
      },
      {
        src: asset("projects/cargotrack/showcase-portal.png"),
        alt: "Client portal showing what the client owes and the balance due",
        width: 800,
        height: 500,
      },
    ],

    summary:
      "CargoTrack is a full-cycle order management platform for a consolidated-shipping freight operation. The office places a client's order, confirms it with its deposit, has a factory produce it and inspects the goods, and the client signs the inspection in their own portal. The goods are then allocated to a container several clients share, which sails from Shanghai to Alexandria, sometimes through a transit hub, and the order closes out once the balance is paid. A NestJS API owns every rule, a BullMQ worker delivers the notifications each change produces, and a Next.js front end gives the office and its clients separate areas behind one sign-in. The sections below describe the system as it is built in the repository.",

    meta: [
      { label: "Timeline", value: "August – October 2026" },
      { label: "Domain", value: "Logistics · Trade" },
      { label: "Status", value: "Built, ready to deploy" },
      { label: "Scope", value: "5 services · 19 tables" },
    ],

    links: [
      {
        label: "Source code",
        href: "https://github.com/Eldalatony/CargoTrack",
        primary: true,
      },
    ],

    stats: [
      {
        value: "228",
        label: "Automated tests",
        note: "86 unit and 142 end-to-end test cases; the end-to-end suite runs against real Postgres and Redis in CI.",
      },
      {
        value: "8",
        label: "Order states",
        note: "Plus 3 exception branches, all moved by one server-side state machine.",
      },
      {
        value: "7 / 7",
        label: "Roadmap gates passed",
        note: "From design freeze to deploy-ready; gates 1–5 are proven by running a script or a browser walkthrough.",
      },
      {
        value: "19",
        label: "Database tables",
        note: "Status columns are Postgres enums, and every money column carries its currency.",
      },
      {
        value: "9",
        label: "Architecture decisions",
        note: "Each recorded as an ADR, with the reasoning and the alternatives rejected.",
      },
      {
        value: "5",
        label: "Delivery attempts",
        note: "Per notification, with exponential backoff from 5 s, before it is dead-lettered.",
      },
    ],

    problem: {
      heading: "The problem",
      body: [
        "The office buys goods from factories in China on behalf of businesses in Egypt and ships them home. A client orders and pays a deposit of about 20%. A factory produces the goods, they are inspected, and the client signs the inspection sheet. The goods then go into a container, usually shared with other clients' goods, which sails from Shanghai to Alexandria, sometimes through a transit hub. The client pays the balance and the order closes out.",
        "Three things make this harder than a data-entry app. The status is the business: where an order stands decides what may happen to its money, its documents and its container. Several clients share one container, so its capacity is a shared resource, and one client must never see another's data even when their goods are in the same box. And money gates the flow: the deposit gates goods-in, the client's QC signature gates booking and invoicing, and the balance gates close-out.",
        "On top of that, the office's clients and suppliers start out in spreadsheets, so they have to come in without being duplicated or silently dropped.",
      ],
    },

    approach: {
      heading: "The approach",
      body: [
        "Status is not a field. An edit can't set it; the only way in is a status endpoint that runs the transition table from the state diagram. Every accepted move writes an audit row and its notifications in the same transaction, and an invalid one is refused with a 422 that names the legal targets.",
        "From shipment booking on, the container drives its orders. Moving the container moves every order inside it, under the container's row lock, so a box and its orders can never disagree, and the last order to close out closes the container.",
        "Guards sit exactly where the state diagram draws them, and access is derived from the signed-in user, never from the request. The front end doesn't copy the rules: it offers the moves the server allows and shows the server's own message when one is refused.",
      ],
    },

    pipeline: [
      {
        step: "1 · Order placed",
        detail:
          "The office places a client's order with its line items. Volume and weight are never typed in; they roll up from the items in exact decimal arithmetic.",
      },
      {
        step: "2 · Order confirmed",
        detail:
          "Confirmed together with its 20% deposit in the same call. An order with no items can't be confirmed, because there would be nothing to produce or ship.",
      },
      {
        step: "3 · Goods received",
        detail:
          "A factory batch is produced, received and inspected. The deposit guard refuses goods-in until the deposit has cleared.",
      },
      {
        step: "4 · Shipment booking",
        detail:
          "Only after the client signs the QC sheet in their portal; the office is refused with a 403 if it tries to sign for them.",
      },
      {
        step: "5 · Route decision",
        detail:
          "From here the container takes over. Each allocation is checked against the box's volume and weight limits under a row lock, and when it is fully allocated every order in it moves.",
      },
      {
        step: "6 · In transit",
        detail:
          "The container departs, direct or via a transit hub such as Jebel Ali, where arrival must be recorded before departure. Its orders move with it.",
      },
      {
        step: "7 · Delivered",
        detail:
          "The container arrives in Alexandria. Documents such as the bill of lading are the client's from the moment they are uploaded.",
      },
      {
        step: "8 · Closed out",
        detail:
          "The balance guard refuses close-out while anything is outstanding. When the last order in a container closes out, the container closes with it.",
      },
    ],

    services: [
      {
        name: "backend",
        role: "NestJS 11 · :4000",
        detail:
          "The REST API under /api. Owns every rule, applies database migrations on startup, and relays committed notifications to the queue.",
      },
      {
        name: "worker",
        role: "BullMQ consumer · internal",
        detail:
          "Same image as the API, different command. Delivers notifications with retries and runs the nightly retention sweep.",
      },
      {
        name: "frontend",
        role: "Next.js 16 · :3000",
        detail:
          "The office dashboard at /manager and the client portal at /portal, behind one sign-in.",
      },
      {
        name: "postgres",
        role: "PostgreSQL 16 · :5432",
        detail:
          "The primary database, with the schema versioned through Prisma migrations and no raw DDL anywhere else.",
      },
      {
        name: "redis",
        role: "Redis 7 · :6379",
        detail:
          "The BullMQ broker. The API and worker health checks both touch Postgres and Redis, so a crash-looping worker can't report healthy.",
      },
    ],

    dataStoresHeading: "Data model — 19 tables",

    dataStores: [
      {
        name: "Parties",
        role: "6 tables",
        detail:
          "users, clients, client_documents, suppliers, freight_providers, customs_agents.",
      },
      {
        name: "Orders",
        role: "4 tables",
        detail: "orders, order_items, production_orders, qc_inspections.",
      },
      {
        name: "Warehousing",
        role: "2 tables",
        detail: "warehouses, stock_records.",
      },
      {
        name: "Shipping",
        role: "3 tables",
        detail: "containers, container_allocations, transit_legs.",
      },
      {
        name: "Cross-cutting",
        role: "4 tables",
        detail:
          "documents (with version chains), payments, and the append-only status_history and notifications.",
      },
    ],

    security: {
      heading: "Security & data scoping",
      body: [
        "Two roles share one API. The office manager sees everything; a client sees only their own orders, payments, documents and messages, even when their goods share a container with someone else's.",
        "Authentication is on by default, and which rows come back is decided by the server from the signed-in user, never from anything in the request. A client who asks for someone else's data gets their own back, and a record outside their scope answers 404 rather than 403, so its existence isn't even confirmed.",
      ],
    },

    securityLayers: [
      {
        name: "Authentication",
        role: "JWT · bcrypt · global guards",
        detail:
          "The JWT and role guards are registered globally, so a new controller can't add an open endpoint by accident. Only sign-in and the health checks are public.",
      },
      {
        name: "Fresh authority",
        role: "Re-read every request",
        detail:
          "The token proves who you are; your role and client are re-read from the database on every request, so revoking access takes effect immediately.",
      },
      {
        name: "Row scoping",
        role: "scopeWhere(user)",
        detail:
          "The client's scope is applied last to every database query, so a client-supplied id is overridden rather than obeyed.",
      },
      {
        name: "Documents",
        role: "Built field by field",
        detail:
          "Every document response is assembled explicitly and leaves out the file reference when the viewer may not have it. Container-level documents never reach a client.",
      },
    ],

    endpointsNote:
      "Everything sits under /api behind a bearer token, documented with Swagger in development. Role checks run in a global guard; which rows come back is decided by each service from the signed-in user.",

    endpoints: [
      { method: "POST", path: "/api/auth/login", purpose: "Sign in, returns a bearer token", access: "public" },
      { method: "GET", path: "/api/auth/me", purpose: "The signed-in user", access: "any user" },
      { method: "GET", path: "/api/orders", purpose: "List orders", access: "manager · own" },
      { method: "POST", path: "/api/orders", purpose: "Place an order", access: "manager" },
      { method: "POST", path: "/api/orders/:id/status", purpose: "The only way an order's status moves", access: "manager" },
      { method: "POST", path: "/api/orders/bulk/status", purpose: "Up to 100 orders to one status, all or none", access: "manager" },
      { method: "GET", path: "/api/orders/:id/status-history", purpose: "Audit trail of every move", access: "manager · own" },
      { method: "GET", path: "/api/orders/:orderId/settlement", purpose: "Deposit, paid so far and balance due", access: "manager · own" },
      { method: "POST", path: "/api/production-orders/:id/status", purpose: "Move a factory batch through production", access: "manager" },
      { method: "PATCH", path: "/api/qc-inspections/:id/sign-off", purpose: "Sign the QC sheet", access: "owning client" },
      { method: "POST", path: "/api/containers", purpose: "Open a container with its limits", access: "manager" },
      { method: "POST", path: "/api/containers/:containerId/allocations", purpose: "Allocate an order, under the capacity guard", access: "manager" },
      { method: "POST", path: "/api/containers/:id/status", purpose: "Move a container; its orders move with it", access: "manager" },
      { method: "POST", path: "/api/containers/:containerId/transit-legs", purpose: "Plan a transit stop", access: "manager" },
      { method: "POST", path: "/api/documents", purpose: "Upload a document or a new version of one", access: "manager · own order" },
      { method: "GET", path: "/api/documents/:id/file", purpose: "Download, only if the viewer may have it", access: "manager · own" },
      { method: "POST", path: "/api/payments", purpose: "Raise an invoice or record a payment", access: "manager" },
      { method: "POST", path: "/api/payments/bulk/paid", purpose: "A payment run, every line or none", access: "manager" },
      { method: "GET", path: "/api/notifications/summary", purpose: "Pending, retrying, failed and dead-letter counts", access: "manager" },
      { method: "POST", path: "/api/notifications/:id/retry", purpose: "Re-queue a dead letter", access: "manager" },
      { method: "GET", path: "/health", purpose: "Checks Postgres and Redis", access: "public" },
    ],

    stack: [
      {
        group: "Backend",
        items: [
          "NestJS 11",
          "TypeScript",
          "Prisma 6",
          "BullMQ 5",
          "Passport JWT",
          "bcrypt",
          "class-validator",
          "Zod",
          "Swagger",
          "Terminus",
        ],
      },
      {
        group: "Frontend",
        items: [
          "Next.js 16",
          "React 19",
          "Tailwind CSS 4",
          "Radix UI",
          "TanStack Query",
          "TanStack Table",
        ],
      },
      { group: "Data", items: ["PostgreSQL 16", "Redis 7"] },
      { group: "Testing", items: ["Jest 30", "Supertest", "Gate scripts"] },
      { group: "Infrastructure", items: ["Docker Compose", "GitHub Actions", "Railway (prepared)"] },
    ],

    gallery: [
      {
        src: asset("projects/cargotrack/orders-dashboard.png"),
        alt: "Office orders dashboard listing client orders with their statuses",
        width: 2880,
        height: 1852,
        caption:
          "The office dashboard: every client order with its status, plus counts of what is in transit and what is delivered but waiting on its balance. The banner surfaces a notification that failed permanently.",
      },
      {
        src: asset("projects/cargotrack/bulk-move.png"),
        alt: "A refused bulk move listing why each of three orders could not move",
        width: 2880,
        height: 2330,
        caption:
          "A bulk move, all or nothing. Three orders were asked to jump to Goods received; each was refused for its own reason, so none of them moved, and the report says exactly why.",
      },
      {
        src: asset("projects/cargotrack/order-detail.png"),
        alt: "Order detail page with status track, balance, production and QC, payments, documents and history",
        width: 2880,
        height: 4920,
        caption:
          "Order detail: the 8-step status track, the next allowed move, the balance due, production and QC, payments, documents with version chains, and a read-only status history.",
      },
      {
        src: asset("projects/cargotrack/container-shared.png"),
        alt: "A departed container shared by two clients, with capacity bars and allocated orders",
        width: 2880,
        height: 2696,
        caption:
          "One container shared by two clients at sea. The capacity bars split volume and weight per client, the capacity guard refuses anything past the limits, and allocations lock once the box is booked.",
      },
      {
        src: asset("projects/cargotrack/containers.png"),
        alt: "Containers list with routes, statuses and capacity used, and a form to open a container",
        width: 2880,
        height: 1800,
        caption:
          "Every container with its route, status and how full it is by volume and weight. The limits entered when a container is opened become its capacity guard.",
      },
      {
        src: asset("projects/cargotrack/notifications.png"),
        alt: "Notification queue with pending, retrying, failed, dead-letter and sent counts",
        width: 2880,
        height: 1800,
        caption:
          "The notification queue. A message that failed 5 times sits in the dead-letter queue, with its last error, until someone retries it.",
      },
      {
        src: asset("projects/cargotrack/portal-shipments.png"),
        alt: "Client portal shipment page with timeline, amount owed, documents and messages",
        width: 2880,
        height: 2544,
        caption:
          "The client portal. A client sees only their own shipments, with a plain-language timeline, what they owe, their documents and every message sent to them.",
      },
      {
        src: asset("projects/cargotrack/portal-qc-sign-off.png"),
        alt: "Client portal showing a passed inspection with a Sign off button",
        width: 2880,
        height: 2296,
        caption:
          "QC sign-off in the portal. Only the client can sign their inspection, and until they do, the order can't be booked for shipping.",
      },
      {
        src: asset("projects/cargotrack/portal-mobile.png"),
        alt: "The client portal shipment timeline on a phone",
        width: 1170,
        height: 2532,
        narrow: true,
        caption: "The portal on a phone.",
      },
      {
        src: asset("projects/cargotrack/sign-in.png"),
        alt: "CargoTrack sign-in screen",
        width: 2880,
        height: 1800,
        caption:
          "One sign-in for both areas. Each role lands in its own: /manager for the office, /portal for clients, and the wrong area redirects.",
      },
    ],

    diagrams: [
      {
        src: asset("projects/cargotrack/order-lifecycle.png"),
        alt: "Order lifecycle state machine with guards, exception branches and the container hand-off",
        width: 2072,
        height: 1594,
        caption:
          "The order state machine: 8 states, 3 exception branches, the payment gates, and where the container takes over.",
      },
      {
        src: asset("projects/cargotrack/notification-pipeline.png"),
        alt: "Notification pipeline across the API process, Redis and the worker, with retry and dead-letter paths",
        width: 2984,
        height: 3870,
        caption:
          "The notification pipeline: the outbox row written with each status change, the relay to BullMQ, and the worker's retry and dead-letter path.",
      },
    ],

    testing: [
      {
        name: "Unit tests",
        role: "86 cases · Jest",
        detail:
          "The order and container state machines, order totals, settlement, the capacity guard, the document gate, the all-or-nothing runner, retries, notification delivery, the error filter and request logging.",
      },
      {
        name: "End-to-end suite",
        role: "142 cases · real stack",
        detail:
          "Over HTTP against real Postgres, Redis and the worker: the order and shipping lifecycles, payments, document access, client scoping and onboarding, notifications, retention, bulk rollback and the legacy import.",
      },
      {
        name: "Gate scripts",
        role: "verify-gate1–4.sh",
        detail:
          "Binary checks against a running stack. Gate 1 asserts five healthy services and exactly 19 tables; Gate 2 walks one order through all 8 states; Gate 3 tests the capacity guard at the boundary; Gate 4 waits for a real message to exhaust its 5 attempts and dead-letter.",
      },
      {
        name: "A test that can't be skipped",
        role: "Document access",
        detail:
          "An end-to-end sweep of every GET route proves a client never receives another client's or a container's document, and a separate test fails the build if that sweep is ever skipped.",
      },
      {
        name: "Browser walkthrough",
        role: "Gate 5",
        detail:
          "An order placed and closed out by the office in the UI, signed off by the client in the portal, with another client's order URL answering not found.",
      },
      {
        name: "CI",
        role: "GitHub Actions",
        detail:
          "On every push: lint, types and unit tests, migrations against an empty Postgres, the whole end-to-end suite with the worker running, a frontend production build, and both production images.",
      },
    ],

    challenges: [
      {
        title: "Never overbooking a shared container",
        body: "A read-then-write capacity check is correct and still unsafe: two people allocating the last 5 CBM at once each read “5 CBM free”, both pass, and the box is booked at 110%. A database CHECK can't express a rule that spans rows. Every write that depends on a container's capacity or state first takes a row lock on the container (SELECT … FOR UPDATE), so writers to the same box queue up and the second one re-reads the totals and is refused, while allocations to different boxes never wait. The gate script proves the boundary: 9.801 CBM is refused, and 9.8 fills the box to exactly 100%.",
      },
      {
        title: "Notifications that match what actually happened",
        body: "A status change commits to Postgres and a job goes to Redis, two systems with no shared transaction. Enqueue inside the transaction and a rollback announces a move that never happened; enqueue after the commit and a crash loses the notification without a trace. The notification row is the outbox: it is written in the same transaction as the status change, and the API relays committed rows to BullMQ using the row id as the job id, so a job can't be enqueued twice. The worker retries 5 times with exponential backoff, then dead-letters the message, and the office sees it on the dashboard and can re-queue it.",
      },
      {
        title: "One status, not two",
        body: "At first an order and its container each had their own status. A container could be marked arrived while an order inside it was still in transit, and a box carrying three clients' goods needed four status changes for one physical event. From shipment booking on, the container now drives its orders: each container step maps to the order step it causes, applied in the container's transaction and under its lock, and the whole move is refused if any order inside isn't where the container says it should be.",
      },
      {
        title: "Bulk moves without a half-done state",
        body: "“Close out these twelve orders” is one decision; closing nine of them leaves a state nobody chose. Bulk endpoints run every item in one transaction, in lock order so overlapping batches can't deadlock, keep going after a refusal so the report lists every problem, then commit everything or nothing. Notifications roll back with the batch because they are outbox rows in the same transaction. The legacy import makes the opposite choice on purpose: it works per record, retries transient errors, and matches on a natural key so a rerun reports the rest unchanged.",
      },
    ],

    future: [
      "Deploy to Railway: the images, CI and service configuration are already in the repository",
      "Connect real email and SMS providers to the worker, whose delivery step is still a stub with real retry and dead-letter handling around it",
    ],
  },
  {
    slug: "glimpse",
    title: "Glimpse — Event Photo Guestbook",
    tagline:
      "A live photo wall and guestbook for weddings and celebrations, filled from the guests' own phones.",
    cover: {
      src: asset("projects/glimpse/cover.jpg"),
      alt: "A wedding's guest page: the couple's names on a vintage card over a wall of guests' photos",
      width: 2880,
      height: 1800,
    },
    tools: ["React", "Supabase", "PostgreSQL", "Paymob"],

    hook:
      "A host builds an event page in one of ten themes and prints its QR code. Guests scan it and add photos and notes straight from the phone's browser, with no app and no account, and the photos the host stars fill the cover's photo wall. Guests can't read a single event table: everything they do goes through database functions keyed on the event code, and the photo and note caps are enforced inside Postgres, not in the browser.",

    showcase: [
      {
        src: asset("projects/glimpse/showcase-design.png"),
        alt: "Event wizard's Design step with the theme picker and a live preview",
        width: 800,
        height: 500,
      },
      {
        src: asset("projects/glimpse/showcase-cover.jpg"),
        alt: "Guest cover page over a wall of the guests' photos",
        width: 800,
        height: 500,
      },
      {
        src: asset("projects/glimpse/showcase-ops.png"),
        alt: "Staff dashboard overview with live events and recent uploads",
        width: 800,
        height: 500,
      },
    ],

    summary:
      "Glimpse is a SaaS for collecting an event's photos from its guests. A host signs up, builds the event in a four-step wizard with a live preview of the guest page, and pays by card or redeems a prepaid code. Guests open the event's link or QR code, upload photos and leave guestbook notes from the browser, and the host moderates, stars favourites onto the cover's photo wall, and downloads the album once the event has ended. A separate staff dashboard runs the platform from its own subdomain, behind two-factor sign-in. Both apps are React single-page apps on Vercel, sharing one Supabase project: Postgres with row-level security, Auth, Storage and four edge functions. The sections below describe the system as it is built in the repository; the screens show a demo event seeded into a local copy of the database, not customer data.",

    meta: [
      { label: "Timeline", value: "July 2026 – present" },
      { label: "Domain", value: "Events · SaaS" },
      { label: "Status", value: "Live" },
      { label: "Scope", value: "2 apps · 4 edge functions" },
    ],

    links: [
      {
        label: "Live site",
        href: "https://www.glimpse-shot.com",
        primary: true,
      },
    ],

    stats: [
      {
        value: "10",
        label: "Event themes",
        note: "Nine ready-made looks in two families, photo wall and minimal, plus a custom one the host builds from colours, type and a backdrop.",
      },
      {
        value: "0",
        label: "Event tables guests can read",
        note: "Guests reach event data only through six SECURITY DEFINER functions keyed on the event code. The one table open to visitors is the public price list.",
      },
      {
        value: "39",
        label: "Database test scenarios",
        note: "Across 7 SQL suites run in a throwaway Postgres: access rules, caps, payments, idle cleanup and the cover badge.",
      },
      {
        value: "11",
        label: "Database tables",
        note: "One schema file per object. The tests build the database from the migrations and from the schema files and fail if the two differ.",
      },
      {
        value: "4",
        label: "Edge functions",
        note: "Card checkout, the payment webhook, new-event emails and the daily idle-event cleanup.",
      },
      {
        value: "36",
        label: "Photo-wall positions",
        note: "Fixed once and ordered so the first few frames already cover the whole cover. Changing the frame count adds or removes frames, never reshuffles.",
      },
    ],

    problem: {
      heading: "The problem",
      body: [
        "At a wedding the photographer sees one angle, while a hundred guests take photos that never reach the couple. Asking them to install an app, make an account or join a group chat loses most of them.",
        "So a guest has to get from a QR code on a table to uploading a photo in one tap, on whatever phone they have, with no account. That makes everything else hard. The browser is anonymous, the public key ships in the JavaScript, and a room full of people uploads at once. Every limit a package promises, such as 150 photos and 50 notes, has to hold even against a guest who skips the page and calls the API directly.",
        "The host side has its own constraints. An event must not exist until the money is real, a paid event must never be lost to a failed write after the payment, and the page guests land on has to look like the occasion rather than like a form.",
      ],
    },

    approach: {
      heading: "The approach",
      body: [
        "The database is the backend. There is no custom API server: rules live in Postgres as row-level security policies, column grants and SECURITY DEFINER functions, so they hold whichever client is calling. The browser only reads the limits back to tell a guest when an event is full.",
        "Guests are the anonymous role and get no table access. Every guest read and write is a function keyed on the event code, and uploads pass a storage policy that counts photos before it accepts one.",
        "A card purchase starts as an order, not an event. Only the payment webhook, after verifying Paymob's signature and the exact amount, can turn it into an event, and it does that exactly once.",
      ],
    },

    pipeline: [
      {
        step: "1 · Event built",
        detail:
          "The host fills in four steps: details, design, plan and review. The preview beside the form is the same cover component guests get, scaled down, so it can't drift from the real page.",
      },
      {
        step: "2 · Paid",
        detail:
          "A card purchase opens an order with the package version and price pinned, then a Paymob checkout. A prepaid code skips payment: the code is already an event row, waiting to be claimed.",
      },
      {
        step: "3 · Event created",
        detail:
          "The webhook verifies the payment and creates the event exactly once. A database trigger then emails the admins and sends the host a receipt through Resend.",
      },
      {
        step: "4 · Shared",
        detail:
          "The share page gives the event code, its link and a QR code to print on table cards. Guests need nothing else.",
      },
      {
        step: "5 · Photos in",
        detail:
          "The browser re-encodes each photo as a 2500 px JPEG and a 1024 px thumbnail and uploads them one after the other. The storage policy refuses anything past the event's photo cap.",
      },
      {
        step: "6 · Notes in",
        detail:
          "Guests leave guestbook notes through one database function, which checks the event is open and under its note cap in the same transaction as the insert.",
      },
      {
        step: "7 · Curated",
        detail:
          "The host stars photos onto the cover's photo wall, deletes the ones that don't belong and moderates notes. The guest cover refreshes its counts every 8 seconds.",
      },
      {
        step: "8 · Ended",
        detail:
          "Ending the event is final for the host and unlocks the album download. Once guests have used an event, 5 idle days bring the host a warning email, and at 7 the event is deleted with its photos.",
      },
    ],

    services: [
      {
        name: "Guest & host app",
        role: "React 19 · Vite · Vercel",
        detail:
          "The landing page, sign-in, the event wizard, the share and moderation pages, and the four guest pages. Hash-routed by hand, with no router library.",
      },
      {
        name: "Admin app",
        role: "React 19 · own subdomain",
        detail:
          "The staff dashboard: overview, events, users and prepaid codes, with the overview updating live over Supabase Realtime. A separate deploy, so its bundle never ships to guests.",
      },
      {
        name: "Postgres",
        role: "Supabase · RLS",
        detail:
          "Holds every rule. The schema lives in the repository as one file per table, function and policy set, with migrations generated from it.",
      },
      {
        name: "Storage",
        role: "event-photos bucket",
        detail:
          "Public to read, JPEG only, 10 MB per file. There is no photos table: the bucket itself is the record, read through a function rather than a folder listing.",
      },
      {
        name: "Auth",
        role: "Email · Google · TOTP",
        detail:
          "Hosts sign in with email and password or Google. Staff also need an authenticator code before Postgres treats them as admins.",
      },
      {
        name: "Edge functions",
        role: "Deno · TypeScript",
        detail:
          "create-payment-session and paymob-webhook for card payments, notify-new-event for emails, and cleanup-idle-events, run daily by pg_cron.",
      },
    ],

    dataStoresHeading: "Data model — 11 tables",

    dataStores: [
      {
        name: "Events",
        role: "2 tables",
        detail:
          "events holds identity, ownership, package and lifecycle; event_info holds the look one-to-one, so the row every listing scans stays narrow.",
      },
      {
        name: "Guest content",
        role: "2 tables",
        detail:
          "messages and favorites. Photos have no table: they are read from storage.objects by event code.",
      },
      {
        name: "Commerce",
        role: "3 tables",
        detail:
          "packages (append-only, versioned as bronze@2 so a price change never rewrites a past sale), orders, and payment_events, which logs every webhook delivery.",
      },
      {
        name: "People",
        role: "2 tables",
        detail:
          "profiles, filled by a trigger on sign-up, and platform_admins, which is written only from the SQL editor.",
      },
      {
        name: "Operations",
        role: "2 tables",
        detail:
          "admin_audit_log, which clients can't write to, and app_secrets for the payment, email and cron keys.",
      },
    ],

    security: {
      heading: "Security & access",
      body: [
        "Three kinds of user share one database: anonymous guests, hosts, and staff. The public key is inlined into the JavaScript every guest downloads, so nothing the browser checks counts as a control. Client-side resizing saves bandwidth; the limits live in Postgres.",
        "Each role gets the narrowest door that works. Guests call functions keyed on a code, hosts are scoped to their own rows and only the columns they may change, and staff powers depend on a second factor checked inside the database, not in the dashboard's UI.",
      ],
    },

    securityLayers: [
      {
        name: "Guests",
        role: "SECURITY DEFINER functions",
        detail:
          "No account and no table access. Six functions keyed on the event code serve the cover, photos, notes and usage, and folder listing is never used, so no visitor can list another event's photos.",
      },
      {
        name: "Hosts",
        role: "RLS · column grants",
        detail:
          "Rows are scoped to the owner, and column-level grants let a host change a title or theme but never their package or the event's owner. A trigger stops an ended event from being reopened.",
      },
      {
        name: "Caps",
        role: "Enforced in Postgres",
        detail:
          "The photo cap is counted inside the storage upload policy and the note cap inside the note function. A thumbnail is accepted only if its full-size photo is already stored.",
      },
      {
        name: "Payments",
        role: "HMAC-SHA512 · exact amount",
        detail:
          "The webhook checks Paymob's signature in constant time and finds the order only through the signed Paymob order id. It settles only for the exact amount and currency, and only once.",
      },
      {
        name: "Staff",
        role: "TOTP · aal2 · own origin",
        detail:
          "Admin rights need an allowlisted user on a session that has passed TOTP. The dashboard holds no elevated key, and every change an admin makes is written to an audit log.",
      },
      {
        name: "Headers",
        role: "CSP · HSTS",
        detail:
          "Both apps ship a strict Content Security Policy that allows connections only to their Supabase project, refuse to be framed, and send HSTS. The admin app is also noindex and no-referrer.",
      },
    ],

    endpointsNote:
      "There is no custom API server. The browser calls Postgres functions through Supabase's REST layer, and the edge functions handle what needs a secret. Guests are the anonymous role, hosts are any signed-in user, and the admin functions require an aal2 session.",

    endpoints: [
      { method: "RPC", path: "event_by_code", purpose: "The event's cover, theme and limits", access: "guest" },
      { method: "RPC", path: "photos_by_code", purpose: "The event's photos, read from storage", access: "guest" },
      { method: "RPC", path: "messages_by_code", purpose: "The guestbook notes", access: "guest" },
      { method: "RPC", path: "add_message_by_code", purpose: "Leave a note, under the note cap", access: "guest" },
      { method: "RPC", path: "event_usage_by_code", purpose: "Photos and notes used and left", access: "guest" },
      { method: "POST", path: "/storage/v1/object/event-photos/{CODE}/…", purpose: "Upload a photo; the policy enforces the cap", access: "guest" },
      { method: "RPC", path: "start_order", purpose: "Open a card order with the price pinned", access: "host" },
      { method: "POST", path: "/functions/v1/create-payment-session", purpose: "Open a Paymob checkout for an order", access: "host" },
      { method: "RPC", path: "create_event_with_code", purpose: "Redeem a prepaid code", access: "host" },
      { method: "PATCH", path: "events.is_active", purpose: "End the event, which a host can't undo", access: "owner" },
      { method: "POST", path: "/functions/v1/paymob-webhook", purpose: "Verify, then settle, fail or refund an order", access: "Paymob signature" },
      { method: "RPC", path: "finalize_paid_order", purpose: "Create the paid event, once", access: "service role" },
      { method: "RPC", path: "admin_platform_stats", purpose: "Platform counters", access: "admin · aal2" },
      { method: "RPC", path: "admin_events_page", purpose: "Search and page through events", access: "admin · aal2" },
      { method: "RPC", path: "admin_set_event_active", purpose: "Pause or resume an event, logged", access: "admin · aal2" },
      { method: "RPC", path: "admin_generate_prepaid_codes", purpose: "Codes stamped with the package version", access: "admin · aal2" },
      { method: "POST", path: "/functions/v1/notify-new-event", purpose: "Admin email and host receipt", access: "shared secret" },
      { method: "POST", path: "/functions/v1/cleanup-idle-events", purpose: "Daily warn-then-delete sweep", access: "shared secret" },
    ],

    stack: [
      {
        group: "Frontend",
        items: ["React 19", "Vite 8", "Hash routing", "Inline styles", "OffscreenCanvas", "qrcode", "Vercel Web Analytics"],
      },
      {
        group: "Backend",
        items: ["Supabase", "PostgreSQL 17", "Row-level security", "Supabase Auth", "Supabase Storage", "Supabase Realtime", "Edge Functions (Deno)", "pg_cron", "pg_net"],
      },
      { group: "Payments & email", items: ["Paymob Unified Checkout", "Resend"] },
      { group: "Testing", items: ["SQL test suites", "Docker", "ESLint"] },
      { group: "Infrastructure", items: ["Vercel", "Supabase", "Content Security Policy"] },
    ],

    gallery: [
      {
        src: asset("projects/glimpse/landing-hero.jpg"),
        alt: "Glimpse landing page with a phone showing a themed guest page",
        width: 2880,
        height: 1800,
        caption:
          "The landing page. A host can sign up and build an event without paying; payment comes at the plan step.",
      },
      {
        src: asset("projects/glimpse/create-design.png"),
        alt: "Event wizard's Design step with theme tiles, colour controls and a live preview",
        width: 2880,
        height: 1800,
        caption:
          "Creating an event. The Design step offers the ready-made themes and a custom one, and the preview on the right is the same component guests get, scaled down.",
      },
      {
        src: asset("projects/glimpse/landing-themes.png"),
        alt: "Four themed guest pages side by side: vintage, graduation, graduation noir and birthday",
        width: 2880,
        height: 1960,
        caption:
          "Themes change type, colour, card material and ornaments, not just a palette. A new theme is a new skin; no page changes.",
      },
      {
        src: asset("projects/glimpse/share.jpg"),
        alt: "Share page with the event's QR code, code, link and host actions",
        width: 2880,
        height: 1864,
        caption:
          "The share page: the event code, its link and a QR code for table cards. Ending the event is final for the host, and it unlocks the album download.",
      },
      {
        src: asset("projects/glimpse/cover.jpg"),
        alt: "A wedding's guest cover over a wall of polaroid-framed guest photos",
        width: 2880,
        height: 1800,
        caption:
          "The guest cover on a desktop. The frames behind the card show the photos the host starred, placed by a fixed order so changing the frame count never reshuffles the wall.",
      },
      {
        src: asset("projects/glimpse/cover-phone.jpg"),
        alt: "The wedding's guest cover on a phone",
        width: 1170,
        height: 2532,
        narrow: true,
        caption: "The same cover on a phone, where most guests see it: no app, no account.",
      },
      {
        src: asset("projects/glimpse/notes-phone.jpg"),
        alt: "Guestbook notes on torn-paper cards on a phone",
        width: 1170,
        height: 2532,
        narrow: true,
        caption: "The guestbook, in the event's theme.",
      },
      {
        src: asset("projects/glimpse/host-admin.jpg"),
        alt: "Host moderation page with photo tiles, star and delete buttons",
        width: 2880,
        height: 1958,
        caption:
          "Host moderation. A star puts a photo on the cover wall; delete removes it from storage. Downloads stay locked until the event has ended.",
      },
      {
        src: asset("projects/glimpse/ops-2fa.png"),
        alt: "Staff dashboard asking for a two-factor code",
        width: 2880,
        height: 1800,
        caption:
          "Staff sign-in asks for an authenticator code after the password. Until it is verified, Postgres treats the session as an ordinary user.",
      },
      {
        src: asset("projects/glimpse/ops-overview.png"),
        alt: "Staff dashboard overview with live events, hosts, storage and 24-hour activity",
        width: 2880,
        height: 1800,
        caption:
          "The staff overview: live and total events, hosts, storage used, and the last 24 hours of photos and notes. It refreshes over Realtime as new ones arrive.",
      },
      {
        src: asset("projects/glimpse/ops-events.jpg"),
        alt: "Staff dashboard events grid with photo covers, codes and counts",
        width: 2880,
        height: 1800,
        caption:
          "Every event on the platform, searchable by name or code, with each event's photo and note counts.",
      },
      {
        src: asset("projects/glimpse/ops-event.png"),
        alt: "Staff dashboard event detail with package, limits, host and photos",
        width: 2880,
        height: 1800,
        caption:
          "An event as staff see it: the package and limits it was sold with, its host, its storage, and controls to pause it or delete it, each written to the audit log.",
      },
    ],

    testing: [
      {
        name: "Who gets in",
        role: "test_gate · 9 scenarios",
        detail:
          "Anonymous visitors reach nothing directly, a host sees only their own event, and an allowlisted admin is an admin only on an aal2 session. A host can't raise their own package or reopen an ended event.",
      },
      {
        name: "Caps",
        role: "test_limits · 6 scenarios",
        detail:
          "The photo and note caps refuse the item that would exceed them, thumbnails neither count nor slip past the cap, and what guest pages are told matches what is enforced.",
      },
      {
        name: "Payments",
        role: "test_payments · 5 scenarios",
        detail:
          "A wrong amount fails the order and creates nothing, the exact amount settles once, only the service role can settle, and the webhook finds an order only through the provider id stored on it.",
      },
      {
        name: "Idle cleanup",
        role: "test_cleanup · 7 scenarios",
        detail:
          "An unused event never expires, a warning comes before deletion, new activity cancels the countdown, unsold prepaid codes are never touched, and orders survive their event.",
      },
      {
        name: "Admin, guests & cover",
        role: "12 scenarios",
        detail:
          "Platform stats, pausing logged with its actor, codes carrying the price they were sold at, guests refused by a closed event, and the cover badge's size limits.",
      },
      {
        name: "Schema drift",
        role: "Two builds, one fingerprint",
        detail:
          "The harness builds one database from the migrations and another from the schema files, and fails if they differ, so the readable schema can't fall behind what is live.",
      },
    ],

    challenges: [
      {
        title: "A photo wall that never reshuffles",
        body: "The cover's wall has to look evenly filled at any frame count, and the count is a slider: moving it must add or remove frames, not redeal the whole wall. A random scatter leaves clumps and bald patches. A low-discrepancy R2 sequence keeps earlier frames in place, but it is only even in the long run, and at eleven frames it still left a whole quadrant empty. The fix is 36 positions fixed once on a jittered 6×6 grid, which can't leave a hole, then ordered by farthest-point traversal, so each next frame is the one furthest from everything already placed. Any count takes the first n: four frames land in four corners, and thirty-six split 9/9/9/9 across the quadrants.",
      },
      {
        title: "Caps the browser can't get around",
        body: "The public key ships to every guest, so a limit checked in JavaScript isn't a limit. The photo cap is counted inside the storage upload policy itself. Exempting the whole thumbnails folder from that count turned out to be an uncapped write path, because the guest picks the object path, so a thumbnail is now accepted only when its full-size photo already exists. Counting before inserting races when a room uploads at once, so both caps take a per-event advisory lock, and the upload lock is taken only within ten photos of the cap so it doesn't queue a whole room behind one storage write.",
      },
      {
        title: "No event until the money is real",
        body: "A card purchase writes an order holding the host's wizard answers, not an event. Only the webhook can create the event, and only after verifying the HMAC, matching the signed amount and currency, and finding the order through the signed provider id rather than the unsigned merchant reference. Settlement is idempotent, and a failure returns 500 so Paymob retries. A badge image the database would refuse is checked when the order is opened, so it can't make the event's creation fail after the money has moved.",
      },
      {
        title: "One cover instead of seven",
        body: "Each theme once had its own branches in the guest pages, and the dashboard preview was a hand-written seventh copy of every cover. The copies had stopped agreeing on structure, not just on looks. Each theme now resolves to a skin, which carries colour, type, card material and ornaments but no layout, and a single cover component renders both the live guest page and the dashboard preview. A new theme is a new skin, and the preview can't drift from what guests see.",
      },
    ],

    future: [
      "Package the ended event's album as a single archive on the server instead of downloading each photo separately in the browser",
      "Accept short videos alongside photos; the bucket accepts JPEG only today",
      "Add browser tests for the two React apps; today only the database layer has automated tests",
    ],
  },
];

export function getProject(slug) {
  return projects.find((project) => project.slug === slug);
}
