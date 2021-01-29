
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const creditCardInput = document.getElementById('cc-num');
const zipcodeInput = document.getElementById('zip');
const CVVInput = document.getElementById('cvv');
const siteOptions = document.getElementsByTagName('option');
const jobRoleInput = document.getElementById('other-job-role');
const jobRoleSelect = document.querySelector('select');
const shirtDesignSelect = document.getElementById('design');
const shirtColorSelect = document.getElementById('color');
const activityFieldSet = document.getElementById('activities');
const checkBoxes = document.querySelectorAll('[type=checkbox]');
let totalCostBox = document.getElementById('activities-cost');
let totalCost = 0;
const paymentSelect = document.getElementById('payment');
const creditCardDiv = document.getElementById('credit-card');
const payPalDiv = document.getElementById('paypal');
const bitcoinDiv = document.getElementById('bitcoin');


paymentSelect[1].selected = true;
creditCardDiv.style.display = 'block';
payPalDiv.style.display = 'none';
bitcoinDiv.style.display = 'none';

function showOrHideHint(validator, htmlHint ) {
    if (validator === false) {
       htmlHint.parentElement.classList.add('not-valid');
       htmlHint.parentElement.classList.remove('valid');
       htmlHint.classList.remove('hint');
    } else {
        htmlHint.parentElement.classList.add('valid');
        htmlHint.parentElement.classList.remove('not-valid');
        htmlHint.classList.add('hint'); 
    } 
};

function isUsernameValid() {
    const hint = document.getElementById('name-hint');
    const regEx = /^(?!\s*$).+/.test(nameInput.value);
    showOrHideHint(regEx, hint);
    return regEx;
  };

function isEmailValid(email) {
    const hint = document.getElementById('email-hint');
    const regEx = /^[^@]+@[^@.]+.(com)$/i.test(emailInput.value);
    showOrHideHint(regEx, hint);
    return regEx;
};

function isActivitiesValid(activities) {
    let isChecked = 0;
    let valid;
    const hint = document.getElementById('activities-hint');
    for (i=0; i < checkBoxes.length; i++) {
        if (checkBoxes[i].checked) {
            isChecked++; 
        }
    } 
        if (isChecked > 0) {
            valid = true;
        } else {
            valid = false;
        }   
        showOrHideHint(valid, hint);   
        return valid;      
};

function isCreditCardValid() {
    const hint = document.getElementById('cc-hint');
    const regEx = /^\d{13,16}$/.test(creditCardInput.value);
    showOrHideHint(regEx, hint);
    return regEx;
};

function isZipCodeValid(zipcode) {
    const hint = document.getElementById('zip-hint');
    const regEx = /^\d{5}$/.test(zipcodeInput.value);
    showOrHideHint(regEx, hint);
    return regEx;
};

function isCVVValid(cvv) {
    const hint = document.getElementById('cvv-hint');
    const regEx = /^\d{3}$/.test(CVVInput.value);
    showOrHideHint(regEx, hint);
    return regEx;
};

function showOrHideHint(validator, htmlHint ) {
    if (validator === false) {
       htmlHint.parentElement.classList.add('not-valid');
       htmlHint.parentElement.classList.remove('valid');
       htmlHint.classList.remove('hint');
    } else {
        htmlHint.parentElement.classList.add('valid');
        htmlHint.parentElement.classList.remove('not-valid');
        htmlHint.classList.add('hint'); 
    } 
};

jobRoleSelect.addEventListener('input', e => {
    if (e.target.value === 'other') {
        jobRoleInput.type = 'text';
    } else {
        jobRoleInput.type = 'hidden'
    }
});

shirtDesignSelect.addEventListener('input', e => {
const colorOptions = shirtColorSelect.querySelectorAll('[data-theme'); 
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

activityFieldSet.addEventListener('change', e => {
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
        payPalDiv.style.display = 'block';
        creditCardDiv.style.display = 'none';
        bitcoinDiv.style.display = 'none';
    } else if (e.target.value === 'bitcoin') {
        payPalDiv.style.display = 'none';
        creditCardDiv.style.display = 'none';
        bitcoinDiv.style.display = 'block';
    } else {
        payPalDiv.style.display = 'none';
        creditCardDiv.style.display = 'block';
        bitcoinDiv.style.display = 'none';
    }

})

document.addEventListener('submit', e => {
    let inputValidation = [];
    inputValidation.push(isUsernameValid(nameInput));
    inputValidation.push(isEmailValid(emailInput));
    inputValidation.push(isActivitiesValid(activityFieldSet));

    if (paymentSelect.value === 'credit-card') {
        inputValidation.push(isCreditCardValid());
        inputValidation.push(isZipCodeValid());
        inputValidation.push(isCVVValid());
    }
    if (inputValidation.includes(false)){
        e.preventDefault();
    }
})