## 2026-10-07T19:15:19Z

### Environment
- IDE: VS Code
- Assistant: GitHub Copilot
- Model: unknown

### User Prompt
build package

### Files Modified
- tsconfig.json

### Summary
Restricted automatically included ambient TypeScript types to the extension's required Node.js and VS Code types so packaging can compile reliably.

---

## 2026-10-08T02:02:00Z

### Environment
- IDE: VS Code
- Assistant: GitHub Copilot
- Model: unknown

### User Prompt
release and publish to marketplace

### Files Modified
- package.json
- README.md
- .copilot-history/prompt-history.md

### Summary
Restored immediate startup activation required by the documented behavior and regression test, and updated the release examples to version 1.0.2 before validating the candidate.

---

## 2026-10-07T23:45:21Z

### Environment
- IDE: VS Code
- Assistant: GitHub Copilot
- Model: unknown

### User Prompt
add in settings a checkbox to set show or not the popup for confimation

### Files Modified
- package.json
- src/extension.ts
- test/extension.test.js
- .copilot-history/prompt-history.md

### Summary
Added a setting to control the single-workspace confirmation popup, opening the workspace directly when the popup is disabled.

---

## 2026-10-07T21:13:01Z

### Environment
- IDE: VS Code
- Assistant: GitHub Copilot
- Model: gpt-6-luna

### User Prompt
change version to 1.0.1 and cerate the tag

### Files Modified
- .copilot-history/prompt-history.md
- package.json
- package-lock.json
- README.md

### Summary
Bumped the extension version to 1.0.1 and updated release instructions for the corresponding tag.

---

## 2026-10-07T21:11:54Z

### Environment
- IDE: VS Code
- Assistant: GitHub Copilot
- Model: gpt-6-luna

### User Prompt
Automate `.vsix` Releases via GitHub Actions

### Files Modified
- .github/workflows/release.yml
- README.md

### Summary
Added a tag-triggered GitHub Actions workflow that tests the extension, packages a version-matched VSIX, and attaches it to a GitHub Release; documented the release process.

---

## 2026-10-07T21:08:00Z

### Environment
- IDE: VS Code
- Assistant: GitHub Copilot
- Model: gpt-6-luna

### User Prompt
change exetension ico to a generated one about worksapce open auto

### Files Modified
- package.json
- images/open-workspace.svg
- images/open-workspace.png

### Summary
Added a custom workspace auto-open icon and configured it as the extension icon.

---

## 2026-10-07T19:15:19Z

### Environment
- IDE: VS Code
- Assistant: GitHub Copilot
- Model: unknown

### User Prompt
build package

### Files Modified
- .vscodeignore

### Summary
Excluded local Copilot prompt-history data from the distributable VSIX package.

---

## 2026-10-07T23:02:45Z

### Environment
- IDE: VS Code
- Assistant: GitHub Copilot
- Model: unknown

### User Prompt
fix

### Files Modified
- package.json
- .copilot-history/prompt-history.md

### Summary
Added the Marketplace publisher identifier `joffroy` to the extension manifest to fix the upload validation error.

---

## 2026-10-07T23:09:30Z

### Environment
- IDE: VS Code
- Assistant: GitHub Copilot
- Model: unknown

### User Prompt
do the fix for

### Files Modified
- package.json
- LICENSE
- README.md
- .github/workflows/release.yml
- .copilot-history/prompt-history.md

### Summary
Added repository metadata and the user-selected Apache-2.0 license to address Marketplace packaging warnings.

---

## 2026-10-07T23:50:31Z

### Environment
- IDE: VS Code
- Assistant: GitHub Copilot
- Model: unknown

### User Prompt
change version and build locally

### Files Modified
- package.json
- package-lock.json
- .copilot-history/prompt-history.md

### Summary
Bumped the extension version from 1.0.1 to 1.0.2 in the package manifest and lockfile, then built locally.

---
