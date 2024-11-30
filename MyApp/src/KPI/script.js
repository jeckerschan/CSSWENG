document.addEventListener("DOMContentLoaded", () => {
    const addRouteBtn = document.getElementById("addRouteBtn");
    const saveBtn = document.getElementById("saveBtn");
    const exitBtn = document.getElementById("exitBtn");
    const hitCount = document.getElementById("hitCount");
    const missCount = document.getElementById("missCount");
    const hmRatio = document.getElementById("hmRatio");
    const routeTable = document.getElementById("routeTableBody");
    const dateElement = document.getElementById("date");
    const currentDate = new Date().toLocaleDateString();
    dateElement.textContent = currentDate;

    let hits = 0;
    let misses = 0;

    const savedRoutes = JSON.parse(localStorage.getItem('log-routes')) || [];
    console.log(savedRoutes);

    // Function to update Hit/Miss Ratio
    function updateHmRatio() {
        const total = hits + misses;
        let ratio = total > 0 ? (hits / total) * 100 : 0;
        hmRatio.innerText = `${ratio.toFixed(2)}%`;
    }

    // Function to adjust hit/miss count
    function adjustHitMissCount() {
        hits = 0;
        misses = 0;

        const rows = routeTable.getElementsByTagName("tr");

        for (let row of rows) {
            const exitTimeInput = row.cells[3].querySelector("input");
            const windowEnd = row.cells[1].innerText.split("-")[1];

            if (exitTimeInput && exitTimeInput.value) {
                const exitTime = new Date(`1970-01-01T${exitTimeInput.value}:00`);
                const windowEndTime = new Date(`1970-01-01T${windowEnd}:00`);

                if (exitTime <= windowEndTime) {
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

    // Function to add a new route row
    function addRouteRow(data) {
        data.forEach(route => {
            const newRow = document.createElement("tr");

            const storeCodeCell = document.createElement("td");
            storeCodeCell.innerText = route.strCode;

            const windowCell = document.createElement("td");
            windowCell.innerText = route.windowStart + "-" + route.windowEnd;

            const entryTimeCell = document.createElement("td");
            const exitTimeCell = document.createElement("td");
            const actionCell = document.createElement("td");

            const entryTimeInput = document.createElement("input");
            entryTimeInput.type = "time";
            entryTimeCell.appendChild(entryTimeInput);

            const exitTimeInput = document.createElement("input");
            exitTimeInput.type = "time";
            exitTimeCell.appendChild(exitTimeInput);

            const removeButton = document.createElement("button");
            removeButton.innerText = "Remove";
            removeButton.style.backgroundColor = "#f44336"; // Red background
            removeButton.style.color = "white"; // White text
            removeButton.style.border = "none";
            removeButton.style.padding = "5px 10px";
            removeButton.style.cursor = "pointer";
            removeButton.style.transition = "background-color 0.3s, border-radius 0.3s";

                    // Hover effect using mouse events
            removeButton.addEventListener("mouseover", () => {
                removeButton.style.backgroundColor = "#d32f2f"; // Darker red on hover
                removeButton.style.borderRadius = "12px"; // Further smooth edges on hover
            });
            removeButton.addEventListener("mouseout", () => {
                removeButton.style.backgroundColor = "#f44336"; // Revert to original color
                removeButton.style.borderRadius = "8px"; // Revert to original border radius
            });



            
            actionCell.appendChild(removeButton);

            newRow.appendChild(storeCodeCell);
            newRow.appendChild(windowCell);
            newRow.appendChild(entryTimeCell);
            newRow.appendChild(exitTimeCell);
            newRow.appendChild(actionCell);

            removeButton.addEventListener("click", () => {
                newRow.remove(); // Remove the row from the table

            });

            exitTimeInput.addEventListener("change", () => {
                adjustHitMissCount();
            });

            routeTable.appendChild(newRow);
        });
    }

    // Load saved routes from localStorage on page load
    if (savedRoutes.length > 0) {
        addRouteRow(savedRoutes);
    }

    // Save table data as a .txt file
    function saveAsTxt() {
        let data = "Store Code\tWindow\tEntry Time\tExit Time\n";
        const rows = routeTable.getElementsByTagName("tr");

        for (let row of rows) {
            const cells = row.getElementsByTagName("td");
            data += `${cells[0].innerText}\t${cells[1].innerText}\t${cells[2].querySelector("input").value || ""}\t${cells[3].querySelector("input").value || ""}\n`;
        }

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

    // Initialize Hit/Miss Ratio display
    hitCount.innerText = hits;
    missCount.innerText = misses;
    updateHmRatio();
});
