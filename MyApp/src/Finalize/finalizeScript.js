const { send } = window.electronAPI;

let currentId = parseInt(localStorage.getItem('currentId')) || 0;
const savedRoutes = JSON.parse(localStorage.getItem('log-routes')) || [];

console.log('Loaded saved routes:', savedRoutes);

const seqDropdown = document.getElementById('seq');

function updateRoutesBySeq(selectedSeq, formData) {
    console.log('Updating routes for SEQ:', selectedSeq);
    
    // Filter routes that match the selected SEQ
    const routesToUpdate = savedRoutes.filter(route => route.SEQ == selectedSeq);
    console.log('Routes to update:', routesToUpdate);
    
    // Update only the filtered routes
    routesToUpdate.forEach(route => {
        route.ton = formData.ton;
        route.loaddate = formData.loaddate;
        route.mix = formData.mix;
        route.calltime = formData.calltime;
        route.weightUtilization = formData.weightUtilization;
    });

    // Save the updated routes to localStorage and send them
    localStorage.setItem('log-routes', JSON.stringify(savedRoutes));
    send('log-routes', savedRoutes);
    console.log('After update:', savedRoutes);
}

document.addEventListener('DOMContentLoaded', function () {
    console.log("DOM loaded");
    const saveButton = document.getElementById('save');
    const seqDropdown = document.getElementById('seq'); // Ensure this matches your dropdown ID

    if (!seqDropdown) {
        console.error('SEQ dropdown not found in the DOM.');
        return;
    }

    saveButton.addEventListener('click', function (event) {
        event.preventDefault();

        // Get user inputs
        const selectedSeq = seqDropdown.value;
        const ton = document.getElementById('ton').value;
        const loaddate = document.getElementById('loaddate').value;
        const mix = document.getElementById('mix').value;
        const calltime = document.getElementById('calltime').value;
        const weightUtilization = document.getElementById('weightUtilization')?.value || 0;
        console.log('Form data:', { selectedSeq, ton, loaddate, mix, calltime, weightUtilization });

        if (!selectedSeq) {
            console.error('No SEQ selected.');
            return;
        }

        const formData = {
            ton,
            loaddate,
            mix,
            calltime,
            weightUtilization,
        };

        updateRoutesBySeq(selectedSeq, formData);
        send('navigate-to-finalEdit');
    });
});

function populateSeqDropdown(routes) {
    const uniqueSeqs = removeDuplicateSeq(routes);
    uniqueSeqs.forEach(seq => {
        const option = document.createElement('option');
        option.value = seq;
        option.textContent = `SEQ ${seq}`;
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

// Populate the SEQ dropdown
populateSeqDropdown(savedRoutes);
console.log('Unique SEQs:', removeDuplicateSeq(savedRoutes));




