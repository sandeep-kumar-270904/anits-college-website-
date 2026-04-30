# Troubleshooting Guide

Common issues and solutions for the ANITS College Translation Chat Application.

## Installation Issues

### Virtual Environment Not Activating

**Problem:** Virtual environment commands not recognized

**Solution:**

```bash
# On Windows
python -m venv venv
venv\Scripts\activate

# On macOS/Linux
python3 -m venv venv
source venv/bin/activate
```

### Python Version Mismatch

**Problem:** `Python 3.8+ required`

**Solution:**

```bash
# Check Python version
python --version

# Install Python 3.8+ from python.org
# Or use package manager:
# Ubuntu/Debian: sudo apt-get install python3.10
# macOS: brew install python@3.10
# Windows: Download from python.org
```

### Missing Dependencies

**Problem:** `ModuleNotFoundError: No module named 'flask'`

**Solution:**

```bash
# Ensure virtual environment is active
source venv/bin/activate  # macOS/Linux
# or
venv\Scripts\activate  # Windows

# Reinstall dependencies
pip install --force-reinstall -r requirements.txt
```

## Runtime Issues

### Flask App Not Starting

**Problem:** `Address already in use`

**Solution:**

```bash
# Find process using port 5000
lsof -i :5000  # macOS/Linux
netstat -ano | findstr :5000  # Windows

# Kill the process
kill -9 <PID>  # macOS/Linux
taskkill /PID <PID> /F  # Windows

# Change port in app.py:
# app.run(port=5001)
```

### Database Connection Error

**Problem:** `Could not connect to database`

**Solution:**

1. Check `.env` file has correct `DATABASE_URL`
2. Verify database server is running
3. Check network connectivity
4. Verify database credentials
5. Check firewall rules

### PDF Processing Error

**Problem:** `PyMuPDF: Cannot open document`

**Solution:**

```bash
# Reinstall PyMuPDF
pip install --force-reinstall PyMuPDF

# Check file exists and is readable
ls -la /path/to/file.pdf  # macOS/Linux
dir /path/to/file.pdf  # Windows
```

## Configuration Issues

### Missing Environment Variables

**Problem:** `KeyError: 'APP_SECRET_KEY'`

**Solution:**

```bash
# Copy example file
cp .env.example .env

# Add missing variables
nano .env  # Edit as needed

# Verify all required variables are set
```

### Debug Mode Issues

**Problem:** Too much logging or security exposure

**Solution:**

```env
# In .env for development only:
FLASK_DEBUG=1
FLASK_ENV=development

# In .env for production:
FLASK_DEBUG=0
FLASK_ENV=production
```

## Performance Issues

### Slow Response Times

**Solution:**

1. Check server resources (CPU, RAM, disk)
2. Monitor database queries
3. Enable caching
4. Optimize database indexes
5. Use CDN for static files

### High Memory Usage

**Solution:**

```bash
# Monitor memory usage
ps aux | grep python  # macOS/Linux
tasklist | findstr python  # Windows

# Profile code
python -m cProfile -s cumulative backend/app.py
```

## Testing Issues

### Tests Not Running

**Problem:** `pytest: command not found`

**Solution:**

```bash
# Install test dependencies
pip install pytest pytest-cov pytest-flask

# Run tests
pytest backend/tests/ -v
```

### Import Errors in Tests

**Solution:**

```bash
# Add project root to Python path
export PYTHONPATH="${PYTHONPATH}:/path/to/anits-college-website-"

# Or modify test configuration
# pytest.ini or conftest.py
```

## Git Issues

### Virtual Environment Committed by Accident

**Solution:**

```bash
# Remove from git tracking
git rm -r --cached backend/venv312/

# Update .gitignore
# Ensure it contains: backend/venv312/

# Commit the fix
git commit -m "Remove virtual environment from git tracking"
git push origin main
```

### Large File Issues

**Solution:**

```bash
# List large files
find . -type f -size +100M

# Add to .gitignore
echo "large_files/" >> .gitignore

# Remove from git history (advanced)
# See: https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/removing-sensitive-data-from-a-repository
```

## Getting Help

1. Check this troubleshooting guide
2. Review [CONTRIBUTING.md](CONTRIBUTING.md)
3. Check GitHub [Issues](https://github.com/trailmail123456/anits-college-website-/issues)
4. See [SECURITY.md](SECURITY.md) for security-related issues
5. Contact: trailmail123456@gmail.com

## Reporting Issues

When reporting issues, include:

- Error message (complete traceback)
- Operating system and version
- Python version
- Flask version
- Steps to reproduce
- Expected vs actual behavior
