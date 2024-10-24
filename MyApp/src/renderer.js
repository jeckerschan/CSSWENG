
const ipcRenderer = window.electron.ipcRenderer;
document.addEventListener('DOMContentLoaded', () => {
    const registerLink = document.getElementById('register-link');
    const signInLink = document.getElementById('signin-link');
    
    if (registerLink) {
        registerLink.addEventListener('click', (event) => {
            event.preventDefault(); 
            ipcRenderer.send('navigate-to-register'); 
        });
    } else {
        console.error('Register link not found'); 
    }

    if (signInLink) {
        signInLink.addEventListener('click', (event) => {
            event.preventDefault(); 
            ipcRenderer.send('navigate-to-menu'); 
        });
    } else {
        console.error('Login not found'); 
    }



});
