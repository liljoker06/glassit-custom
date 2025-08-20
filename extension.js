const vscode = require('vscode');
const { exec } = require('child_process');
const path = require('path');

let currentOpacity = 230; // default value (200 = more transparent, 255 = opaque)

function runGlassIt(value) {
    const exePath = path.join(__dirname, 'bin', 'GlassItApp.exe');
    exec(`"${exePath}" ${value}`, (err) => {
        if (err) {
            vscode.window.showErrorMessage("Error launching GlassItApp.exe: " + err.message);
        }
    });
}

function getOpacityPercent() {
    // Convert 100–255 → percentage (approx)
    return Math.round((currentOpacity / 255) * 100);
}

function activate(context) {
    console.log('GlassIt Custom extension is active!');

    // Test
    let helloCmd = vscode.commands.registerCommand('glassit-custom.helloWorld', () => {
        vscode.window.showInformationMessage('Hello from GlassIt Custom 👋');
    });

    // Start
    let startCmd = vscode.commands.registerCommand('glassit-custom.start', () => {
        runGlassIt(currentOpacity);
        vscode.window.showInformationMessage(`GlassItApp started - Transparency: ${getOpacityPercent()}%`);
    });

    // Increase transparency
    let increaseCmd = vscode.commands.registerCommand('glassit-custom.increase', () => {
        if (currentOpacity > 100) {
            currentOpacity -= 10;
            runGlassIt(currentOpacity);
            vscode.window.showInformationMessage(`Transparency increased 🔼 (${getOpacityPercent()}%)`);
        } else {
            vscode.window.showWarningMessage("Already at maximum transparency!");
        }
    });

    // Decrease transparency
    let decreaseCmd = vscode.commands.registerCommand('glassit-custom.decrease', () => {
        if (currentOpacity < 255) {
            currentOpacity += 10;
            runGlassIt(currentOpacity);
            vscode.window.showInformationMessage(`Transparency decreased 🔽 (${getOpacityPercent()}%)`);
        } else {
            vscode.window.showWarningMessage("Already fully opaque!");
        }
    });

    // Reset transparency
    let resetCmd = vscode.commands.registerCommand('glassit-custom.reset', () => {
        currentOpacity = 230;
        runGlassIt(currentOpacity);
        vscode.window.showInformationMessage(`Transparency reset 🔄 (${getOpacityPercent()}%)`);
    });

    context.subscriptions.push(helloCmd, startCmd, increaseCmd, decreaseCmd, resetCmd);
}

function deactivate() {}

module.exports = { activate, deactivate };
