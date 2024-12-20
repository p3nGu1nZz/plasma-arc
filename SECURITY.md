# Security Policy

## Supported Versions

The following versions of the project are currently supported with security updates:

| Version | Supported          |
| ------- | ------------------ |
| 1.0.0   | :white_check_mark: |

## Reporting a Vulnerability

If you discover a security vulnerability within this project, please follow these steps:

1. **Do not open a public issue.** Instead, send an email to the project maintainer:
    - **Email:** rawsonkara@gmail.com

2. Include the following details in your email:
    - A description of the vulnerability.
    - Steps to reproduce the vulnerability.
    - Any potential impact or exploit scenarios.

3. The project maintainer will acknowledge receipt of your email within 48 hours and will work with you to understand and address the issue.

## Security Best Practices

To ensure the security of the project, please follow these best practices:

- **Keep dependencies up to date:** Regularly update project dependencies to the latest versions to ensure that security patches are applied.
- **Use environment variables:** Store sensitive information such as API tokens and configuration settings in environment variables. Do not hard-code sensitive information in the source code.
- **Validate input:** Always validate and sanitize user input to prevent injection attacks and other security vulnerabilities.
- **Use HTTPS:** Ensure that all communication between the client and server is encrypted using HTTPS.

## Build and Deployment Security

- **Environment Variables:** Ensure that sensitive information such as API tokens and configuration settings are stored in environment variables. Do not hard-code sensitive information in the source code.
- **Access Control:** Restrict access to the build and deployment environment to authorized personnel only.
- **Regular Audits:** Conduct regular security audits of the build and deployment process to identify and address potential vulnerabilities.

## Additional Resources

For more information on security best practices, please refer to the following resources:

- [OWASP Top Ten](https://owasp.org/www-project-top-ten/)
- [CWE/SANS Top 25 Most Dangerous Software Errors](https://cwe.mitre.org/top25/archive/2020/2020_cwe_top25.html)
- [Node.js Security Best Practices](https://nodejs.dev/learn/nodejs-security-best-practices)

Thank you for helping to keep this project secure!
