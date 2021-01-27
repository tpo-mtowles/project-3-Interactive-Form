
const siteOptions = document.getElementsByTagName('option');
const jobRoleInput = document.getElementById('other-job-role');
const jobRoleSelect = document.querySelector('select');
const shirtDesignSelect = document.getElementById('design');
const shirtColorSelect = document.getElementById('color');

jobRoleSelect.addEventListener('input', e => {
    if (e.target.value === 'other') {
        jobRoleInput.type = 'text';
    } else {
        jobRoleInput.type = 'hidden'
    }
});


shirtDesignSelect.addEventListener('input', e => {
    const shirtJsPuns = siteOptions[16].getAttribute('data-theme');
    const shirtHeartJs = siteOptions[19].getAttribute('data-theme');
    shirtColorSelect.disabled = false;
    if (e.target.getAttribute.value === 'js puns') {
        for (i = 0; i < shirtHeartJs.length; i++)
        shirtHeartJs[i].hidden = true;
    } else {
        for (i = 0; i < shirtJsPuns.length; i++)
        shirtJsPuns[i].hidden = true;
    }
    
});
