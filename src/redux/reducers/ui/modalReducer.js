var initialState = {
  title: "",
  modal: "",
};
const modalReducer = (state = initialState, action) => {
  switch (action.type) {
    case "CHANGE_MODAL_TITLE": {
      return {
        ...state,
        title: action.payload.title,
        modal: action.payload.modal,
      };
    }
    default: {
      return state;
    }
  }
};
export default modalReducer;
