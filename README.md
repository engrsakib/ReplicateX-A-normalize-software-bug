# AI‑Enhanced Duplicate Bug Report Detection System — Complete Setup (Frontend + Backend + AI/ML)

[![Next.js](https://img.shields.io/badge/Next.js-13-black?logo=next.js&logoColor=white)](https://nextjs.org/) [![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=white)](https://reactjs.org/) [![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.0-38B2AC?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/) [![Redux](https://img.shields.io/badge/Redux-4.2-764ABC?logo=redux&logoColor=white)](https://redux.js.org/) [![NextAuth](https://img.shields.io/badge/NextAuth.js-5-111827?logo=next-auth&logoColor=white)](https://next-auth.js.org/) [![Node.js](https://img.shields.io/badge/Node.js-18-339933?logo=node.js&logoColor=white)](https://nodejs.org/) [![Express](https://img.shields.io/badge/Express-4-000000?logo=express&logoColor=white)](https://expressjs.com/) [![MongoDB](https://img.shields.io/badge/MongoDB-6-47A248?logo=mongodb&logoColor=white)](https://www.mongodb.com/) [![Mongoose](https://img.shields.io/badge/Mongoose-6-CC0000?logo=mongodb&logoColor=white)](https://mongoosejs.com/) [![HuggingFace](https://img.shields.io/badge/HuggingFace-Transformers-FF6E33?logo=huggingface&logoColor=white)](https://huggingface.co/) [![Docker](https://img.shields.io/badge/Docker-24.0-blue?logo=docker&logoColor=white)](https://www.docker.com/) [![Vercel](https://img.shields.io/badge/Vercel-deploy-000000?logo=vercel&logoColor=white)](https://vercel.com/) [![Render](https://img.shields.io/badge/Render-deploy-5C6FFF?logo=render&logoColor=white)](https://render.com/) [![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](LICENSE)

A production‑ready web application that detects and clusters duplicate bug reports using a combination of TF‑IDF and semantic embeddings (Sentence‑BERT). This README bundles the full setup process (local dev and Docker), environment templates, AI/ML component design, and CI hints — everything you requested in one place.

---

Table of Contents
- Overview
- Key Features
- Technology Stack
- System Architecture
- Local Setup (Backend + Frontend)
- Docker (compose) Setup
- AI / ML Components (design & pipeline)
- Environment Variables (.env.example)
- Data & Migrations
- Testing & CI/CD (GitHub Actions example)
- Monitoring, Scaling & Production Notes
- Contributing
- Authors & License

---

## Overview
This system accepts user-submitted bug reports (title, description, steps, attachments) and:
1. Runs fast approximate duplicate detection (TF‑IDF) to shortlist candidates.
2. Computes semantic embeddings (S‑BERT) for higher quality similarity scores.
3. Clusters similar reports and surfaces clusters on role-based dashboards (Tester, Developer, Admin).
4. Sends alerts / notifications when a submitted report matches an existing cluster above a threshold.

---

## Key Features
- Smart submission UI with immediate duplicate suggestions
- TF‑IDF candidate retrieval + S‑BERT semantic reranking
- Configurable similarity thresholds and clustering algorithm
- Role-based dashboards with visual analytics
- REST API for integrations and automation
- Real-time alerts (webhooks / email)
- Dockerized for local and production deployments

---

## Technology Stack
- Frontend: Next.js (React), TailwindCSS, Redux, NextAuth
- Backend: Node.js, Express, Mongoose (MongoDB)
- AI/ML: TF‑IDF (scikit-like logic or JS alternatives), Sentence-BERT (HuggingFace transformers via Python service or hosted embeddings)
- Persistence: MongoDB (documents), optional vector DB (Milvus / Pinecone) for embeddings
- DevOps: Docker, Docker Compose, Vercel (frontend), Render/Heroku (backend), GitHub Actions

---

## System Architecture
1. Client (Next.js) — UI, submission form, dashboards, websockets for real-time alerts  
2. Backend (Express) — API endpoints, auth, business logic, orchestrates ML calls  
3. AI Layer — TF‑IDF indexing + S‑BERT embedding service (can be an independent microservice in Python or Node)  
4. Database — MongoDB stores reports, users, clusters, embedding metadata  
5. Optional: Vector DB for embeddings when scale requires efficient similarity search

Simple diagram:
```
[Browser (Next.js)] <--> [API (Express)] <--> [AI Layer: TF-IDF / Embeddings Service] --> [MongoDB]
                                                    |
                                                    v
                                               [Vector DB]
```

---

## Local Setup (Backend + Frontend)

Prerequisites:
- Node.js 18+ and npm or yarn
- MongoDB local or cloud (Mongo Atlas)
- (Optional) Python 3.8+ and virtualenv if you run the embedding service in Python
- Docker & Docker Compose (for containerized local)

1. Clone repository:
```bash
git clone https://github.com/your-username/ai-bug-detection.git
cd ai-bug-detection
```

2. Backend
```bash
cd server
cp .env.example .env
# Edit .env with your MONGO_URI, JWT_SECRET, etc.
npm install
npm run dev       # starts server with nodemon or equivalent
```
Backend default: `http://localhost:5000`

3. Frontend
```bash
cd ../client
cp .env.local.example .env.local
# Edit .env.local: set NEXT_PUBLIC_API_URL=http://localhost:5000/api
npm install
npm run dev
```
Frontend default: `http://localhost:3000`

4. Embedding Service (optional — Python example)
- You can host an embedding microservice (recommended) using HuggingFace transformers (sentence-transformers). Example flow:
  - A Python service exposes /embed endpoint: accepts text and returns float vector (embedding).
  - Backend calls this service to compute embeddings and persists them.

---

## Docker & docker-compose (local end-to-end)

Use Docker Compose to run MongoDB + backend + frontend + optional embedding worker.

Place the following file as `docker-compose.yml` at repo root.

```yaml name=docker-compose.yml
version: "3.8"
services:
  mongo:
    image: mongo:6
    restart: unless-stopped
    environment:
      MONGO_INITDB_DATABASE: bugdb
    volumes:
      - mongo_data:/data/db
    ports:
      - "27017:27017"

  backend:
    build:
      context: ./server
      dockerfile: Dockerfile
    environment:
      - NODE_ENV=development
      - PORT=5000
      - MONGO_URI=mongodb://mongo:27017/bugdb
      - JWT_SECRET=${JWT_SECRET}
      - TFIDF_THRESHOLD=0.7
      - SBERT_THRESHOLD=0.85
    ports:
      - "5000:5000"
    depends_on:
      - mongo
    volumes:
      - ./server:/usr/src/app
    command: ["npm", "run", "dev"]

  frontend:
    build:
      context: ./client
      dockerfile: Dockerfile
    environment:
      - NEXT_PUBLIC_API_URL=http://localhost:5000/api
    ports:
      - "3000:3000"
    depends_on:
      - backend
    volumes:
      - ./client:/usr/src/app
    command: ["npm", "run", "dev"]

  embedding-service:
    build:
      context: ./embedding-service
      dockerfile: Dockerfile
    environment:
      - MODEL_NAME=sentence-transformers/all-MiniLM-L6-v2
    ports:
      - "8000:8000"
    volumes:
      - ./embedding-service:/opt/service

volumes:
  mongo_data:
```

Run:
```bash
# create a .env file with secrets or export env vars
docker compose up --build
```

---

## Example Dockerfiles

server/Dockerfile (backend)
```dockerfile name=server/Dockerfile
FROM node:18-alpine AS builder
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:18-alpine
WORKDIR /usr/src/app
COPY --from=builder /usr/src/app ./
ENV NODE_ENV=production
EXPOSE 5000
CMD ["node", "dist/index.js"]
```

client/Dockerfile (frontend)
```dockerfile name=client/Dockerfile
FROM node:18-alpine
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm ci
COPY . .
EXPOSE 3000
CMD ["npm", "run", "dev"]
```

embedding-service/Dockerfile (Python FastAPI + Transformers)
```dockerfile name=embedding-service/Dockerfile
FROM python:3.10-slim
WORKDIR /opt/service
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY . .
EXPOSE 8000
CMD ["uvicorn", "app:app", "--host", "0.0.0.0", "--port", "8000"]
```

---

## AI / ML Components — Design & Pipeline

High-level pipeline:
1. Preprocessing
   - Lowercase, strip punctuation, normalize whitespace
   - Optional: remove stack traces / noisy tokens (regex)
2. Candidate Retrieval (fast)
   - Maintain an inverted index / TF‑IDF index to compute cosine similarity quickly
   - Use this to retrieve top-K candidate existing reports for a new submission
3. Semantic Ranking (high quality)
   - Compute Sentence‑BERT embeddings for both new report and candidate reports
   - Compute cosine similarity between embeddings for reranking
4. Thresholding & Decision
   - If best similarity >= SBERT_THRESHOLD, mark as duplicate suggestion
   - If in-between thresholds, show suggestions but mark as tentative
5. Clustering
   - Periodic or online clustering using hierarchical clustering or DBSCAN on embeddings
   - Maintain cluster metadata: cluster id, representative reports, last updated
6. Persistence
   - Save raw report, TF‑IDF vector metadata, and embedding pointer (or store raw embedding)
   - Optionally store embeddings in vector DB for scale (Milvus / Pinecone)
7. Alerts
   - If duplicate detected above high threshold, send automatic alert (email/webhook) to configured recipients

Implementation options:
- Embedding generation can be synchronous (blocking) for small scale, or asynchronous (queue -> worker) for scale.
- Embedding model deployment:
  - Option A: Python service with HuggingFace / SentenceTransformers (recommended)
  - Option B: Hosted embeddings (HuggingFace Inference API, OpenAI embeddings, or other managed services)

Production considerations:
- Use batched embedding requests to use GPU effectively.
- Cache embeddings for repeated reads.
- If storing embeddings in MongoDB, either compress (float16) or use vector DB for efficient nearest neighbor search.

Threshold tuning:
- TF‑IDF threshold is forgiving (fast false positives okay, because they will be reranked)
- SBERT threshold typically: 0.80–0.90 for high precision duplicate detection (tweak on labeled dev set)

---

## Environment Variables (.env.example)
Save this as `server/.env.example` and `client/.env.local.example` accordingly.

```env name=.env.example
# Server
PORT=5000
MONGO_URI=mongodb://localhost:27017/bugdb
JWT_SECRET=replace_with_strong_secret
TFIDF_THRESHOLD=0.70
SBERT_THRESHOLD=0.85
EMBEDDING_SERVICE_URL=http://embedding-service:8000/embed
EMAIL_HOST=smtp.example.com
EMAIL_PORT=587
EMAIL_USER=you@example.com
EMAIL_PASS=supersecure
```

```env name=.env.local.example
# Frontend
NEXT_PUBLIC_API_URL=http://localhost:5000/api
NEXTAUTH_SECRET=replace_with_nextauth_secret
```

Security note:
- Use secrets manager for production. Do not commit `.env` files.

---

## Data & Migrations
- Store migration scripts (if any) under `server/migrations/`.
- If you use MongoDB migration tools (migrate-mongo or similar), include migration runner in CI/deploy process to apply schema changes.

---

## Testing & CI/CD (GitHub Actions example)

Example workflow file: `.github/workflows/ci.yml`

```yaml name=.github/workflows/ci.yml
name: CI

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  lint-test-build:
    runs-on: ubuntu-latest
    services:
      mongo:
        image: mongo:6
        ports: [27017:27017]
    steps:
      - uses: actions/checkout@v4

      - name: Set up Node
        uses: actions/setup-node@v4
        with:
          node-version: 18

      - name: Install backend deps
        working-directory: server
        run: npm ci

      - name: Run backend tests
        working-directory: server
        run: npm test -- --runInBand

      - name: Install frontend deps
        working-directory: client
        run: npm ci

      - name: Run frontend lint
        working-directory: client
        run: npm run lint
```

CI tips:
- Add caching strategy for Node modules
- Add a job to build Docker images and push to registry for CD
- Add integration tests to run against ephemeral test DB (mongodb-memory-server or service container)

---

## Monitoring & Scaling (Production Notes)
- Logging: structured logs (JSON) and centralized logging (ELK / Loki)
- Metrics: expose Prometheus metrics and use Grafana for dashboards
- Embedding scale:
  - Use GPU-backed instances or hosted vector DB when corpus and traffic grow
  - Use batching and concurrency limits
- Security:
  - Enforce HTTPS, use secure cookies, enable rate-limiting on API endpoints
  - Sanitize and limit the size of attachments and logs to avoid PII leakage

---

## Contributing
1. Fork the repo
2. Create a feature branch: `git checkout -b feat/your-feature`
3. Add tests and update docs
4. Open a PR with a clear description and linked issue (if any)
5. Keep secrets out of commits

---

## Authors & Acknowledgements
- Lead Developer: Md. Nazmus Sakib  
- Supervisor: Md. Habibul Basar Faruk (Lecturer, Dhaka International University)  
- Inspired by research and open-source projects on TF‑IDF, Sentence‑BERT, and semantic similarity.

