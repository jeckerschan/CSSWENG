
const ipcRenderer = window.electron.ipcRenderer;
document.addEventListener('DOMContentLoaded', () => {
    const registerLink = document.getElementById('register-link');
    
    if (registerLink) {
        registerLink.addEventListener('click', (event) => {
            event.preventDefault(); 
            ipcRenderer.send('navigate-to-register'); 
        });
    } else {
        console.error('Register link not found'); 
    }
});
