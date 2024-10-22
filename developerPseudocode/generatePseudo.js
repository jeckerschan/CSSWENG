async function generatePDFReport() {
    const { jsPDF } = window.jspdf; 

    
    const pdf = new jsPDF();
  
    for (const group in routeGroups) {
        
        pdf.setFontSize(14);
            
        routeGroups[group].forEach((route, index) => {
            pdf.setFontSize(12);
            const details = `Route ${index + 1}: ${JSON.stringify(route.routeDetail, null, 2)}`;
            pdf.text(details)
        });   
    }
    pdf.save("RouteGroupsReport.pdf");
}

