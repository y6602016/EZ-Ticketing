# EZ-Ticketing 
#### Ez-Ticketing is a Full-stack scalable C2C platform with a collection of microservices

---
## Tech Stack:
#### Front-end: Next.js
#### Back-end: Express (Typescript)
#### Database: MongoDB
#### Container: Docker, Kubernetes
#### Building Tool: Skaffold
#### Others: Stripe API

---
## Product Features:
1. The platform consists of 5 services: auth, tickets, orders, expiration, and payments services
2. Developed with Typescript for type-aware communication across services
3. Solved concurrency issues in a distributed systems environment by versionizing events for concurrency control
4. Server-Side Rendering with Next.js for improved SEO and implemented cross-namespace service communication in a cluster
5. Integrated JWT token with cookies-session to implement authentication in the initial client request for SSR
6. Enhanced the reusability of code between multiple Express servers by using custom NPM packages
7. Implemented load balancing with NGINX Ingress Controller
8. Communicating data between services using NATS Streaming Server as an event bus
9. Deployed and maintained CI/CD pipeline with GitHub Actions for automatical product deployment

