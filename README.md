<p align="center">
  <img src="https://raw.githubusercontent.com/OpenAgentFlow/OpenAgentFlow/master/docs/assets/oaf-logo.svg" alt="OpenAgentFlow Logo" width="120"/>
</p>

# OpenAgentFlow (`.oaf`) Starter Project

> *What OpenAPI is for REST APIs, **OpenAgentFlow** is for AI agent workflows.*

[![Core Compiler & Spec](https://img.shields.io/badge/Core-OpenAgentFlow-blue.svg?logo=github)](https://github.com/OpenAgentFlow/OpenAgentFlow)
[![Documentation](https://img.shields.io/badge/docs-complete-blue.svg)](https://openagentflow.github.io/OpenAgentFlow/)
[![VS Code Extension](https://img.shields.io/badge/VS%20Code-Syntax%20Support-007ACC.svg?logo=visualstudiocode)](https://marketplace.visualstudio.com/items?itemName=OpenAgentFlow.openagentflow-support)
[![npm](https://img.shields.io/badge/npm-openagentflow-CB3837.svg?logo=npm)](https://www.npmjs.com/package/openagentflow)

Welcome! This template repository lets you instantly build, test, and compile multi-agent workflows using **OpenAgentFlow (`.oaf`)**.

## Quick Start

1. **Clone the Starter Project (or click "Use this template"):**
   ```bash
   git clone https://github.com/OpenAgentFlow/OpenAgentFlow-starter.git my-agents
   cd my-agents
   ```

2. **Install Dependencies & Auto-Setup Environment:**
   Run our automated cross-platform setup script (`setup.js`), which initializes your local Python virtual environment (`venv`), installs LangGraph requirements, and sets up your `.env` file automatically:
   ```bash
   npm install
   npm run setup
   ```

3. **Configure API Keys:**
   Set your keys interactively via the OpenAgentFlow CLI (or edit your `.env` file directly):
   ```bash
   npx openagentflow auth
   ```

4. **Run Pre-built Workflows Live:**
   ```bash
   # Run Customer Support Triage Workflow
   npm run triage

   # Run Software Dev Pipeline
   npm run dev-flow
   ```

5. **Compile to Python LangGraph App:**
   ```bash
   npm run compile-triage
   # Activate venv when running compiled python script directly:
   # Windows PowerShell: .\venv\Scripts\Activate.ps1
   # macOS/Linux: source venv/bin/activate
   python triage_app.py
   ```

## 🐳 Dev Containers & GitHub Codespaces

This repository includes a preconfigured **Development Container** (`.devcontainer/devcontainer.json`).
- **VS Code**: Install the [Dev Containers extension](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers), open the project, and select **Reopen in Container**.
- **GitHub Codespaces**: Open this repo in Codespaces for an instant, zero-setup browser environment with Node 22, Python 3.11, `venv`, and OpenAgentFlow extensions ready out of the box!
