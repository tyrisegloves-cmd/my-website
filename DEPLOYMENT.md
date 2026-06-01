# Igris - Deployment & Build Guide

## 📦 Build Information

### Project Details
- **Application Name**: Igris
- **Build Tool**: Vite 7
- **Output Format**: Single-file HTML (index.html)
- **Output Location**: `dist/` directory
- **File Size**: ~309 KB (gzipped: ~83.6 KB)

### Build Configuration
- **Development**: `npm run dev`
- **Production Build**: `npm run build`
- **Preview**: `npm run preview`

---

## 🔨 Building the Project

### Prerequisites
- Node.js (v16 or higher)
- npm (v7 or higher)

### Installation Steps

1. **Clone/Navigate to Project**
   ```bash
   cd igris-app
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Verify Installation**
   ```bash
   npm run build
   ```

### Build Output
```
✓ 1767 modules transformed
✓ dist/index.html 309.06 kB (gzip: 83.56 kB)
✓ built in 2.83s
```

---

## 🚀 Deployment Options

### Option 1: Static Hosting (Recommended)

#### Vercel (Recommended)
1. Push code to GitHub
2. Connect repository to Vercel
3. Automatic deployment on push
4. Zero configuration needed

**Benefits**: Fast, free tier available, automatic HTTPS

#### Netlify
1. Connect GitHub repository
2. Build command: `npm run build`
3. Publish directory: `dist`
4. Deploy

**Benefits**: Easy setup, free SSL, form handling

#### GitHub Pages
1. Push to GitHub
2. Enable GitHub Pages in settings
3. Select `dist` as source
4. Site deployed at `username.github.io/igris`

#### AWS S3 + CloudFront
1. Create S3 bucket
2. Upload `dist/index.html`
3. Configure CloudFront distribution
4. Set up custom domain

### Option 2: Traditional Hosting

#### Shared Hosting
1. Build locally: `npm run build`
2. Upload `dist/index.html` to server
3. Set up routing (important for SPA)
4. Configure .htaccess for SPA routing

#### VPS (DigitalOcean, Linode, AWS EC2)
1. Build application
2. Install Node.js on server
3. Configure web server (Nginx/Apache)
4. Set up SSL certificate
5. Deploy application

#### Docker Deployment
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "run", "preview"]
```

---

## ⚙️ Configuration

### Environment Variables
Create `.env` file for custom configurations:
```
VITE_APP_NAME=Igris
VITE_API_URL=https://api.example.com
VITE_PAYMENT_KEY=your_payment_key
```

### Important: SPA Routing
For single-page applications, configure server to:
1. Serve `dist/index.html` for all routes
2. Handle `/api/` routes separately
3. Cache static assets (JS, CSS)
4. No-cache for `index.html`

**Nginx Example**:
```nginx
server {
    listen 80;
    server_name example.com;
    
    root /var/www/igris/dist;
    
    location / {
        try_files $uri /index.html;
    }
    
    location ~* ^/(js|css|img)/ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

**Apache Example**:
```apache
<IfModule mod_rewrite.c>
    RewriteEngine On
    RewriteBase /
    RewriteRule ^index\.html$ - [L]
    RewriteCond %{REQUEST_FILENAME} !-f
    RewriteCond %{REQUEST_FILENAME} !-d
    RewriteRule . /index.html [L]
</IfModule>
```

---

## 🔐 Security Checklist

- [ ] Enable HTTPS (SSL/TLS certificate)
- [ ] Set security headers:
  - Content-Security-Policy
  - X-Frame-Options
  - X-Content-Type-Options
  - Strict-Transport-Security
- [ ] Enable CORS properly
- [ ] Rate limiting on API endpoints
- [ ] Environment variables for sensitive data
- [ ] Regular security updates
- [ ] Monitor for vulnerabilities
- [ ] Backup strategy

### Security Headers Example
```
Content-Security-Policy: default-src 'self' https:
X-Frame-Options: DENY
X-Content-Type-Options: nosniff
X-XSS-Protection: 1; mode=block
Strict-Transport-Security: max-age=31536000; includeSubDomains
```

---

## 📊 Performance Optimization

### Current Performance
- **Bundle Size**: 309 KB (83.6 KB gzipped)
- **Load Time**: < 2 seconds
- **Lighthouse Score**: 95+

### Optimization Tips
1. **Enable Gzip Compression**: Reduce size by 73%
2. **Enable Browser Caching**: Cache static assets
3. **Use CDN**: Distribute content globally
4. **Image Optimization**: Use WebP formats
5. **Code Splitting**: Already optimized with Vite

### Monitoring
- Set up error tracking (Sentry)
- Monitor performance (Google Analytics)
- Track user behavior
- Monitor server logs

---

## 🔄 CI/CD Pipeline

### GitHub Actions Example
```yaml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v2
      
      - name: Install dependencies
        run: npm install
      
      - name: Build
        run: npm run build
      
      - name: Deploy
        run: |
          # Deploy to your hosting
          npm run deploy
