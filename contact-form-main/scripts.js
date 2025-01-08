const rootStyle = getComputedStyle(document.querySelector(':root'));

function changeRadioButton() {
    const radioButtons = document.querySelectorAll('.radio-button');
    for (radioButton of radioButtons) {
        const parentRadio = radioButton.parentNode;
        if (radioButton.checked) {
            parentRadio.style.backgroundColor = rootStyle.getPropertyValue('--Green-200')
            parentRadio.style.border = `1px solid ${rootStyle.getPropertyValue('--Green-600')}`
        } else {
            parentRadio.style.backgroundColor = '';
        }
    }
}

document.querySelector('.contact-form button').addEventListener('click', function (event) {
    event.preventDefault();

    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    const queryType = document.querySelector('input[name="queryType"]:checked');
    const consent = document.getElementById('consent').checked;

    let isValid = true;

    resetError();

    if (!firstName) {
        showError('firstName', 'The field is required');
        isValid = false;
    }

    if (!lastName) {
        showError('lastName', 'The field is required');
        isValid = false;
    }

    if (!email) {
        showError('email', 'The field is required');
        isValid = false;
    } else if (!validateEmail(email)) {
        showError('email', 'Please enter a valid email address');
        isValid = false;
    }

    if (!queryType) {
        showError('queryType', 'Please select a query type', false);
        isValid = false;
    }

    if (!message) {
        showError('message', 'The field is required');
        isValid = false;
    }

    if (!consent) {
        showError('consent', 'To submit this form, please consent to being contacted', false);
        isValid = false;
    }

    if (isValid) {
        submit();
    }
}
);

function validateEmail(email) {
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return regex.test(email);
}

function showError(id, message, isBorder = true) {
    const inputField = document.getElementById(id);
    const errorMessage = document.createElement('p');

    if (isBorder) {
        inputField.style.border = '1px solid red';
    }
    errorMessage.classList.add('error-message');
    errorMessage.textContent = message;
    inputField.parentElement.appendChild(errorMessage);
}

function resetError() {
    const errorMessages = document.querySelectorAll('.error-message');
    errorMessages.forEach(function (message) {
        message.remove();
    });

    const inputFields = document.querySelectorAll('.form-group input, .form-group textarea');
    inputFields.forEach(function (field) {
        field.style.border = `1px solid ${rootStyle.getPropertyValue('--Grey-500')}`;
    });
}


function submit() {
    console.log(true);
}