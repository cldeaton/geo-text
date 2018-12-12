import './landing.css';
import { mapDisplay, mapRemoval } from './google-mapping';
import { daddyFunction } from './form-handler';

window.addEventListener('load', () => {
  const useMapEl = document.querySelector('.useMap');
  const mapRemovalEl = document.querySelector('.mapRemoval');
  const daddyFunctionEl = document.querySelector('.daddyFunction');

  useMapEl.addEventListener('click', mapDisplay);
  mapRemovalEl.addEventListener('click', mapRemoval);
  daddyFunctionEl.addEventListener('click', daddyFunction);
});
