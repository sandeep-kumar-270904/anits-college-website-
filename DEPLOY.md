# Deployment Guide

This guide covers how to deploy the ANITS College Translation Chat Application.

## Prerequisites

- Python 3.8 or higher
- Virtual environment set up
- All dependencies installed from `requirements.txt`
- Environment variables configured in `.env`

## Local Deployment

### 1. Setup

```bash
# Clone the repository
git clone https://github.com/trailmail123456/anits-college-website-.git
cd anits-college-website-

# Create and activate virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt
```

### 2. Configure Environment

```bash
# Copy and configure environment variables
cp .env.example .env

# Edit .env with your settings
nano .env  # or use your preferred editor
```

### 3. Run Locally

```bash
cd backend
python app.py
```

The application will be available at `http://localhost:5000`

## Production Deployment

### Using Gunicorn

```bash
# Install Gunicorn
pip install gunicorn

# Run with Gunicorn
cd backend
gunicorn -w 4 -b 0.0.0.0:8000 app:app
```

### Using Docker (Optional)

Create a `Dockerfile`:

```dockerfile
FROM python:3.10-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

EXPOSE 5000

CMD ["python", "backend/app.py"]
```

Build and run:

```bash
docker build -t anits-college-chat .
docker run -p 5000:5000 --env-file .env anits-college-chat
```

### Environment Variables for Production

```env
FLASK_ENV=production
FLASK_DEBUG=0
APP_SECRET_KEY=your-secure-random-key
DATABASE_URL=your-production-database-url
```

## Security Checklist

- [ ] All secrets are in `.env` (never in code)
- [ ] Debug mode is disabled
- [ ] Secret key is strong and random
- [ ] Database credentials are secure
- [ ] HTTPS is enabled
- [ ] Dependencies are up to date
- [ ] Firewall rules are configured

## Monitoring

- Check application logs regularly
- Monitor server resources (CPU, memory, disk)
- Keep dependencies updated
- Review security advisories

## Troubleshooting

### Port Already in Use

```bash
# Find and kill process using port 5000
lsof -i :5000
kill -9 <PID>
```

### Module Import Errors

```bash
# Reinstall dependencies
pip install --force-reinstall -r requirements.txt
```

### Database Connection Issues

```bash
# Check DATABASE_URL in .env
# Verify database server is running
# Check network connectivity
```

## Support

For deployment issues, see [SECURITY.md](SECURITY.md) and [CONTRIBUTING.md](CONTRIBUTING.md)
