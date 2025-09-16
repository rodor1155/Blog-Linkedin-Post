# Deployment Guide - RMIS Content Generator

This guide provides instructions for deploying the RMIS Content Generator to various hosting platforms.

## 📋 Prerequisites

- N8N instance with the "Blog & LI Post V2" workflow deployed
- Webhook endpoint `rmis-content-input` accessible
- Modern web server or hosting platform

## 🎯 Deployment Options

### 1. GitHub Pages (Recommended for Static Hosting)

**Steps:**
1. Push your code to GitHub repository
2. Go to repository Settings → Pages
3. Set Source to "Deploy from a branch"
4. Select `main` branch and `/ (root)` folder
5. Your site will be available at `https://yourusername.github.io/rmis-content-generator`

**Configuration:**
- Update webhook URL in `js/main.js` to point to your N8N instance
- Ensure N8N webhook allows CORS requests from your GitHub Pages domain

### 2. Netlify

**Steps:**
1. Connect your GitHub repository to Netlify
2. Set build settings:
   - Build command: `echo "Static site - no build needed"`
   - Publish directory: `./`
3. Deploy automatically on each git push

**Configuration:**
- Add environment variables in Netlify dashboard if needed
- Configure custom domain if required
- Set up HTTPS (automatic with Netlify)

### 3. Vercel

**Steps:**
1. Import project from GitHub to Vercel
2. No build configuration needed (static site)
3. Deploy automatically

**Configuration:**
- Configure custom domain in Vercel dashboard
- Set up environment variables if needed

### 4. Traditional Web Server

**Requirements:**
- Apache, Nginx, or any web server
- Support for static files (HTML, CSS, JS)

**Steps:**
1. Upload files to web server document root
2. Ensure proper file permissions
3. Configure web server (optional optimizations below)

**Apache Configuration (.htaccess):**
```apache
# Enable compression
<IfModule mod_deflate.c>
    AddOutputFilterByType DEFLATE text/plain
    AddOutputFilterByType DEFLATE text/html
    AddOutputFilterByType DEFLATE text/xml
    AddOutputFilterByType DEFLATE text/css
    AddOutputFilterByType DEFLATE application/xml
    AddOutputFilterByType DEFLATE application/xhtml+xml
    AddOutputFilterByType DEFLATE application/rss+xml
    AddOutputFilterByType DEFLATE application/javascript
    AddOutputFilterByType DEFLATE application/x-javascript
</IfModule>

# Cache static files
<IfModule mod_expires.c>
    ExpiresActive on
    ExpiresByType text/css "access plus 1 year"
    ExpiresByType application/javascript "access plus 1 year"
    ExpiresByType image/png "access plus 1 year"
    ExpiresByType image/jpg "access plus 1 year"
    ExpiresByType image/jpeg "access plus 1 year"
</IfModule>

# Security headers
<IfModule mod_headers.c>
    Header always set X-Content-Type-Options nosniff
    Header always set X-Frame-Options DENY
    Header always set X-XSS-Protection "1; mode=block"
</IfModule>
```

**Nginx Configuration:**
```nginx
server {
    listen 80;
    server_name your-domain.com;
    root /path/to/rmis-content-generator;
    index index.html;

    # Compression
    gzip on;
    gzip_types text/css application/javascript text/html;

    # Cache static files
    location ~* \.(css|js|png|jpg|jpeg)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # Security headers
    add_header X-Content-Type-Options nosniff;
    add_header X-Frame-Options DENY;
    add_header X-XSS-Protection "1; mode=block";
}
```

## 🔧 Configuration Updates

### Update Webhook URL

Before deploying, update the webhook URL in `js/main.js`:

```javascript
// Update this line with your N8N instance URL
this.webhookUrl = 'https://your-n8n-instance.com/webhook/rmis-content-input';
```

### Environment-Specific Settings

For different environments, you might want to create environment-specific configuration:

**Development:**
```javascript
const config = {
    webhookUrl: 'http://localhost:5678/webhook/rmis-content-input',
    debug: true
};
```

**Production:**
```javascript
const config = {
    webhookUrl: 'https://your-n8n-instance.com/webhook/rmis-content-input',
    debug: false
};
```

## 🔒 Security Considerations

### CORS Configuration

Your N8N instance needs to allow requests from your deployed domain. Configure CORS in N8N:

1. In N8N settings, add your domain to allowed origins
2. Enable CORS for the webhook endpoint
3. Ensure proper headers are set

### HTTPS Requirements

- Always use HTTPS in production
- Update webhook URLs to use HTTPS
- Ensure N8N instance is also using HTTPS

### Content Security Policy (Optional)

Add CSP header for enhanced security:

```html
<meta http-equiv="Content-Security-Policy" content="
    default-src 'self';
    script-src 'self' 'unsafe-inline' https://cdn.jsdelivr.net;
    style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://cdn.jsdelivr.net;
    font-src 'self' https://fonts.gstatic.com https://cdn.jsdelivr.net;
    connect-src 'self' https://your-n8n-instance.com;
">
```

## 📊 Monitoring and Analytics

### Basic Analytics (Optional)

Add Google Analytics or similar:

```html
<!-- Add before closing </head> tag -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

### Error Monitoring

Consider adding error monitoring:

```javascript
// Add to main.js for production error tracking
window.addEventListener('error', (e) => {
    // Send error to your monitoring service
    console.error('Application error:', e.error);
});
```

## 🚀 Performance Optimizations

### Image Optimization
- Optimize any images you add
- Use appropriate formats (WebP when possible)
- Implement lazy loading for images

### Code Minification (Optional)
For production, consider minifying CSS and JavaScript:

```bash
# Using npm packages
npm install -g clean-css-cli uglify-js
cleancss -o css/style.min.css css/style.css
uglifyjs js/main.js -o js/main.min.js
```

### CDN Configuration
- Use CDN for external libraries (already configured)
- Consider using CDN for your static assets in high-traffic scenarios

## ✅ Deployment Checklist

Before going live:

- [ ] Update webhook URL to production N8N instance
- [ ] Test form submission with actual N8N workflow
- [ ] Verify CORS configuration works
- [ ] Test responsive design on multiple devices
- [ ] Check all external CDN resources load correctly
- [ ] Verify HTTPS is properly configured
- [ ] Test error handling with invalid requests
- [ ] Confirm status updates display correctly
- [ ] Review and update README with live URLs

## 🔄 Continuous Deployment

### GitHub Actions (Optional)

Create `.github/workflows/deploy.yml` for automated deployment:

```yaml
name: Deploy to Production

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v3
    
    - name: Deploy to server
      # Add your deployment steps here
      run: echo "Deploy to your hosting service"
```

## 📞 Support

If you encounter deployment issues:

1. Check browser console for JavaScript errors
2. Verify N8N webhook is accessible
3. Test CORS configuration
4. Review network requests in browser dev tools
5. Check server logs for any issues

---

Your RMIS Content Generator should now be successfully deployed and ready to trigger your N8N content generation workflows!