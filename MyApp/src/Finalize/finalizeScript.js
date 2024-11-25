const { send } = window.electronAPI;

let currentId = parseInt(localStorage.getItem('currentId')) || 0;  
const savedRoutes = JSON.parse(localStorage.getItem('log-routes')) || [];
console.log('Loaded saved routes:', savedRoutes);
console.log('AAAAAAAAAAAAAAAAAAAAAAA');
const seqDropdown = document.getElementById('seq');







function createRoute(formData, copies = 1, isNewRoute = true) {
    const routes = [];
  
    for (let i = 0; i < copies; i++) {
        const route = {
            ton: formData.ton,
            loaddate: formData.loaddate,
            mix: formData.mix,
            calltime: formData.calltime,
            weightUtilization: formData.weightUtilization,
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

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('finalizeForm');
    
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        
        const seqs = document.querySelectorAll('.seq');
        const data = [];

        seqs.forEach(seq => {
            const ton = seq.querySelector('.ton').value;
            const loaddate = seq.querySelector('.loaddate').value;
            const mix = seq.querySelector('.mix').value;
            const calltime = seq.querySelector('.calltime').value;
            const weightUtilization = seq.querySelector('.weightUtilization').value;

            data.push({
                ton,
                loaddate,
                mix,
                calltime,
                weightUtilization
            });
            
        });

        const ton = document.getElementById('ton').value;
        const loaddate = document.getElementById('loaddate').value;
        const mix = document.getElementById('mix').value;
        const calltime = document.getElementById('callTime').value;
        const weightUtilization = document.getElementById('drop').value;

        const formData = {
            ton,
            loaddate,
            mix,
            calltime,
            weightUtilization
        };

        const sysRouteAmt = 1; // Assuming 1 copy for the form submission
        const isNewRoute = true;

        createRoute(formData, sysRouteAmt, isNewRoute);
        console.log('Finalized Data:', data);
    });
});
function populateSeqDropdown(routes) {
    const uniqueSeqs = removeDuplicateSeq(routes);
    uniqueSeqs.forEach(seq => {
        const option = document.createElement('option');
        option.value = seq;
        option.textContent = `SEQ ${seq}`;
        console.log(`SEQ ${seq}`);
        seqDropdown.appendChild(option);
    });
}

function removeDuplicateSeq(routes) {
    const tempArray = [];
    routes.forEach(route => {
        if (!tempArray.includes(route.SEQ)) {
            tempArray.push(route.SEQ);
        }
    });
    return tempArray;
}

populateSeqDropdown(savedRoutes);
console.log('Unique SEQs:', removeDuplicateSeq(savedRoutes));

