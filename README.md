# 🚨 Anonymous Report Portal - No Lie in July

A secure, anonymous reporting system designed for the "No Lie in July" activity where people can report incidents like petrol scams, thefts, and other issues without revealing their identity.

## ✨ Features

### 🔒 **Complete Anonymity**
- No personal information collected
- No user accounts or registration required
- Secure report submission with unique report IDs
- Privacy-first design

### 📝 **Comprehensive Reporting Form**
- Multiple incident types (Petrol Scam, Theft, Fraud, Corruption, Safety Hazard, Traffic Violation, Environmental Issue, Other)
- **Report Title** - Brief title for easy identification
- **Detailed Description** - Comprehensive incident details
- **Address Information** - Street, City, State, Postal Code, Landmark
- **Time Information** - Date and time of incident
- **Severity Level** - Low, Medium, High, Critical
- **Additional Evidence** - Extra details and context
- Automatic timestamp and secure report ID generation

### 📊 **Admin Dashboard**
- Real-time statistics and analytics
- Filter reports by type, severity, location, and date
- Export reports to CSV with all details
- Secure admin interface

### 🛡️ **Security Features**
- No personal data storage
- Secure report ID generation
- Input validation and sanitization
- CORS protection

## 🚀 Quick Start

### Prerequisites
- Node.js (version 14 or higher)
- npm or yarn package manager

### Installation

1. **Clone or download the project files**

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the server**
   ```bash
   npm start
   ```

4. **Access the application**
   - Main portal: http://localhost:3000
   - Admin dashboard: http://localhost:3000/admin.html

## 📁 Project Structure

```
qr-scan-website/
├── index.html          # Main anonymous reporting portal
├── admin.html          # Admin dashboard
├── server.js           # Express.js backend server
├── package.json        # Node.js dependencies
├── README.md           # This file
└── reports.json        # Anonymous reports storage (created automatically)
```

## 🔧 Configuration

### Environment Variables
- `PORT`: Server port (default: 3000)

### Customization
You can customize the following in `index.html`:
- Incident types in the dropdown
- Form fields and validation
- UI colors and styling
- Required vs optional fields

## 📱 How It Works

### For Users (Anonymous Reporting)
1. **Access Portal**: Users directly access the reporting website
2. **Fill Report**: Complete the comprehensive anonymous report form
3. **Submit**: Report is submitted securely with a unique ID
4. **Confirmation**: User receives confirmation with report ID

### For Administrators
1. **Access Dashboard**: Navigate to `/admin.html`
2. **View Reports**: See all anonymous reports with filtering options
3. **Analyze Data**: View statistics and trends
4. **Export Data**: Download reports as CSV for further analysis

## 🔒 Privacy & Security

### Data Protection
- **No Personal Information**: The system never collects names, emails, phone numbers, or any identifying information
- **Anonymous Reports**: Each report is completely anonymous
- **Secure Storage**: Reports are stored locally with no external dependencies
- **No Tracking**: No cookies, analytics, or tracking mechanisms

### Technical Security
- Input validation and sanitization
- CORS protection
- Secure report ID generation using crypto
- No sensitive data in logs

## 🛠️ API Endpoints

### Public Endpoints
- `GET /` - Main reporting portal
- `POST /api/report` - Submit anonymous report
- `GET /api/health` - Health check

### Admin Endpoints
- `GET /api/reports` - Get all reports (for admin dashboard)
- `GET /api/stats` - Get report statistics

## 📊 Report Types

The system supports the following incident types:
- **Petrol Station Scam** - Fuel-related fraud and scams
- **Theft** - Various types of theft incidents
- **Fraud** - Financial fraud and scams
- **Corruption** - Corruption and bribery incidents
- **Safety Hazard** - Safety and security concerns
- **Traffic Violation** - Traffic-related incidents
- **Environmental Issue** - Environmental concerns
- **Other** - Any other incidents not covered above

## 📋 Form Fields

### Required Fields
- **Incident Type** - Category of the incident
- **Report Title** - Brief title for identification
- **Detailed Description** - Comprehensive incident details

### Optional Fields
- **Address Information**
  - Street Address
  - City
  - State/Province
  - Postal Code
  - Nearby Landmark
- **Time Information**
  - Date of Incident
  - Time of Incident
- **Severity Level** - Low, Medium, High, Critical
- **Additional Evidence** - Extra details and context

## 🚀 Deployment

### Local Development
```bash
npm run dev  # Uses nodemon for auto-restart
```

### Production Deployment
1. Install dependencies: `npm install --production`
2. Start server: `npm start`
3. Set environment variables as needed
4. Configure reverse proxy (nginx/Apache) if needed

### Docker Deployment (Optional)
```dockerfile
FROM node:16-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install --production
COPY . .
EXPOSE 3000
CMD ["npm", "start"]
```

## 🔧 Troubleshooting

### Common Issues

**Server won't start:**
- Check if port 3000 is available
- Verify Node.js version (14+)
- Check for missing dependencies

**Form not submitting:**
- Check browser console for errors
- Verify all required fields are filled
- Check network connectivity

**Admin dashboard not loading:**
- Ensure server is running
- Check browser console for errors
- Verify API endpoints are accessible

## 📈 Future Enhancements

Potential improvements for future versions:
- Database integration (MongoDB/PostgreSQL)
- User authentication for admin access
- Email notifications for new reports
- Mobile app version
- Advanced analytics and reporting
- Multi-language support
- File upload for evidence
- QR code generation for easy sharing

## 🤝 Contributing

This is a community-focused project. Feel free to:
- Report bugs and issues
- Suggest new features
- Submit improvements
- Share feedback

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For support or questions:
- Check the troubleshooting section
- Review the code comments
- Create an issue in the project repository

---

**Remember**: This system is designed for anonymous reporting. Always respect user privacy and never attempt to collect or store personal information. 