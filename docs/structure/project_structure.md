# Project Structure Documentation

## Root Directory
- **.cursor/**: Contains configuration and metadata for the Cursor IDE.
- **package-lock.json**: Lockfile for npm dependencies.
- **package.json**: Contains project metadata and dependencies.
- **node_modules/**: Directory for installed npm packages.
- **.next/**: Next.js build output directory.
- **.qodo/**: Likely a custom or third-party directory, purpose unknown without further inspection.
- **components.json**: JSON file, possibly for component configuration or metadata.
- **tailwind.config.js.backup**: Backup of Tailwind CSS configuration.
- **docs/**: Directory for documentation files.
- **app/**: Main source code directory.
- **.DS_Store**: macOS system file for folder attributes.
- **public/**: Directory for static assets.
- **tailwind.config.js**: Tailwind CSS configuration file.
- **.cursorrules**: Contains rules for the Cursor IDE.
- **jsconfig.json**: Configuration file for JavaScript projects.
- **tsconfig.json**: TypeScript configuration file.
- **frontend.md**: Markdown file, possibly for frontend documentation.
- **postcss.config.js**: Configuration for PostCSS.
- **tailwind.config.ts**: TypeScript version of Tailwind CSS configuration.
- **next-env.d.ts**: TypeScript declaration file for Next.js.
- **README.md**: Project's README file.
- **.env.local**: Environment variables file.

## app/ Directory Structure

- **app/**
  - **auth/** - Authentication related pages (login, register, forgot-password, reset-password)
  - **[role]/** - Dynamic route based on user role (admin, doctor, nurse, etc.). The square brackets indicate a dynamic segment in the route that changes based on the user's role
  - **api/** - API route handlers for server-side functionality
  - **components/** - Reusable UI components specific to pages
  - **lib/** - Utility functions, configurations, and shared libraries
    - axios.ts
    - constants.ts
    - utils.ts
  - **hooks/** - Custom React hooks
    - useOnboardingStatus.ts
    - useRole.ts
    - use-toast.ts
    - use-mobile.ts
  - **styles/** - Global styles and CSS modules
  - **types/** - TypeScript type definitions and interfaces
  - **layout.tsx** - Root layout component
  - **page.tsx** - Root page component

Note: The [role] directory uses Next.js dynamic routing to handle different user roles and their respective access levels within the application.
