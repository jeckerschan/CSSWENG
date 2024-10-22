function viewRoutes() {
    const groupName = document.getElementById("groupNameInput").value;
    if (!groupName) {
        alert("Please enter a group name to view routes.");
        return;
    }

    if (!routeGroups[groupName] || routeGroups[groupName].length === 0) {
        console.log(`No routes found in group: ${groupName}`);
        return;
    }

    console.log(`Routes in group: ${groupName}`);
    routeGroups[groupName].forEach((route, index) => {
        console.log(`Route ${index + 1}:`, route.routeDetail);
    });
}