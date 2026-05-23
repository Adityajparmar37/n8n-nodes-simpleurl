# n8n-nodes-simpleurl

This is an n8n community node for [SimpleURL](https://simpleurl.tech) - a URL shortener and link management platform.

[n8n](https://n8n.io/) is a [fair-code licensed](https://docs.n8n.io/reference/license/) workflow automation platform.

[Installation](#installation)  
[Operations](#operations)  
[Credentials](#credentials)  
[Compatibility](#compatibility)  
[Usage](#usage)  
[Resources](#resources)  

## Installation

Follow the [installation guide](https://docs.n8n.io/integrations/community-nodes/installation/) in the n8n community nodes documentation.

### Community Nodes (Recommended)

1. Go to **Settings > Community Nodes**
2. Select **Install**
3. Enter `n8n-nodes-simpleurl` in **Enter npm package name**
4. Agree to the [risks](https://docs.n8n.io/integrations/community-nodes/risks/) of using community nodes
5. Select **Install**

### Manual Installation

To install manually, run:

```bash
npm install n8n-nodes-simpleurl
```

For Docker users:

```bash
docker run -it --rm \
  --name n8n \
  -p 5678:5678 \
  -v ~/.n8n:/home/node/.n8n \
  docker.n8n.io/n8nio/n8n \
  npm install n8n-nodes-simpleurl
```

## Operations

### Short URL
- **Create** - Create a new short URL
- **Get** - Get a short URL by keyword
- **List** - List all short URLs with pagination
- **Update** - Update a short URL's destination or description
- **Delete** - Delete a short URL
- **Batch Create** - Create multiple short URLs at once (up to 100)

### Analytics
- **Get** - Get click analytics for a short URL
  - Total and unique clicks
  - Clicks by date, country, device, browser
  - Date range filtering

### QR Code
- **Generate** - Generate a QR code for a short URL
- **List** - List all QR codes

## Credentials

This node requires SimpleURL API credentials. You need:

1. **API Key** - Your SimpleURL API key (starts with `sk_live_`)
2. **Base URL** - Your SimpleURL instance URL (default: `https://simpleurl.tech`)

### Getting Your API Key

1. Log in to your SimpleURL account
2. Navigate to Settings → API Keys
3. Click "Generate New API Key"
4. Copy the key (shown only once!)
5. Add it to n8n credentials

For detailed instructions, see the [API Key Generation Guide](https://simpleurl.tech/docs/api-keys).

## Compatibility

- Tested with n8n version 1.0.0+
- Requires SimpleURL API v1

## Usage

### Example 1: Create Short URL

```
Input: Long URL
Output: Short URL with keyword
```

**Node Configuration:**
- Resource: Short URL
- Operation: Create
- Long URL: `https://example.com/my-long-url`
- Keyword: `mylink` (optional)

**Output:**
```json
{
  "shortUrl": "https://simpleurl.tech/mylink",
  "keyword": "mylink",
  "url": "https://example.com/my-long-url"
}
```

### Example 2: Auto-Shorten RSS Feed URLs

**Workflow:**
1. RSS Feed Trigger → New blog posts
2. SimpleURL Node → Create short URL
3. Twitter Node → Post tweet with short URL

**SimpleURL Node Config:**
- Resource: Short URL
- Operation: Create
- Long URL: `{{$json.link}}`
- Description: `{{$json.title}}`

### Example 3: Batch Create from Spreadsheet

**Workflow:**
1. Google Sheets → Read URLs
2. SimpleURL Node → Batch create
3. Google Sheets → Write back short URLs

**SimpleURL Node Config:**
- Resource: Short URL
- Operation: Batch Create
- URLs: Map from spreadsheet data

### Example 4: Get Analytics

**Workflow:**
1. Schedule Trigger → Daily at 9 AM
2. SimpleURL Node → Get analytics
3. Slack Node → Send report

**SimpleURL Node Config:**
- Resource: Analytics
- Operation: Get
- Keyword: `mylink`
- Start Date: Yesterday
- End Date: Today

## Resources

* [n8n community nodes documentation](https://docs.n8n.io/integrations/community-nodes/)
* [SimpleURL API Documentation](https://simpleurl.tech/docs/api)
* [SimpleURL Website](https://simpleurl.tech)

## Version history

### 1.0.0
- Initial release
- Support for Short URL operations (create, get, list, update, delete, batch)
- Support for Analytics
- Support for QR Codes
- API key authentication

## License

[MIT](LICENSE.md)

## Support

For issues or questions:
- GitHub Issues: [Report an issue](https://github.com/yourusername/n8n-nodes-simpleurl/issues)
- Email: support@simpleurl.tech
- Documentation: https://simpleurl.tech/docs
