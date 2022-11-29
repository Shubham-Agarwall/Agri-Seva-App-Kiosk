/* eslint-disable new-cap */
const button = document.getElementById('submit');
button.addEventListener('click', (e) => {
  const name = document.getElementById('name').value;
  const phone = document.getElementById('phone').value;
  const desc = document.getElementById('desc').value;

  class input {
    constructor(nameNew, phoneNew, descNew) {
      this.nameNew = nameNew;
      this.phoneNew = phoneNew;
      this.descNew = descNew;
    }
  }

  const inputObj = new input(name, phone, desc);

  const db = firebase.database();
  const ref = db.ref('/contact');
  ref.update(inputObj);
  console.log('Uploades successfully');
});
