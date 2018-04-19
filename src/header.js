import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';

class PolyHeader extends PolymerElement {
    static get template() {
        return html`
            <style>
                header {
                    width:100%;
                    height:80px;
                    border: 1px solid #008800;
                    background-color: #316d319e;
                }
                .logo {
                    float:left;
                }
                .logo img {
                    width: 80px;
                    padding: 0 20px;
                }
                .menu-list {
                    float: right; margin: 0; padding: 30px;
                }
                .menu-item {
                    display:inline; margin: 0 10px;
                }
            </style>
            <header>
                <div class="logo"><img src="./src/assets/polymerjs.png"/></div>
                <ul class="menu-list">
                    <template is="dom-repeat" items="{{menu}}"><li class="menu-item">[[item.name]]</li></template>
                </ul>
            </header>
        `;
    }

    static get properties() {
        return {
            menu: {
                type: Array,
                value: () => [
                        { name: "Menu 1"},
                        { name: "Menu 2"},
                        { name: "Menu 3"},
                        { name: "Menu 4"}
                    ]
            }
        }
    }
}

// Register the element with the browser.
customElements.define('poly-header', PolyHeader);
