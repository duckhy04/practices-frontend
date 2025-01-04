const setAttributes = (el, attrs) => {
    if (el) Object.keys(attrs).forEach(key => el.setAttribute(key, attrs[key]));
};

const rootStyles = getComputedStyle(document.documentElement);
const orange700 = rootStyles.getPropertyValue('--orange-700').trim();
const imgPreview = document.querySelector('.img-preview');
const imgInput = document.querySelector('#avatar');
const fileUpload = document.querySelector('.file-upload');
const avatarSvg = document.querySelector('.avatar-svg');
const notes = document.querySelector('.notes');
let actionDiv = null;
let avatar = null;

// Trigger file input when clicking the upload button
imgPreview.addEventListener('click', () => imgInput.click());
imgInput.addEventListener('change', updateImgPreview);

function updateImgPreview() {
    const imgFile = imgInput.files[0];
    const infoAvatar = document.querySelector('.info-avatar');

    if (!imgFile) {
        resetStyles();
        return;
    }

    reset();

    // Create and set avatar image
    if (!avatar) {
        avatar = document.createElement('img');
    }
    avatar.src = URL.createObjectURL(imgFile);
    avatar.alt = imgFile.name;

    // Update preview area
    imgPreview.innerHTML = '';
    imgPreview.appendChild(avatar);

    // Remove SVG if it exists
    if (avatarSvg) avatarSvg.remove();

    // Update action buttons
    createActionButtons();
}

function createActionButtons() {
    if (notes) notes.remove();

    if (!actionDiv) {
        actionDiv = document.createElement('div');
        actionDiv.classList.add('action');

        const removeImg = createButton('Remove Image', ['remove-btn'], handleRemoveImage);
        const changeImg = createButton('Change Image', ['change-btn'], () => imgInput.click());

        actionDiv.appendChild(removeImg);
        actionDiv.appendChild(changeImg);
        fileUpload.appendChild(actionDiv);
    }
}

function handleRemoveImage() {
    if (avatar) {
        imgPreview.removeChild(avatar);
        avatar = null;
    }

    if (avatarSvg) imgPreview.appendChild(avatarSvg);
    if (notes) fileUpload.appendChild(notes);

    imgInput.value = '';

    if (actionDiv) {
        actionDiv.remove();
        actionDiv = null;
    }
}

function createButton(text, classes, onClick) {
    const button = document.createElement('button');
    button.innerText = text;
    button.classList.add(...classes);
    button.addEventListener('click', (event) => {
        event.preventDefault();
        onClick
    });
    return button;
}

function reset() {
    resetStyles();
    imgPreview.innerHTML = '';
    if (avatarSvg) imgPreview.appendChild(avatarSvg);
    if (notes) fileUpload.appendChild(notes);
    if (actionDiv) {
        actionDiv.remove();
        actionDiv = null;
    }
}

function resetStyles() {
    setAttributes(document.querySelector('.circle'), { stroke: '#D1D0D5' });
    setAttributes(document.querySelector('.line-vertical'), { fill: '#D1D0D5' });
    setAttributes(document.querySelector('.dot'), { stroke: '#D1D0D5' });
    const infoAvatar = document.querySelector('.info-avatar');
    if (infoAvatar) infoAvatar.style.color = 'white';
}
