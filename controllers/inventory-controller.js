const knex = require('knex')(require('../knexfile'));



function isValidPhoneNumber(contact_phone) {
    const phonePattern = /^\+1 \(\d{3}\) \d{3}-\d{4}$/;
    return phonePattern.test(contact_phone);
  }
  
function isValidEmail(contact_email) {
if (!contact_email.includes('@') || !contact_email.includes('.')) {
    return false;
}

if (contact_email.lastIndexOf('.') <= contact_email.indexOf('@')) {
    return false;
}

const atIndex = contact_email.indexOf('@');
if (contact_email[atIndex - 1] === ' ' || contact_email[atIndex + 1] === ' ') {
    return false;
}

if (atIndex === 0 || contact_email.lastIndexOf('.') === contact_email.length - 1) {
    return false;
}
return true;
}