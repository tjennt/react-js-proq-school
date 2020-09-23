export const changeModalTitle = (title, modal) => {
  return {
    type: "CHANGE_MODAL_TITLE",
    payload: {
      title,
      modal,
    },
  };
};
