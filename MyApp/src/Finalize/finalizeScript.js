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
        const seq = document.getElementById('seq').value;
        const ton = document.getElementById('ton').value;
        const loaddate = document.getElementById('loaddate').value;
        const mix = document.getElementById('mix').value;
        const calltime = document.getElementById('callTime').value;
        const weightUtilization = document.getElementById('drop').value;

        data.push({
            seq,
            ton,
            loaddate,
            mix,
            calltime,
            weightUtilization
        });
        console.log('Finalized Data:', data);
        // You can send this data to your server using fetch or any other method
    });
});