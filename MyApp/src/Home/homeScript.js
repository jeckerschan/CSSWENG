const { send, on } = window.electronAPI;
let routeData = [];

const savedRoutes = JSON.parse(localStorage.getItem('log-routes')) || [];

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
    const lines = csvContent.split('\n').filter(line => line.trim() !== ''); // Remove empty lines
    const headers = lines[0].split(',').map(header => header.trim()); // Parse and trim headers

    //let idCounter = parseInt(localStorage.getItem('currentId'), 10) || 1; // Load ID from localStorage or start from 1

    const routes = lines.slice(1).map(line => {
        const values = line.split(',').map(value => value.trim()); // Parse and trim values

        const route = {};
        headers.forEach((header, index) => {
            // Log each header and corresponding value
            console.log(`Mapping header: ${header} -> value: ${values[index]}`);

            route[header] = values[index] === 'Null' || values[index] === '' ? null : values[index]; // Handle "Null" and empty values
        });

        // Add SEQ and ID fields to each route
        //route.ID = idCounter++; // Assign current ID
        
        return route;
    });

    // Save updated ID counter to localStorage
    //localStorage.setItem('currentId', idCounter);

    // Log the routes for debugging
    console.log('Parsed Routes:', routes);

    // Create routes
    routes.forEach(route => {
        createRoute({
            sysRoute: route['sysRoute'] || null,
            rdd: route['rdd'] || null,
            drop: route['drop'] || null,
            finRoute: route['finRoute'] || null,
            strCode: route['strCode'] || null,
            sysRouteAmt: 1,
            windowStart: route['windowStart'] || null,
            windowEnd: route['windowEnd'] || null,
            Plant: route['Plant'] || null,
            saleOrder: route['saleOrder'] || null,
            outDevlieries: route['outDevlieries'] || null,
            customerName: route['customerName'] || null,
            volume: route['volume'] || null,
            weight: route['weight'] || null,
            SEQe: route['SEQ'] || null,
            ton: route['ton'] || null,
            loaddate: route['loadDate'] || null,
            mix: route['mix'] || null,
            calltime: route['callTime'] || null,
            weightUtilization: route['weightUtilization'] || null,
            ID: route['ID'] || null,
        });
    });

    return routes;
}


function createRoute(formData, copies = 1, isNewRoute = true) {
    const routes = [];
  
    for (let i = 0; i < copies; i++) {
        const route = {
            sysRoute: formData.sysRoute,
            rdd: formData.rdd,
            drop: formData.drop,
            finRoute: formData.finRoute,
            strCode: formData.strCode,
            sysRouteAmt: 1,
            windowStart: formData.windowStart,
            windowEnd: formData.windowEnd,
            Plant: formData.Plant,
            saleOrder: formData.saleOrder,
            outDevlieries: formData.outDevlieries,
            customerName: formData.customerName,
            volume: formData.volume,
            weight: formData.weight,
            SEQ: formData.SEQe,
            ton: formData.ton,
            loaddate: formData.loaddate,
            mix: formData.mix,
            calltime: formData.calltime,
            weightUtilization: formData.weightUtilization,
            ID: formData.ID
        };
        routes.push(route);
    }

    const updatedRoutes = JSON.parse(localStorage.getItem('log-routes')) || [];
    updatedRoutes.push(...routes);
    localStorage.setItem('log-routes', JSON.stringify(updatedRoutes));

    let allRoutes = JSON.parse(localStorage.getItem('all-routes')) || [];
    allRoutes.push(...routes);
    localStorage.setItem('all-routes', JSON.stringify(allRoutes));
    localStorage.setItem('currentId', formData.ID);
   
}







document.getElementById("import-csv").addEventListener("change", (event) => {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            const csvContent = e.target.result;
            const routes = parseCSV(csvContent);
            send("log-routes", routes);
           // send("navigate-to-edit");
        };
        reader.readAsText(file);
    }
});

/**** TEST ***********************************************************************************/
