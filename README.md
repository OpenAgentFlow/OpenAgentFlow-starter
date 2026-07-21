# OpenAgentFlow (`.oaf`) Starter Project

Welcome! This template repository lets you instantly build, test, and compile multi-agent workflows using **OpenAgentFlow (`.oaf`)**.

## Quick Start

1. **Install Dependencies & Auto-Setup Environment:**
   Run our automated cross-platform setup script (`setup.js`), which initializes your local Python virtual environment (`venv`), installs LangGraph requirements, and sets up your `.env` file automatically:
   ```bash
   npm install
   npm run setup
   ```

2. **Configure API Keys:**
   Set your keys interactively via the OpenAgentFlow CLI (or edit your `.env` file directly):
   ```bash
   npx openagentflow auth
   ```

3. **Run Pre-built Workflows Live:**
   ```bash
   # Run Customer Support Triage Workflow
   npm run triage

   # Run Software Dev Pipeline
   npm run dev-flow
   ```

4. **Compile to Python LangGraph App:**
   ```bash
   npm run compile-triage
   # Activate venv when running compiled python script directly:
   # Windows PowerShell: .\venv\Scripts\Activate.ps1
   # macOS/Linux: source venv/bin/activate
   python triage_app.py
   ```
