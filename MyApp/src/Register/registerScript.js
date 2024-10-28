const { ipcRenderer } = window.electronAPI;

document.addEventListener('DOMContentLoaded', () => {
    const registerButton = document.getElementById('create-link');

    if (registerButton) {
        registerButton.addEventListener('click', async (event) => {
            event.preventDefault(); 

            const firstName = document.getElementById('firstname').value.trim();
            const lastName = document.getElementById('lastname').value.trim();
            const email = document.getElementById('email-input').value.trim();
            const password = document.getElementById('password').value;
            const confirmPassword = document.getElementById('confirm-pass').value;

         
            if (!firstName || !lastName || !email || !password || !confirmPassword) {
                alert('Please fill in all fields.');
                return;
            }
            if (password !== confirmPassword) {
                alert('Passwords do not match.');
                return;
            }

            const userData = { firstName, lastName, email, password };

            try {
                const success = await window.electronAPI.invoke('register-user', userData);

                if (success) {
                    alert('Registration successful!');
                    window.electronAPI.send('navigate-to-login');
                } else {
                    alert('Registration failed. Please try again.');
                }
            } catch (error) {
                console.error('Error during registration:', error);
                alert('An error occurred. Please try again later.');
            }
        });
    } else {
        console.error('Register button not found');
    }
});
