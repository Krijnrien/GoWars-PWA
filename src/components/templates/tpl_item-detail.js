import {html} from "@polymer/lit-element/lit-element";

import {store} from '../../store.js';
import {updateMetadata} from "pwa-helpers/metadata";

export const ItemDetailTemplate = (item, _lastVisitedListPage, _showOffline) => {

    // const info = item && item.volumeInfo;
    const id = item ? item.id : '';
    const icon = item ? item.icon : '';
    const name = item ? item.name : '';
    const description = item ? item.description : '';

    updateMetadata({
        title: `${name} - item`,
        description: description,
        image: icon
    });

    return html`
      <style>
        :host {
          display: block;
          padding: 24px 16px;
        }

        section {
          max-width: 748px;
          box-sizing: border-box;
          font-weight: 300;
        }

        .info {
          display: flex;
          padding-bottom: 16px;
          border-bottom: 1px solid #c5c5c5;
        }

        .cover {
          position: relative;
        }

        .cover::after {
          content: '';
          display: block;
          padding-top: 160%;
          width: 100px;
        }

        .cover > item-image {
          display: block;
          position: absolute;
          top: 0;
          right: 0;
          bottom: 0;
          left: 0;
          width: 100%;
          margin: 0 auto;
        }

        .info-desc {
          display: flex;
          flex-direction: column;
          flex: 1;
          margin-left: 16px;
          font-size: 14px;
        }

        .flex {
          flex: 1;
        }

        .title {
          margin: 0 0 4px;
          font-size: 20px;
          font-weight: 500;
          line-height: 1.2;
        }

        .info-item {
          padding-top: 8px;
        }

        .desc {
          padding: 8px 0;
          font-size: 15px;
          line-height: 1.8;
        }

        .desc > h3 {
          font-size: 15px;
          font-weight: 500;
        }

        .desc > ul {
          margin-bottom: 0;
        }

        [hidden] {
          display: none !important;
        }

        /* desktop screen */
        @media (min-width: 648px) {
          :host {
            padding: 48px 24px 24px;
          }

          section {
            margin: 0 auto;
          }

          .info {
            padding-bottom: 24px;
          }

          .cover::after {
            width: 128px;
          }

          .info-desc {
            margin-left: 24px;
          }

          .title {
            margin-bottom: 8px;
            font-size: 24px;
            line-height: 1.3;
          }
          .desc {
            padding: 16px 0;
          }
        }
      </style>

      <section hidden="${_showOffline}">
        <div class="info">
          <div class="cover" hero>
            <item-image src="${icon}" alt="${name}"></item-image>
          </div>
          <div class="info-desc">
            <h2 class="title">${name}</h2>
            <div class="info-item" hidden="${!name}">${id}</div>
            <div class="info-item" hidden="${!name}" desktop>${name}</div>
            <div class="info-item" hidden="${!name}" desktop>${name}</div>
            <div class="flex"></div>
            </div>
          </div>
        </div>
        <div class="desc">
          <h3>Description</h3>
          ${description}
        </div>
      </section>

      <item-offline hidden="${!_showOffline}" on-refresh="${() => store.dispatch(refreshPage())}"></item-offline>
    `;
}