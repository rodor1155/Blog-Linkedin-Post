# RMIS Content Generator

## 🛡️ Automated Blog & LinkedIn Post Creation for Risk Management Information Systems

A professional web interface for initiating automated RMIS content generation workflows, designed to work with N8N automation workflows for creating strategic blog posts and LinkedIn content.

---

## ✅ Currently Completed Features

### 🎯 **Core Functionality**
- **Professional Web Form Interface** - Complete form for RMIS content generation requests
- **Industry-Specific Content Targeting** - Support for Defence, Healthcare, Financial, Manufacturing, and General RMIS sectors
- **Intelligent Form Validation** - Real-time validation with helpful error messages and suggestions
- **Dynamic Field Updates** - Auto-suggests relevant topics and messages based on selected industry focus
- **Request Preview System** - Preview JSON payload before submission
- **Responsive Design** - Works seamlessly on desktop, tablet, and mobile devices

### 🔧 **Technical Features**
- **N8N Webhook Integration** - Submits directly to the `rmis-content-input` webhook endpoint
- **Form State Management** - Loading states, success/error handling, and user feedback
- **Professional UI/UX** - Modern design with Inter font, FontAwesome icons, and smooth animations
- **Client-side Validation** - Comprehensive validation before API submission
- **Error Handling** - Graceful error handling with detailed user feedback
- **Progressive Enhancement** - Works without JavaScript (basic functionality)

---

## 📋 Current Functional Entry Points

### **Main Entry Point**
- **Path**: `index.html`
- **Method**: GET (to display form)
- **Description**: Main form interface for RMIS content generation

### **Form Submission**
- **Path**: `/rmis-content-input` (N8N webhook)
- **Method**: POST
- **Content-Type**: `application/json`
- **Payload Structure**:
  ```json
  {
    "focusArea": "Defence|Healthcare|Financial|Manufacturing|General",
    "specificTopic": "string (min 10 chars)",
    "keyMessage": "string (min 20 chars)",
    "targetAudience": "string (min 5 chars)",
    "callToAction": "webinar|consultation|whitepaper|contact|demo",
    "contentType": "both|blog|linkedin",
    "keyEvents": "string (optional)",
    "additionalNotes": "string (optional)"
  }
  ```

### **Static Assets**
- **CSS**: `css/style.css` - Professional styling with CSS Grid layout
- **JavaScript**: `js/main.js` - Form handling, validation, and API communication
- **Fonts**: Google Fonts (Inter) via CDN
- **Icons**: FontAwesome via CDN

---

## 🚧 Features Not Yet Implemented

### **Enhanced Workflow Integration**
- [ ] **Real-time Status Updates** - WebSocket connection for live workflow progress
- [ ] **Generated Content Preview** - Display generated blog posts and LinkedIn content
- [ ] **Content History Dashboard** - View previous content generation requests and results
- [ ] **Template Management** - Save and reuse common content configuration templates

### **Advanced Features**
- [ ] **Multi-language Support** - Content generation in multiple languages
- [ ] **Content Calendar Integration** - Schedule content generation for specific dates
- [ ] **Analytics Dashboard** - Track content performance and generation metrics
- [ ] **Team Collaboration** - Multi-user support with role-based permissions
- [ ] **Content Export Options** - Export to WordPress, LinkedIn, etc.

### **API Enhancements**
- [ ] **Authentication System** - User login and session management
- [ ] **API Rate Limiting** - Prevent abuse with request throttling
- [ ] **Webhook Status Callbacks** - Receive updates when content generation completes
- [ ] **Content Storage API** - Store and retrieve generated content

---

## 🎯 Recommended Next Steps for Development

### **Phase 1: Enhanced User Experience (High Priority)**
1. **Status Dashboard**: Create a dashboard showing workflow execution status
2. **Content Preview**: Display generated content directly in the interface
3. **Template System**: Allow users to save and reuse form configurations
4. **History Panel**: Show recent content generation requests

### **Phase 2: Advanced Integration (Medium Priority)**
1. **Real-time Updates**: WebSocket integration for live status updates
2. **Content Management**: Store and organize generated content
3. **Publishing Integration**: Direct publishing to WordPress, LinkedIn API
4. **Analytics**: Track content performance and user engagement

