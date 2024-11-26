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
/**** TEST ***********************************************************************************/
document.getElementById("upload-btn").addEventListener("click", () => {
    document.getElementById("import-csv").click();
    console.log("clicked");
});




function parseCSV(csvContent) {
    const lines = csvContent.split('\n');
    const headers = lines[0].split(',');

    const routes = lines.slice(1).map(line => {
        const values = line.split(',');
        const route = {};
        headers.forEach((header, index) => {
            route[header.trim()] = values[index].trim();
        });
        return route;
    });

    localStorage.setItem('savedroutes', JSON.stringify(routes));
    return routes;
}

document.getElementById("import-csv").addEventListener("change", (event) => {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            const csvContent = e.target.result;
            const routes = parseCSV(csvContent);
            populateTable(routes);
        };
        reader.readAsText(file);
    }
});

/**** TEST ***********************************************************************************/
