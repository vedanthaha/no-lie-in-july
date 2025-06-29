const express = require('express');
const cors = require('cors');
const fs = require('fs').promises;
const path = require('path');
const crypto = require('crypto');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors({
    origin: process.env.NODE_ENV === 'production' 
        ? ['https://*.netlify.app', 'https://*.netlify.com', 'https://your-custom-domain.com']
        : true,
    credentials: true
}));
app.use(express.json());
app.use(express.static('.'));

// Basic admin authentication middleware
const adminAuth = (req, res, next) => {
    const adminToken = req.headers['x-admin-token'] || req.query.token;
    const validToken = process.env.ADMIN_TOKEN || 'your-secret-admin-token-2025';
    
    if (adminToken === validToken) {
        next();
    } else {
        res.status(401).json({ error: 'Unauthorized access' });
    }
};

// Data storage file
const REPORTS_FILE = 'reports.json';

// Initialize reports file if it doesn't exist
async function initializeReportsFile() {
    try {
        await fs.access(REPORTS_FILE);
    } catch {
        await fs.writeFile(REPORTS_FILE, JSON.stringify([], null, 2));
    }
}

// Generate secure report ID
function generateReportId() {
    return 'RPT-' + crypto.randomBytes(8).toString('hex').toUpperCase() + '-' + 
           Date.now().toString(36).toUpperCase();
}

// Read reports from file
async function readReports() {
    try {
        const data = await fs.readFile(REPORTS_FILE, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        console.error('Error reading reports:', error);
        return [];
    }
}

// Write reports to file
async function writeReports(reports) {
    try {
        await fs.writeFile(REPORTS_FILE, JSON.stringify(reports, null, 2));
    } catch (error) {
        console.error('Error writing reports:', error);
        throw error;
    }
}

// Routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Submit anonymous report
app.post('/api/report', async (req, res) => {
    try {
        const { 
            incidentType, 
            title, 
            description, 
            evidence, 
            address, 
            incidentDate, 
            incidentTime, 
            severity 
        } = req.body;

        // Validate required fields
        if (!incidentType || !title || !description) {
            return res.status(400).json({ 
                error: 'Incident type, title, and description are required' 
            });
        }

        // Create report object
        const report = {
            id: generateReportId(),
            incidentType,
            title,
            description,
            evidence: evidence || '',
            address: address || {},
            incidentDate: incidentDate || '',
            incidentTime: incidentTime || '',
            severity: severity || '',
            submittedAt: new Date().toISOString(),
            // No personal information stored
            ipAddress: req.ip,
            userAgent: req.get('User-Agent')
        };

        // Read existing reports
        const reports = await readReports();
        
        // Add new report
        reports.push(report);
        
        // Write back to file
        await writeReports(reports);

        console.log(`New anonymous report submitted: ${report.id}`);

        res.json({ 
            success: true, 
            reportId: report.id,
            message: 'Report submitted successfully'
        });

    } catch (error) {
        console.error('Error submitting report:', error);
        res.status(500).json({ 
            error: 'Internal server error' 
        });
    }
});

// Get reports (for admin purposes - requires authentication)
app.get('/api/reports', adminAuth, async (req, res) => {
    try {
        const reports = await readReports();
        
        // Return reports with all necessary fields for admin dashboard
        const sanitizedReports = reports.map(report => ({
            id: report.id,
            incidentType: report.incidentType,
            title: report.title || 'Untitled Report',
            description: report.description,
            evidence: report.evidence || '',
            address: report.address || {},
            incidentDate: report.incidentDate || '',
            incidentTime: report.incidentTime || '',
            severity: report.severity || 'medium',
            submittedAt: report.submittedAt,
            timestamp: report.submittedAt // For compatibility with existing admin code
        }));

        res.json(sanitizedReports);
    } catch (error) {
        console.error('Error fetching reports:', error);
        res.status(500).json({ 
            error: 'Internal server error' 
        });
    }
});

// Get report statistics (requires authentication)
app.get('/api/stats', adminAuth, async (req, res) => {
    try {
        const reports = await readReports();
        
        const stats = {
            totalReports: reports.length,
            byType: {},
            byLocation: {},
            recentReports: reports.filter(r => {
                const reportDate = new Date(r.submittedAt);
                const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
                return reportDate > weekAgo;
            }).length
        };

        // Count by incident type
        reports.forEach(report => {
            stats.byType[report.incidentType] = (stats.byType[report.incidentType] || 0) + 1;
            if (report.location && report.location !== 'Not specified') {
                stats.byLocation[report.location] = (stats.byLocation[report.location] || 0) + 1;
            }
        });

        res.json(stats);
    } catch (error) {
        console.error('Error fetching stats:', error);
        res.status(500).json({ 
            error: 'Internal server error' 
        });
    }
});

// Delete a report by ID (requires authentication)
app.delete('/api/report/:id', adminAuth, async (req, res) => {
    try {
        const reportId = req.params.id;
        const reports = await readReports();
        
        const reportIndex = reports.findIndex(report => report.id === reportId);
        
        if (reportIndex === -1) {
            return res.status(404).json({ 
                error: 'Report not found' 
            });
        }
        
        // Remove the report
        reports.splice(reportIndex, 1);
        
        // Write back to file
        await writeReports(reports);
        
        console.log(`Report deleted: ${reportId}`);
        
        res.json({ 
            success: true, 
            message: 'Report deleted successfully' 
        });
        
    } catch (error) {
        console.error('Error deleting report:', error);
        res.status(500).json({ 
            error: 'Internal server error' 
        });
    }
});

// Admin login endpoint
app.post('/api/admin/login', (req, res) => {
    const { password } = req.body;
    const validPassword = process.env.ADMIN_PASSWORD || 'admin123';
    
    if (password === validPassword) {
        const token = process.env.ADMIN_TOKEN || 'your-secret-admin-token-2025';
        res.json({ 
            success: true, 
            token: token,
            message: 'Login successful' 
        });
    } else {
        res.status(401).json({ 
            error: 'Invalid password' 
        });
    }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({ 
        status: 'OK', 
        timestamp: new Date().toISOString(),
        uptime: process.uptime()
    });
});

// Start server
async function startServer() {
    await initializeReportsFile();
    
    app.listen(PORT, () => {
        console.log(`🚨 Anonymous Report Portal running on http://localhost:${PORT}`);
        console.log(`📊 API endpoints:`);
        console.log(`   POST /api/report - Submit anonymous report`);
        console.log(`   GET  /api/reports - Get all reports (admin)`);
        console.log(`   GET  /api/stats - Get report statistics`);
        console.log(`   GET  /api/health - Health check`);
    });
}

startServer().catch(console.error); 