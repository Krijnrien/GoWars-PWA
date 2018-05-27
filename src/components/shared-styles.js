import {html} from '@polymer/lit-element';

export const SharedStyles = html`<style>
    :host {
        display: block;
        --app-drawer-width: 256px;
        --app-header-height: 64px;
        --app-footer-height: 104px;
        /* The 1px is to make the scrollbar appears all the time */
        --app-main-content-min-height: calc(100vh - var(--app-header-height) - var(--app-footer-height) + 1px);
        /* Default theme */
        --app-primary-color: #202020;
        --app-secondary-color: #202020;
        --app-dark-text-color: var(--app-secondary-color);
        --app-background-color: #fafafa;
        color: var(--app-dark-text-color);
        --app-drawer-background-color: var(--app-background-color);
        --app-drawer-text-color: var(--app-dark-text-color);
        --app-drawer-selected-color: var(--app-dark-text-color);
      }
      app-header {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        text-align: center;
        background-color: var(--app-background-color);
        z-index: 1;
      }
      .toolbar-top {
        padding: 0 8px 0 8px;
      }
      .toolbar-bottom {
        justify-content: center;
        background-color: var(--app-background-color);
      }
      [main-title] > a {
        font-size: 18px;
        font-weight: bold;
        letter-spacing: 0.1em;
        text-decoration: none;
        text-transform: uppercase;
        color: inherit;
        pointer-events: auto;
      }
      .subtitle {
        font-size: 18px;
        font-weight: normal;
      }
      item-input-decorator {
        max-width: 460px;
        transform: translate3d(0, 374px, 0);
      }
      item-input-decorator[top] {
        transition: transform 250ms cubic-bezier(0.4, 0, 0.2, 1);
        transform: translate3d(0, 0, 0);
      }
      .menu-btn,
      .back-btn,
      .signin-btn {
        display: inline-block;
        width: 40px;
        height: 40px;
        padding: 8px;
        box-sizing: border-box;
        background: none;
        border: none;
        fill: var(--app-header-text-color);
        cursor: pointer;
        text-decoration: none;
      }
      .signin-btn {
        padding: 2px;
        visibility: hidden;
      }
      .signin-btn[visible] {
        visibility: visible;
      }
      .signin-btn > img {
        width: 36px;
        height: 36px;
        border-radius: 50%;
      }
      app-drawer {
        z-index: 2;
      }
      .drawer-list {
        box-sizing: border-box;
        width: 100%;
        height: 100%;
        padding: 24px;
        background: var(--app-drawer-background-color);
        position: relative;
      }
      .drawer-list > a {
        display: block;
        text-decoration: none;
        color: var(--app-drawer-text-color);
        line-height: 40px;
        padding: 0 24px;
      }
      .drawer-list > a[selected] {
        color: var(--app-drawer-selected-color);
        font-weight: bold;
      }
      .main-content {
        padding-top: var(--app-header-height);
        min-height: var(--app-main-content-min-height);
      }
      .main-content *{
        margin-top: 2px;
      }
      
      ._page {
        display: none;
      }
      ._page[active] {
        display: block;
      }
      item-viewer {
        height: var(--app-main-content-min-height);
      }
      footer {
        height: var(--app-footer-height);
        padding: 24px;
        box-sizing: border-box;
        text-align: center;
      }
      [hidden] {
        display: none !important;
      }
</style>`;

export const SectionPage = html`<style> 
section {
    padding: 24px;
    background: var(--app-section-odd-color);
  }

  section > * {
    max-width: 600px;
    margin-right: auto;
    margin-left: auto;
  }

  section:nth-of-type(even) {
    background: var(--app-section-even-color);
  }

  h2 {
    font-size: 24px;
    text-align: center;
    color: var(--app-dark-text-color);
  }

  @media (min-widtWh: 460px) {
    h2 {
      font-size: 36px;
    }
  }</style>`;

export const BookButtonStyle = html`<style>
  .item-button {
    display: inline-block;
    margin-right: 8px;
    padding: 8px 44px;
    border: 2px solid var(--app-dark-text-color);
    box-sizing: border-box;
    background-color: transparent;
    color: var(--app-dark-text-color);
    font-size: 14px;
    font-weight: 500;
    text-align: center;
    text-decoration: none;
    text-transform: uppercase;
  }

  .item-button:junk {
    background-color: var(--app-dark-text-color);
    color: #FFF;
  }
</style>`;

export const RarityStyle = html`<style>{
        .junk{
        border: 1px solid #AAA;
    }
    .basic{
        border: 1px solid #000;
    }
    .fine{
        border: 1px solid #62A4DA;
    }
    .masterwork{
        border: 1px solid #1a9306;
    }
    .rare{
        border: 1px solid #fcd00b;
    }
    .exotic{
        border: 1px solid #ffa405;
    }
    .ascended{
        border: 1px solid #fb3e8d;
    }
    .legendary{
        border: 1px solid #4C139D;
    }
}
</style>`;