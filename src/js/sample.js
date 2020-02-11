import _ from 'lodash';
import MotoImg from '../images/moto.jpg';

function component() {
  console.group('TEST');
  const someData = {
    es6: 'is super cool!!!'
  };
  const { es6 } = someData;
  const element = document.createElement('div');
  const motoImg = new Image();
  motoImg.src = MotoImg;
  
  element.innerHTML = _.join(['Hello', 'webpack', es6], ' ');
  element.classList.add('style-ns__container');
  element.classList.add('style-ns__heading');
  // element.appendChild(motoImg);
  
  console.log('component returning');
  return element;
  console.groupEnd('TEST');
}

document.body.appendChild(component());
