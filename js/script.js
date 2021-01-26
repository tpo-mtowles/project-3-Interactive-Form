
const jobRoleOther = document.getElementsByTagName('option')[6];
const jobRoleInput = document.getElementById('other-job-role');
const select = document.querySelector('select');


select.addEventListener('input', e => {
    if (e.target.value === 'other') {
        jobRoleInput.type = 'text';
    } else {
        jobRoleInput.type = 'hidden'
    }
});

