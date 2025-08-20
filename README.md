# GlassIt Custom

GlassIt Custom is a Visual Studio Code extension that allows you to control the transparency (opacity) of your VS Code window dynamically using keyboard shortcuts. 🪟✨

Currently, this extension works on **Windows** using the bundled `GlassItApp.exe`. Versions for **Linux** and **macOS** are planned soon.

---

## ✨ Features

* 🔼 Increase transparency: `Ctrl + Alt + Up`
* 🔽 Decrease transparency: `Ctrl + Alt + Down`
* 🔄 Reset transparency: `Ctrl + Alt + 0`

You will also see notifications showing the current transparency level in English.

---

## 🚀 Installation

### From VSIX (Local Install)

1. Clone or download this repository.
2. Run the packaging command:

   ```bash
   vsce package
   ```

   This will generate a `.vsix` file.
3. Install the extension manually in VS Code:

   ```bash
   code --install-extension glassit-custom-x.x.x.vsix
   ```

### From Marketplace (soon)

Once published, you will be able to install directly from the VS Code Marketplace.

---

## 🖥️ Usage

1. Press `Ctrl + Alt + Up` to make VS Code more transparent.
2. Press `Ctrl + Alt + Down` to make VS Code less transparent.
3. Press `Ctrl + Alt + 0` to reset to the default transparency level.

---

## ⚙️ Development

If you want to hack on this extension:

```bash
git clone <repo-url>
cd glassit-custom
npm install
npm run compile
```

To test in VS Code:

1. Open the project in VS Code.
2. Press `F5` to launch a new VS Code window with the extension loaded.

---

## 🔮 Roadmap

* [x] Windows support (with `GlassItApp.exe`)
* [ ] Linux support (planned)
* [ ] macOS support (planned)
* [ ] Configurable default transparency
* [ ] Marketplace release

---

## 📜 License

This project is licensed under the MIT License.

---

Made with ❤️ for developers who want a cooler coding experience 😎
