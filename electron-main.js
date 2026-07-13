import { app, BrowserWindow, ipcMain } from 'electron';
import Store from 'electron-store';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const store = new Store();

// 1. Declare 'win' globally up here so the security check can find it!
let win = null;

// 2. Request the Single Instance Lock from the OS
const gotTheLock = app.requestSingleInstanceLock();

if (!gotTheLock) {
    // If we didn't get the lock, another instance is already running. Quit immediately!
    app.quit();
} else {
    // We got the lock! Listen for anyone accidentally clicking the shortcut again
    app.on('second-instance', () => {
        // If they click it again, just pull the existing widget into focus!
        if (win) {
            if (win.isMinimized()) win.restore();
            win.focus();
        }
    });

    // 3. Normal App Bootup (We put createWindow directly inside here)
    app.whenReady().then(() => {
        const defaultBounds = { x: 100, y: 100, width: 300, height: 540 };
        const savedBounds = store.get('widget-bounds', defaultBounds);

        win = new BrowserWindow({
            x: savedBounds.x,
            y: savedBounds.y,
            width: savedBounds.width,
            height: savedBounds.height,
            minWidth: 250,
            minHeight: 400,
            transparent: true,
            frame: false,
            skipTaskbar: true,
            type: 'desktop',
            resizable: true,
            webPreferences: {
                nodeIntegration: true,
                contextIsolation: false,
            },
        });

        if (app.isPackaged) {
            app.setLoginItemSettings({
                openAtLogin: true,
                path: app.getPath('exe') // Forces Windows to specifically look for your finished .exe
            });
        }

        ipcMain.on('save-bounds', () => {
            if (win) store.set('widget-bounds', win.getBounds());
        });

        if (app.isPackaged) {
            win.loadFile(path.join(__dirname, 'dist', 'index.html'));
        } else {
            win.loadURL('http://localhost:5173');
        }
    });
}

if (process.platform === 'darwin') {
    app.dock.hide();
}