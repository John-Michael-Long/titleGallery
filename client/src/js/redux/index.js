import store from './store';
import { addImages, toggleModal, setBackgroundImage } from './actions';

window.store = store;
window.addImages = addImages;
window.toggleModal = toggleModal;
window.setBackgroundImage = setBackgroundImage;
