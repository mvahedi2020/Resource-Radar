<div align="center">
  <h1>Resource Radar</h1>
  <p><strong>Program Capacity & Allocation Forecaster</strong></p>
</div>

<br />

## 📖 Overview
Resource Radar is a visual forecasting tool that maps team availability against incoming project scopes. It factors in cross-functional dependencies, PTO, and historical velocity to predict when a team will hit capacity limits or create bottlenecks.

## 💻 Local Development

Follow these instructions to run the project locally on your machine. We ensure no security data is exposed by using an example environment file.

### Prerequisites
- Node.js 18+ installed

### Setup Steps

1. **Clone the repository:**
   ```bash
   git clone https://github.com/mvahedi2020/Resource-Radar.git
   cd "Resource Radar"
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Environment Setup:**
   Copy the example environment file to create your local environment variables. Never commit your `.env.local` file!
   ```bash
   cp .env.example .env.local
   ```

4. **Start the development server:**
   ```bash
   npm run dev
   ```

5. **View the Application:**
   Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

## ✨ Features
- PTO and Holiday Integration
- Capacity vs Demand Visualization
- Cross-Functional Dependency Mapping
- Historical Velocity Tracking
