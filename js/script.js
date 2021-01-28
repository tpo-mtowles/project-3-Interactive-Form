
const siteOptions = document.getElementsByTagName('option');
const jobRoleInput = document.getElementById('other-job-role');
const jobRoleSelect = document.querySelector('select');
const shirtDesignSelect = document.getElementById('design');
const shirtColorSelect = document.getElementById('color');
const activitiesFs = document.getElementById('activities');
const activitiesCb = document.querySelectorAll('[type=checkbox]')
let totalCostBox = document.getElementById('activities-cost')
let totalCost = 0;
const paymentSelect = document.getElementById('payment');
const creditCard = document.getElementById('credit-card');
const payPal = document.getElementById('paypal');
const bitcoin = document.getElementById('bitcoin');


paymentSelect[1].selected = true;
creditCard.style.display = 'block';
payPal.style.display = 'none';
bitcoin.style.display = 'none';


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
    const runningTotal = parseInt(e.target.getAttribute('data-cost'));
    if (e.target.checked === true) {
        totalCost += runningTotal;
    } else {
        totalCost -= runningTotal;
    }
    totalCostBox.textContent = `Total: ${totalCost}`;
})

paymentSelect.addEventListener('change', e => {
    if (e.target.value === 'paypal' ) {
        payPal.style.display = 'block';
        creditCard.style.display = 'none';
        bitcoin.style.display = 'none';
    } else if (e.target.value === 'bitcoin') {
        payPal.style.display = 'none';
        creditCard.style.display = 'none';
        bitcoin.style.display = 'block';
    } else {
        payPal.style.display = 'none';
        creditCard.style.display = 'block';
        bitcoin.style.display = 'none';
    }

})