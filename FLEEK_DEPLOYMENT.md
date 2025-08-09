# Fleek Deployment Fix Guide

## Issue
Your live website on Fleek is showing a dark screen instead of loading properly.

## Root Cause
This is likely caused by:
1. Build configuration issues
2. Incorrect Fleek deployment settings
3. Missing or incorrect redirects for the SPA (Single Page Application)

## Solution

### 1. Fleek Configuration Settings
In your Fleek dashboard, ensure these settings:

**Build Settings:**
- Build Command: `npm run build`
- Output Directory: `dist`
- Install Command: `npm install`
- Framework: `Vite` or `Other`
- Node Version: `18.x` or higher

### 2. Required Files (Already Fixed)
✅ `fleek.json` - Fleek configuration file
✅ `vite.config.ts` - Optimized build settings
✅ `public/_redirects` - SPA routing configuration
✅ `dist/` folder - Build output

### 3. Deployment Steps

#### Option A: Re-deploy from Dashboard
1. Go to your Fleek project dashboard
2. Click "Trigger Deploy" or "Redeploy"
3. Monitor the build logs for any errors

#### Option B: Re-connect Repository
1. Go to Settings → Git
2. Disconnect and reconnect your repository
3. Ensure branch is set correctly (usually `main` or `master`)
4. Verify build settings match above

### 4. Common Issues & Fixes

#### Build Fails
- Check if `package.json` scripts are correct
- Ensure all dependencies are in `dependencies` not `devDependencies`
- Verify Node version compatibility

#### Dark Screen Persists
- Clear browser cache and hard refresh (Ctrl+F5)
- Check browser console for JavaScript errors
- Verify the `dist/index.html` file is being served correctly

#### 404 Errors on Routes
- Ensure `_redirects` file exists in `public/` folder
- Content should be: `/*    /index.html   200`

### 5. Testing the Fix
After deploying:
1. Wait 2-3 minutes for CDN propagation
2. Clear browser cache
3. Test the live URL
4. Check browser developer tools console for errors

### 6. Emergency Fallback
If issues persist:
1. Download the `dist.zip` from this project
2. Upload manually to Fleek using "Upload folder" option
3. Or switch to a different deployment platform temporarily

## Build Output Verification
The build should produce:
- `dist/index.html` (main entry point)
- `dist/assets/` (CSS and JS files)
- `dist/_redirects` (routing configuration)
- `dist/favicon.ico` and other static assets

Current build is working correctly locally. The issue is in the Fleek deployment configuration.