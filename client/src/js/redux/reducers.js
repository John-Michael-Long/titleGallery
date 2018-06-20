import { ADD_ROOM_ID, ADD_IMAGES, TOGGLE_MODAL, SET_BACKGROUND_IMAGE } from './action-types';

const initialState = {
  images: [],
  backgroundImage: '',
  modalOn: false,
  roomId: 0,
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_ROOM_ID:
      return { ...state, roomId: action.payload };
    case ADD_IMAGES:
      return { ...state, images: action.payload };
    case TOGGLE_MODAL:
      return { ...state, modalOn: !state.modalOn };
    case SET_BACKGROUND_IMAGE:
      return { ...state, backgroundImage: action.payload };
    default:
      return state;
  }
};

export default rootReducer;
