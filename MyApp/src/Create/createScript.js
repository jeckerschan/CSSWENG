const { send } = window.electronAPI;

let currentSeq = 1;  
let currentId = 1;   


function createRoute(formData, copies = 1, isNewRoute = true) {
    const routes = [];
    const routeSeq = isNewRoute ? currentSeq++ : currentSeq;  

    
    for (let i = 0; i < copies; i++) {
        const route = {
            sysRoute: formData.sysRoute,
            strCode: formData.strCode,
            sysRouteAmt:formData.sysRouteAmt,
            Mix: formData.Mix,
            window: formData.window,
            weightUtil: formData.weightUtil,
            Plant: formData.Plant,
            saleOrder: formData.saleOrder,
            outDevlieries: formData.outDevlieries,
            customerName: formData.customerName,
            volume: formData.volume,
            Weight: formData.Weight,
            Ton: formData.Ton,
            loadDate: formData.loadDate,
            SEQ: routeSeq,           
            ID: currentId++           
        };
        routes.push(route);
    }

    
    send('log-routes', routes);
    send('navigate-to-edit');
}


document.getElementById('save').addEventListener('click', (event) => {
    event.preventDefault();


    const formData = {
        sysRoute: document.getElementById('sysRoute').value,
        strCode: document.getElementById('strCode').value,
        Mix: document.getElementById('Mix').value,
        window: document.getElementById('window').value,
        weightUtil: document.getElementById('weightUtil').value,
        Plant: document.getElementById('Plant').value,
        saleOrder: document.getElementById('saleOrder').value,
        outDevlieries: document.getElementById('outDevlieries').value,
        customerName: document.getElementById('customerName').value,
        volume: document.getElementById('volume').value,
        Weight: document.getElementById('Weight').value,
        Ton: document.getElementById('Ton').value,
        loadDate: document.getElementById('loadDate').value,
    };

    const sysRouteAmt = parseInt(document.getElementById('sysRouteAmt').value) || 1;
    const isNewRoute = true;


    createRoute(formData, sysRouteAmt, isNewRoute);
});
