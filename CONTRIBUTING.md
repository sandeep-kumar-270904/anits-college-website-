# Contributing to ANITS College Translation Chat Application

Thank you for your interest in contributing! We appreciate all contributions and want to make the process as smooth as possible.

## Code of Conduct

Please read and abide by our [Code of Conduct](CODE_OF_CONDUCT.md).

## How Can I Contribute?

### Reporting Bugs

Before creating bug reports, check the issue list as you might find out that you don't need to create one. When you are creating a bug report, please include as many details as possible:

- **Use a clear and descriptive title**
- **Describe the exact steps which reproduce the problem**
- **Provide specific examples to demonstrate the steps**
- **Describe the behavior you observed after following the steps**
- **Explain which behavior you expected to see instead and why**
- **Include screenshots and animated GIFs if possible**
- **Include your environment details** (OS, Python version, etc.)

### Suggesting Enhancements

- **Use a clear and descriptive title**
- **Provide a step-by-step description of the suggested enhancement**
- **Provide specific examples to demonstrate the steps**
- **Describe the current behavior and expected behavior**
- **Explain the use case and why this enhancement would be useful**

## Development Setup

### 1. Fork the Repository

Click the "Fork" button on the GitHub repository page.

### 2. Clone Your Fork

```bash
git clone https://github.com/YOUR-USERNAME/anits-college-website-.git
cd anits-college-website-
```

### 3. Add Upstream Remote

```bash
git remote add upstream https://github.com/trailmail123456/anits-college-website-.git
```

### 4. Create a Branch

```bash
git checkout -b feature/your-feature-name
# or
git checkout -b fix/your-bug-fix
```

### 5. Make Your Changes

- Write clean, readable code
- Follow PEP 8 style guidelines
- Add comments for complex logic
- Update documentation as needed

### 6. Test Your Changes

```bash
# Run tests
pytest

# Check code style
flake8 .
```

### 7. Commit Your Changes

```bash
git add .
git commit -m "Add feature: description of your changes"
```

Use clear, concise commit messages. Examples:
- `Add translation feature for Spanish`
- `Fix PDF parsing bug`
- `Update documentation`

### 8. Push to Your Fork

```bash
git push origin feature/your-feature-name
```

### 9. Create a Pull Request

1. Go to the original repository
2. Click "New Pull Request"
3. Select your branch
4. Fill in the PR template
5. Submit the PR

## Pull Request Guidelines

- **One feature per PR** - Keep PRs focused and manageable
- **Clear title and description** - Explain what and why
- **Reference issues** - Link to related issues using `#issue-number`
- **Keep it updated** - Rebase if the main branch has changed
- **Respond to reviews** - Address feedback promptly

## Commit Message Guidelines

```
<type>: <subject>

<body>

<footer>
```

### Types
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, missing semicolons, etc.)
- `refactor`: Code refactoring without feature changes
- `test`: Adding or updating tests
- `chore`: Dependency updates, build process changes

### Example
```
feat: add Spanish translation support

Implement Spanish language translation using Google Translate API.
Users can now select Spanish as their preferred language.

Fixes #123
```

## Coding Standards

### Python

- Follow [PEP 8](https://www.python.org/dev/peps/pep-0008/)
- Use type hints where appropriate
- Write docstrings for functions and classes
- Aim for 80-100 character line length

### Example

```python
def translate_text(text: str, target_language: str) -> str:
    """
    Translate text to target language.
    
    Args:
        text: The text to translate
        target_language: The target language code (e.g., 'es', 'fr')
    
    Returns:
        The translated text
    """
    # Implementation here
    pass
```

## Questions?

- Check the [README](README.md)
- Search existing [Issues](https://github.com/trailmail123456/anits-college-website-/issues)
- Open a new [Issue](https://github.com/trailmail123456/anits-college-website-/issues/new) for questions

## Recognition

Contributors will be recognized in:
- The project README
- GitHub's contributor list
- Release notes

Thank you for contributing! 🎉
