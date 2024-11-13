document.getElementById('upload-file').addEventListener('change', handleFileSelect);

function handleFileSelect(event) {
    const file = event.target.files[0];
    if (file && file.name.endsWith('.csv')) {
        const reader = new FileReader();
        
        reader.onload = function(e) {
            const content = e.target.result;
            const parsedData = parseCSV(content);
            populateTable(parsedData);
        };
        
        reader.onerror = function(error) {
            console.error('Error reading the file:', error);
        };

     
        reader.readAsText(file);
    } else {
        console.error('Please upload a valid CSV file.');
    }
}


function parseCSV(csvContent) {
    const lines = csvContent.trim().split('\n');
    const headers = lines[0].split(','); 

   
    const data = lines.slice(1).map(line => {
        const values = line.split(',');
        if (values.length !== headers.length) {
            console.error('Row does not match headers:', line);
            return;  
        }

       
        const route = {};
        headers.forEach((header, index) => {
            route[header.trim()] = values[index].trim(); 
        });
        return route;
    }).filter(route => route);  

    return data;
}


function populateTable(data) {
    const tableContainer = document.getElementById('route-table-container');
    tableContainer.innerHTML = ''; 

   
    const tableWrapper = document.createElement('div');
    tableWrapper.classList.add('d-flex', 'justify-content-center', 'mx-5', 'rounded-2', 'bg-light', 'table-responsive');
    tableWrapper.style = 'width: 100%; height: 450px; max-height: 450px; overflow-y: auto;';

    const table = document.createElement('table');
    table.classList.add('table', 'align-middle', 'text-center', 'table-hover', 'table-bordered');
    
    const thead = document.createElement('thead');
    thead.classList.add('barlow-regular', 'align-middle', 'table-dark');

   
    const headerRow = document.createElement('tr');
    const headers = ['RDD', 'Plant', 'Sys Route', 'Fin Route', 'Sale Order', 'Out Deliveries', 'Str Code', 'SEQ', 'Customer Name', 'Volume', 'Weight', 'Ton', 'Load Date', 'Mix', 'Call Time', 'Window', 'Drop', 'Weight Util'];
    headers.forEach(headerText => {
        const th = document.createElement('th');
        th.scope = 'col';
        th.textContent = headerText;
        headerRow.appendChild(th);
    });
    thead.appendChild(headerRow);
    table.appendChild(thead);

    const tbody = document.createElement('tbody');
    
    data.forEach(route => {
        const row = document.createElement('tr');
        headers.forEach(header => {
            const td = document.createElement('td');
            td.textContent = route[header] || ''; 
            row.appendChild(td);
        });
        tbody.appendChild(row);
    });
    table.appendChild(tbody);

   
    tableWrapper.appendChild(table);
    tableContainer.appendChild(tableWrapper);
}
