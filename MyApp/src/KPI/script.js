// Assuming that the HTML structure has these IDs
document.addEventListener("DOMContentLoaded", () => {
    const addRouteBtn = document.getElementById("addRouteBtn");
    const saveBtn = document.getElementById("saveBtn");
    const exitBtn = document.getElementById("exitBtn");
    const hitCount = document.getElementById("hitCount");
    const missCount = document.getElementById("missCount");
    const hmRatio = document.getElementById("hmRatio");
    const routeTable = document.getElementById("routeTableBody");

    let hits = 12; // Initial value based on your example
    let misses = 55; // Initial value based on your example

    // Update Hit/Miss Ratio
    function updateHmRatio() {
        let ratio = (hits / (hits + misses)) * 100;
        hmRatio.innerText = `${ratio.toFixed(2)}%`;
    }

    // Function to add a new route row
    function addRouteRow() {
        const newRow = document.createElement("tr");

        // Example data for each cell
        const storeCodeCell = document.createElement("td");
        storeCodeCell.innerText = "1234521";
        
        const windowCell = document.createElement("td");
        windowCell.innerText = "16:00-19:00";
        
        const entryTimeCell = document.createElement("td");
        entryTimeCell.innerText = "RDD";
        
        const exitTimeCell = document.createElement("td");
        exitTimeCell.innerText = "RDD";

        // Append cells to the row
        newRow.appendChild(storeCodeCell);
        newRow.appendChild(windowCell);
        newRow.appendChild(entryTimeCell);
        newRow.appendChild(exitTimeCell);

        // Append row to table body
        routeTable.appendChild(newRow);

        // Increase hit count and update ratio
        hits++;
        hitCount.innerText = hits;
        updateHmRatio();
    }

    // Function to save table data as .txt file
    function saveAsTxt() {
        let data = "Store Code\tWindow\tEntry Time\tExit Time\n";
        const rows = routeTable.getElementsByTagName("tr");

        for (let row of rows) {
            const cells = row.getElementsByTagName("td");
            data += `${cells[0].innerText}\t${cells[1].innerText}\t${cells[2].innerText}\t${cells[3].innerText}\n`;
        }

        // Create a blob with the data
        const blob = new Blob([data], { type: "text/plain" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "route_data.txt";
        a.click();
        URL.revokeObjectURL(url);
    }

    // Event Listeners
    addRouteBtn.addEventListener("click", addRouteRow);
    saveBtn.addEventListener("click", saveAsTxt);
    exitBtn.addEventListener("click", () => {
        window.location.href = "../../src/Home/home.html"; 
    });

    // Initialize Hit/Miss Ratio display
    hitCount.innerText = hits;
    missCount.innerText = misses;
    updateHmRatio();
});
