# Contributing to RMIS Content Generator

Thank you for your interest in contributing to the RMIS Content Generator! This document provides guidelines for contributing to this project.

## 🎯 Project Overview

This is a static web application that provides a user-friendly interface for initiating automated RMIS content generation workflows via N8N. The application focuses on professional UI/UX for risk management industry content creation.

## 🚀 Getting Started

### Prerequisites
- Modern web browser with ES6+ support
- Basic knowledge of HTML, CSS, and JavaScript
- Understanding of N8N workflows (for backend integration)
- Git for version control

### Local Development Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/YOUR_USERNAME/rmis-content-generator.git
   cd rmis-content-generator
   ```

2. **Install development dependencies** (optional)
   ```bash
   npm install
   ```

3. **Start local development server**
   ```bash
   npm run dev
   # OR simply open index.html in your browser
   ```

4. **Access the application**
   - Open `http://localhost:3000` in your browser
   - Or directly open `index.html` file

## 📁 Project Structure

```
├── index.html              # Main application interface
├── css/
│   └── style.css          # Professional styling and responsive design
├── js/
│   └── main.js           # Form handling, validation, and API communication
├── workflow.json          # N8N workflow configuration (reference)
├── README.md             # Project documentation
├── CONTRIBUTING.md       # This file
├── package.json          # Project metadata and scripts
└── .gitignore           # Git ignore rules
```

## 🎨 Development Guidelines

### Code Style
- **HTML**: Use semantic HTML5 elements and proper accessibility attributes
- **CSS**: Follow BEM methodology for class naming, use CSS custom properties
- **JavaScript**: ES6+ syntax, no external dependencies, comprehensive error handling
- **Formatting**: Use consistent indentation (2 spaces), meaningful variable names

### Design Principles
- **Professional Appearance**: Industry-appropriate colors and typography
- **Responsive Design**: Mobile-first approach, works on all screen sizes
- **Accessibility**: WCAG 2.1 AA compliance, proper ARIA labels
- **Performance**: Minimal dependencies, optimized loading times

### File Organization
- Keep CSS organized by components/sections
- Use meaningful file and function names
- Comment complex logic and important decisions
- Maintain consistent code formatting

## 🔧 Types of Contributions

### 1. Bug Fixes
- Fix form validation issues
- Resolve responsive design problems
- Address browser compatibility issues
- Correct API integration problems

### 2. Feature Enhancements
- **UI/UX Improvements**: Better form design, animations, user feedback
- **Validation Enhancements**: More sophisticated form validation
- **Integration Features**: Status tracking, content preview, history
- **Accessibility**: Screen reader support, keyboard navigation

### 3. Documentation
- Improve README documentation
- Add code comments and documentation
- Create user guides and tutorials
- Update API documentation

### 4. Testing
- Add form validation tests
- Create browser compatibility tests
- Implement accessibility testing
- Add integration tests with N8N

## 📝 Contribution Process

### 1. Issues
- Check existing issues before creating new ones
- Use clear, descriptive titles
- Provide detailed reproduction steps for bugs
- Include browser/OS information for bugs

### 2. Pull Requests
- Fork the repository and create a feature branch
- Make focused, atomic commits with clear messages
- Test your changes across different browsers
- Update documentation as needed
- Submit PR with detailed description

### 3. Commit Message Format
```
type(scope): brief description

- Detailed explanation of changes
- Reference any related issues

Examples:
feat(form): add real-time validation for industry focus
fix(css): resolve mobile layout issues on iOS Safari
docs(readme): update installation instructions
```

## 🧪 Testing Guidelines

### Manual Testing Checklist
- [ ] Form submits successfully with valid data
- [ ] Validation errors display correctly
- [ ] Responsive design works on mobile/tablet/desktop
- [ ] All interactive elements are accessible via keyboard
- [ ] Status messages display appropriately
- [ ] Preview functionality works correctly

### Browser Testing
Test changes in:
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🎯 Priority Areas for Contribution

### High Priority
1. **Real-time Status Updates**: WebSocket integration for workflow progress
2. **Content Preview**: Display generated content in the interface
3. **Enhanced Validation**: More sophisticated form validation rules
4. **Mobile UX**: Improved mobile user experience

### Medium Priority
1. **Template System**: Save/load form configurations
2. **History Dashboard**: View previous content requests
3. **Analytics Integration**: Track usage and performance
4. **Progressive Web App**: PWA features for offline usage

### Lower Priority
1. **Theming System**: Customizable color schemes
2. **Multi-language Support**: Internationalization
3. **Advanced Animation**: Smooth transitions and micro-interactions
4. **Integration Tests**: Automated testing with N8N

## 🔒 Security Considerations

- **Input Validation**: Always validate user input on client and server side
- **XSS Prevention**: Properly escape user-generated content
- **API Security**: Use HTTPS for all API communications
- **Data Privacy**: Follow GDPR guidelines for user data handling

## 📞 Getting Help

- **Issues**: Create a GitHub issue for bugs or feature requests
- **Discussions**: Use GitHub discussions for general questions
- **Documentation**: Check README.md for setup and usage information

## 🏷️ Versioning

This project follows [Semantic Versioning](https://semver.org/):
- **MAJOR**: Breaking changes to API or major UI overhauls
- **MINOR**: New features, enhancements
- **PATCH**: Bug fixes, documentation updates

## 📄 License

By contributing to this project, you agree that your contributions will be licensed under the same license as the project (see LICENSE file).

---

Thank you for contributing to the RMIS Content Generator! Your efforts help make risk management content creation more efficient and professional.