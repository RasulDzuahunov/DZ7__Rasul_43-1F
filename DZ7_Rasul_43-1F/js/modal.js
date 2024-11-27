const modal = document.querySelector('.modal');
const triggerButton = document.querySelector('#btn-get');
const closeButton = document.querySelector('.modal_close');

const openModal = () => {
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
};

const closeModal = () => {
    modal.style.display = 'none';
    document.body.style.overflow = '';
};

triggerButton.onclick = () => openModal();
closeButton.onclick = () => closeModal();
modal.onclick = (event) => {
    if (event.target === modal) {
        closeModal();
    }
};

const handleScroll = () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden'; 
        window.removeEventListener('scroll', handleScroll); 
    }
};

window.addEventListener('scroll', handleScroll);

setTimeout(() => {
    openModal();
}, 10000);


