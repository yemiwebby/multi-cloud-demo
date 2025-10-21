# PassRole Policy Setup for CircleCI User

After creating the `ecsTaskExecutionRole` via CloudFormation, you need to grant your CircleCI user permission to "pass" this role to ECS services.

## Step-by-Step Instructions

### 1. Navigate to IAM User

1. **Log into AWS Console** with admin credentials
2. **Go to IAM service**
3. **Click "Users"** in the left sidebar
4. **Find and click** your CircleCI user (e.g., `circleci-multi-cloud`)

### 2. Create the PassRole Policy

1. **Click "Permissions" tab**
2. **Click "Add permissions"** button
3. **Select "Create inline policy"** (this creates a policy directly attached to the user)
4. **Click "JSON" tab** (switch from Visual editor)
5. **Replace the default policy** with this exact JSON:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": "iam:PassRole",
      "Resource": "arn:aws:iam::*:role/ecsTaskExecutionRole"
    }
  ]
}
```

6. **Click "Next"**
7. **Policy name**: `ECSTaskExecutionPassRole`
8. **Click "Create policy"**

### 3. Alternative Method: Attach Managed Policy

If you prefer to create a standalone policy that can be reused:

1. **Go to IAM** → **Policies**
2. **Click "Create policy"**
3. **JSON tab** → paste the policy above
4. **Policy name**: `ECSTaskExecutionPassRole`
5. **Create policy**
6. **Go back to Users** → your CircleCI user
7. **Permissions tab** → **Add permissions** → **Attach policies directly**
8. **Search for** `ECSTaskExecutionPassRole` → **Attach**

## What This Policy Does

- **Grants permission** for your CI user to tell ECS which IAM role to use
- **Follows principle of least privilege** - only allows passing this specific role
- **Required for ECS Fargate** - without this, tasks cannot start
- **Does NOT grant** full IAM admin privileges (security best practice)

## Verification

After creating the policy, verify it's attached:

1. **Go to your CircleCI user** in IAM
2. **Permissions tab**
3. **Look for** `ECSTaskExecutionPassRole` in the policies list

## Troubleshooting

**Error: "not authorized to perform: iam:PassRole"**

- Make sure the policy is attached to the correct user
- Verify the resource ARN matches: `arn:aws:iam::*:role/ecsTaskExecutionRole`
- Check that the `ecsTaskExecutionRole` exists in IAM

**Policy creation fails**

- Make sure you're logged in with admin credentials
- Check that you have permission to create IAM policies
- Verify the JSON syntax is correct (use the exact format above)

## Next Steps

After completing this setup:

1. **Test the CircleCI pipeline** - ECS tasks should now start successfully
2. **Monitor the deployment** - you should see AWS service URLs in the verification step
3. **Access your application** - both AWS and GCP services should be running

This completes the one-time IAM setup required for the multi-cloud demo tutorial.