### **Phase 3: Enterprise Features (Lower Priority)**
1. **User Authentication**: Multi-user support with permissions
2. **Team Collaboration**: Shared workspaces and content approval workflows
3. **Advanced Analytics**: Detailed reporting and performance metrics
4. **White-label Options**: Customizable branding and themes

---

## 🏗️ Project Architecture

### **Frontend Stack**
- **HTML5** - Semantic markup with accessibility features
- **CSS3** - Modern styling with CSS Grid, Flexbox, and custom properties
- **Vanilla JavaScript** - No framework dependencies, modern ES6+ features
- **Progressive Enhancement** - Works with and without JavaScript

### **Integration Layer**
- **N8N Workflow Engine** - Handles content generation automation
- **NewsAPI Integration** - Fetches current industry news and trends
- **AI Content Generation** - Creates blog posts and LinkedIn content
- **Webhook Communication** - RESTful API communication pattern

### **File Structure**
```
├── index.html              # Main application interface
├── css/
│   └── style.css          # Professional styling and responsive design
├── js/
│   └── main.js           # Form handling, validation, and API communication
├── workflow.json          # N8N workflow configuration (reference)
└── README.md             # This documentation
```

---

## 🚀 Quick Start Guide

### **For Users**
1. Open `index.html` in your web browser
2. Select your industry focus area
3. Fill in the required content parameters
4. Click "Generate Content" to submit to the workflow
5. Monitor the status updates for completion

### **For Developers**
1. Ensure N8N workflow is deployed with the `rmis-content-input` webhook
2. Update the webhook URL in `js/main.js` if needed
3. Customize form fields or validation rules as required
4. Deploy the static files to your web server
5. Test the integration with your N8N instance

---

## 🔧 Configuration Options

### **Webhook Configuration**
- **Default Endpoint**: `/rmis-content-input`
- **Expected Response**: JSON with status information
- **Timeout**: 30 seconds for initial submission

### **Form Defaults**
The application includes intelligent defaults based on the N8N workflow:
- **Content Type**: Both (Blog + LinkedIn)
- **Call to Action**: Webinar registration
- **Target Audience**: Risk Managers, CROs, Industry Leaders

### **Validation Rules**
- **Focus Area**: Required selection
- **Specific Topic**: Minimum 10 characters
- **Key Message**: Minimum 20 characters
- **Target Audience**: Minimum 5 characters

---

## 📊 Data Models and Storage

### **Form Data Model**
```typescript
interface RMISContentRequest {
  focusArea: 'Defence' | 'Healthcare' | 'Financial' | 'Manufacturing' | 'General';
  specificTopic: string;
  keyMessage: string;
  targetAudience: string;
  callToAction: 'webinar' | 'consultation' | 'whitepaper' | 'contact' | 'demo';
  contentType: 'both' | 'blog' | 'linkedin';
  keyEvents?: string;
  additionalNotes?: string;
}
```

### **Storage Services**
- **Client-side**: LocalStorage for form state preservation (planned)
- **Server-side**: N8N workflow handles data processing and storage
- **Content Storage**: Generated content managed by N8N workflow

---

## 🌐 Public URLs

### **Production URLs** (Update when deployed)
- **Main Application**: `https://your-domain.com/`
- **API Endpoint**: `https://your-n8n-instance.com/webhook/rmis-content-input`

### **Development URLs**
- **Local Development**: `file://` or local web server
- **Local N8N**: `http://localhost:5678/webhook/rmis-content-input`

---

## 🤝 Contributing

This project serves as the frontend interface for the RMIS content generation workflow. Key areas for contribution:

1. **UI/UX Improvements**: Enhanced form design and user experience
2. **Integration Features**: Better workflow status tracking and content preview
3. **Mobile Optimization**: Enhanced mobile experience and PWA features
4. **Accessibility**: WCAG compliance and screen reader optimization
5. **Performance**: Code optimization and loading speed improvements

---

## 📄 License

This project is designed for internal use with RMIS content generation workflows. Please ensure compliance with your organization's usage policies and any third-party service terms of use (NewsAPI, AI services, etc.).

---

**Last Updated**: 2024-12-16  
**Version**: 1.0.0  
**Compatibility**: Modern browsers with ES6+ support