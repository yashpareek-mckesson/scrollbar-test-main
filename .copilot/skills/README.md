# Copilot Skills

This directory contains custom skills for GitHub Copilot to help automate common tasks in this project.

## Available Skills

### 🔍 discover-scrollbars.md

**Purpose**: Automatically discover all scrollbar implementations in a repository and generate a comprehensive migration plan.

**Use Cases**:
- Starting scrollbar migration in a new repository
- Auditing existing scrollbar implementations
- Planning multi-repo migration work
- Generating effort estimates for migration tickets

**How to Use**:

In any repository (library or consumer app), invoke the skill with:

```
@workspace Use the .copilot/skills/discover-scrollbars.md skill to:
1. Find all scrollbar implementations in this repository
2. Identify if this is the library or a consumer repo
3. Generate a detailed migration plan with code examples
4. Provide risk assessment and timeline

Repository: [YOUR_REPO_NAME]
```

**What It Does**:

1. ✅ Searches for native CSS scrollbars (`::-webkit-scrollbar`)
2. ✅ Finds scrollbar library usage (react-custom-scrollbars, SimpleBar, OverlayScrollbars, etc.)
3. ✅ Identifies custom scrollbar components
4. ✅ Checks Module Federation configs (for MFEs)
5. ✅ Documents all findings with file paths and line numbers
6. ✅ Generates migration patterns with before/after code examples
7. ✅ Provides effort estimates and timeline
8. ✅ Creates comprehensive testing checklist
9. ✅ Assesses risks and provides rollback plan
10. ✅ Outputs a complete `SCROLLBAR_MIGRATION_PLAN_[REPO_NAME].md` file

**Output Format**:

The skill generates a detailed markdown file with:
- Executive summary (effort, risk level, priority)
- Complete inventory of all scrollbar implementations
- Step-by-step migration plan with code examples
- Testing checklist
- Timeline and ownership table
- Risk assessment
- Success criteria

**Example Output**: See SIMPLEBAR_IMPLEMENTATION_GUIDE.md Section 11 for example output structure.

---

## Creating New Skills

To add new skills to this directory:

1. Create a new `.md` file with a descriptive name
2. Add YAML frontmatter with `description` and `keywords`
3. Write clear, step-by-step instructions
4. Include example usage and expected outputs
5. Update this README with the new skill documentation

**Skill Template**:

```markdown
---
description: Brief description of what this skill does
keywords: keyword1, keyword2, keyword3
---

# Skill Name

## What This Skill Does
[Clear explanation]

## When to Use This Skill
[Use cases]

## Instructions
[Step-by-step guide]

## Expected Output
[What the user should get]

## Related Documentation
[Links to other docs]
```

---

## Related Documentation

- **[MULTI_REPO_QUICK_START.md](../../MULTI_REPO_QUICK_START.md)**: Quick start guide for multi-repo migrations
- **[SIMPLEBAR_IMPLEMENTATION_GUIDE.md](../../SIMPLEBAR_IMPLEMENTATION_GUIDE.md)**: Complete implementation guide
- **[IMPLEMENTATION_EXAMPLES.md](../../IMPLEMENTATION_EXAMPLES.md)**: Code examples for all scrollbar types
