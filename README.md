# Mini CRM & Campaign Management App

This project is a simplified CRM system designed to model core features that help businesses interact with their customers. It includes a backend for data ingestion and processing, along with a frontend for campaign and audience management.

---

## Table of Contents
1. [Features](#features)
2. [Tech Stack](#tech-stack)
3. [Project Structure](#project-structure)
4. [Setup Instructions](#setup-instructions)
5. [Usage](#usage)
6. [Future Improvements](#future-improvements)

---

## Features

### 1. **Data Ingestion API**
- **Goal:** Load customer and order data via APIs.
- **Key Functionalities:**
  - APIs to accept and store customer and order data in a MySQL database.
  - Demonstrations via Postman showing successful data storage.
- **Bonus Implementation:**
  - Scalable pub-sub architecture for data ingestion:
    - API validates data and pushes it to a message broker.
    - Consumer process stores validated data into the database.

---

### 2. **Campaign & Audience Management**
- **Audience Creation:**
  - Define audience segments with conditions like:
    - Total spending > INR 10,000
    - Spending > INR 10,000 & visits ≤ 3
    - No visits in the last 3 months
  - Use AND/OR logic across multiple fields.
  - Calculate audience size dynamically before saving.

- **Campaign History & Stats:**
  - View past campaigns, ordered by most recent.
  - Display statistics (audience size, messages sent, failures, etc.).

- **Message Sending:**
  - Save audience data in a `communications_log` table.
  - Dummy API sends personalized messages (e.g., “Hi [Name], here’s 10% off on your next order!”).
  - Internal "Delivery Receipt" API randomly assigns message delivery status (90% SENT, 10% FAILED).
  - Update communication status in the database via the Delivery Receipt API.
  - **Bonus:**
    - Use a pub-sub model for batch database updates.
    - Real-time statistics display for campaigns.

---

## Tech Stack
### Backend:
- **Node.js** with **Express.js** for APIs
- **MySQL** for database management
- **Pub-Sub Architecture:** Optional (message brokers `RabbitMQ`)

### Frontend:
- **React.js** for UI
- **Google Authentication API** for secure access

### Tools:
- **Postman** for API testing
