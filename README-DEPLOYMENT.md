# Deployment Guide - Vercel via GitHub Actions

This repository is configured to automatically deploy to Vercel when code is pushed to the `dev` branch using GitHub Actions.

## Workflow Options

Two workflow files are provided:

1. **`deploy-vercel.yml`** - Uses Vercel CLI directly (more control, explicit steps)
2. **`deploy-vercel-simple.yml`** - Uses `amondnet/vercel-action` (simpler, recommended)

**Recommendation**: Use `deploy-vercel-simple.yml` for easier setup. If you need more control, use `deploy-vercel.yml`.

To use one workflow, you can delete or disable the other in the `.github/workflows/` directory.

## Setup Instructions

### 1. Get Vercel Credentials

You need to obtain the following from your Vercel account:

1. **VERCEL_TOKEN**: 
   - Go to https://vercel.com/account/tokens
   - Create a new token
   - Copy the token value

2. **VERCEL_ORG_ID**:
   - Go to your Vercel project settings
   - Or run: `vercel whoami` and check your account
   - The Org ID is usually found in your project's `.vercel/project.json` file
   - Alternatively, you can find it in the Vercel dashboard under your team/organization settings

3. **VERCEL_PROJECT_ID**:
   - Go to your Vercel project settings
   - The Project ID is found in your project's `.vercel/project.json` file
   - Or in the Vercel dashboard under Project Settings → General

### 2. Add GitHub Secrets

1. Go to your GitHub repository
2. Navigate to **Settings** → **Secrets and variables** → **Actions**
3. Click **New repository secret**
4. Add the following secrets:
   - `VERCEL_TOKEN` - Your Vercel authentication token
   - `VERCEL_ORG_ID` - Your Vercel organization/team ID
   - `VERCEL_PROJECT_ID` - Your Vercel project ID

### 3. Alternative: Quick Setup via Vercel CLI

If you have the Vercel CLI installed locally, you can quickly get your IDs:

```bash
# Install Vercel CLI (if not already installed)
npm i -g vercel

# Login to Vercel
vercel login

# Link your project (if not already linked)
vercel link

# Check your project configuration
cat .vercel/project.json
```

The `project.json` file will contain both `orgId` and `projectId`.

### 4. How It Works

- **Trigger**: The workflow automatically runs when you push code to the `dev` branch
- **Process**: 
  1. Checks out your code
  2. Installs Vercel CLI
  3. Pulls environment variables from Vercel
  4. Builds the project
  5. Deploys to Vercel production

### 5. Manual Deployment

You can also trigger the deployment manually:
- Go to **Actions** tab in GitHub
- Select **Deploy to Vercel** workflow
- Click **Run workflow**

## Troubleshooting

### Common Issues

1. **"VERCEL_TOKEN is not set"**
   - Make sure you've added the `VERCEL_TOKEN` secret in GitHub repository settings

2. **"Project not found"**
   - Verify your `VERCEL_PROJECT_ID` is correct
   - Ensure the project exists in your Vercel account

3. **"Organization not found"**
   - Check your `VERCEL_ORG_ID` matches your Vercel team/organization

4. **Deployment fails**
   - Check the Actions logs for detailed error messages
   - Ensure your Vercel project is properly configured
   - Verify all secrets are correctly set

### Why Deploy Hooks Might Not Work

Deploy hooks can fail for several reasons:
- Network issues
- Vercel service outages
- Incorrect hook URL
- Missing authentication
- Rate limiting

Using GitHub Actions provides:
- ✅ Better error visibility
- ✅ Retry capabilities
- ✅ Integration with your CI/CD pipeline
- ✅ More control over the deployment process

## Support

If you encounter issues:
1. Check the GitHub Actions logs
2. Verify all secrets are correctly configured
3. Ensure your Vercel project is active
4. Check Vercel's status page for service issues

