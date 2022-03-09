export class Popup {
  constructor ( popupSelector ) {
    this._popup = document.querySelector(popupSelector)
  }

  open() {
    this._popup.classList.add('popup_opened');
    document.addEventListener('keydown', (event) => this._handleEscClose(event));
  };

  close() {
    this._popup.classList.remove('popup_opened');
  };

  _handleEscClose(event) {
    if (event.key === 'Escape') {
      this.close()
    }
  };

  _setEventListeners() {
    this._popup.addEventListener('mousedown', (event) => {
      if (event.target.classList.contains('popup_opened')) {
        this.close()
      }
      if (event.target.classList.contains('popup__close')) {
        this.close()
      }
    })
  }
}