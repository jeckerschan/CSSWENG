const { send, on, saveCSV } = window.electronAPI;

on('routes-data', (routes) => {
    routeData = routes;
    populateTable(routes);
});

function populateTable(data) {
    const tableBody = document.getElementById('route-table-body');

    data.forEach(route => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td colspan="2">
                <div class="px-1 d-flex justify-content-center">
                    <a class="delete-btn" href="#">
                        <i class="bi bi-x-square"></i>
                    </a>
                </div>
            </td>
            <td>${route.rdd}</td>
            <td>${route.Plant}</td>
            <td>${route.sysRoute}</td>
            <td>${route.finRoute}</td>
            <td>${route.saleOrder}</td>
            <td>${route.outDevlieries}</td>
            <td>${route.strCode}</td>
            <td>${route.SEQ}</td>
            <td>${route.customerName}</td>
            <td>${route.volume}</td>
            <td>${route.Weight}</td>
            <td>${route.Ton}</td>
            <td>${route.loadDate}</td>
            <td>${route.Mix}</td>
            <td>${route.callTime}</td>
            <td>${route.windowStart + "-" + route.windowEnd}</td>
            <td>${route.drop}</td>
            <td>${route.weightUtil}</td>
        `;
        tableBody.appendChild(row);
    });
}




send('get-routes');

function convertToCSV(data) {
    const headers = ["RDD", "Plant", "Sys Route", "Fin Route", "Sale Order", "Out Deliveries", "Str Code", "SEQ", "Customer Name", "Volume", "Weight", "Ton", "Load Date", "Mix", "Call Time", "WindowStart", "WindowEnd", "Drop", "Weight Util"];
    const rows = data.map(route => [
        route.rdd, route.Plant, route.sysRoute, route.finRoute, route.saleOrder, 
        route.outDevlieries, route.strCode, route.SEQ, route.customerName, 
        route.volume, route.Weight, route.Ton, route.loadDate, route.Mix, 
        route.callTime, route.windowStart, route.windowEnd, route.drop, route.weightUtil
    ]);

    return [headers.join(","), ...rows.map(row => row.join(","))].join("\n");
}

document.getElementById("Save").addEventListener("click", () => {
    console.log("clicked button");
    const csvContent = convertToCSV(routeData);
    window.electronAPI.saveCSV(csvContent);
});

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
