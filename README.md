# 🌸 Doursht Desktop Widget

> A cutie desktop widget for tracking tasks and managing your daily energy.

## 📖 The Origin Story
I just wanted a custom productivity widget for my desktop, but I didn't want to go through the endless trial-and-error of testing every clunky app available online to see what stuck. Plus, I saw a lot of amazing developers online creating their own custom widgets and setups, which inspired me to just build my own! 

Doursht is the result: a lightweight, fully customized, native Windows widget tailored exactly to how I want to track my granular hourly logs and manage my energy.

## ✨ Features
* **Glassmorphism UI:** A sleek, transparent aesthetic that blends perfectly into your desktop wallpaper.
* **Task & Energy Tracking:** Granular logging to keep your daily routines optimized.
* **Custom "Edit Mode":** Click 'Edit' to unlock the widget. Drag it anywhere on your screen, pull the edges to resize, and press `Enter` to permanently save its position.
* **Single-Instance Lock:** Built-in safety checks ensure you can never accidentally open two widgets at the same time and overwrite your data.
* **Local Storage:** Everything is saved directly to your machine's `AppData` folder. No cloud accounts, no subscriptions, no lost data.

## 🛠️ Tech Stack
This widget bridges a modern frontend web framework with a native desktop environment:
* **Frontend:** React 19, Vite
* **Styling:** Tailwind CSS v4
* **Backend:** Electron, Node.js
* **Data Management:** electron-store
* **Packaging:** electron-builder

## 🚀 How to Install & Use (For Regular Users)
1. Go to the [Releases](../../releases) tab on the right side of this GitHub page.
2. Download the latest `Doursht Desktop Widget Setup X.X.X.exe` file.
3. Double-click the `.exe` to install it instantly.
4. *Note: If Windows Defender pops up saying "Windows protected your PC", click **More info** and then **Run anyway**. (This happens because I am an indie developer without an expensive Microsoft certificate!)*

## 💻 How to Run Locally (For Developers)
If you want to clone this code and mess around with it yourself:

1. Clone the repository:
   ```bash
   git clone [https://github.com/rxshling/doursht-widgets.git](https://github.com/rxshling/doursht-widgets.git)
