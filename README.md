# PurpleFish TakeHome Assignment

> build a text based interview chatbot using LLMs that does a screening interview with a candidate and handles conditional logic. It should give a natural feeling, as though the human was chatting with another person. You only need to support a single interview script; the script itself doesn’t need to be configurable by the user.

In the spirit of snapping to real world application, I want to expand the problem slightly: the chatbot should also collect and summarize the candidate's responses and record them in a structured format, which allows another actor (such as hiring manager) to quickly review and make a decision to move forward with the candidate

## Architecture

### Services

- Agent (Core): The core service that will connect to LLM and LLM provider, owning the conversation loop flow. The agent will also have some built-in capabilities such as memory (remember the conversation and session), tool usage (to grab external resources, an example for this use case would be to get the a set of matching job to the candidate).
- Persist store (Backend): A backend service that persist/managed structured data, user authentication + authorization
- User Interface (Frontend): An web application that allows both the candidate to interact with the chatbot and for the hiring manager to review the candidate's responses.

### User flow

...

### Architectural Decisionn

#### Agent Core using Mastra

#### Backend leverage Pocketbase

#### Frontend will be a simple nextjs application


## How to run
