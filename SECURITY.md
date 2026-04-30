# Security Policy

## Reporting a Vulnerability

If you discover a security vulnerability in this project, please email trailmail123456@gmail.com with the following information:

1. A description of the vulnerability
2. The affected versions
3. Steps to reproduce (if applicable)
4. Potential impact

Please do not open public GitHub issues for security vulnerabilities.

## Security Guidelines

### For Contributors

- Never commit sensitive information (API keys, passwords, tokens)
- Use `.env` files for local configuration (never commit `.env`)
- Keep dependencies up to date
- Review pull requests for security issues
- Report suspicious activity immediately

### For Users

- Always use `.env` files for sensitive configuration
- Never share your `.env` file
- Keep your Python environment updated
- Update all dependencies regularly

## Supported Versions

| Version | Supported          |
| ------- | ------------------ |
| 0.1.x   | :white_check_mark: |

## Dependencies

This project regularly updates its dependencies to patch security vulnerabilities. Check `requirements.txt` for the latest versions.

## Best Practices

1. **Environment Variables**: Use `.env.example` as a template
2. **Dependencies**: Run `pip list --outdated` regularly
3. **Code Review**: Always review changes before merging
4. **Testing**: Run tests before committing
5. **Documentation**: Keep security practices documented
