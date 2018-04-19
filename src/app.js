/**
 * @license
 * Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
 */

// Import statements in Polymer 3.0 can now use package names.
// polymer-element.js now exports PolymerElement instead of Element,
// so no need to change the symbol.
import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import '@polymer/polymer/lib/elements/dom-if.js';
import '@polymer/paper-checkbox/paper-checkbox.js';
import { setPassiveTouchGestures } from '@polymer/polymer/lib/utils/settings';
import '/src/header.js';

class Polymer3App extends PolymerElement {
  constructor() {
    super();
    // Resolve warning about scroll performance
    // See https://developers.google.com/web/updates/2016/06/passive-event-listeners
    setPassiveTouchGestures(true);
    this.message = 'Hello World! I\'m a Polymer element :)'; //popula la property definida en el get () al final del archivo
  }

  ready() {
    super.ready();
    this.$.omgpie.focus(); //focus en el checkbox (omgpie es el ID que se define en el template)
  }

  static get template() {
    // Template getter must return an instance of HTMLTemplateElement.
    // The html helper function makes this easy.
    return html`
      <style>
        paper-checkbox {
          --paper-checkbox-checked-ink-color: #FFFFFF;
          --paper-checkbox-unchecked-ink-color: #FFFFFF;
        }
      </style>

      <poly-header>This should be replaced</poly-header>

      <h1>Start Polymer 3.0</h1>
      <p>[[message]]</p>
      <paper-checkbox id="omgpie"
        toggles
        noink
        checked={{pie}}>I like pie.</paper-checkbox>
      <template is="dom-if" if=[[pie]]>
        <lazy-element><p>lazy loading...</p></lazy-element>
      </template>
    `;
  }

  togglePie() {
    if (this.pie && !this.loadComplete) {
      // See https://developers.google.com/web/updates/2017/11/dynamic-import
      import('./lazy-element.js').then((LazyElement) => {
        console.log("LazyElement loaded");
      }).catch((reason) => {
        console.log("LazyElement failed to load", reason);
      });
      this.loadComplete = true;
    }
  }

  static get properties() {
    return {
      message: {
        type: String,
        value: ''
      },
      pie: {
        type: Boolean,
        value: false,
        observer: 'togglePie'
      },
      loadComplete: {
        type: Boolean,
        value: false
      }
    };
  }

}

// Register the element with the browser.
customElements.define('polymer3-app', Polymer3App);
