# MindMaze – Technical Product Specification Document

## 1. Product Overview

**Product Name:** MindMaze
**Category:** Teen Mental Wellness Web Platform
**Target Users:** Teenagers (13–19 years)
**Platform Type:** Single-page web application (SPA), mobile-responsive
**Primary Goal:** Provide a safe, anonymous, interactive digital space where teens can manage emotions, reduce stress, and access peer support responsibly.

---

## 2. Core Product Objectives

* Emotional support without stigma
* Full anonymity and privacy-first design
* Teen-friendly UI/UX
* Scalable, secure architecture
* Ethical handling of sensitive mental-health-related data

---

## 3. Functional Requirements (Features)

### 3.1 User Access & Identity

* No real-name requirement
* Anonymous user IDs generated on first visit
* Optional account creation using:

  * Email (hashed)
  * OAuth (Google – optional phase 2)
* Age gate (13–19 confirmation)

---

### 3.2 Mood Check-In Module

**Purpose:** Capture daily emotional state

**Features:**

* Emoji-based mood selection (Happy, Sad, Anxious, Angry, Neutral, etc.)
* Optional short text input
* Time-stamped entries

**Data Stored:**

* User ID
* Mood type
* Timestamp
* Optional notes (encrypted)

---

### 3.3 Growth Map (Emotional Progress)

**Purpose:** Visualize emotional patterns over time

**Features:**

* Weekly/monthly mood summaries
* Graphical visualization (charts)
* Achievement milestones

**Technical Notes:**

* Use charting library (Chart.js / Recharts)
* Data aggregation handled server-side

---

### 3.4 Anonymous Chat Groups

**Purpose:** Peer support in a moderated environment

**Features:**

* Topic-based chat rooms (Stress, Exams, Loneliness, Motivation)
* Auto-generated nicknames
* Profanity & toxicity filter
* Human + AI moderation

**Rules:**

* No private DMs (phase 1)
* Report & mute system

---

### 3.5 Stress Buster Games

**Purpose:** Short mental relief activities

**Types:**

* Breathing animation games
* Focus games (tap, match, calm puzzles)

**Tech:**

* HTML5 Canvas / Phaser.js
* Offline support via PWA

---

### 3.6 Emotional Support Tools

**Purpose:** Help users manage emotions

**Includes:**

* Guided breathing (30–60 sec)
* Grounding exercises
* Short motivational prompts

---

### 3.7 Emergency Support Module

**Purpose:** Crisis redirection (NOT diagnosis)

**Features:**

* Country-based helpline listing
* Clear disclaimers
* Quick-access emergency button

---

## 4. Non-Functional Requirements

### 4.1 Security & Privacy

* HTTPS everywhere
* End-to-end encryption for journal entries
* No selling or sharing of user data
* GDPR-aligned data practices

### 4.2 Performance

* Page load < 2 seconds
* Lazy loading of modules
* CDN for static assets

### 4.3 Accessibility

* WCAG 2.1 compliance
* Color-blind friendly palette
* Screen-reader support

---

## 5. Technical Architecture

### 5.1 Frontend

* **Framework:** React.js (Vite)
* **Styling:** Tailwind CSS
* **State Management:** Redux Toolkit / Zustand
* **Routing:** React Router

---

### 5.2 Backend

* **Runtime:** Node.js
* **Framework:** Express.js / NestJS
* **Authentication:** JWT-based anonymous tokens
* **API Style:** REST (GraphQL phase 2)

---

### 5.3 Database

* **Primary DB:** PostgreSQL
* **Real-time Chat:** Firebase / WebSockets
* **Caching:** Redis

**Core Tables:**

* Users
* MoodEntries
* ChatMessages
* Reports
* Achievements

---

### 5.4 AI & Moderation (Phase 2)

* Toxicity detection (Perspective API / custom ML)
* Rule-based sentiment tagging
* Auto-flagging risky language

---

## 6. Deployment & DevOps

* **Hosting:** Vercel (Frontend), AWS / Railway (Backend)
* **CI/CD:** GitHub Actions
* **Monitoring:** Sentry, LogRocket
* **Environment:** Dev / Staging / Production

---

## 7. Development Roadmap

### Phase 1 (MVP – 6–8 weeks)

* Core UI
* Mood check-in
* Growth Map
* Stress games
* Emergency links

### Phase 2

* Chat groups
* Moderation tools
* AI mood assistant

### Phase 3

* Mobile app
* Localization
* Analytics dashboard

---

## 8. Ethical & Legal Considerations

* Clear disclaimers (Not a medical platform)
* Parental consent strategy (region-based)
* Mandatory moderation policies

---

## 9. Success Metrics

* Daily active users
* Mood check-in retention
* Session duration
* Chat toxicity reduction

---

## 10. Vision Statement

MindMaze is not just a product — it is a digital support system built with empathy, responsibility, and trust, designed to grow alongside the emotional needs of today’s youth.
