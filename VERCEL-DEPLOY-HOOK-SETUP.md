# Vercel Deploy Hook Setup Guide

This guide will help you set up Vercel deploy hooks so your project can be deployed automatically via webhooks.

## Understanding Vercel Deploy Hooks

Vercel deploy hooks are webhook URLs that trigger deployments when called. There are two ways to use them:

1. **Native Vercel Deploy Hooks** (Recommended) - Direct integration with Vercel
2. **GitHub Actions Webhook** (Backup) - Trigger GitHub Actions via webhook

## Method 1: Native Vercel Deploy Hooks (Recommended)

### Step 1: Ensure Project is Connected to Git

1. Go to your Vercel dashboard: https://vercel.com/dashboard
2. Select your project
3. Go to **Settings** → **Git**
4. Ensure your repository is connected (GitHub, GitLab, or Bitbucket)
5. If not connected, click **Connect Git Repository** and follow the prompts

### Step 2: Create Deploy Hook

1. In your Vercel project, go to **Settings** → **Git**
2. Scroll down to **Deploy Hooks** section
3. Click **Create Hook**
4. Configure the hook:
   - **Name**: e.g., "Deploy Dev Branch"
   - **Branch**: Select `dev` (or the branch you want to deploy)
   - **Production Deployment**: Check if you want production, uncheck for preview
5. Click **Create Hook**
6. Copy the generated webhook URL (looks like: `https://api.vercel.com/v1/integrations/deploy/...`)

### Step 3: Test the Deploy Hook

You can test the hook by making a POST request:

```bash
curl -X POST https://api.vercel.com/v1/integrations/deploy/YOUR_HOOK_ID
```

Or use any HTTP client like Postman, or trigger it from another service.

### Step 4: Use Deploy Hook

You can trigger deployments by:
- Calling the webhook URL via HTTP POST
- Integrating it with other services
- Using it in CI/CD pipelines
- Setting it up as a GitHub webhook (see Method 2)

## Method 2: GitHub Actions Webhook (Alternative)

If you prefer to use GitHub Actions triggered by webhooks:

### Step 1: Get GitHub Personal Access Token

1. Go to GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)
2. Create a new token with `repo` scope
3. Copy the token

### Step 2: Set Up GitHub Webhook

1. Go to your GitHub repository
2. Navigate to **Settings** → **Webhooks**
3. Click **Add webhook**
4. Configure:
   - **Payload URL**: Your Vercel deploy hook URL
   - **Content type**: `application/json`
   - **Events**: Select "Just the push event" or customize
   - **Active**: Checked
5. Click **Add webhook**

### Step 3: Use Repository Dispatch (Advanced)

You can also trigger the GitHub Actions workflow directly:

```bash
curl -X POST \
  -H "Accept: application/vnd.github.v3+json" \
  -H "Authorization: token YOUR_GITHUB_TOKEN" \
  https://api.github.com/repos/OWNER/REPO/dispatches \
  -d '{"event_type":"vercel-deploy","client_payload":{"ref":"dev"}}'
```

## Troubleshooting Deploy Hooks

### Issue: Deploy hook not triggering deployments

**Solutions:**
1. **Check Git Connection**: Ensure your Vercel project is properly connected to your Git repository
2. **Verify Branch**: Make sure the branch specified in the hook exists and has commits
3. **Check Vercel Logs**: Go to Vercel dashboard → Deployments to see if deployment was triggered
4. **Verify Hook URL**: Ensure the webhook URL is correct and accessible
5. **Check Build Settings**: Verify `vercel.json` doesn't have conflicting build commands

### Issue: Deployment fails after hook trigger

**Solutions:**
1. **Check Build Logs**: Review deployment logs in Vercel dashboard
2. **Verify vercel.json**: Ensure configuration is correct (we've optimized it for static sites)
3. **Check File Structure**: Ensure `index.html` exists in the root
4. **Review Dependencies**: If you add build steps later, ensure all dependencies are available

### Issue: Wrong branch being deployed

**Solutions:**
1. **Check Hook Configuration**: Verify the branch specified in the deploy hook
2. **Update Hook**: Recreate the hook with the correct branch
3. **Use Branch Parameter**: Some hooks support branch parameters in the URL

## Current Configuration

Your project is configured as:
- **Framework**: Static HTML (no build required)
- **Output Directory**: `.` (root)
- **Build Command**: `null` (no build needed)
- **Headers**: Optimized caching for assets, CSS, and JS files

## Testing Your Setup

1. **Test Native Hook**:
   ```bash
   curl -X POST YOUR_VERCEL_DEPLOY_HOOK_URL
   ```

2. **Check Deployment**:
   - Go to Vercel dashboard
   - Check the Deployments tab
   - You should see a new deployment triggered

3. **Verify Site**:
   - Once deployed, check your Vercel URL
   - Ensure all assets load correctly

## Best Practices

1. **Separate Hooks**: Create separate hooks for dev and production branches
2. **Monitor Deployments**: Set up notifications for deployment status
3. **Use Preview Deployments**: Test with preview deployments before production
4. **Version Control**: Keep `vercel.json` in your repository
5. **Security**: Don't expose deploy hook URLs publicly

## Additional Resources

- [Vercel Deploy Hooks Documentation](https://vercel.com/docs/concepts/git/deploy-hooks)
- [Vercel CLI Documentation](https://vercel.com/docs/cli)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)

## Need Help?

If deploy hooks still don't work:
1. Check Vercel project settings
2. Verify Git repository connection
3. Review Vercel deployment logs
4. Ensure your `vercel.json` is valid (we've optimized it)
5. Contact Vercel support if issues persist

