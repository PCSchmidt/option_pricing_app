# Option Pricing App - Deployment Guide

This guide provides step-by-step instructions for deploying the Option Pricing app to AWS Amplify and setting up the infrastructure for cross-platform compatibility.

## Pre-requisites
- AWS Account (✓ already established)
- Node.js and npm (✓ installed)
- AWS Amplify CLI (being installed)
- Git repository for your project

## Deployment Steps

### 1. Initialize the Project for Amplify

Once the Amplify CLI installation is complete, initialize your project:

```bash
# Navigate to your project directory
cd option-pricing-app

# Initialize Git repository (if not already done)
git init
git add .
git commit -m "Initial commit before Amplify deployment"

# Initialize Amplify
amplify init
```

During the initialization, you'll be prompted to:
- Enter a name for the project (e.g., "optionpricingapp")
- Select your default editor
- Choose your authentication method (AWS profile recommended)

### 2. Add Hosting to the Project

```bash
# Add hosting capability
amplify add hosting
```

Select "Amazon CloudFront and S3" for full-stack hosting with global CDN distribution.

### 3. Set Up Authentication (Optional for Initial Deployment)

If you want to implement user authentication and subscription functionality immediately:

```bash
# Add authentication
amplify add auth
```

Choose the default configuration for a standard authentication flow with email and password.

### 4. Deploy the Application

```bash
# Publish the application to AWS
amplify publish
```

This command will:
1. Create the necessary cloud resources
2. Build your application
3. Deploy it to the hosting infrastructure
4. Provide you with a URL for your deployed application

### 5. Set Up Custom Domain (Optional)

If you have a custom domain:

```bash
# Add custom domain
amplify update hosting
```

Follow the prompts to configure your domain settings. You'll need to verify domain ownership through DNS validation.

## Project Structure After Deployment

After deploying, your project will have additional configuration files:

```
option-pricing-app/
  ├── amplify/                  # Amplify configuration directory
  │   ├── backend/              # Backend configuration
  │   ├── #current-cloud-backend/ # Current deployed backend
  │   └── team-provider-info.json # Environment config
  ├── src/                      # Your application source code
  ├── .gitignore                # Updated to ignore Amplify specific files
  └── amplify.json              # Amplify project configuration
```

## Implementing Subscription Features

After initial deployment, if you want to implement subscription functionality:

1. Add an API layer:
   ```bash
   amplify add api
   ```
   Choose GraphQL API for subscription management.

2. Create subscription models in the GraphQL schema:
   ```graphql
   type Subscription @model {
     id: ID!
     userId: ID!
     tier: String!
     startDate: AWSDateTime!
     endDate: AWSDateTime
     status: String!
   }
   ```

3. Add storage for user data:
   ```bash
   amplify add storage
   ```
   Choose DynamoDB for storing user calculations and preferences.

4. Update and deploy the changes:
   ```bash
   amplify push
   ```

## Monitoring Your Deployment

1. Access the Amplify Console:
   ```bash
   amplify console
   ```

2. This opens the AWS Amplify Console where you can:
   - Monitor deployments
   - View analytics
   - Configure CI/CD
   - Set up branch-based environments
   - View logs and troubleshoot issues

## Next Steps After Deployment

1. **Set up analytics** to track user behavior:
   ```bash
   amplify add analytics
   ```

2. **Implement payment processing**:
   - Create a Stripe account
   - Set up AWS Lambda functions for payment processing
   - Connect these to your authentication system

3. **Configure CI/CD**:
   - Connect your GitHub repository to Amplify Console
   - Set up automated deployments for different branches

4. **Begin mobile app development** using the Capacitor framework as outlined in the MobileAppPlan.md document.

## Troubleshooting Common Issues

### Deployment Failures
- Check CloudFormation logs in AWS Console
- Ensure your AWS account has necessary permissions
- Verify your application doesn't exceed Amplify quotas

### Authentication Issues
- Confirm Cognito User Pool settings
- Test auth flow with Amplify console

### Performance Concerns
- Enable CloudFront caching
- Optimize asset sizes
- Consider implementing server-side rendering

## Resources

- [AWS Amplify Documentation](https://docs.amplify.aws/)
- [CloudFront Distribution Settings](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/distribution-web-values-specify.html)
- [Stripe Payment Processing](https://stripe.com/docs)
- [Capacitor Framework](https://capacitorjs.com/docs)
