const { send } = window.electronAPI;

//let currentSeq = 1;  
let currentId = 1;   
const savedRoutes = JSON.parse(localStorage.getItem('log-routes')) || [];
console.log(savedRoutes);

function createRoute(formData, copies = 1, isNewRoute = true) {
    const routes = [];
    //const routeSeq = isNewRoute ? currentSeq++ : currentSeq;  

    for (let i = 0; i < copies; i++) {
        const route = {
            sysRoute: formData.sysRoute,
            rdd: formData.rdd,
            callTime: formData.callTime,
            drop: formData.drop,
            finRoute: formData.finRoute,
            strCode: formData.strCode,
            sysRouteAmt: formData.sysRouteAmt,
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
            SEQ: formData.SEQe,           
            ID: currentId++           
        };
        routes.push(route);
    }

    const updatedRoutes = savedRoutes.concat(routes);
    send('log-routes', updatedRoutes);
    localStorage.setItem('log-routes', JSON.stringify(updatedRoutes));
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
        rdd:document.getElementById('rdd').value,
        drop:document.getElementById('drop').value,
        finRoute:document.getElementById('finRoute').value,
        callTime:document.getElementById('callTime').value,
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
        SEQe: document.getElementById('SEQe').value,
        loadDate: document.getElementById('loadDate').value,
    };

    const sysRouteAmt = parseInt(document.getElementById('sysRouteAmt').value) || 1;
    const isNewRoute = true;


    createRoute(formData, sysRouteAmt, isNewRoute);
});
