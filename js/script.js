
const siteOptions = document.getElementsByTagName('option');
const jobRoleInput = document.getElementById('other-job-role');
const jobRoleSelect = document.querySelector('select');
const shirtDesignSelect = document.getElementById('design');
const shirtColorSelect = document.getElementById('color');
const activitiesFs = document.getElementById('activities');
const activitiesCb = document.querySelectorAll('[type=checkbox]')
let totalCost = document.getElementById('activities-cost')
totalCost.textContent = '';

jobRoleSelect.addEventListener('input', e => {
    if (e.target.value === 'other') {
        jobRoleInput.type = 'text';
    } else {
        jobRoleInput.type = 'hidden'
    }
});


shirtDesignSelect.addEventListener('input', e => {
const colorOptions = shirtColorSelect.querySelectorAll('[data-theme'); //Array of options
shirtColorSelect.disabled = false;
    if (e.target.value === 'heart js' ) {
        for (i = 0; i < colorOptions.length; i++) {
            const theme = colorOptions[i].getAttribute('data-theme');
            if (theme !== e.target.value) {
                colorOptions[i].style.display = 'none';
            } else {
                colorOptions[i].style.display = 'block';
                colorOptions[i].selected = true;
            } 
        }
    }
    if (e.target.value === 'js puns' ) {
        for (i = 0; i < colorOptions.length; i++) {
            const theme = colorOptions[i].getAttribute('data-theme');
                if (theme !== e.target.value) {
                    colorOptions[i].style.display = 'none';

                } else {
                    colorOptions[i].style.display = 'block';
                    colorOptions[i].selected = true;
                }
        }       
    }       
});

activitiesFs.addEventListener('change', e => {
    for (i=0; i < activitiesCb.length; i++) {
        const total = activitiesCb[i].getAttribute('data-cost');
        let totalValue = parseInt(total.value);
        if (e.target.checked === true) {
            totalCost.textContent += `Total: ${totalValue}`;
        } //else {
            //totalCost.textContent = totalCost;
        //}
    }
} )
