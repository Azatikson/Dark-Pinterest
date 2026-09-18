const pinsGrid = document.getElementById('pins-grid');
const addPinBtn = document.getElementById('add-pin-btn-top');
const addPinModal = document.getElementById('add-pin-modal');
const closeModalBtn = document.getElementById('close-modal');
const savePinBtn = document.getElementById('save-pin');
const pinTitleInput = document.getElementById('pin-title');
const pinImageUrlInput = document.getElementById('pin-image-url');
const pinImageFileInput = document.getElementById('pin-image-file');
const searchInput = document.getElementById('search-input');
const logoHome = document.getElementById('logo-home');
const profileAvatar = document.getElementById('profile-avatar');
const homeBtn = document.getElementById('home-btn');
const profileBtn = document.getElementById('profile-btn');
const profileSection = document.getElementById('profile-section');
const shareProfileBtn = document.getElementById('share-profile-btn');
const createPinBtnProfile = document.getElementById('create-pin-btn-profile');
const profileTabs = document.querySelectorAll('.profile-tab');
const profileTabContents = document.querySelectorAll('.profile-tab-content');
const userMenu = document.getElementById('user-menu');
const dropdownMenu = document.getElementById('dropdown-menu');
const addAccountBtn = document.getElementById('add-account-btn');
const logoutBtn = document.getElementById('logout-btn');

const createBtn = document.getElementById('create-btn');
const createPanel = document.getElementById('create-panel');
const notificationsBtn = document.getElementById('notifications-btn');
const notificationsPanel = document.getElementById('notifications-panel');
const messagesBtn = document.getElementById('messages-btn');
const messagesPanel = document.getElementById('messages-panel');
const settingsBtn = document.getElementById('settings-btn');
const settingsPanel = document.getElementById('settings-panel');
const closePanelBtns = document.querySelectorAll('[data-close-panel]');
const createOptions = document.querySelectorAll('.create-option');

let pins = [];

function loadPins() {
    const stored = localStorage.getItem('pins_v3');
    if (stored) {
        pins = JSON.parse(stored);
    } else {
        pins = [
            { id: Date.now() + 1, title: 'Атмосферный вечер', imageUrl: 'https://i.pinimg.com/736x/dc/2c/99/dc2c9981b8d41a3722f2b88cf11943e0.jpg', likes: 18 },
            { id: Date.now() + 2, title: 'Новый пин', imageUrl: 'https://i.pinimg.com/736x/d8/25/4d/d8254d6822ae345353484844fa9e1074.jpg', likes: 0 },
            { id: Date.now() + 3, title: 'Уют и стиль', imageUrl: 'https://i.pinimg.com/736x/09/df/9d/09df9d4d126daf2f7f2bf3931ce27795.jpg', likes: 31 },
            { id: Date.now() + 4, title: 'Вдохновение', imageUrl: 'https://i.pinimg.com/736x/ba/ae/bd/baaebd3b74578854e187dd14ba699c8a.jpg', likes: 15 }
        ];
        savePins();
    }
    renderPins(pinsGrid);
}

function savePins() {
    localStorage.setItem('pins_v3', JSON.stringify(pins));
}

function renderPins(container, filter = '') {
    container.innerHTML = '';
    const filtered = pins.filter(pin => pin.title.toLowerCase().includes(filter.toLowerCase()));
    filtered.forEach(pin => {
        container.appendChild(createPinCard(pin));
    });
}

function createPinCard(pin) {
    const card = document.createElement('div');
    card.className = 'pin-card';

    const img = document.createElement('img');
    img.className = 'pin-image';
    img.src = pin.imageUrl;
    img.alt = pin.title;
    img.loading = 'lazy';
    card.appendChild(img);

    const info = document.createElement('div');
    info.className = 'pin-info';

    const title = document.createElement('span');
    title.className = 'pin-title';
    title.textContent = pin.title;
    info.appendChild(title);

    const actions = document.createElement('div');
    actions.className = 'pin-actions';

    const likeBtn = document.createElement('button');
    likeBtn.className = 'like-btn';
    likeBtn.innerHTML = '❤️';
    likeBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        pin.likes++;
        savePins();
        renderPins(pinsGrid, searchInput.value);
    });
    actions.appendChild(likeBtn);

    const likeCount = document.createElement('span');
    likeCount.className = 'like-count';
    likeCount.textContent = pin.likes;
    actions.appendChild(likeCount);

    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'delete-btn-pin';
    deleteBtn.innerHTML = '🗑️';
    deleteBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        pins = pins.filter(p => p.id !== pin.id);
        savePins();
        renderPins(pinsGrid, searchInput.value);
    });
    actions.appendChild(deleteBtn);

    info.appendChild(actions);
    card.appendChild(info);
    return card;
}

function openModal() {
    pinTitleInput.value = '';
    pinImageUrlInput.value = '';
    pinImageFileInput.value = '';
    addPinModal.classList.add('visible');
}

