# Sagemind AI

Parent repository for all Sagemind AI projects and organizational content.

## Structure

```
sagemind/
├── brand/          # Brand assets, logos, style guides
├── planning/       # Strategic planning, roadmaps
├── docs/           # Shared documentation
├── projects/       # Submodules for deployable projects
│   └── (project submodules live here)
```

## Projects

*Submodules will be added as projects are created or migrated.*

## Working with this Repo

This repo uses **git submodules** for independent projects that need their own deployment pipelines.

### Cloning with all submodules
```bash
git clone --recurse-submodules https://github.com/JKHeadley/sagemind.git
```

### Updating submodules after pulling
```bash
git submodule update --init --recursive
```

### Adding a new project as a submodule
```bash
git submodule add https://github.com/JKHeadley/<project-repo>.git projects/<project-name>
```

## About Sagemind AI

Sagemind AI is an LLC focused on AI-powered projects and tools.
