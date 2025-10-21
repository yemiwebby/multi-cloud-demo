# AWS Setup Instructions

## Prerequisites for ECS Deployment

Before running the CircleCI pipeline, you need to create an IAM role that allows ECS to manage your containers. This is a one-time setup step.

### Step 1: Create the ECS Task Execution Role

The IAM user you created for programmatic access doesn't have permission to create IAM roles (this is a security best practice). You'll need to use an account with administrator privileges.

**Option A: Using AWS Console (Recommended for tutorials)**

1. Log into AWS Console with your **root account** or an **IAM user with admin privileges**
2. Navigate to **CloudFormation** service
3. Click **Create Stack** → **With new resources**
4. Upload the file `aws/ecs-task-execution-role.yml` from this repository
5. Stack name: `multi-cloud-demo-ecs-role`
6. Click **Next** → **Next** → **I acknowledge that AWS CloudFormation might create IAM resources** → **Submit**
7. Wait for status to show **CREATE_COMPLETE**

**Option B: Using AWS CLI (if you have admin CLI access)**

```bash
# From the project root directory
aws cloudformation deploy \
  --template-file aws/ecs-task-execution-role.yml \
  --stack-name multi-cloud-demo-ecs-role \
  --capabilities CAPABILITY_NAMED_IAM \
  --region us-east-1
```

### Step 2: Grant PassRole Permission to Your CI User

After creating the role, you need to allow your programmatic access user to "pass" this role to ECS. 

**📋 Detailed Instructions:** See [`passrole-setup.md`](passrole-setup.md) for complete step-by-step guide with screenshots and troubleshooting.

**Quick Summary:**
1. Go to **IAM** → **Users** → find your programmatic access user  
2. **Add permissions** → **Create inline policy**
3. Use the PassRole JSON policy for `ecsTaskExecutionRole`
4. Name it `ECSTaskExecutionPassRole`

### Step 3: Verify Setup

After completing steps 1 and 2, verify the role exists:

```bash
aws iam get-role --role-name ecsTaskExecutionRole
```

### Step 4: Run the Pipeline

Now you can trigger your CircleCI pipeline. The ECS tasks should start successfully and you'll see the AWS service URL in the verification step.

## Troubleshooting

**Error: "ECS was unable to assume the role"**

- Make sure you completed Step 1 (role creation)
- Verify the role exists with the command in Step 3

**Error: "not authorized to perform: iam:PassRole"**

- Make sure you completed Step 2 (PassRole permission)
- Verify the policy is attached to your programmatic access user

**Tasks still not starting after 10 minutes**

- Check the ECS service events in AWS Console
- Verify your ECR repository exists and contains images
- Check that your security groups allow the necessary traffic

## Why This Setup is Required

- **ECS Task Execution Role**: Allows ECS to pull container images from ECR and write logs to CloudWatch on behalf of your tasks
- **PassRole Permission**: Allows your CI/CD pipeline to tell ECS which role to use, without giving the CI user full admin rights
- **Separation of Concerns**: Admin creates roles once, CI users can deploy using those roles (principle of least privilege)

This is AWS security best practice - the same setup you'd use in production environments.
