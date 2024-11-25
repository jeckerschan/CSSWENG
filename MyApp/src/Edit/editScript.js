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
            <td colspan="2">
                <div class="px-1 d-flex justify-content-center">
                    <a class="delete-btn" href="#">
                        <i class="bi bi-x-square"></i>
                    </a>
                </div>
            </td>
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
            <td contenteditable="true">${route.Weight || ''}</td>
            <td contenteditable="true">${route.windowStart + "-" + route.windowEnd || ''}</td>
            <td contenteditable="true">${route.drop || ''}</td>
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
                Weight: cells[11]?.textContent.trim() || '',
                windowStart: cells[12]?.textContent.split('-')[0]?.trim() || '',
                windowEnd: cells[12]?.textContent.split('-')[1]?.trim() || '',
                drop: cells[13]?.textContent.trim() || ''
            };

   
            const routeIndex = routeData.findIndex(route => route.ID === updatedRoute.ID);
            if (routeIndex > -1) {
                
                routeData[routeIndex] = updatedRoute;

              
                localStorage.setItem('log-routes', JSON.stringify(routeData));

          
                send('update-route', updatedRoute);
            }
        });
    });
}


loadRoutesFromLocalStorage();


send('get-routes');


document.getElementById("kpi").addEventListener("click", () => {
    send('navigate-to-kpi');
});

document.getElementById("add").addEventListener("click", () => {
    send('navigate-to-create');
});

document.addEventListener("DOMContentLoaded", () => {
    const filenameElement = document.getElementById("filename");
    const currentDate = new Date();
    const formattedDate = currentDate.toISOString().split('T')[0]; // YYYY-MM-DD
    filenameElement.textContent = `${formattedDate} LOAD PLAN`;
});

document.getElementById("Confirm").addEventListener("click", () => {
    send('navigate-to-finalize');
});
