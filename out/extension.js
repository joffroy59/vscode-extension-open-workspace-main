"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.activate = activate;
exports.deactivate = deactivate;
const vscode = require("vscode");
const fs = require("fs");
const path = require("path");
async function activate(context) {
    console.log('Extension "vscode-extension-open-workspace" is now active!');
    const disposable = vscode.commands.registerCommand('vscode-extension-open-workspace.openExistingWorkspace', async () => {
        await checkAndOpenWorkspace();
    });
    context.subscriptions.push(disposable);
    // Check automatically on startup if enabled
    const config = vscode.workspace.getConfiguration('openWorkspaceIfExists');
    if (config.get('enabled', true)) {
        await checkAndOpenWorkspace();
    }
}
async function checkAndOpenWorkspace() {
    const workspaceFolders = vscode.workspace.workspaceFolders;
    if (!workspaceFolders || workspaceFolders.length === 0) {
        return;
    }
    // If already in a workspace file, don't re-open
    if (vscode.workspace.workspaceFile) {
        return;
    }
    const rootPath = workspaceFolders[0].uri.fsPath;
    const config = vscode.workspace.getConfiguration('openWorkspaceIfExists');
    const pattern = config.get('pattern', '*.code-workspace');
    try {
        const candidates = new Map();
        const local = await vscode.workspace.findFiles(new vscode.RelativePattern(rootPath, pattern), null, 1);
        for (const uri of local) {
            candidates.set(normalize(uri.fsPath), uri);
        }
        const workspacesFolder = config.get('workspacesFolder', '').trim().replace(/\$\{env:([^}]+)\}/g, (_match, name) => {
            const value = process.env[name];
            if (!value) {
                throw new Error(`Environment variable "${name}" in workspacesFolder is not set.`);
            }
            return value;
        });
        if (workspacesFolder && fs.existsSync(workspacesFolder)) {
            for (const file of findWorkspaceFiles(workspacesFolder, pattern)) {
                if (workspaceContainsFolder(file, rootPath)) {
                    candidates.set(normalize(file), vscode.Uri.file(file));
                }
            }
        }
        if (candidates.size === 0) {
            return;
        }
        let selected;
        if (candidates.size === 1) {
            selected = [...candidates.values()][0];
            if (config.get('confirmBeforeOpen', true)) {
                const confirmOpen = await vscode.window.showInformationMessage(`Found workspace file: ${path.basename(selected.fsPath)}. Open it?`, 'Open Workspace', 'Ignore');
                if (confirmOpen !== 'Open Workspace') {
                    return;
                }
            }
        }
        else {
            const picked = await vscode.window.showQuickPick([...candidates.values()].map(uri => ({
                label: path.basename(uri.fsPath),
                description: uri.fsPath,
                uri
            })), { placeHolder: 'Multiple workspaces contain this folder. Choose one to open.' });
            selected = picked?.uri;
        }
        if (selected) {
            await vscode.commands.executeCommand('vscode.openFolder', selected, { forceNewWindow: false });
        }
    }
    catch (error) {
        console.error('Error searching for workspace files:', error);
        await vscode.window.showErrorMessage(`Error searching for workspace files: ${String(error)}`);
    }
}
function normalize(p) {
    return path.resolve(p).replace(/[\\/]+$/, '').toLowerCase();
}
function globToRegExp(glob) {
    const escaped = glob.replace(/[.+^${}()|[\]\\]/g, '\\$&').replace(/\*/g, '.*').replace(/\?/g, '.');
    return new RegExp(`^${escaped}$`, 'i');
}
function findWorkspaceFiles(dir, pattern, out = []) {
    const matcher = globToRegExp(path.basename(pattern));
    let entries;
    try {
        entries = fs.readdirSync(dir, { withFileTypes: true });
    }
    catch (error) {
        console.error(`Unable to read workspace directory "${dir}":`, error);
        return out;
    }
    for (const entry of entries) {
        const full = path.join(dir, entry.name);
        if (entry.isDirectory()) {
            if (entry.name !== 'node_modules' && entry.name !== '.git') {
                findWorkspaceFiles(full, pattern, out);
            }
        }
        else if (entry.isFile() && matcher.test(entry.name)) {
            out.push(full);
        }
    }
    return out;
}
// Strips comments and trailing commas from JSONC, leaving string contents intact
function stripJsonc(text) {
    let out = '';
    let i = 0;
    while (i < text.length) {
        const c = text[i];
        if (c === '"') {
            let j = i + 1;
            while (j < text.length && text[j] !== '"') {
                j += text[j] === '\\' ? 2 : 1;
            }
            out += text.slice(i, j + 1);
            i = j + 1;
        }
        else if (c === '/' && text[i + 1] === '/') {
            while (i < text.length && text[i] !== '\n') {
                i++;
            }
        }
        else if (c === '/' && text[i + 1] === '*') {
            const end = text.indexOf('*/', i + 2);
            i = end < 0 ? text.length : end + 2;
        }
        else {
            out += c;
            i++;
        }
    }
    let result = '';
    i = 0;
    while (i < out.length) {
        if (out[i] === '"') {
            let j = i + 1;
            while (j < out.length && out[j] !== '"') {
                j += out[j] === '\\' ? 2 : 1;
            }
            result += out.slice(i, j + 1);
            i = j + 1;
        }
        else if (out[i] === ',' && /^\s*[}\]]/.test(out.slice(i + 1))) {
            i++;
        }
        else {
            result += out[i++];
        }
    }
    return result.replace(/^\uFEFF/, '');
}
function workspaceContainsFolder(workspaceFile, folderPath) {
    try {
        const content = JSON.parse(stripJsonc(fs.readFileSync(workspaceFile, 'utf8')));
        const target = normalize(folderPath);
        const baseDir = path.dirname(workspaceFile);
        return content !== null && Array.isArray(content.folders) && content.folders.some((f) => typeof f === 'object' && f !== null && 'path' in f &&
            typeof f.path === 'string' && normalize(path.resolve(baseDir, f.path)) === target);
    }
    catch (error) {
        console.error(`Unable to parse workspace file "${workspaceFile}":`, error);
        return false;
    }
}
function deactivate() { }
//# sourceMappingURL=extension.js.map