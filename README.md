Reliable Distributed Job Queue Engine

<p align="center">
  <img src="backend/src/assets/queue.svg" alt="Rate Limiter Banner" width="100%">
</p>

A production-inspired distributed job queue built with **Node.js, PostgreSQL, Redis, React, WebSockets, and Docker**. The system ensures reliable background job execution through lease-based processing, automatic recovery, retries with exponential backoff, dead-letter queues, worker heartbeats, and real-time monitoring.

![Node.js](https://img.shields.io/badge/Node.js-22.x-339933?logo=node.js&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-4169E1?logo=postgresql&logoColor=white)
![Redis](https://img.shields.io/badge/Redis-7-DC382D?logo=redis&logoColor=white)
![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black)
![Docker](https://img.shields.io/badge/Docker-Enabled-2496ED?logo=docker&logoColor=white)

  Project Overview

Reliable Distributed Job Queue Engine is a fault-tolerant background job processing system inspired by production queue architectures.

Jobs are stored durably in PostgreSQL, claimed using a lease mechanism, processed by distributed workers, and automatically recovered if a worker crashes. Failed jobs are retried using exponential backoff before being moved to a Dead Letter Queue (DLQ). The system also includes worker heartbeats, Redis Pub/Sub, WebSocket-based live updates, Docker support, and a React monitoring dashboard.

 Features

- Durable PostgreSQL-backed job queue
- Lease-based distributed job processing
- Automatic lease recovery
- Retry mechanism with exponential backoff
- Dead Letter Queue (DLQ)
- Replay failed jobs
- Worker registration & heartbeat monitoring
- Automatic offline worker detection
- Redis Pub/Sub event broadcasting
- WebSocket-powered live dashboard
- Health check endpoint
- Dockerized multi-service setup

   System Architecture

```mermaid
flowchart LR

Client["Client / API Request"]
Dashboard["React Dashboard"]
Backend["Node.js Backend"]
Redis["Redis Pub/Sub"]
Postgres["PostgreSQL"]
Worker["Worker Service"]
Recovery["Recovery Worker"]

Client --> Backend

Backend --> Postgres
Backend --> Redis

Worker --> Postgres
Worker --> Redis

Recovery --> Postgres

Redis --> Dashboard
```
