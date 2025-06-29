# 🚀 Deployment Guide - No Lie in July

This guide will help you deploy your anonymous reporting portal to Netlify with a secure backend.

## 📋 Prerequisites

- GitHub account
- Netlify account (free)
- Backend hosting service (Render, Railway, or Heroku)

## 🎯 Deployment Strategy

1. **Frontend (Netlify)**: Static files (index.html, admin.html, assets)
2. **Backend (Separate Service)**: Node.js server with database
3. **Security**: Admin authentication for admin panel

## 🔧 Step 1: Backend Deployment

### Option A: Render (Recommended - Free)

1. **Sign up** at [render.com](https://render.com)
2. **Create New Web Service**
3. **Connect your GitHub repository**
4. **Configure:**
   - **Name**: `no-lie-in-july-backend`
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Plan**: Free

5. **Environment Variables:**
   ```
   NODE_ENV=production
   ADMIN_PASSWORD=your-secure-password-here
   ADMIN_TOKEN=your-secret-admin-token-2025
   ```

6. **Deploy** and note your backend URL (e.g., `https://your-app.onrender.com`)

### Option B: Railway

1. **Sign up** at [railway.app](https://railway.app)
2. **Deploy from GitHub**
3. **Add environment variables** as above
4. **Deploy** and get your URL

## 🌐 Step 2: Frontend Deployment (Netlify)

### Method 1: Deploy from GitHub

1. **Push your code to GitHub**
2. **Sign up** at [netlify.com](https://netlify.com)
3. **Click "New site from Git"**
4. **Choose GitHub** and select your repository
5. **Configure build settings:**
   - **Build command**: Leave empty
   - **Publish directory**: `.` (root)
6. **Deploy**

### Method 2: Drag & Drop

1. **Zip your project files** (excluding node_modules, package-lock.json)
2. **Drag to Netlify**
3. **Deploy**

## ⚙️ Step 3: Configuration

### Update Backend URL

1. **Get your backend URL** from Step 1
2. **Update the files:**

**In `admin.html`:**
```javascript
const API_BASE_URL = window.location.hostname === 'localhost' ? '' : 'https://your-backend-url.com';
```

**In `index.html`:**
```javascript
const API_BASE_URL = window.location.hostname === 'localhost' ? '' : 'https://your-backend-url.com';
```

3. **Replace `https://your-backend-url.com`** with your actual backend URL
4. **Redeploy to Netlify**

### Update CORS Settings

**In `server.js`:**
```javascript
app.use(cors({
    origin: process.env.NODE_ENV === 'production' 
        ? ['https://your-netlify-domain.netlify.app', 'https://your-custom-domain.com']
        : true,
    credentials: true
}));
```

**Replace with your actual Netlify domain.**

## 🔐 Step 4: Security Setup

### Admin Authentication

1. **Set secure passwords** in your backend environment variables
2. **Default credentials** (change these):
   - **Password**: `admin123`
   - **Token**: `your-secret-admin-token-2025`

### Custom Domain (Optional)

1. **In Netlify**: Go to Domain settings
2. **Add custom domain** (e.g., `reports.yourdomain.com`)
3. **Update CORS** in backend with your custom domain

## 📱 Step 5: Testing

### Test Public Access
1. **Visit your Netlify URL**
2. **Submit a test report**
3. **Verify MYFM car animation works**

### Test Admin Access
1. **Visit**: `your-netlify-url.netlify.app/admin`
2. **Login** with your admin password
3. **Verify** you can see and delete reports

## 🔧 Environment Variables Reference

### Backend (Render/Railway)
```
NODE_ENV=production
ADMIN_PASSWORD=your-secure-password-here
ADMIN_TOKEN=your-secret-admin-token-2025
PORT=3000 (auto-set by hosting service)
```

### Frontend (Netlify)
```
No environment variables needed for static hosting
```

## 🚨 Troubleshooting

### Common Issues

1. **CORS Errors**
   - Check backend CORS configuration
   - Verify Netlify domain is in allowed origins

2. **Admin Login Fails**
   - Check environment variables in backend
   - Verify password is set correctly

3. **Reports Not Loading**
   - Check backend URL in frontend code
   - Verify backend is running and accessible

4. **MYFM Animation Not Working**
   - Check browser console for errors
   - Verify all assets are deployed

### Debug Steps

1. **Check browser console** for JavaScript errors
2. **Check backend logs** in your hosting service
3. **Test API endpoints** directly with curl or Postman
4. **Verify environment variables** are set correctly

## 📞 Support

- **Backend Issues**: Check hosting service logs
- **Frontend Issues**: Check browser console
- **Deployment Issues**: Check Netlify build logs

## 🔄 Updates

To update your deployed site:

1. **Push changes to GitHub**
2. **Netlify will auto-deploy**
3. **Backend**: Redeploy manually or set up auto-deploy

## 🎉 Success!

Your anonymous reporting portal is now:
- ✅ **Publicly accessible** via Netlify
- ✅ **Admin panel secured** with authentication
- ✅ **Database connected** and functional
- ✅ **MYFM car animation** working
- ✅ **Contact information** displayed

**Public URL**: `https://your-site.netlify.app`
**Admin URL**: `https://your-site.netlify.app/admin` 