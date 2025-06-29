# PurpleFish TakeHome Assignment

> build a text based interview chatbot using LLMs that does a screening interview with a candidate and handles conditional logic. It should give a natural feeling, as though the human was chatting with another person. You only need to support a single interview script; the script itself doesn’t need to be configurable by the user.

In the spirit of snapping to real world application, I want to expand the problem slightly: the chatbot should also collect and summarize the candidate's responses and record them in a structured format, which allows another actor (such as hiring manager) to quickly review and make a decision to move forward with the candidate

## How to run

The project can be spin up in a local environment through Makefile and npm:

1. Create the `.env` file by copying `.env.example` and fill in the required values.
2. Install dependencies: `make install`
3. Start the server: `make dev`
4. UI Entrypoint will be available at http://localhost:3000

## Troubleshoot

PocketBase might have issue running as exeuctable on M1 mac due to quarantine. To resolve this, you can try the following steps:

1. Open Terminal and navigate to the directory where PocketBase is installed.
2. Run the following command to disable quarantine for the PocketBase executable:

   ```bash
   xattr -d com.apple.quarantine pocketbase
   ```

3. Run PocketBase again using the executable.

## Architecture

### Services

- Agent (Core): The core service that will connect to LLM and LLM provider, owning the conversation loop flow. The agent will also have some built-in capabilities such as memory (remember the conversation and session), tool usage (to grab external resources, an example for this use case would be to get the a set of matching job to the candidate).
- Persist store (Backend): A backend service that persist/managed structured data, user authentication + authorization
- User Interface (Frontend): An web application that allows both the candidate to interact with the chatbot and for the hiring manager to review the candidate's responses.

### Architectural Decision

#### Agent Core using Mastra

Mastra provides a robust framework for building LLM-powered agents with built-in conversation management, memory persistence, and tool integration capabilities. This allows us to focus on the interview logic and flow rather than implementing low-level LLM orchestration from scratch. Key benefits include:

- **Conversation Memory**: Automatic session and context management across interview interactions
- **Tool Integration**: Easy extensibility for future features like job matching or skill assessment
- **LLM Provider Abstraction**: Flexibility to switch between different LLM providers (OpenAI, Anthropic, etc.)
- **Structured Output**: Built-in support for generating structured candidate summaries

#### Backend leverage Pocketbase

PocketBase serves as our lightweight, self-contained backend solution that handles data persistence, authentication, and API management without the complexity of a full backend framework. This choice provides:

- **Rapid Development**: Built-in admin UI, authentication, and RESTful APIs out of the box
- **Schema Management**: Easy database schema definition and migration capabilities
- **Real-time Updates**: WebSocket support for live interview session monitoring
- **File Storage**: Built-in file handling for potential resume uploads or interview recordings
- **Minimal Deployment**: Single binary deployment with embedded SQLite database

#### Frontend picking Next.js

Next.js provides a full-stack React framework that enables both the candidate interview interface and hiring manager review dashboard within a single application. Key advantages include:

- **Server-Side Rendering**: Improved performance and SEO for the application
- **API Routes**: Built-in API layer to interface with PocketBase and Mastra agent
- **Real-time Communication**: Easy WebSocket integration for live chat functionality
- **Component Reusability**: Shared UI components between candidate and hiring manager interfaces
- **TypeScript Support**: Type safety across the entire frontend application
- **Deployment Flexibility**: Easy deployment to Vercel, Netlify, or self-hosted environments
