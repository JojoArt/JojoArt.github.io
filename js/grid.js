class Swipe {
    constructor(element) {
        this.xDown = null;
        this.yDown = null;
        this.element = typeof(element) === 'string' ? document.querySelector(element) : element;
        this.element.addEventListener('touchstart', function(evt) {
            this.xDown = evt.touches[0].clientX;
            this.yDown = evt.touches[0].clientY;
        }.bind(this), false);
    }
    onLeft(callback) {
        this.onLeft = callback;
        return this;
    }
    onRight(callback) {
        this.onRight = callback;
        return this;
    }
    handleTouchMove(evt) {
        if ( ! this.xDown || ! this.yDown ) {
            return;
        }
        var xUp = evt.touches[0].clientX;
        var yUp = evt.touches[0].clientY;
        this.xDiff = this.xDown - xUp;
        this.yDiff = this.yDown - yUp;
        if ( Math.abs( this.xDiff ) > Math.abs( this.yDiff ) ) { // Most significant.
            if ( this.xDiff > 0 ) {
                this.onLeft();
            } else {
                this.onRight();
            }
        }
        // Reset values.
        this.xDown = null;
        this.yDown = null;
    }
    run() {
        this.element.addEventListener('touchmove', function(evt) {
            this.handleTouchMove(evt).bind(this);
        }.bind(this), false);
    }
}
class Grid {
  constructor(grid, modal, imageInsteadArrow) {
    //Option
    this.imageInsteadArrow = imageInsteadArrow;
    //Gallery
    this.grid = grid;
    this.gridImgLow = grid.getElementsByClassName("grid-img-low");
    this.gridText = grid.getElementsByClassName("grid-text");
    //Modal
    this.modal = modal;
    this.swiper = new Swipe(modal);
    this.modalImg = modal.getElementsByClassName("modal-img")[0];
    this.modalImgBefore = modal.getElementsByClassName("modal-img-before")[0];
    this.modalImgAfter = modal.getElementsByClassName("modal-img-after")[0];
    this.modalDescrition = modal.getElementsByClassName("modal-descrition")[0];
    this.modalTitle = modal.getElementsByClassName("modal-title")[0];
    //Button
    this.buttonIcon = modal.getElementsByClassName("modal-icon");
    this.buttonClose = modal.getElementsByClassName("modal-close")[0];
    this.buttonLeft = modal.getElementsByClassName("modal-left")[0];
    this.buttonRight = modal.getElementsByClassName("modal-right")[0];
    //maxValue
    this.imgOpenIndice;
    this.maxValue = this.gridImgLow.length;
    this.iconLength = this.buttonIcon.length-2;
    //Init modal
    for (let i = 0; i < this.maxValue; i++) {
      let imgLow = this.gridImgLow.item(i);
      let imgText = this.gridText.item(i);
      var callback = this.inModal;
      imgLow.addEventListener("click", () => this.inModal(imgLow, imgText), false);
    }
    //Key Methode
    this.keyMethode();
  }
  image() {
    if (this.imgOpenIndice != this.maxValue-1) {
      this.modalImgAfter.src = this.gridImgLow.item(this.imgOpenIndice+1).src;
      this.modalImgAfter.style.display = "block"; //show
    } if (this.imgOpenIndice != 0) {
      this.modalImgBefore.src = this.gridImgLow.item(this.imgOpenIndice-1).src;
      this.modalImgBefore.style.display = "block"; //show
    }
  }
  arrow() {
    if (window.innerWidth <= 700) {
      this.buttonRight.style.display = "none";
      this.buttonLeft.style.display = "none";
    } else {
      if (this.imgOpenIndice != this.maxValue-1) {
        this.buttonRight.style.display = "block"; //show
      } if (this.imgOpenIndice != 0) {
        this.buttonLeft.style.display = "block"; //show
      }
    }
  }
  inModal(imageLow, descrition) {
    this.imgOpenIndice = this.findIndice(imageLow);
    this.modalImg.src = imageLow.src.replace("/low/", "/high/");
    imageLow.src = imageLow.src.replace("/low/", "/high/");
    this.modalTitle.innerHTML = imageLow.alt;
    this.modalDescrition.innerHTML = descrition.textContent;
    this.modal.style.display = "block";
    var i;
    for (i = 0; i < this.iconLength; i++) {
      this.buttonIcon[i].style.display = "block";
    }
    if (this.imageInsteadArrow == true) {
      this.image();
    } else {
      this.arrow();
    }
  }
  closeAll() {
    if (this.imageInsteadArrow == true) {
      this.modalImgAfter.style.display = "none";
      this.modalImgBefore.style.display = "none";
    }
    this.imgOpenIndice = null;
    this.modal.style.display = "none";
    var i;
    for (i = 0; i < this.iconLength+2; i++) {
      this.buttonIcon[i].style.display = "none";
    }
  }
  slideArrow(int) {
    var indice = this.imgOpenIndice + int;
    this.closeAll();
    if (indice >= 0 && indice < this.maxValue) {
      this.imgOpenIndice = indice;
      this.inModal(this.gridImgLow.item(indice),
                  this.gridText.item(indice));
    }
  }
  findIndice(img) {
    var res = -1;
    for (let i = 0; i < this.maxValue; i++) {
      if (this.gridImgLow[i] == img) {
        res = i;
      }
    }
    return res;
  }
  keyMethode() {
    //Close the modal css cross
    this.buttonClose.addEventListener("click", () => this.closeAll(), false);
    //Slide css Arrow
    if (this.imageInsteadArrow == true) {
      this.modalImgAfter.addEventListener("click", () => this.slideArrow(+1), false);
      this.modalImgBefore.addEventListener("click", () => this.slideArrow(-1), false);
    } else {
      this.buttonLeft.addEventListener("click", () => this.slideArrow(-1), false);
      this.buttonRight.addEventListener("click", () => this.slideArrow(+1), false);
    }
    //Arrow left right esc key
    document.addEventListener("keydown", evt => {
      if (evt.keyCode == 27) { //esc
        this.closeAll();
      } else if (evt.keyCode == 37 && this.imgOpenIndice != null) { //left
        this.slideArrow(-1);
      } else if (evt.keyCode == 39 && this.imgOpenIndice != null) { //right
        this.slideArrow(+1);
      }
    });
    this.swiper.onRight(() => this.slideArrow(-1)).run();
    this.swiper.onLeft(() => this.slideArrow(+1)).run();
  }

}
