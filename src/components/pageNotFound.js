import {html} from '@polymer/lit-element'
import {updateMetadata} from 'pwa-helpers/metadata.js';
import {PageViewElement} from './page-view-element.js';

class PageNotFound extends PageViewElement {
    _render() {
        updateMetadata({
            //TODO Title?
            title: `Page Not Found`,
            description: 'Page not found'
        });

        return html`
      <style>
        :host {
          padding: 16px;
          text-align: center;
          line-height: 1.5;
        }
      </style>

      <section>
        <h2>Oops! You hit a 404</h2>
        <p>The page you're looking for doesn't seem to exist. Head back
           <a href="/">home</a> and try again?
        </p>
      </section>
    `;
    }
}

window.customElements.define('not-found-page', PageNotFound);
