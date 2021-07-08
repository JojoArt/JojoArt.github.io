//Gallery
let one = document.getElementById("one");
let container = one.getElementsByClassName("one-container");
let texts = one.getElementsByClassName("text");
//Modal
var modal = document.getElementById('modal');
var modalImg1 = document.getElementById("modal-img1");
var modalImg2 = document.getElementById("modal-img2");
var modalDescrition = document.getElementById("descrition");
var modalTitle = document.getElementById("title");
//Button
var icon = document.getElementsByClassName("icon");
var close = document.getElementsByClassName("close")[0];
var left = document.getElementsByClassName("left")[0];
var right = document.getElementsByClassName("right")[0];

var i;
for (i = 0; i < container.length; i++) {
    console.log(container);
  let cover = container[i].getElementsByClassName("one-cover")[0];
  let pagesContainer = container[i].getElementsByClassName("one-container-page")[0];
  let pages = pagesContainer.getElementsByClassName("one-page");
  cover.addEventListener("click", function() {
    let indice = 0;
    inModal(pages[indice+1],pages[indice]);
    //slide
    left.onclick = function() {
      indice += 2;
      closeAll();
      inModal(pages[indice+1],pages[indice]);
    }
    right.onclick = function() {
      indice -= 2;
      closeAll();
      inModal(pages[indice+1],pages[indice]);
    }
    //Arrow left right esc
    document.onkeydown = function(evt) {
      evt = evt || window.event;
      if (evt.keyCode == 37) { //left
        indice += 2;
        closeAll();
        inModal(pages[indice+1],pages[indice]);
      } else if (evt.keyCode == 39) { //right
        indice -= 2;
        closeAll();
        inModal(pages[indice+1],pages[indice]);
      }
    }

  });
}

//Close the modal
close.onclick = function() {
  closeAll();
}
document.onkeydown = function(evt) {
  evt = evt || window.event;
  if (evt.keyCode == 27) { //esc
    closeAll();
  }
}

function closeAll() {
  console.log(11);
  modal.style.display = "none";
  var i;
  for (i = 0; i < icon.length; i++) {
    icon[i].style.display = "none";
  }
}

function inModal(img1, img2) {
  modalImg1.src = img1.src;
  modalImg2.src = img2.src;
  show();
}

function show() {
  modal.style.display = "block";
  var i;
  for (i = 0; i < icon.length; i++) {
    icon[i].style.display = "block";
  }
}
