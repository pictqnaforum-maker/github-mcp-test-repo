# 🚀 **GitHub MCP Tools E2E Testing - Complete Setup Guide**

## 📋 **Required Setup Before Testing**

### **1. 🔐 GitHub Personal Access Token Setup**

**Create a GitHub Personal Access Token with these exact scopes:**

```bash
# Navigate to: GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)
# Click "Generate new token (classic)"
# Set expiration and select these scopes:

✅ repo                    # Full control of private repositories
✅ public_repo             # Access public repositories  
✅ read:user               # Read user profile data
✅ user                    # Update user data
✅ user:email              # Access user email addresses
✅ notifications           # Access notifications
✅ gist                    # Create gists
✅ workflow                # Update GitHub Action workflows
✅ read:org                # Read organization membership
✅ write:org               # Write organization data  
✅ read:discussion         # Read team discussions
✅ write:discussion        # Write team discussions
```

### **2. 📁 Test Repository Setup**

**⚠️ CRITICAL: Use a dedicated test repository!**

```bash
# Option A: Create a new test repository
gh repo create github-mcp-test-repo --public --clone
cd github-mcp-test-repo

# Add initial files
echo "# GitHub MCP Tools Test Repository" > README.md
echo "console.log('Hello World');" > main.js
git add . && git commit -m "Initial commit" && git push

# Option B: Use existing repository (must have admin access)
# Ensure you have full admin permissions to the repository
```

### **3. 🛠️ Local Environment Setup**

```bash
# Clone this testing framework
git clone <this-repo>
cd github-mcp-tools-e2e-tests

# Install Node.js dependencies
npm install

# Copy environment template
cp env.example .env

# Edit configuration
nano .env
```

### **4. ⚙️ Environment Configuration**

Edit `.env` file with your details:

```bash
# Required - GitHub API Authentication
GITHUB_TOKEN=ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

# Required - Test Repository (MUST be a repo you own!)
TEST_REPO_OWNER=your-github-username
TEST_REPO_NAME=github-mcp-test-repo

# Optional - Organization testing
TEST_ORG_NAME=your-organization

# Optional - Test user for collaboration tests
TEST_USERNAME=another-github-username

# Test Configuration
ENABLE_CLEANUP=true
ENABLE_RATE_LIMITING=true
MAX_CONCURRENT_REQUESTS=5
```

### **5. 🔍 Validation & Pre-flight Checks**

```bash
# Validate environment setup
npm run validate-env

# Expected output:
# ✅ GitHub API connectivity: OK
# ✅ Rate limit status: 4999/5000 remaining  
# ✅ Repository access: your-username/github-mcp-test-repo
# ✅ Admin access: Yes
# ✅ Token scope 'repo': OK
# ✅ Token scope 'user': OK
# ✅ Token scope 'gist': OK
# ✅ Token scope 'notifications': OK
```

## 🧪 **Running Tests**

### **Basic Test Execution**

```bash
# Run all 99 MCP tools tests
npm test

# Run specific test category
npm run test:category pull-requests
npm run test:category issues
npm run test:category search

# Run specific test
npm run test:specific "should create pull request"

# Run with coverage report
npm run test:coverage

# Watch mode for development
npm run test:watch
```

### **Test Categories & Coverage**

| **Category** | **Tests** | **Command** | **Covers** |
|--------------|-----------|-------------|------------|
| Pull Requests | 13 | `test:category pull-requests` | List, create, merge, review, status |
| Issues | 15 | `test:category issues` | CRUD, assignees, labels, comments |
| Search | 6 | `test:category search` | Code, repos, users, issues, PRs |
| Workflows | 12 | `test:category workflows` | Actions, runs, jobs, artifacts |
| Security | 8 | `test:category security` | Scanning, alerts, advisories |
| Files | 4 | `test:category files` | Content CRUD operations |
| Repositories | 8 | `test:category repositories` | Creation, forking, collaboration |
| Notifications | 7 | `test:category notifications` | Management, subscriptions |
| Gists | 3 | `test:category gists` | Create, update, list |
| Discussions | 4 | `test:category discussions` | CRUD, comments, categories |
| Projects | 6 | `test:category projects` | Management, fields |
| Users | 8 | `test:category users` | Profiles, following, teams |
| Organizations | 5 | `test:category organizations` | Members, projects, security |

## 🔧 **Advanced Configuration**

### **Rate Limiting & Performance**

