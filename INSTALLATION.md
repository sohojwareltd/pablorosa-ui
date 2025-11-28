# Installation Guide

This guide will help you install and set up the template on your local machine or server.

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** 18.0 or higher ([Download](https://nodejs.org/))
- **npm** (comes with Node.js) or **yarn**
- A code editor (VS Code recommended)
- Git (optional, for version control)

## Step-by-Step Installation

### 1. Extract the Template

1. Download the template from ThemeForest
2. Extract the ZIP file to your desired location
3. Open the extracted folder in your terminal/command prompt

### 2. Install Dependencies

Navigate to the project directory and install all required packages:

```bash
npm install
```

or if you're using yarn:

```bash
yarn install
```

This will install all dependencies listed in `package.json`, including:
- Next.js
- React
- Tailwind CSS
- Framer Motion
- And other required packages

### 3. Run the Development Server

Start the development server to preview the template:

```bash
npm run dev
```

or

```bash
yarn dev
```

The template will be available at `http://localhost:3000`

### 4. Build for Production

When you're ready to deploy, create a production build:

```bash
npm run build
```

Then start the production server:

```bash
npm start
```

## Troubleshooting

### SWC Binding Errors (Windows)

If you encounter SWC binding errors on Windows, use the webpack fallback:

```bash
npm run dev:webpack
```

### Port Already in Use

If port 3000 is already in use, Next.js will automatically use the next available port (3001, 3002, etc.).

### Node Version Issues

Ensure you're using Node.js 18 or higher. Check your version:

```bash
node --version
```

If you need to update Node.js, visit [nodejs.org](https://nodejs.org/)

## Next Steps

After installation:

1. Review the [Customization Guide](CUSTOMIZATION.md) to personalize the template
2. Replace placeholder content with your own
3. Configure your deployment settings
4. Test all features and sections

## Support

If you encounter any issues during installation, please refer to the documentation or contact support.


