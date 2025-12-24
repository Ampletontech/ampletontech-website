# Ampleton Website

Ampleton® – Comprehensive Solar & Energy Solutions Website

## Deployment to Vercel

This static website can be deployed to Vercel using the following methods:

### Method 1: Using Vercel CLI

1. Install Vercel CLI globally:
   ```bash
   npm install -g vercel
   ```

2. Login to Vercel:
   ```bash
   vercel login
   ```

3. Deploy:
   ```bash
   vercel
   ```

4. For production deployment:
   ```bash
   vercel --prod
   ```

### Method 2: Using Vercel Dashboard

1. Go to [vercel.com](https://vercel.com) and sign in
2. Click "Add New Project"
3. Import your Git repository (GitHub, GitLab, or Bitbucket)
4. Vercel will automatically detect the configuration
5. Click "Deploy"

### Method 3: GitHub Integration

1. Push your code to a GitHub repository
2. Go to Vercel dashboard
3. Click "Add New Project"
4. Select your GitHub repository
5. Vercel will automatically deploy on every push

## Project Structure

```
ampletontech-website/
├── index.html          # Home page
├── about-us.html       # About Us page
├── projects.html       # Projects page
├── blogs.html          # Blogs page
├── career.html         # Careers page
├── contact-us.html     # Contact page
├── assets/
│   └── images/         # All image assets
├── css/                # Stylesheets
├── js/                 # JavaScript files
└── services/           # Service pages
```

## Local Development

To run the site locally:

```bash
python -m http.server 8000
```

Then open `http://localhost:8000` in your browser.

## Configuration Files

- `vercel.json` - Vercel deployment configuration
- `package.json` - Project metadata and scripts
- `.vercelignore` - Files to ignore during deployment

