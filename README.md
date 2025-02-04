# Healthcare SaaS Platform

A comprehensive healthcare management system with AI integration built using Next.js 14, TypeScript, and modern web technologies.

## Features

- 🔐 Role-based authentication
- 👥 Multi-tenant architecture
- 🏥 Hospital management
- 👨‍⚕️ Professional tools
- 📊 Research capabilities
- 🤖 AI integration
- 📱 Responsive design
- 🎨 Modern UI with NextUI and Tailwind CSS

## Role Categories

- **Superadmin**: Platform management and oversight
- **Hospital**: Facility administration and management
- **Professional**: Medical practitioners (GP, Specialists)
- **Researcher**: Research and analytics tools
- **Patient**: Healthcare consumer interface

## Tech Stack

- **Framework**: Next.js 14
- **Language**: TypeScript
- **Auth**: NextAuth.js
- **Database**: Supabase
- **UI**: NextUI + Tailwind CSS
- **State Management**: React Query
- **Forms**: React Hook Form + Zod
- **Charts**: Recharts

## Getting Started

1. Clone the repository:
```bash
git clone https://github.com/yourusername/healthcare-saas.git
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env.local` file:
```bash
NEXT_PUBLIC_API_URL=http://localhost:8000/api
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_key
NEXTAUTH_SECRET=your_secret
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
src/
├── app/
│   ├── auth/
│   │   ├── login/
│   │   └── register/
│   ├── [role]/
│   │   ├── superadmin/
│   │   ├── hospital/
│   │   ├── professional/
│   │   ├── researcher/
│   │   └── patient/
│   ├── components/
│   │   └── ui/
│   └── shared/
├── lib/
└── types/
```

## AI Integration Points

- Diagnostic assistance
- Treatment planning
- Research insights
- Clinical predictions
- Health coaching
- Symptom checking
- Medication management
- Lifestyle analytics
- Predictive alerts

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details. 