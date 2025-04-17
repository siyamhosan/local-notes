# Notes App

A modern, responsive notes application built with Next.js and TypeScript. This application allows users to create, view, and organize notes with a clean and intuitive interface.

## Features

- 📝 Create and manage notes
- 🏷️ Tag-based organization
- 🌓 Dark/Light mode support
- 📱 Responsive design
- ⚡ Fast and modern UI
- 🔍 Search functionality
- 📅 Date-based organization

## Tech Stack

- [Next.js](https://nextjs.org/) - React framework
- [TypeScript](https://www.typescriptlang.org/) - Type safety
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [shadcn/ui](https://ui.shadcn.com/) - UI components

## Getting Started

### Prerequisites

- Node.js 18.x or later
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/notes.git
cd notes
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

```
notes/
├── src/
│   ├── app/              # Next.js app directory
│   ├── components/       # React components
│   ├── lib/             # Utility functions and types
│   └── styles/          # Global styles
├── public/              # Static assets
└── package.json         # Project dependencies
```

## Key Components

- `NoteCard` - Displays individual note previews
- `Tags` - Reusable component for displaying note tags
- `NoteEditor` - Interface for creating and editing notes

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)
- UI components from [shadcn/ui](https://ui.shadcn.com/)
