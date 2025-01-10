function markAllAsRead() {
    const count = document.querySelector('.count');
    count.textContent = 0;
    const notificationsItem = document.querySelectorAll('.noti-item');
    notificationsItem.forEach(item => {
        item.classList.remove('item-readed');
    })
}