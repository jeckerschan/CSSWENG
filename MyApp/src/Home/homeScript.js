const { send } = window.electronAPI;

document.addEventListener('DOMContentLoaded', () => {
    console.log('Home script loaded. electronAPI:', window.electronAPI); 

    const loadPlanBtn = document.getElementById('loadPlanBtn');

 
    if (loadPlanBtn) {
        loadPlanBtn.addEventListener('click', (event) => {
            event.preventDefault(); 

            try {
                console.log('Load Plan button clicked'); 
                send('navigate-to-load'); 
            } catch (error) {
                console.error('Error navigating to upload page:', error);
                alert('An error occurred while navigating. Please try again.');
            }
        });
    } else {
        console.error('Load Plan button not found');
    }
});
