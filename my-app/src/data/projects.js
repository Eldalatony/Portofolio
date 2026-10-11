export const projects = [
  {
    slug: "shemms",
    title: "SHEMMS — Smart Home Energy Monitor",
    tagline:
      "IoT smart plug that measures, secures, and forecasts household energy use.",
    cover: {
      src: "/projects/shemms/dashboard-live.png",
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
        src: "/projects/shemms/dashboard-insights.png",
        alt: "Energy trend, cost-by-device and peak-hour charts",
        width: 1600,
        height: 830,
      },
      {
        src: "/projects/shemms/dashboard-live.png",
        alt: "Live energy dashboard with per-appliance wattage and alerts",
        width: 1600,
        height: 824,
      },
      {
        src: "/projects/shemms/prototype-lcd.png",
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
      src: "/projects/shemms/demo.mp4",
      poster: "/projects/shemms/dashboard-live.png",
    },

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
        src: "/projects/shemms/dashboard-live.png",
        alt: "Live energy dashboard with per-appliance wattage and alert feed",
        width: 1600,
        height: 824,
        caption:
          "Live monitor — current draw, voltage, rate and energy for the selected plug, with a severity-ranked alert feed and an inline toggle that switches the physical relay.",
      },
      {
        src: "/projects/shemms/dashboard-insights.png",
        alt: "Dashboard insights: energy trend, cost by device, peak hours",
        width: 1600,
        height: 830,
        caption:
          "Today at a glance — consumption, cost and projected bill, over an energy trend line, a cost-share donut per device, and a peak-hour histogram identifying the busiest hour.",
      },
      {
        src: "/projects/shemms/analytics-light.png",
        alt: "Analytics page in light theme with model readiness badges",
        width: 975,
        height: 501,
        caption:
          "Analytics in light theme. The badges show per-device model state, so a user can see which appliances have enough history for anomaly scoring.",
      },
      {
        src: "/projects/shemms/auth.png",
        alt: "SHEMMS sign-in screen",
        width: 520,
        height: 565,
        caption: "JWT-backed sign-in; bcrypt-hashed credentials, role assigned on the account.",
      },
      {
        src: "/projects/shemms/prototype-lcd.png",
        alt: "Breadboard prototype with LCD showing live voltage, current and power",
        width: 975,
        height: 839,
        caption:
          "The bench prototype reporting V:208 I:0.05 P:11.0 on its local LCD — the same values the backend received over MQTT, which is how sensor calibration was verified.",
      },
      {
        src: "/projects/shemms/mqtt-encrypted.png",
        alt: "MQTT broker web client showing base64 ciphertext payloads",
        width: 975,
        height: 502,
        caption:
          "What the broker actually sees: base64 AES ciphertext on home/gateway/data. Consumption is unreadable in transit even to the broker operator.",
      },
    ],

    diagrams: [
      {
        src: "/projects/shemms/component-diagram.jpg",
        alt: "Component diagram: smart plug, MQTT broker, backend, databases, AI service, dashboard",
        width: 1536,
        height: 1024,
        caption: "Component diagram — the five moving parts and the traffic between them.",
      },
      {
        src: "/projects/shemms/deployment-diagram.jpg",
        alt: "Deployment diagram across edge, network, server, data and client tiers",
        width: 1600,
        height: 877,
        caption: "Deployment view — edge, network, server, data and client tiers, with the protocol on each hop.",
      },
      {
        src: "/projects/shemms/sequence-diagram.jpg",
        alt: "Sequence diagram of the real-time monitoring flow",
        width: 1536,
        height: 1024,
        caption: "Sequence diagram — one reading's journey from plug to chart, in eleven steps.",
      },
      {
        src: "/projects/shemms/security-architecture.png",
        alt: "Security architecture showing encryption layers against network threats",
        width: 1024,
        height: 559,
        caption: "Security architecture — where each protection sits relative to the threats it answers.",
      },
      {
        src: "/projects/shemms/requirements.png",
        alt: "Functional and non-functional requirements breakdown",
        width: 1024,
        height: 559,
        caption: "Requirements analysis — functional capabilities against non-functional targets.",
      },
      {
        src: "/projects/shemms/lifecycle.png",
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
];

export function getProject(slug) {
  return projects.find((project) => project.slug === slug);
}
