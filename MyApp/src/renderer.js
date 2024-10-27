
const { ipcRenderer } = window.electronAPI;

document.addEventListener('DOMContentLoaded', () => {
    console.log('Renderer loaded. electronAPI:', window.electronAPI); 

    const registerLink = document.getElementById('register-link');
    const signInLink = document.getElementById('signin-link');
    const loadPlanBtn = document.getElementById('loadPlanBtn');
    const createAccLink = document.getElementById('create-link');
    const editPlanLink = document.getElementById('editBtn');

  
    if (registerLink) {
        registerLink.addEventListener('click', (event) => {
            event.preventDefault(); 
            ipcRenderer.send('navigate-to-register'); 
        });
    } else {
        console.error('Register link not found'); 
    }

   
  
    if (createAccLink) {
        createAccLink.addEventListener('click', (event) => {
            event.preventDefault(); 
            ipcRenderer.send('navigate-to-login'); 
        });
    } else {
        console.error('Create account link not found'); 
    }

    
    if (editPlanLink) {
        editPlanLink.addEventListener('click', (event) => {
            event.preventDefault(); 
            ipcRenderer.send('navigate-to-edit'); 
        });
    } else {
        console.error('Edit page link not found'); 
    }
});
