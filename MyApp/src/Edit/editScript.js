const { send, on } = window.electronAPI;

on('routes-data', (routes) => {
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
            <td>${route.window}</td>
            <td>${route.drop}</td>
            <td>${route.weightUtil}</td>
        `;
        tableBody.appendChild(row);
    });
}


send('get-routes');