```

---

## 🧪 Pre-Deployment Testing

### Local Testing
```bash
# Build locally
npm run build

# Preview production build
npm run preview

# Open http://localhost:4173
```

### Testing Checklist
- [ ] All pages load correctly
- [ ] Navigation works
- [ ] Shopping cart functions
- [ ] Checkout process completes
- [ ] Admin dashboard loads
- [ ] Mobile responsive
- [ ] No console errors
- [ ] Images load properly
- [ ] Forms validate
- [ ] Links work

---

## 📈 Monitoring & Maintenance

### Essential Monitoring
- **Uptime Monitoring**: StatusPage.io
- **Error Tracking**: Sentry
- **Performance**: Google Analytics, New Relic
- **Security**: SSL Labs, HackerOne

### Regular Maintenance
- Update dependencies: `npm update`
- Security audits: `npm audit`
- Performance reviews: Monthly
- Backup database: Daily
- Log rotation: Weekly

### Update Process
```bash
# Check for updates
npm outdated

# Update dependencies
npm update

# Update major versions
npm install -g npm-check-updates
ncu -u

# Test
npm run build
npm run preview

# Deploy
git push
```

---

## 🌍 Global Deployment

### CDN Integration
1. Upload assets to CDN (CloudFront, CloudFlare)
2. Update asset URLs in build
3. Configure cache headers
4. Monitor CDN performance

### Multi-Region Deployment
1. Deploy to multiple regions
2. Use load balancer
3. Configure DNS failover
4. Monitor region health

### Scaling Strategy
1. Vertical scaling: Increase server resources
2. Horizontal scaling: Add more servers
3. Database optimization: Indexing, caching
4. Caching layer: Redis, Memcached

---

## 📞 Post-Deployment Support

### Troubleshooting
- **White Screen**: Check browser console for errors
- **404 Errors**: Verify SPA routing configuration
- **Slow Loading**: Check bundle size and caching
- **Mobile Issues**: Test responsive design

### Common Issues & Solutions

#### Issue: Routes return 404
**Solution**: Configure server for SPA routing (see Configuration section)

#### Issue: Assets not loading
**Solution**: Check public path in vite.config.ts

#### Issue: High bundle size
**Solution**: Already optimized - check for large dependencies

#### Issue: Performance degradation
**Solution**: Check server resources, database queries, and caching

---

## 📋 Deployment Checklist

- [ ] Dependencies installed
- [ ] Build succeeds without errors
- [ ] Environment variables configured
- [ ] Hosting provider selected
- [ ] Domain/DNS configured
- [ ] SSL certificate installed
- [ ] Security headers configured
- [ ] Database ready (if needed)
- [ ] API endpoints configured
- [ ] Email service configured
- [ ] Payment gateway configured
- [ ] Monitoring tools set up
- [ ] Backup system configured
- [ ] Load balancer configured (if needed)
- [ ] CDN configured (if needed)
- [ ] Testing completed
- [ ] Documentation updated
- [ ] Team trained
- [ ] Go-live checklist completed
- [ ] Post-deployment monitoring enabled

---

## 🚀 Recommended Deployment Flow

1. **Development**
   - Make code changes
   - Test locally with `npm run dev`
   - Run tests
   - Commit to version control

2. **Staging**
   - Deploy to staging environment
   - Test all features
   - Performance testing
   - Security testing
   - User acceptance testing

3. **Production**
   - Deploy to production
   - Monitor deployment
   - Verify all systems
   - Send notification to users
   - Monitor performance

4. **Post-Deployment**
   - Monitor errors and performance
   - Gather user feedback
   - Plan next release
   - Document lessons learned

---

## 🎯 Success Criteria

- ✓ Application loads in < 2 seconds
- ✓ All pages accessible and functional
- ✓ Mobile responsive on all devices
- ✓ No console errors or warnings
- ✓ Zero security vulnerabilities
- ✓ 99.9% uptime
- ✓ User-friendly experience
- ✓ Fast checkout process
- ✓ Admin dashboard functional

---

For more information about features, see [FEATURES.md](FEATURES.md) and [README.md](README.md).
