# Cursor-written To-Do app

## React/Vite, Express, MongoDB To-Do app written entirely by Cursor.

### Run the app

#### Backend (BE)

1. `cd server && npm install`
2. `cp .env.example .env`
3. `npm run dev`

#### Frontend (FE)

1. `cd client && npm install`
2. `npm run dev`

## Prompts used for creating this project:

[The ChatGPT conversation](https://chatgpt.com/share/69c674c3-73a0-8323-b1d5-baa87359b97a) to form the prompts.

1. [Prompt 1](./prompts/Prompt-1.md) - Prompt for a simple to-do app without auth. Used this prompt in Cursor's "Agent" mode and added an instruction "Do not use any agents or skills." at the end to demonstrate pure Agent mode.
2. [Prompt 2](./prompts/Prompt-2.md) - Prompt to add JWT auth & registration, and only show the user their own todos. Used this prompt in Cursor's "Plan" mode and added an instruction "Do not use any agents or skills." at the end to demonstrate pure Plan mode.
3. [Prompt 3](./prompts/Prompt-3.md) - Prompt to add validation, logging, tests. Used this prompt in Cursor's "Agent" mode and added an instruction "Use the /worker-reviewer-iterate workflow for this task" at the end.

