# GitHub Pages Deployment Guide

This guide provides step-by-step instructions for deploying the Option Pricing app to GitHub Pages using the pre-configured GitHub Actions workflow.

## What's Already Set Up

The repository already includes the following GitHub Pages deployment configurations:

1. **GitHub Actions Workflow** (`.github/workflows/deploy.yml`)
   - Automatically deploys the app to GitHub Pages when changes are pushed to the `develop` branch
   - Handles setup, installation of dependencies, and deployment

2. **`.nojekyll` file**
   - Prevents GitHub Pages from processing the site with Jekyll
   - Ensures all files (including those starting with underscores) are properly served

## Deployment Steps

### 1. Push Your Changes to GitHub

```bash
# Add the new GitHub Actions workflow and .nojekyll file
git add .github/workflows/deploy.yml .nojekyll

# Commit the changes
git commit -m "Add GitHub Pages deployment configuration"

# Push to your repository
git push origin develop
```

### 2. Configure GitHub Pages in Repository Settings

1. Go to your GitHub repository (`https://github.com/PCSchmidt/option_pricing_app`)
2. Navigate to **Settings** → **Pages**
3. Under **Source**, select **GitHub Actions**
4. GitHub will display a message confirming that your site is being deployed via GitHub Actions

### 3. Wait for Deployment to Complete

1. Go to the **Actions** tab in your GitHub repository
2. You should see the workflow running
3. Once completed, GitHub will provide a URL to your deployed site (typically `https://pcschmidt.github.io/option_pricing_app/`)

### 4. Verify the Deployment

1. Visit the provided GitHub Pages URL
2. Ensure the app loads correctly
3. Test the functionality (option calculations, chart rendering, etc.)
4. Verify that the styling is applied properly

## Setting Up a Custom Domain (Optional)

If you want to use a custom domain for your app:

1. In your GitHub repository, go to **Settings** → **Pages**
2. In the **Custom domain** section, enter your domain name
3. Click **Save**
4. Configure your domain's DNS settings:
   - For an apex domain (e.g., `example.com`), create an `A` record pointing to GitHub Pages IP addresses
   - For a subdomain (e.g., `app.example.com`), create a `CNAME` record pointing to `pcschmidt.github.io`
5. Wait for DNS propagation (can take up to 24 hours)
6. GitHub will verify your domain and enable HTTPS automatically

## Triggering Manual Deployment

If you need to manually trigger a deployment:

1. Go to the **Actions** tab in your GitHub repository
2. Select the **Deploy to GitHub Pages** workflow
3. Click **Run workflow**
4. Select the branch (`develop`)
5. Click **Run workflow** to start the deployment

## Troubleshooting Common Issues

### Site Not Deploying
- Check the Actions tab for workflow run errors
- Ensure the repository has proper permissions set for GitHub Actions

### Missing Styles or Scripts
- Verify that paths to resources are relative, not absolute
- Check browser console for 404 errors

### Custom Domain Not Working
- Confirm DNS settings have properly propagated (use `dig` or online DNS checkers)
- Ensure the custom domain is properly configured in repository settings

## Making Future Updates

For future updates to your app:

1. Make changes to your code locally
2. Test thoroughly using the local development server (`http-server`)
3. Commit and push changes to the `develop` branch
4. GitHub Actions will automatically deploy the updates to GitHub Pages
5. Verify the changes on the live site

## Next Steps for Subscription Features

When you're ready to implement subscription features:

1. Consider integrating Firebase for authentication and payment processing
2. Update this deployment to include the necessary Firebase configuration
3. Test thoroughly before moving to a paid production environment
