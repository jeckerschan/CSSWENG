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
        route.ton = formData.ton || route.ton;
        route.loaddate = formData.loaddate || route.loaddate;
        route.mix = formData.mix || route.mix;
        route.calltime = formData.calltime || route.calltime;
        route.weightUtilization = formData.weightUtilization || route.weightUtilization;
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
    seqDropdown.addEventListener('blur', function () {
        const selectedSeq = seqDropdown.value;

        if (!selectedSeq) {
            console.error('No SEQ selected.');
            return;
        }

        
        calculateTotalVolumeAndWeight(selectedSeq);
    });

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
function calculateTotalVolumeAndWeight(selectedSeq) {
    const routesForSeq = savedRoutes.filter(route => route.SEQ == selectedSeq);
    
    let totalVolume = 0;
    let totalWeight = 0;

    // Sum up the volume and weight for the filtered routes
    routesForSeq.forEach(route => {
        totalVolume += parseFloat(route.volume) || 0;  // Assuming 'volume' is the field for volume
        totalWeight += parseFloat(route.weight) || 0;    // Assuming 'ton' is the field for weight
    });

    // Update the table with total volume and total weight
    document.getElementById('totalVolume').textContent = totalVolume.toFixed(2); // Display up to 2 decimal points
    document.getElementById('totalWeight').textContent = totalWeight.toFixed(2);  // Display up to 2 decimal points
}
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
    const tempArray = [0];
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

function populateTableBySeq(selectedSeq) {
    const routesForSeq = savedRoutes.filter(route => route.SEQ == selectedSeq);
    const tableBody = document.getElementById('routesTableBody');

    // Clear existing table rows
    tableBody.innerHTML = '';

    routesForSeq.forEach(route => {
        const row = document.createElement('tr');

        const volumeCell = document.createElement('td');
        volumeCell.textContent = route.volume;
        row.appendChild(volumeCell);

        const weightCell = document.createElement('td');
        weightCell.textContent = route.weight;
        row.appendChild(weightCell);

        tableBody.appendChild(row);
    });
}

seqDropdown.addEventListener('blur', function () {
    const selectedSeq = seqDropdown.value;

    if (!selectedSeq) {
        console.error('No SEQ selected.');
        return;
    }

    populateTableBySeq(selectedSeq);
});