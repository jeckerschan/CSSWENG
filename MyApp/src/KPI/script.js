// Assuming that the HTML structure has these IDs

document.addEventListener("DOMContentLoaded", () => {
    
    const addRouteBtn = document.getElementById("addRouteBtn");
    const saveBtn = document.getElementById("saveBtn");
    const exitBtn = document.getElementById("exitBtn");
    const hitCount = document.getElementById("hitCount");
    const missCount = document.getElementById("missCount");
    const hmRatio = document.getElementById("hmRatio");
    const routeTable = document.getElementById("routeTableBody");
    const dateElement = document.getElementById('date');
    const currentDate = new Date().toLocaleDateString();
    dateElement.textContent = currentDate;

    let hits = 0; // Initial value based on your example
    let misses = 0; // Initial value based on your example

    const savedRoutes = JSON.parse(localStorage.getItem('log-routes')) || [];
    console.log(savedRoutes);

    // Update Hit/Miss Ratio
    function updateHmRatio() {
        let ratio = (hits / (hits + misses)) * 100;
        hmRatio.innerText = `${ratio.toFixed(2)}%`;
    }
// Function to add a new route row
function addRouteRow(data) {
    data.forEach(route => {
        const newRow = document.createElement("tr");

        const storeCodeCell = document.createElement("td");
        storeCodeCell.innerText = route.strCode;

        const windowCell = document.createElement("td");
        windowCell.innerText = route.windowStart + "-" + route.windowEnd;

        const entryTimeCell = document.createElement("td");
        entryTimeCell.innerText = ""; // Blank cell for entry time

        const exitTimeCell = document.createElement("td");
        exitTimeCell.innerText = ""; // Blank cell for exit time

        // Append cells to the row
        newRow.appendChild(storeCodeCell);
        newRow.appendChild(windowCell);
        newRow.appendChild(entryTimeCell);
        newRow.appendChild(exitTimeCell);

        const entryTimeInput = document.createElement("input");
        entryTimeInput.type = "time";
        entryTimeInput.placeholder = "Enter time";
        entryTimeCell.appendChild(entryTimeInput);

        const exitTimeInput = document.createElement("input");
        exitTimeInput.type = "time";
        exitTimeInput.placeholder = "Enter time";
        exitTimeCell.appendChild(exitTimeInput);

        // Append row to table body
        routeTable.appendChild(newRow);

    });
}
// Load saved routes from localStorage on page load
if (savedRoutes.length > 0) {
    addRouteRow(savedRoutes);
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
    saveBtn.addEventListener("click", saveAsTxt);
    exitBtn.addEventListener("click", () => {
        window.location.href = "../../src/Home/home.html"; 
    });
    
        exitTimeInput.addEventListener("change", () => {
            const exitTime = exitTimeInput.value;
            const windowTime = route.window;

            if (exitTime <= windowTime) {
            exitTimeInput.style.borderColor = "green";
            hits++;
            hitCount.innerText = hits;
            updateHmRatio();
            } else {
            exitTimeInput.style.borderColor = "red";
            misses++;
            missCount.innerText = misses;
            updateHmRatio();
            }
        });
        // Function to adjust hit and miss count
        function adjustHitMissCount() {
            const rows = routeTable.getElementsByTagName("tr");
            hits = 0;
            misses = 0;

            for (let row of rows) {
                const exitTimeInput = row.cells[3].querySelector("input");
                const windowTime = parseInt(row.cells[1].innerText);

                if (exitTimeInput && exitTimeInput.value !== "") {
                    const exitTime = parseInt(exitTimeInput.value);
                    if (exitTime <= windowTime) {
                        hits++;
                    } else {
                        misses++;
                    }
                }
            }

            hitCount.innerText = hits;
            missCount.innerText = misses;
            updateHmRatio();
        }

        // Add event listener to adjust hit/miss count on input change
        routeTable.addEventListener("input", (event) => {
            if (event.target.tagName === "INPUT" && event.target.type === "number") {
                adjustHitMissCount();
            }
        });
    // Initialize Hit/Miss Ratio display
    hitCount.innerText = hits;
    missCount.innerText = misses;
    updateHmRatio();
});
