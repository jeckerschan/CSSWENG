
window.localStorage.clear();
const registerLink = document.getElementById('register-link');
document.addEventListener('DOMContentLoaded', () => {
    console.log('electronAPI:', window.electronAPI); 

    document.getElementById('signin-link').addEventListener('click', async (event) => {
        event.preventDefault();

        const email = document.getElementById('email-input').value;
        const password = document.getElementById('password').value;

        
        if (!email || !password) {
            //alert('Please fill in all fields.');
            document.getElementById('email-input').focus(); 
            document.getElementById('password').value = ''; 
            return;
        }
        
        try {
            
            const isValid = await window.electronAPI.loginAttempt(email, password);
            if (isValid) {
                window.electronAPI.send('navigate-to-menu'); 
            } else {
                //alert('Invalid email or password!');
                window.electronAPI.send('navigate-to-login');
            }
        } catch (error) {
            console.error('Error during login attempt:', error);
            //alert('An error occurred during login. Please try again later.');
            
        }
    });
});


if (registerLink) {
    registerLink.addEventListener('click', (event) => {
        event.preventDefault(); 
        console.log("Register link clicked.");
        window.electronAPI.send('navigate-to-register'); 
    });
} else {
    console.error('Register link not found');
}



        
