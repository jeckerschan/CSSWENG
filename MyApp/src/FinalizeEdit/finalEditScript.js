const { send, on } = window.electronAPI;
let routeData = [];


function loadRoutesFromLocalStorage() {
    routeData = JSON.parse(localStorage.getItem('log-routes')) || [];
    populateTable(routeData);
}


function populateTable(data) {
    const tableBody = document.getElementById('route-table-body');
    tableBody.innerHTML = ''; 

    data.forEach((route, index) => {
        const row = document.createElement('tr');
        row.setAttribute('data-id', route.ID); 
        row.innerHTML = `
            <td contenteditable="true">${route.rdd || ''}</td>
            <td contenteditable="true">${route.Plant || ''}</td>
            <td contenteditable="true">${route.sysRoute || ''}</td>
            <td contenteditable="true">${route.finRoute || ''}</td>
            <td contenteditable="true">${route.saleOrder || ''}</td>
            <td contenteditable="true">${route.outDevlieries || ''}</td>
            <td contenteditable="true">${route.strCode || ''}</td>
            <td contenteditable="true">${route.SEQ || ''}</td>
            <td contenteditable="true">${route.customerName || ''}</td>
            <td contenteditable="true">${route.volume || ''}</td>
            <td contenteditable="true">${route.weight || ''}</td>
            <td contenteditable="true">${route.ton || ''}</td>
            <td contenteditable="true">${route.windowStart + "-" + route.windowEnd || ''}</td>
            <td contenteditable="true">${route.drop || ''}</td>
            <td contenteditable="true">${route.loaddate || ''}</td>
            <td contenteditable="true">${route.mix || ''}</td>
            <td contenteditable="true">${route.calltime || ''}</td>
            <td contenteditable="true">${route.weightUtilization || ''}</td>

        `;

        tableBody.appendChild(row);
    });

    
    document.querySelectorAll('#route-table-body [contenteditable="true"]').forEach(cell => {
        cell.addEventListener('blur', (event) => {
            const row = cell.closest('tr');
            const cells = row.cells;

            const updatedRoute = {
                ID: parseInt(row.dataset.id), 
                rdd: cells[1]?.textContent.trim() || '', 
                Plant: cells[2]?.textContent.trim() || '',
                sysRoute: cells[3]?.textContent.trim() || '',
                finRoute: cells[4]?.textContent.trim() || '',
                saleOrder: cells[5]?.textContent.trim() || '',
                outDevlieries: cells[6]?.textContent.trim() || '',
                strCode: cells[7]?.textContent.trim() || '',
                SEQ: cells[8]?.textContent.trim() || '',
                customerName: cells[9]?.textContent.trim() || '',
                volume: cells[10]?.textContent.trim() || '',
                weight: cells[11]?.textContent.trim() || '',
                ton: cells[12]?.textContent.trim() || '',
                windowStart: cells[13]?.textContent.split('-')[0]?.trim() || '',
                windowEnd: cells[13]?.textContent.split('-')[1]?.trim() || '',
                drop: cells[14]?.textContent.trim() || '',
                loaddate: cells[15]?.textContent.trim() || '',
                mix: cells[16]?.textContent.trim() || '',
                calltime: cells[17]?.textContent.trim() || '',
                weightUtilization: cells[18]?.textContent.trim() || ''

            };

   
            const routeIndex = routeData.findIndex(route => route.ID === updatedRoute.ID);
            if (routeIndex > -1) {
                
                routeData[routeIndex] = updatedRoute;

              
                localStorage.setItem('log-routes', JSON.stringify(routeData));

          
                send('update-route', updatedRoute);
                document.getElementById("Confirm").addEventListener("click", () => {
                    convertToCSV(updatedRoute);
                });
            }
        });
    });
}


loadRoutesFromLocalStorage();


send('get-routes');


document.getElementById("kpi").addEventListener("click", () => {
    send('navigate-to-kpi');
});

document.getElementById("Back").addEventListener("click", () => {
    send('navigate-to-back');
});



document.addEventListener("DOMContentLoaded", () => {
    const filenameElement = document.getElementById("filename");
    const currentDate = new Date();
    const formattedDate = currentDate.toISOString().split('T')[0]; // YYYY-MM-DD
    filenameElement.textContent = `${formattedDate} LOAD PLAN`;
});




/////////////////////////////////////////////////////////////////////////////////////////////////

function convertToCSV(data) {
    const headers = [
        "rdd", 
        "Plant", 
        "sysRoute", 
        "finRoute", 
        "saleOrder", 
        "outDevlieries", 
        "strCode", 
        "SEQ", 
        "customerName", 
        "volume", 
        "weight", 
        "ton", 
        "loadDate", 
        "mix", 
        "callTime", 
        "windowStart", 
        "windowEnd", 
        "drop", 
        "weightUtilization"];
    const rows = data.map(route => [
        route.rdd, 
        route.Plant, 
        route.sysRoute, 
        route.finRoute, 
        route.saleOrder, 
        route.outDevlieries, 
        route.strCode, 
        route.SEQ, 
        route.customerName, 
        route.volume, 
        route.weight, 
        route.ton, 
        route.loaddate, 
        route.mix, 
        route.calltime, 
        route.windowStart, 
        route.windowEnd, 
        route.drop, 
        route.weightUtilization
    ]);

    return [headers.join(","), ...rows.map(row => row.join(","))].join("\n");
}

document.getElementById("Save").addEventListener("click", () => {
    console.log("clicked button");
    const csvContent = convertToCSV(routeData);
    window.electronAPI.saveCSV(csvContent);
});

// Add a button listener to export the routes
document.getElementById("export-csv").addEventListener("click", convertToCSV);
