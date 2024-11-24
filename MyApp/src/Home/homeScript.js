const { send } = window.electronAPI;

document.addEventListener('DOMContentLoaded', () => {
    console.log('Home script loaded. electronAPI:', window.electronAPI); 

    // Load current routes from localStorage and log them
    const savedRoutes = JSON.parse(localStorage.getItem('log-routes')) || [];
    console.log('Current Routes:', savedRoutes);

    const loadPlanBtn = document.getElementById('loadPlanBtn');
    const current = document.getElementById('current');

    if (loadPlanBtn) {
        loadPlanBtn.addEventListener('click', (event) => {
            event.preventDefault(); 

            try {
                send('navigate-to-create'); 
            } catch (error) {
                console.error('Error navigating to upload page:', error);
                alert('An error occurred while navigating. Please try again.');
            }
        });
    } else {
        console.error('Load Plan button not found');
    }

   
});
