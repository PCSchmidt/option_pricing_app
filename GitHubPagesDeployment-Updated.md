# GitHub Pages Deployment Guide (Updated)

This guide provides updated instructions for deploying the Option Pricing app to GitHub Pages using GitHub Actions workflows.

## Configuring GitHub Pages with GitHub Actions

Recent GitHub UI changes have modified how GitHub Pages deployment with GitHub Actions is configured. Here's the updated process:

### 1. Navigate to the GitHub Pages Settings

1. Go to your GitHub repository: `https://github.com/PCSchmidt/option_pricing_app`
2. Click on the **Settings** tab (near the top of the page)
3. In the left sidebar, click on **Pages**

### 2. Configure Pages Source

In the GitHub Pages settings page:

1. Under the **Build and deployment** section, you should see:
   - **Source**: This should be set to "GitHub Actions" (not "Deploy from a branch" which was the older method)
   - If you don't see this option immediately, check if there's a dropdown to select "GitHub Actions"

2. If GitHub has already detected your workflow file:
   - You may see a message saying "GitHub Pages is being deployed via GitHub Actions workflow"
   - This means GitHub has automatically detected your `.github/workflows/deploy.yml` file

3. If you don't see this option:
   - Make sure your workflow file (`.github/workflows/deploy.yml`) has been pushed to the repository
   - You may need to manually trigger the workflow (see below)

### 3. Manually Triggering the Workflow (If Needed)

If GitHub hasn't automatically detected your workflow:

1. Go to the **Actions** tab in your repository
2. You should see your workflow listed ("Deploy to GitHub Pages")
3. Click on it, then click the **Run workflow** button
4. Select the **develop** branch
5. Click **Run workflow**

### 4. Checking Deployment Status

1. After triggering the workflow:
   - Go to the **Actions** tab to see the workflow running
   - Wait for it to complete (it should show a green checkmark when successful)

2. Once completed:
   - Return to **Settings** → **Pages**
   - You should now see a message indicating your site is published
   - GitHub will provide the URL (typically `https://pcschmidt.github.io/option_pricing_app/`)

## Troubleshooting

If you don't see GitHub Actions as an option for Pages deployment:

1. **Check workflow file permissions**:
   - Ensure your workflow file includes the `permissions: contents: write` section

2. **Verify repository settings**:
   - Under **Settings** → **Actions** → **General**
   - Make sure "Read and write permissions" is enabled under "Workflow permissions"

3. **Check for workflow errors**:
   - Go to the **Actions** tab and check if there are any failed workflow runs
   - Review the logs for any error messages

4. **Try creating a gh-pages branch manually**:
   ```bash
   git checkout -b gh-pages
   git push origin gh-pages
   ```
   - Then in GitHub Pages settings, temporarily select "Deploy from a branch" and choose "gh-pages"
   - Once that's working, switch back to GitHub Actions

## Using the Deployed Site

Once deployed, your site will be available at:
`https://pcschmidt.github.io/option_pricing_app/`

You can verify the site is working correctly by:
1. Checking that all assets load properly (no 404 errors in the browser console)
2. Testing the option pricing calculator functionality
3. Confirming that charts and visualizations display correctly

## Next Steps for Development

Once your site is successfully deployed to GitHub Pages:

1. Continue local development with:
   ```bash
   cd "c:/Users/pchri/Documents/Experiments/option-pricing-app"
   npx http-server
   ```

2. Make changes, test locally, then commit and push to GitHub:
   ```bash
   git add .
   git commit -m "Your commit message"
   git push origin develop
   ```

3. GitHub Actions will automatically deploy your changes

## Adding Firebase Authentication (Future Step)

When you're ready to implement user authentication:

1. Create a Firebase project
2. Add the Firebase SDK to your project
3. Configure authentication in your GitHub Pages-hosted app

This approach allows you to build a fully functional application with user management while still hosting for free on GitHub Pages.