```bash
# .env configuration for different scenarios

# Conservative (recommended for production)
ENABLE_RATE_LIMITING=true
MAX_CONCURRENT_REQUESTS=3
TEST_TIMEOUT=45000

# Aggressive (for local testing with good connection)
ENABLE_RATE_LIMITING=false
MAX_CONCURRENT_REQUESTS=10
TEST_TIMEOUT=30000

# Cautious (for GitHub Enterprise or limited rate limits)
ENABLE_RATE_LIMITING=true
MAX_CONCURRENT_REQUESTS=1
TEST_TIMEOUT=60000
```

### **Organization & Team Testing**

```bash
# Required for org-specific tests
TEST_ORG_NAME=your-organization

# Additional token scopes needed:
# ✅ read:org, write:org, admin:org
# ✅ read:discussion, write:discussion
```

### **Webhook Testing (Optional)**

```bash
# For webhook-related endpoint testing
WEBHOOK_URL=https://your-webhook-endpoint.com/github
WEBHOOK_SECRET=your-webhook-secret
```

## 🧹 **Cleanup & Maintenance**

### **Automatic Cleanup**

```bash
# Cleanup is enabled by default
ENABLE_CLEANUP=true

# Manual cleanup of test resources
npm run cleanup

# Force cleanup without confirmation (CI mode)
npm run cleanup --force
```

### **What Gets Cleaned Up**

- ✅ Test pull requests (closed)
- ✅ Test issues (closed)
- ✅ Test branches (deleted)
- ✅ Test labels (deleted)
- ✅ Test gists (deleted)
- ✅ Test files (deleted)

## ⚠️ **Important Safety Notes**

### **Repository Safety**

1. **ALWAYS use a dedicated test repository**
2. **Never run tests on production repositories**
3. **Ensure you have admin access to the test repository**
4. **The tests will create and modify repository content**

### **Rate Limiting**

1. **GitHub API has 5000 requests/hour limit**
2. **Full test suite uses ~300-500 requests**
3. **Tests include rate limiting protection**
4. **Consider running subsets if approaching limits**

### **Permissions & Access**

1. **Token requires multiple scopes - see setup section**
2. **Some tests require organization admin rights**
3. **Workflow tests may consume GitHub Actions minutes**
4. **Enterprise features require appropriate license**

## 🐛 **Troubleshooting**

### **Common Issues & Solutions**

| **Issue** | **Cause** | **Solution** |
|-----------|-----------|--------------|
| `401 Unauthorized` | Invalid/expired token | Regenerate GitHub token |
| `404 Not Found` | Repository doesn't exist | Check repo owner/name in .env |
| `403 Forbidden` | Missing scopes | Add required scopes to token |
| `Rate limit exceeded` | Too many requests | Wait or reduce concurrency |
| `Admin access required` | Insufficient permissions | Use repo you own |

### **Debug Commands**

```bash
# Check environment
npm run validate-env

# View test logs
tail -f tests.log

# Run single test with verbose output
npm test -- --verbose tests/pull-requests/pull-requests.test.js

# Check rate limit status
curl -H "Authorization: Bearer $GITHUB_TOKEN" https://api.github.com/rate_limit
```

## 📊 **Expected Test Results**

### **Success Metrics**

- ✅ **99 MCP tools tested** (all endpoints covered)
- ✅ **130+ test cases** (including edge cases)
- ✅ **100% API compliance** (validates response structures)
- ✅ **Clean resource management** (automatic cleanup)

### **Typical Test Duration**

| **Scope** | **Duration** | **Requests** |
|-----------|--------------|--------------|
| Single category | 2-5 minutes | 20-50 |
| Full test suite | 15-30 minutes | 300-500 |
| Quick smoke test | 1-2 minutes | 10-20 |

## 🎯 **Quick Start Checklist**

```bash
# ✅ Complete setup checklist:

□ 1. Created GitHub Personal Access Token with all required scopes
□ 2. Created/selected dedicated test repository with admin access  
□ 3. Cloned testing framework and installed dependencies
□ 4. Configured .env file with token and repository details
□ 5. Ran validation: npm run validate-env
□ 6. All validation checks passed
□ 7. Ready to run tests: npm test
```

## 💡 **Pro Tips**

1. **Start Small**: Run single category tests first
2. **Monitor Rate Limits**: Check `npm run validate-env` before long runs
3. **Use Cleanup**: Always enable cleanup for safety
4. **Check Logs**: Review `tests.log` for detailed execution info
5. **Parallel Testing**: Reduce concurrency if hitting rate limits
6. **CI Integration**: Use `--force` flags for automated environments

Happy testing! 🚀