function closeModal() {
    addPinModal.classList.remove('visible');
}

function showProfile() {
    profileSection.classList.remove('hidden');
    pinsGrid.classList.add('hidden');
    homeBtn.classList.remove('active');
    profileBtn.classList.add('active');
    const tabPins = document.getElementById('tab-pins');
    if (tabPins.children.length === 0) {
        renderPins(tabPins);
    }
}

function showHome() {
    profileSection.classList.add('hidden');
    pinsGrid.classList.remove('hidden');
    homeBtn.classList.add('active');
    profileBtn.classList.remove('active');
    renderPins(pinsGrid, searchInput.value);
}

function goHome() {
    searchInput.value = '';
    showHome();
}

function switchProfileTab(tabName) {
    profileTabs.forEach(tab => tab.classList.toggle('active', tab.dataset.tab === tabName));
    profileTabContents.forEach(content => content.classList.add('hidden'));
    document.getElementById(`tab-${tabName}`).classList.remove('hidden');
}

let menuVisible = false;
function toggleMenu() {
    menuVisible = !menuVisible;
    dropdownMenu.classList.toggle('visible', menuVisible);
}
profileAvatar.addEventListener('click', (e) => {
    e.stopPropagation();
    toggleMenu();
});
document.addEventListener('click', () => {
    if (menuVisible) {
        menuVisible = false;
        dropdownMenu.classList.remove('visible');
    }
});
addAccountBtn.addEventListener('click', () => {
    alert('Функция добавления аккаунта (заглушка)');
    dropdownMenu.classList.remove('visible');
});
logoutBtn.addEventListener('click', () => {
    alert('Вы вышли (заглушка)');
    dropdownMenu.classList.remove('visible');
});

const panels = {
    create: createPanel,
    notifications: notificationsPanel,
    messages: messagesPanel,
    settings: settingsPanel
};

function closeAllPanels() {
    Object.values(panels).forEach(panel => {
        panel.classList.add('hidden');
        panel.classList.remove('visible');
    });
}

function openPanel(panelName) {
    closeAllPanels();
    const panel = panels[panelName];
    panel.classList.remove('hidden');
    panel.classList.add('visible');
}

createBtn.addEventListener('click', () => {
    if (createPanel.classList.contains('visible')) {
        closeAllPanels();
    } else {
        openPanel('create');
    }
});

notificationsBtn.addEventListener('click', () => {
    if (notificationsPanel.classList.contains('visible')) {
        closeAllPanels();
    } else {
        openPanel('notifications');
    }
});

messagesBtn.addEventListener('click', () => {
    if (messagesPanel.classList.contains('visible')) {
        closeAllPanels();
    } else {
        openPanel('messages');
    }
});

settingsBtn.addEventListener('click', () => {
    if (settingsPanel.classList.contains('visible')) {
        closeAllPanels();
    } else {
        openPanel('settings');
    }
});

closePanelBtns.forEach(btn => btn.addEventListener('click', closeAllPanels));

createOptions.forEach(option => {
    option.addEventListener('click', () => {
        const type = option.getAttribute('data-create-type');
        if (type === 'pin') {
            openModal();
        } else {
            alert(`Функция "${type}" в разработке`);
        }
        closeAllPanels();
    });
});

addPinBtn.addEventListener('click', openModal);
closeModalBtn.addEventListener('click', closeModal);
addPinModal.addEventListener('click', (e) => {
    if (e.target === addPinModal) closeModal();
});

savePinBtn.addEventListener('click', () => {
    const title = pinTitleInput.value.trim() || 'Без названия';
    const imageUrl = pinImageUrlInput.value.trim();
    const file = pinImageFileInput.files[0];
    if (!imageUrl && !file) {
        alert('Укажите ссылку на изображение или выберите файл');
        return;
    }
    if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            const newPin = { id: Date.now(), title, imageUrl: e.target.result, likes: 0 };
            pins.push(newPin);
            savePins();
            renderPins(pinsGrid, searchInput.value);
            closeModal();
        };
        reader.readAsDataURL(file);
    } else {
        const newPin = { id: Date.now(), title, imageUrl, likes: 0 };
        pins.push(newPin);
        savePins();
        renderPins(pinsGrid, searchInput.value);
        closeModal();
    }
});

searchInput.addEventListener('input', () => {
    if (!pinsGrid.classList.contains('hidden')) {
        renderPins(pinsGrid, searchInput.value);
    }
});

logoHome.addEventListener('click', goHome);
homeBtn.addEventListener('click', goHome);
profileBtn.addEventListener('click', showProfile);
shareProfileBtn.addEventListener('click', () => alert('Ссылка скопирована (заглушка)'));
createPinBtnProfile.addEventListener('click', openModal);

profileTabs.forEach(tab => {
    tab.addEventListener('click', () => switchProfileTab(tab.dataset.tab));
});

loadPins();
showHome();