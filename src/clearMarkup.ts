export default () => {
  const form = document.getElementsByClassName("form")[0];

  while (form.firstChild) {
    form.removeChild(form.firstChild);
  }
};
