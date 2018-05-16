import { LitElement, html } from '@polymer/lit-element';
import {ItemCardTemplate} from './templates/tpl_item-card';

import './item-image.js';

class ItemCard extends LitElement {
  _render({ item }) {

    return ItemCardTemplate(item);
  }

  static get properties() { return {
    item: Object
  }}
}

window.customElements.define('item-card', ItemCard);
