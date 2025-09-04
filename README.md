# Risolto Invoice Flow UI (a tiny Lovable project)

A React + Vite web application for managing and analyzing invoices.

This is a small project I built one weekend when `Lovable` was offering unlimited prompts for the weekend. I took a couple hours in the afternoon to build an `Invoice Application`. I was interviewing the next day for a role with a company that's building a tool to process invoices. They hadn't sent me the demo I requestted, so I wanted to imagine what their tool might look like. 

I collaborated with Claude imagining what type of users the app might have and what the workflow might be. How the database might be designed. 

I also wanted to explore prompt engineering. Between Claude and Lovable, I was able to come up with this app in a couple hours. 

I also used my unlimited prompts that afternoon to sketch out the initial components for my calendar app.

Having never worked with Supabase, this was also a new technology.

The project felt fun and creative and fast: 

**URL**: https://lovable.dev/projects/1687f39e-59fb-4d0e-91a5-2a31c89bedc7

## Features

- Dashboard with analytics cards
- Invoice upload and detail view
- Role-based access (Admin, Team Member, etc.)
- Protected routes (login required)
- Team member management
- Rule configuration (Admin only)
- Responsive UI

## Tech Stack

- [React](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [React Router](https://reactrouter.com/)
- [Lucide Icons](https://lucide.dev/)
- [lovable-tagger](https://www.npmjs.com/package/lovable-tagger)


## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- npm

### Installation

```sh
npm install
```

### Building for Production

```sh
npm run build
```

### Project Structure

```
src/
  components/      # Reusable UI components
  pages/           # Route-based pages
  hooks/           # Custom React hooks
  App.tsx          # Main app component with routing
  main.tsx         # Entry point
```

## Routing

- `/` — Home
- `/dashboard` — Dashboard (protected)
- `/upload` — Upload Invoice (protected)
- `/invoice/:invoiceId` — Invoice Detail (protected)
- `/rules` — Rule Config (Admin only)
- `/teammembers` — Team Members (protected)

## License

MIT




### Ok, here's some of the stuff from Lovable: 

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/1687f39e-59fb-4d0e-91a5-2a31c89bedc7) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/1687f39e-59fb-4d0e-91a5-2a31c89bedc7) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/tips-tricks/custom-domain#step-by-step-guide)
