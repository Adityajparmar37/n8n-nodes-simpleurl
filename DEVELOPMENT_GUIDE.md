# SimpleURL n8n Node - Development Guide

## 📦 What You Have

A complete custom n8n node for SimpleURL with:
- ✅ TypeScript implementation
- ✅ API key authentication
- ✅ All CRUD operations
- ✅ Batch operations
- ✅ Analytics support
- ✅ QR code generation
- ✅ Proper error handling

---

## 🚀 Quick Start

### 1. Install Dependencies

```bash
cd n8n-nodes-simpleurl
npm install
```

### 2. Build the Node

```bash
npm run build
```

This compiles TypeScript to JavaScript in the `dist/` folder.

### 3. Link for Local Development

```bash
# Link the package globally
npm link

# In your n8n installation directory
cd ~/.n8n
npm link n8n-nodes-simpleurl

# Restart n8n
n8n start
```

### 4. Test in n8n

1. Open n8n (http://localhost:5678)
2. Create new workflow
3. Search for "SimpleURL" node
4. Add credentials (API key)
5. Test operations

---

## 📁 Project Structure

```
n8n-nodes-simpleurl/
├── credentials/
│   └── SimpleUrlApi.credentials.ts    # API key credential
├── nodes/
│   └── SimpleUrl/
│       └── SimpleUrl.node.ts          # Main node implementation
├── package.json                        # Package configuration
├── tsconfig.json                       # TypeScript configuration
├── README.md                           # Documentation
├── DEVELOPMENT_GUIDE.md               # This file
└── .gitignore                         # Git ignore rules
```

---

## 🔧 Development Workflow

### Watch Mode (Auto-rebuild)

```bash
npm run dev
```

This watches for file changes and rebuilds automatically.

### Format Code

```bash
npm run format
```

### Lint Code

```bash
npm run lint
```

### Fix Lint Issues

```bash
npm run lintfix
```

---

## 📝 Node Features

### Resources

1. **Short URL**
   - Create
   - Get
   - List
   - Update
   - Delete
   - Batch Create

2. **Analytics**
   - Get analytics

3. **QR Code**
   - Generate
   - List

### Authentication

Uses API key authentication via `X-API-Key` header.

### Error Handling

- Proper error messages
- Continue on fail support
- Detailed error context

---

## 🧪 Testing

### Manual Testing

1. **Test Credentials:**
   ```
   - Add SimpleURL API credentials
   - Test connection (should list URLs)
   ```

2. **Test Create:**
   ```
   - Resource: Short URL
   - Operation: Create
   - URL: https://example.com
   - Keyword: test123
   ```

3. **Test List:**
   ```
   - Resource: Short URL
   - Operation: List
   - Limit: 10
   ```

4. **Test Analytics:**
   ```
   - Resource: Analytics
   - Operation: Get
   - Keyword: test123
   ```

### Automated Testing (TODO)

```bash
# Add tests in the future
npm test
```

---

## 📦 Publishing

### 1. Prepare for Publishing

```bash
# Update version in package.json
npm version patch  # or minor, or major

# Build
npm run build

# Test the package
npm pack
```

### 2. Publish to npm

```bash
# Login to npm (first time only)
npm login

# Publish
npm publish
```

### 3. Update n8n Community Nodes

After publishing to npm, users can install via:

```bash
# In n8n
Settings > Community Nodes > Install
# Enter: n8n-nodes-simpleurl
```

---

## 🔄 Update Workflow

### Making Changes

1. **Edit the code:**
   ```bash
   # Edit files in credentials/ or nodes/
   vim nodes/SimpleUrl/SimpleUrl.node.ts
   ```

2. **Rebuild:**
   ```bash
   npm run build
   ```

3. **Test in n8n:**
   ```bash
   # Restart n8n to load changes
   n8n start
   ```

4. **Commit changes:**
   ```bash
   git add .
   git commit -m "Add new feature"
   git push
   ```

5. **Publish new version:**
   ```bash
   npm version patch
   npm publish
   ```

---

## 🎨 Customization

### Adding New Operations

1. **Add to operation options:**
   ```typescript
   options: [
     {
       name: 'My New Operation',
       value: 'myNewOp',
       description: 'Does something cool',
       action: 'Do something cool',
     },
   ]
   ```

2. **Add operation fields:**
   ```typescript
   {
     displayName: 'My Field',
     name: 'myField',
     type: 'string',
     displayOptions: {
       show: {
         resource: ['shortUrl'],
         operation: ['myNewOp'],
       },
     },
     default: '',
   }
   ```

3. **Implement operation logic:**
   ```typescript
   else if (operation === 'myNewOp') {
     const myField = this.getNodeParameter('myField', i) as string;
     
     const response = await this.helpers.httpRequestWithAuthentication.call(
       this,
       'simpleUrlApi',
       {
         method: 'POST',
         url: '/api/v1/my-endpoint',
         body: { myField },
         json: true,
       },
     );
     
     returnData.push({ json: response.data });
   }
   ```

### Adding New Resources

1. **Add resource option:**
   ```typescript
   {
     name: 'My Resource',
     value: 'myResource',
   }
   ```

2. **Add operations for resource:**
   ```typescript
   {
     displayName: 'Operation',
     name: 'operation',
     type: 'options',
     displayOptions: {
       show: {
         resource: ['myResource'],
       },
     },
     options: [
       // Your operations
     ],
   }
   ```

3. **Implement resource logic:**
   ```typescript
   if (resource === 'myResource') {
     // Handle operations
   }
   ```

---

## 🐛 Debugging

### Enable Debug Mode

```bash
# Set environment variable
export N8N_LOG_LEVEL=debug

# Run n8n
n8n start
```

### Check Logs

```bash
# n8n logs
tail -f ~/.n8n/logs/n8n.log

# Node console.log output
# Appears in n8n terminal
```

### Common Issues

1. **Node not appearing in n8n:**
   - Check `npm link` is correct
   - Restart n8n
   - Check `dist/` folder exists

2. **Credentials not working:**
   - Verify API key is correct
   - Check base URL
   - Test credentials in n8n

3. **API errors:**
   - Check API endpoint URLs
   - Verify request format
   - Check authentication header

---

## 📚 Resources

### n8n Documentation
- [Creating Nodes](https://docs.n8n.io/integrations/creating-nodes/)
- [Node Development](https://docs.n8n.io/integrations/creating-nodes/build/)
- [Publishing Nodes](https://docs.n8n.io/integrations/creating-nodes/publish/)

### SimpleURL Documentation
- [API Documentation](../API_DOCUMENTATION.md)
- [OpenAPI Spec](../openapi.yaml)
- [Quick Start](../QUICK_START.md)

### TypeScript
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [n8n Workflow Types](https://github.com/n8n-io/n8n/tree/master/packages/workflow)

---

## 🤝 Contributing

### Guidelines

1. Follow existing code style
2. Add comments for complex logic
3. Test all changes
4. Update documentation
5. Submit pull requests

### Code Style

- Use TypeScript
- Follow n8n conventions
- Use meaningful variable names
- Add JSDoc comments

---

## 📋 Checklist Before Publishing

- [ ] All operations tested
- [ ] Credentials working
- [ ] Error handling implemented
- [ ] Documentation updated
- [ ] Version bumped
- [ ] Build successful
- [ ] No lint errors
- [ ] README complete
- [ ] License added
- [ ] Git repository created

---

## 🎉 Success!

Your custom n8n node is ready! Users can now:

1. Install from n8n Community Nodes
2. Add SimpleURL credentials
3. Use all operations in workflows
4. Build powerful automations

**Next Steps:**
1. Test thoroughly
2. Publish to npm
3. Share with community
4. Gather feedback
5. Iterate and improve

---

## 💡 Tips

### Performance
- Use batch operations when possible
- Cache responses if needed
- Handle rate limits gracefully

### User Experience
- Clear field descriptions
- Helpful placeholders
- Good default values
- Proper error messages

### Maintenance
- Keep dependencies updated
- Monitor for issues
- Respond to feedback
- Release updates regularly

---

## 📞 Support

Need help?
- Email: support@simpleurl.tech
- GitHub: (your repo)
- n8n Community: https://community.n8n.io

Happy coding! 🚀
