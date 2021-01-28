
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
const activitiesFs = document.getElementById('activities');
const activitiesCb = document.querySelectorAll('[type=checkbox]')
let totalCostBox = document.getElementById('activities-cost')
let totalCost = 0;
const paymentSelect = document.getElementById('payment');
const creditCardDiv = document.getElementById('credit-card');
const payPalDiv = document.getElementById('paypal');
const bitcoinDiv = document.getElementById('bitcoin');


paymentSelect[1].selected = true;
creditCardDiv.style.display = 'block';
payPalDiv.style.display = 'none';
bitcoinDiv.style.display = 'none';

function isUsernameValid(username) {
    return /^(?!\s*$).+/.test(username);
  };

function isEmailValid(email) {
    return /^[^@]+@[^@.]+.(com)$/i.test(email);
};

function isActivitiesValid(activities) {
    let isChecked;
    for (i=0; i < activitiesCb.length; i++) {
        if (activitiesCb[i].checked === false) {
            return isChecked = false;
        } else {
            return isChecked = true;
        }
    }
};

function isCreditCarValid(card) {
    return /^\d{13,16}$/.test(card);
};

function isZipCodeValid(zipcode) {
    return /^\d{5}$/.test(zipcode);
};

function isCVVValid(cvv) {
    return /^\d{3}$/.test(cvv);
};

function showOrHideHint(show, message ) {
    if (show) {
        message.style.display = 'inherit';
    } else {
        message.style.display = 'none';
    }
};

function createEventListener(helperFunction) {
    return e => {
        const regExValue = e.target.value;
        const valid = helperFunction(regExValue);
        const showHint = regExValue !== "" && !valid; 
        const hint = e.target.nextElementSibling;
        showOrHideHint(showHint, hint);
    };
};

nameInput.addEventListener('submit', createEventListener(isUsernameValid));
emailInput.addEventListener('submit', createEventListener(isEmailValid));
creditCardInput.addEventListener('submit', createEventListener(isCreditCarValid));
zipcodeInput.addEventListener('submit', createEventListener(isZipCodeValid));
CVVInput.addEventListener('submit', createEventListener(isCVVValid));




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

isUsernameValid(nameInput.value);
isEmailValid(emailInput.value);
isCVVValid(creditCardInput.value);
isZipCodeValid(zipcodeInput.value);
isCVVValid(CVVInput.value);


