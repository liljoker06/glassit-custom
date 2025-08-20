const vscode = require('vscode');
const { exec } = require('child_process');
const path = require('path');

let currentOpacity = 230; // valeur par défaut (200 = transparent, 255 = opaque)

function runGlassIt(value) {
    const exePath = path.join(__dirname, 'bin', 'GlassItApp.exe');
    exec(`"${exePath}" ${value}`, (err) => {
        if (err) {
            vscode.window.showErrorMessage("Error launching GlassItApp.exe: " + err.message);
        }
    });
}

function getOpacityPercent() {
    return Math.round((currentOpacity / 255) * 100);
}

// Sauvegarder la transparence dans settings.json (global)
async function saveOpacity(value) {
    const config = vscode.workspace.getConfiguration('glassit-custom');
    await config.update('opacity', value, vscode.ConfigurationTarget.Global);
}

// Charger la transparence depuis settings.json (forcer la lecture globale)
function loadOpacity() {
    const globalConfig = vscode.workspace.getConfiguration(undefined, null);
    return globalConfig.get('glassit-custom.opacity', 230);
}

function activate(context) {
    console.log('GlassIt Custom extension is active!');

    // Charger la transparence sauvegardée
    currentOpacity = loadOpacity();

    // Appliquer la transparence au démarrage
    runGlassIt(currentOpacity);

    // Commande hello (test)
    let helloCmd = vscode.commands.registerCommand('glassit-custom.helloWorld', () => {
        vscode.window.showInformationMessage('Hello from GlassIt Custom 👋');
    });

    // Démarrer avec transparence sauvegardée
    let startCmd = vscode.commands.registerCommand('glassit-custom.start', () => {
        runGlassIt(currentOpacity);
        vscode.window.showInformationMessage(`GlassItApp started - Transparency: ${getOpacityPercent()}%`);
    });

    // Augmenter la transparence (plus clair)
    let increaseCmd = vscode.commands.registerCommand('glassit-custom.increase', async () => {
        if (currentOpacity < 255) {
            currentOpacity += 10; // 🔧 corrigé : augmente la valeur = plus opaque
            runGlassIt(currentOpacity);
            await saveOpacity(currentOpacity);
            vscode.window.showInformationMessage(`Transparency decreased 🔽 (${getOpacityPercent()}%)`);
        } else {
            vscode.window.showWarningMessage("Already fully opaque!");
        }
    });

    // Diminuer la transparence (plus transparent)
    let decreaseCmd = vscode.commands.registerCommand('glassit-custom.decrease', async () => {
        if (currentOpacity > 100) {
            currentOpacity -= 10; // 🔧 corrigé : diminue la valeur = plus transparent
            runGlassIt(currentOpacity);
            await saveOpacity(currentOpacity);
            vscode.window.showInformationMessage(`Transparency increased 🔼 (${getOpacityPercent()}%)`);
        } else {
            vscode.window.showWarningMessage("Already at maximum transparency!");
        }
    });

    // Reset transparence
    let resetCmd = vscode.commands.registerCommand('glassit-custom.reset', async () => {
        currentOpacity = 230;
        runGlassIt(currentOpacity);
        await saveOpacity(currentOpacity);
        vscode.window.showInformationMessage(`Transparency reset 🔄 (${getOpacityPercent()}%)`);
    });

    context.subscriptions.push(helloCmd, startCmd, increaseCmd, decreaseCmd, resetCmd);
}

function deactivate() {}

module.exports = { activate, deactivate };
