const width = 130;
const count = 3;

const list = carousel.querySelector('ul');
const listElems = carousel.querySelectorAll('li');

let position = 0;

carousel.querySelector('.left').onclick = function() {
  position += width * count;

  position = Math.min(position, 0);
  list.style.marginLeft = `${position}px`;
};

carousel.querySelector('.right').onclick = function() {
  position -= width * count;

  position = Math.max(position, -width * (listElems.length - count));
  list.style.marginLeft = `${position}px`;
};
