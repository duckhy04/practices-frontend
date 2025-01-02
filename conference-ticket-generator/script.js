const dragDropArea = document.getElementById('drag-drop-area');
const uploadAvatar = document.getElementById('uploadAvatar');
const imgPreview = document.querySelector('.img-preview');
const text = document.getElementById('text');

dragDropArea.addEventListener('click', () => {
    uploadAvatar.click();
    dragDropArea.classList.add('focus-outline');
});

uploadAvatar.addEventListener('change', updateImagePreview);

function updateImagePreview() {
    const imgFile = uploadAvatar.files[0];
    if (!imgFile || (imgFile.size / 1024) > 5) {
        const info = document.getElementById('info');
        info.classList.add('error');
        return;
    };

    imgPreview.innerHTML = '';
    const img = document.createElement('img');
    img.src = URL.createObjectURL(imgFile);
    img.alt = imgFile.name;
    imgPreview.appendChild(img);
    imgPreview.classList.add('has-img');

    if (text) text.remove();

    let actionList = dragDropArea.querySelector('.action');
    if (!actionList) {
        actionList = document.createElement('div');
        actionList.classList.add('action');

        const removeImg = createButton('Remove Image', ['btn', 'remove-btn'], handleRemoveImage);
        const changeImg = createButton('Change Image', ['btn', 'change-btn'], updateImagePreview, true);

        actionList.appendChild(removeImg);
        actionList.appendChild(changeImg);
        dragDropArea.appendChild(actionList);
    }
}

function createButton(text, classes, onClick, preventDefault = false) {
    const button = document.createElement('button'); 
    button.innerText = text; 
    button.classList.add(...classes); 
    button.addEventListener('click', (event) => {
        if (preventDefault) {
            event.preventDefault();
        }
        onClick()
    });
    return button;
}

function handleRemoveImage() {
    imgPreview.innerHTML = '';
    imgPreview.classList.remove('has-img');
    uploadAvatar.value = '';
    if (!dragDropArea.contains(text)) {
        dragDropArea.appendChild(text);
    }

    const actionList = dragDropArea.querySelector('.action');
    if (actionList) actionList.remove();
}
