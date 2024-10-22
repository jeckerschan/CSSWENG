
const routeGroups = {};


function submitForm() {
    const groupName = document.getElementById("groupNameInput").value;
    if (!groupName) {
        alert("Please enter a group name.");
        return;
    }

    const Plant = document.getElementById("plantInput").value;
    const SysRoute = document.getElementById("sysRouteInput").value;
    const FnRoute = document.getElementById("fnRouteInput").value;
    const SalesOrder = document.getElementById("salesOrderInput").value;
    const OutDeliver = document.getElementById("outDeliverInput").value;
    const StoreCode = document.getElementById("storeCodeInput").value;
    const SEQno = document.getElementById("seqnoInput").value;
    const CustomerName = document.getElementById("customerNameInput").value;
    const Vol = document.getElementById("volInput").value;
    const Weight = document.getElementById("weightInput").value;
    const Ton = document.getElementById("tonInput").value;
    const LoadDate = document.getElementById("loadDateInput").value;
    const Mix = document.getElementById("mixInput").value;
    const Window = document.getElementById("windowInput").value;
    const Drops = document.getElementById("DropsInput").value
    const WeightUtil = document.getElementById("weightUtilInput").value;

 
    const newRoute = new Route(
        Plant,
        SysRoute,
        FnRoute,
        SalesOrder,
        OutDeliver,
        StoreCode,
        SEQno,
        CustomerName,
        Vol,
        Weight,
        Ton,
        LoadDate,
        Mix,
        Window,
        WeightUtil
    );

    if (!routeGroups[groupName]) {
        routeGroups[groupName] = []; 
    }
    routeGroups[groupName].push(newRoute);

    
    document.getElementById("routeForm").reset();
    alert(`Route added to group: ${groupName}`);
}


