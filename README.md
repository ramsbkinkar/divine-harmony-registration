# Divine Harmony Website Deployment

This repository contains Terraform configurations to deploy the Divine Harmony website to AWS using S3 and CloudFront, staying within the AWS free tier limits.

## Prerequisites

1. [AWS Account](https://aws.amazon.com) with free tier access
2. [Terraform](https://www.terraform.io/downloads.html) installed (version >= 1.2.0)
3. AWS CLI configured with your credentials

## Configuration

1. Configure AWS credentials:
   ```bash
   aws configure
   ```
   Enter your AWS Access Key ID and Secret Access Key

## Deployment Steps

1. Initialize Terraform:
   ```bash
   terraform init
   ```

2. Review the deployment plan:
   ```bash
   terraform plan
   ```

3. Apply the configuration:
   ```bash
   terraform apply
   ```

4. After successful deployment, you'll see two outputs:
   - `website_url`: The CloudFront URL where your website is accessible
   - `s3_bucket_name`: The name of the S3 bucket storing your website files

## Free Tier Usage

This deployment is designed to stay within AWS free tier limits:

- S3:
  - Storage: ~0.5MB (Free tier: 5GB)
  - GET requests: Varies with traffic (Free tier: 20,000/month)
  - PUT requests: Only during updates (Free tier: 2,000/month)

- CloudFront:
  - Data transfer: Varies with traffic (Free tier: 1TB/month)
  - HTTPS requests: Varies with traffic (Free tier: 10M/month)
  - SSL certificate: Free with CloudFront

## Cleanup

To avoid any potential future charges, remove all resources when no longer needed:

```bash
terraform destroy
```

## Important Notes

1. The S3 bucket name is automatically generated to ensure uniqueness
2. CloudFront distribution takes ~15 minutes to deploy
3. Website is served over HTTPS using CloudFront's default certificate
4. Only North America and Europe CloudFront endpoints are used to minimize costs 