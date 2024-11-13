// Load environment variables from the .env file
require('dotenv').config({ path: 'database.env' });
const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const fs = require('fs');
const { MongoClient } = require('mongodb');
const bcrypt = require('bcrypt');
const path = require('path');



const uri = process.env.MONGODB_URI; 
const client = new MongoClient(uri); 
let db; 


async function connectToDatabase() {
    try {
        await client.connect();
        db = client.db('PCL'); 
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Failed to connect to MongoDB:', error);
        throw error; 
    }
}

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
    app.quit();
}

// Function to create the browser window
const createWindow = () => {
    const mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            contextIsolation: true,
            enableRemoteModule: false,
            nodeIntegration: false,
            contextBridge: true,
            preload: path.join(__dirname, 'preload.js'), 
        },
    });

    
    mainWindow.loadFile(path.join(__dirname, './Login/login.html'));

  
  ipcMain.on('navigate-to-register', (event) => {
    const webContents = event.sender; 
    webContents.loadFile(path.join(__dirname, './Register/register.html'));
  });
  ipcMain.on('navigate-to-menu', (event) => {
    const webContents = event.sender; 
    webContents.loadFile(path.join(__dirname, './Home/home.html'));
  });
  ipcMain.on('navigate-to-load', (event) => {
    const webContents = event.sender; 
    webContents.loadFile(path.join(__dirname, './Load Plan/upload.html'));
  });
  ipcMain.on('navigate-to-login', (event) => {
    const webContents = event.sender; 
    webContents.loadFile(path.join(__dirname, './Login/login.html'));
  });
  ipcMain.on('navigate-to-edit', (event) => {
    const webContents = event.sender; 
    webContents.loadFile(path.join(__dirname, './Edit/edit.html'));
  });
  ipcMain.on('navigate-to-kpi', (event) => {
    const webContents = event.sender; 
    webContents.loadFile(path.join(__dirname, './KPI/kpi.html'));
  });
  ipcMain.on('navigate-to-create', (event) => {
    const webContents = event.sender; 
    webContents.loadFile(path.join(__dirname, './Create/create.html'));
  });



  // Open the DevTools.
  //mainWindow.webContents.openDevTools();
};
    ipcMain.handle('connect-to-database', connectToDatabase); 

    ipcMain.handle('login-attempt', async (event, email, password) => {
        try {
            const usersCollection = db.collection('SwengProject');
            const user = await usersCollection.findOne({ email });
            
            if (user) {
                const match = await bcrypt.compare(password, user.password);
                return match;
            } 
            return false;
        } catch (error) {
            console.error('Error during login attempt:', error);
            throw new Error('Database query failed');
        }
    });

    ipcMain.handle('register-user', async (event, userData) => {
        try {
            const usersCollection = db.collection('SwengProject');
            
            
            const hashedPassword = await bcrypt.hash(userData.password, 10); 
            userData.password = hashedPassword;
    
            await usersCollection.insertOne(userData);
            return true; 
        } catch (error) {
            console.error('Error saving user:', error);
            return false;
        }
    });

    ipcMain.handle('clear-local-storage', async (event) => {
        try {
            const mainWindow = BrowserWindow.getAllWindows()[0];
            await mainWindow.webContents.executeJavaScript('localStorage.clear();');
            return { success: true };
        } catch (error) {
            console.error('Error clearing local storage:', error);
            return { success: false, error: error.message };
        }
    });

    
    ipcMain.on('log-routes', (event, routes) => {
        routesData = routes.map((route, index) => ({
            sysRoute: route.sysRoute,
            rdd: route.rdd,
            finRoute: route.finRoute,
            drop: route.drop,
            callTime: route.callTime,
            strCode: route.strCode,
            sysRouteAmt: route.sysRouteAmt,
            Mix: route.Mix,
            window: route.window,
            weightUtil: route.weightUtil,
            Plant: route.Plant,
            saleOrder: route.saleOrder,
            outDevlieries: route.outDevlieries,
            customerName: route.customerName,
            volume: route.volume,
            Weight: route.Weight,
            Ton: route.Ton,
            loadDate: route.loadDate,
            SEQ: route.SEQ,
            ID: route.ID
        }));
        console.log('Routes stored:', routesData);
       

    });

    ipcMain.on('request-route-amount', (event) => {
        event.sender.send('routeAmount', sysRouteAmt); 
    });

    ipcMain.on('get-routes', (event) => {
        event.sender.send('routes-data', routesData);
    });

    ipcMain.handle('saveCSV', async (event, csvContent) => {
    const { filePath } = await dialog.showSaveDialog({
        title: 'Save Routes Data',
        defaultPath: path.join(app.getPath('desktop'), 'route_data.csv'),
        filters: [{ name: 'CSV Files', extensions: ['csv'] }]
    });

    if (filePath) {
        try {
            fs.writeFileSync(filePath, csvContent, 'utf-8');
            console.log("File saved successfully!");
            return { success: true };
        } catch (error) {
            console.error("Error saving file:", error);
            return { success: false, error: error.message };
        }
    }
    return { success: false, error: 'No file path selected' };
});


// This method will be called when Electron has finished initialization
app.whenReady().then(() => {
    createWindow();

    // Re-create a window in the app when the dock icon is clicked on macOS
    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow();
        }
    });
});


connectToDatabase().then(() => {
    console.log('Database connected');
}).catch(error => console.error('Database connection failed:', error));

// Quit when all windows are closed, except on macOS
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});
