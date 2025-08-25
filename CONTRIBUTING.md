# Contributing to Format-X 🤝

First off, thank you for considering contributing to Format-X!.

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [How Can I Contribute?](#how-can-i-contribute)
- [Development Setup](#development-setup)
- [Pull Request Process](#pull-request-process)
- [Coding Standards](#coding-standards)
- [Commit Guidelines](#commit-guidelines)
- [Issue Guidelines](#issue-guidelines)

## 📜 Code of Conduct

This project and everyone participating in it is governed by our commitment to creating a welcoming and inclusive environment. By participating, you are expected to uphold these values:

- Use welcoming and inclusive language
- Be respectful of differing viewpoints and experiences
- Gracefully accept constructive criticism
- Focus on what is best for the community
- Show empathy towards other community members

## 🚀 How Can I Contribute?

### 🐛 Reporting Bugs

Before creating bug reports, please check the existing issues as you might find out that you don't need to create one. When you are creating a bug report, please include as many details as possible:

**Bug Report Template:**

```
**Describe the bug**
A clear and concise description of what the bug is.

**To Reproduce**
Steps to reproduce the behavior:
1. Go to '...'
2. Click on '....'
3. Scroll down to '....'
4. See error

**Expected behavior**
A clear and concise description of what you expected to happen.

**Screenshots**
If applicable, add screenshots to help explain your problem.

**Environment:**
 - Browser [e.g. chrome, safari]
 - Version [e.g. 22]

**Additional context**
Add any other context about the problem here.
```

### 💡 Suggesting Enhancements

Enhancement suggestions are tracked as GitHub issues. When creating an enhancement suggestion, please include:

- A clear and descriptive title
- A detailed description of the proposed enhancement
- Explain why this enhancement would be useful
- List some other applications where this enhancement exists, if applicable

### 🔧 Code Contributions

#### Types of Contributions We're Looking For:

- 🐛 **Bug fixes**
- ✨ **New features**
- 📚 **Documentation improvements**
- 🎨 **UI/UX improvements**
- 🚀 **Performance optimizations**
- 🧪 **Tests**
- 🌐 **New format support**

## 🛠️ Development Setup

### Prerequisites

- Node.js 22 or higher
- pnpm
- Git

### Setup Steps

1. **Fork the repository**

   ```bash
   # Click the "Fork" button on GitHub, then clone your fork
   git clone https://github.com/YOUR-USERNAME/format-x.git
   cd format-x
   ```

2. **Add upstream remote**

   ```bash
   git remote add upstream https://github.com/isaias-alt/format-x.git
   ```

3. **Install dependencies**

   ```bash
   pnpm install
   ```

4. **Start development server**

   ```bash
   pnpm dev
   ```

5. **Open in browser**

   Visit [http://localhost:3000](http://localhost:3000)

### 🗂️ Project Structure

```
src/
├── app/                    # Next.js app directory
├── components/
│   ├── converter/         # Converter-specific components
│   ├── ui/               # Reusable UI components
│   └── ...
├── hooks/                # Custom React hooks
├── lib/                  # Utility functions and constants
└── ...
```

## 🔄 Pull Request Process

### Before Submitting

1. **Sync with upstream**

   ```bash
   git fetch upstream
   git switch main
   git merge upstream/main
   ```

2. **Create feature branch**

   ```bash
   git switch -c feature/your-feature-name
   # or
   git switch -c fix/your-bug-fix
   ```

3. **Make your changes**

   - Write clean, readable code
   - Follow our coding standards
   - Add tests if applicable
   - Update documentation if needed

4. **Commit your changes**

   ```bash
   git add .
   git commit -m "feat: add awesome new feature"
   ```

5. **Push to your fork**
   ```bash
   git push origin feature/your-feature-name
   ```

### Pull Request Template

When creating a pull request, please use this template:

```markdown
## Description

Brief description of changes

## Type of Change

- [ ] Bug fix (non-breaking change which fixes an issue)
- [ ] New feature (non-breaking change which adds functionality)
- [ ] Breaking change (fix or feature that would cause existing functionality to not work as expected)
- [ ] Documentation update

## Testing

- [ ] I have tested these changes locally

## Screenshots (if applicable)

Add screenshots to help explain your changes

## Checklist

- [ ] My code follows the project's coding standards
- [ ] I have performed a self-review of my code
- [ ] I have commented my code, particularly in hard-to-understand areas
- [ ] I have made corresponding changes to the documentation
- [ ] My changes generate no new warnings
```

## 📏 Coding Standards

### TypeScript/React

- Use TypeScript for all new files
- Use functional components with hooks
- Follow React best practices
- Use proper TypeScript types (avoid `any`)

### Code Style

```typescript
// ✅ Good
interface UserProps {
  name: string;
  age: number;
}

const UserCard: React.FC<UserProps> = ({ name, age }) => {
  return (
    <div className="p-4 border rounded">
      <h3>{name}</h3>
      <p>Age: {age}</p>
    </div>
  );
};

// ❌ Bad
const UserCard = (props: any) => {
  return <div>{props.name}</div>;
};
```

### File Naming

- Use kebab-case for files: `user-profile.tsx`
- Use PascalCase for components: `UserProfile`
- Use camelCase for functions and variables: `handleSubmit`

### CSS/Styling

- Use Tailwind CSS utility classes
- Keep custom CSS minimal
- Use CSS variables for theming

## 📝 Commit Guidelines

We follow [Conventional Commits](https://www.conventionalcommits.org/):

### Commit Types

- `feat:` New features
- `fix:` Bug fixes
- `docs:` Documentation changes
- `style:` Code style changes (formatting, etc.)
- `refactor:` Code refactoring
- `test:` Adding or updating tests
- `chore:` Maintenance tasks

### Examples

```bash
feat: add TOML format support
fix: resolve XML parsing error with special characters
docs: update README with new examples
style: improve button hover states
refactor: extract converter logic into separate hooks
test: add unit tests for JSON formatter
chore: update dependencies
```

## 🐛 Issue Guidelines

### Creating Issues

- Use clear, descriptive titles
- Include relevant labels
- Provide detailed descriptions
- Add screenshots/code examples when helpful

### Issue Labels

- `bug` - Something isn't working
- `enhancement` - New feature or request
- `documentation` - Documentation improvements
- `good first issue` - Good for newcomers
- `help wanted` - Extra attention is needed
- `priority: high` - High priority items

## 🏆 Recognition

Contributors will be recognized in:

- 📋 Our contributors README section

## 🤔 Questions?

- 💬 [Open a discussion](https://github.com/isaias-alt/format-x/discussions)
- 🐦 Twitter: [@lucascodev](https://twitter.com/lucascodev)

## 📚 Resources

- [Next.js](https://nextjs.org)
- [React](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)

---

Thank you for contributing to Format-X! 🎉 Your contributions help make this tool better for everyone.
