# 🧪 GitHub MCP Tools E2E Testing Suite

## 📋 **Setup Instructions**

### **1. Prerequisites**

Before running the tests, ensure you have:

- **Node.js** (v16+ recommended)
- **GitHub Account** with appropriate permissions
- **Test Repository** that you own (will be modified during tests)
- **GitHub Personal Access Token** with required scopes

### **2. Required GitHub Token Scopes**

Create a GitHub Personal Access Token with these scopes:

```
✅ repo                    - Full control of private repositories
✅ public_repo             - Access public repositories  
✅ read:user               - Read user profile data
✅ user                    - Update user data
✅ user:email              - Access user email addresses
✅ notifications           - Access notifications
✅ gist                    - Create gists
✅ workflow                - Update GitHub Action workflows
✅ read:org                - Read organization membership
✅ write:org               - Write organization data
✅ read:discussion         - Read team discussions
✅ write:discussion        - Write team discussions
```

### **3. Installation**

```bash
# Install dependencies
npm install

# Copy environment template
cp env.example .env

# Edit .env with your configuration
nano .env
```

### **4. Environment Configuration**

Edit `.env` file with your details:

```bash
# Required Configuration
GITHUB_TOKEN=ghp_your_token_here
TEST_REPO_OWNER=your-github-username
TEST_REPO_NAME=your-test-repo
TEST_ORG_NAME=your-organization

# Optional but recommended
TEST_USERNAME=collaborator-username
ENABLE_CLEANUP=true
```

### **5. Test Repository Setup**

**⚠️ IMPORTANT:** Use a dedicated test repository!

```bash
# Create a test repository (or use existing)
# The tests will create/modify/delete:
# - Issues and Pull Requests
# - Files and branches
# - Labels and milestones
# - Workflows and Actions
# - Gists and discussions
```

### **6. Running Tests**

```bash
# Validate environment setup
npm run validate-env

# Run all tests
npm test

# Run specific test category
npm run test:category pull-requests

# Run with coverage
npm run test:coverage

# Watch mode for development
npm run test:watch

# Run specific test
npm run test:specific "should create pull request"
```

### **7. Test Categories**

The test suite covers all 99 GitHub MCP Tools:

| Category | Tests | Description |
|----------|-------|-------------|
| **Pull Requests** | 13 | CRUD, merge, review, status |
| **Issues** | 15 | Management, assignees, labels |
| **Search** | 6 | Code, repos, users, issues |
| **Workflows** | 12 | Actions, runs, jobs, artifacts |
| **Security** | 8 | Scanning, alerts, advisories |
| **Files** | 4 | Content CRUD operations |
| **Repositories** | 8 | Creation, forking, collaboration |
| **Notifications** | 7 | Management, subscriptions |
| **Gists** | 3 | Create, update, list |
| **Discussions** | 4 | CRUD, comments, categories |
| **Projects** | 6 | Management, fields |
| **Users** | 8 | Profiles, following, teams |
| **Organizations** | 5 | Members, projects, security |

### **8. Safety Features**

- **Rate Limiting**: Respects GitHub API limits
- **Cleanup**: Automatically removes test data
- **Isolation**: Tests don't interfere with each other
- **Validation**: Validates environment before running
- **Logging**: Comprehensive test logging

### **9. Troubleshooting**

```bash
# Check token permissions
npm run validate-env

# Clean up test data manually
npm run cleanup

# View detailed logs
tail -f tests.log
```

### **10. Advanced Configuration**

For advanced testing scenarios, configure:

- **Webhooks**: For webhook-related tests
- **GitHub Apps**: For app-specific functionality
- **Organization Tests**: Requires admin permissions
- **Enterprise Features**: May require GitHub Enterprise

## 🔍 **Test Structure**

```
tests/
├── pull-requests/     # PR management tests
├── issues/           # Issue management tests  
├── search/           # Search functionality tests
├── workflows/        # GitHub Actions tests
├── security/         # Security scanning tests
├── files/            # File operations tests
├── repositories/     # Repository management tests
├── notifications/    # Notification tests
├── gists/           # Gist management tests
├── discussions/     # Discussion tests
├── projects/        # Project management tests
├── users/           # User management tests
└── organizations/   # Organization tests
```

## ⚠️ **Important Notes**

1. **Test Repository**: Always use a dedicated test repository
2. **Rate Limits**: Tests respect GitHub API rate limits
3. **Permissions**: Some tests require specific permissions
4. **Cleanup**: Tests clean up after themselves
5. **Cost**: Workflow tests may consume GitHub Actions minutes
6. **Time**: Full test suite takes 15-30 minutes to complete

## 🎯 **Quick Start**

```bash
# 1. Clone and install
git clone <repo> && cd <repo> && npm install

# 2. Configure environment  
cp env.example .env && nano .env

# 3. Validate setup
npm run validate-env

# 4. Run tests
npm test
```

Happy testing! 🚀
