
const ipcRenderer = window.electron.ipcRenderer;
document.addEventListener('DOMContentLoaded', () => {
    const registerLink = document.getElementById('register-link');
    const signInLink = document.getElementById('signin-link');
    const loadPlanLink = document.getElementById('loadPlanBtn');
    const kpiBtnlink = document.getElementById('kpiBtn')
    const createAccLink = document.getElementById('create-link')
    
    
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

    if (loadPlanLink) {
        loadPlanLink.addEventListener('click', (event) => {
            event.preventDefault(); 
            ipcRenderer.send('navigate-to-load'); 
        });
    } else {
        console.error('load not found'); 
    }

    if (createAccLink) {
        createAccLink.addEventListener('click', (event) => {
            event.preventDefault(); 
            ipcRenderer.send('navigate-to-login'); 
        });
    } else {
        console.error('acc not found'); 
    }




});
