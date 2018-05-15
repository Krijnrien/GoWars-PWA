import {html} from "@polymer/lit-element/lit-element";
import {repeat} from 'lit-html/lib/repeat.js';

import {store} from '../../store.js';
import {updateMetadata} from "pwa-helpers/metadata";
import {updateLocationURL} from "../../actions/app";

export const ItemSearchTemplate = (_query, _items, _showOffline) => {

    updateMetadata({
        title: `${_query ? `${_query} - ` : ''} - item`,
        description: 'Search for item'
    });

    const inputQueryValue = (e) => store.dispatch(updateLocationURL(`/search?q=${e.target.value}`));
    const inputValue = (_query == null) ? "" : _query;

    return html`
        <style>
        
        item-input-decorator {
            margin: auto;
            max-width: 432px;
            transform: translate3d(0, 0, 0);
        }
        
        item-input-decorator[top] {
            margin: auto;
            transition: transform 250ms cubic-bezier(0.4, 0, 0.2, 1);
            transform: translate3d(0, 0, 0);
        }
        
        .items {
          max-width: 432px;
          margin: 0 auto;
          padding: 8px;
          box-sizing: border-box;
          /* remove margin between inline-block nodes */
          font-size: 0;
        }

        li {
          display: inline-block;
          position: relative;
          width: calc(100% - 16px);
          max-width: 400px;
          min-height: 240px;
          margin: 8px;
          font-size: 14px;
          vertical-align: top;
          background: #fff;
          border-radius: 2px;
          box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14),
                      0 1px 5px 0 rgba(0, 0, 0, 0.12),
                      0 3px 1px -2px rgba(0, 0, 0, 0.2);
          list-style: none;
        }

        li::after {
          content: '';
          display: block;
          padding-top: 65%;
        }

        .items-bg {
          height: 300px;
          max-width: 570px;
          margin: 0 auto;
        }

        .items-desc {
          padding: 24px 16px 0;
          text-align: center;
        }

        [hidden] {
          display: none !important;
        }

        /* Wide Layout */
        @media (min-width: 648px) {
        
            item-input-decorator {
                max-width: 648px;
            }
        
          li {
            height: 364px;
          }

          .items-desc {
            padding: 96px 16px 0;
          }
        }

        /* Wider layout: 2 columns */
        @media (min-width: 872px) {
            item-input-decorator {
                max-width: 832px;
            }
        
            .items {
                width: 832px;
                max-width: none;
                padding: 16px 0;
            }
        }
      </style>
        <item-input-decorator ">
          <input slot="input" id="input" aria-label="Search items" autofocus type="search" placeholder="Search" value="${inputValue}" on-change="${inputQueryValue}">
          <speech-mic slot="button" continuous interimResults on-result="${(e) => this._micResult(e)}"></speech-mic>
        </item-input-decorator>

        <section hidden="${_showOffline}">
            <ul class="items" hidden="${!_query}">
                ${repeat(_items, (item) => html`<li><item-card item="${item}"></item-card></li>`)}
            </ul>
      </section>

      <item-offline hidden="${!_showOffline}" on-refresh="${() => store.dispatch(refreshPage())}"></item-offline>
    `;
}