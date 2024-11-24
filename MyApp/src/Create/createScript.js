const { send } = window.electronAPI;

let currentId = parseInt(localStorage.getItem('currentId')) || 0;  
const savedRoutes = JSON.parse(localStorage.getItem('log-routes')) || [];
console.log('Loaded saved routes:', savedRoutes);

function createRoute(formData, copies = 1, isNewRoute = true) {
    const routes = [];
  
    for (let i = 0; i < copies; i++) {
        const route = {
            sysRoute: formData.sysRoute,
            rdd: formData.rdd,
            drop: formData.drop,
            finRoute: formData.finRoute,
            strCode: formData.strCode,
            sysRouteAmt: formData.sysRouteAmt,
            windowStart: formData.windowStart,
            windowEnd: formData.windowEnd,
            Plant: formData.Plant,
            saleOrder: formData.saleOrder,
            outDevlieries: formData.outDevlieries,
            customerName: formData.customerName,
            volume: formData.volume,
            Weight: formData.Weight,
            SEQ: formData.SEQe,           
            ID: currentId++  
        };
        routes.push(route);
    }

    const updatedRoutes = savedRoutes.concat(routes);
    send('log-routes', updatedRoutes);
    localStorage.setItem('log-routes', JSON.stringify(updatedRoutes));

    localStorage.setItem('currentId', currentId);

    localStorage.setItem('formData', JSON.stringify(formData));

    let allRoutes = JSON.parse(localStorage.getItem('all-routes')) || [];
    allRoutes = allRoutes.concat(routes);
    localStorage.setItem('all-routes', JSON.stringify(allRoutes));

    send('navigate-to-edit');
}

document.getElementById('save').addEventListener('click', (event) => {
    event.preventDefault();

    const formData = {
        sysRoute: document.getElementById('sysRoute').value,
        rdd: document.getElementById('rdd').value,
        drop: document.getElementById('drop').value,
        finRoute: document.getElementById('finRoute').value,
        strCode: document.getElementById('strCode').value,
        windowStart: document.getElementById('windowStart').value,
        windowEnd: document.getElementById('windowEnd').value,
        Plant: document.getElementById('Plant').value,
        saleOrder: document.getElementById('saleOrder').value,
        outDevlieries: document.getElementById('outDevlieries').value,
        customerName: document.getElementById('customerName').value,
        volume: document.getElementById('volume').value,
        Weight: document.getElementById('Weight').value,
        SEQe: document.getElementById('SEQe').value,
    };

    const sysRouteAmt = parseInt(document.getElementById('sysRouteAmt').value) || 1;
    const isNewRoute = true;

    createRoute(formData, sysRouteAmt, isNewRoute);
});
