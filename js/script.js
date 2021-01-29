//global variables 
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const creditCardInput = document.getElementById('cc-num');
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

//calling needed functions
addRemoveFocus();
setPage();

//this function will make sure the page loads with the correct element focus and the default hidden elements
function setPage() {
    nameInput.focus();
    shirtColorSelect.style.display = 'none';
    jobRoleInput.style.display = 'none';
    paymentSelect[1].selected = true;
    creditCardDiv.style.display = 'block';
    payPalDiv.style.display = 'none';
    bitcoinDiv.style.display = 'none';
}

//this function creates and applies the proper hint in conjunction with the regEx helpers
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

//the following are the regEx helper functions that include the showOrHideHint function
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
    const zipCodeInput = document.getElementById('zip');
    const hint = document.getElementById('zip-hint');
    const regEx = /^\d{5}$/.test(zipCodeInput.value);
    showOrHideHint(regEx, hint);
    return regEx;
};

function isCVVValid(cvv) {
    const C_V_V_Input = document.getElementById('cvv')
    const hint = document.getElementById('cvv-hint');
    const regEx = /^\d{3}$/.test(C_V_V_Input.value);
    showOrHideHint(regEx, hint);
    return regEx;
};

//this listener is waiting for a change event on the job role select box, if the 'other' option is selected the 'other' input field is visible
jobRoleSelect.addEventListener('change', e => {
    if (e.target.value === 'other') {
        jobRoleInput.style.display = 'block';
    } else {
        jobRoleInput.style.display = 'none';
    }
});

//this listener is waiting for an input event on the shirt design box 
//it will reveal the color option box and make available only the matching colors to the user choice
shirtDesignSelect.addEventListener('input', e => {
const colorOptions = shirtColorSelect.querySelectorAll('[data-theme'); 
shirtColorSelect.style.display = 'block';
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

//this adds the focus state to the currently selected activities check box
function addRemoveFocus() {
    for (i=0; i < checkBoxes.length; i++) {
        checkBoxes[i].addEventListener('focus', event => {
            event.target.parentElement.classList.add('focus');
        })
        checkBoxes[i].addEventListener('blur', event => {
            event.target.parentElement.classList.remove('focus');
        })
    }
};

//this listener keeps track of the selected activities and updates the total
activityFieldSet.addEventListener('change', e => {
    const runningTotal = parseInt(e.target.getAttribute('data-cost'));
    if (e.target.checked === true) {
        totalCost += runningTotal;
    } else {
        totalCost -= runningTotal;
    }
    totalCostBox.textContent = `Total: ${totalCost}`;
})

//this listener will only display the content of the selected payment method
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
//this listener checks for the submit event and runs the validation helper functions and stops the submit event if any return false
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


