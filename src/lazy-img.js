/**
 * The template that is used for the shadow root for every copy of your element,
 * which houses the styles and layout for the element.
 */
const template = document.createElement("template");
template.innerHTML = `
    <style>
        :host {
            display: inline-block;
        }

        img {
            width: 100%;
        }
    </style>
`;

const io = new IntersectionObserver(function(events) {
    for(let x = 0; x < events.length; x++) {
        const event = events[x];

        if(event.isIntersecting) {
            event.target.setAttribute("visible", "");
        }
    }
});

/**
 * This is the class that controls each instance of your custom element.
 */
class LazyImage extends HTMLElement {
    /**
     * Part of the custom element spec. Returns an array of strings that are 
     * the names of attributes that this element observes/listens to.
     * 
     * @returns {Array} an array of strings, each of which representing an 
     *  attribute.
     */
    static get observedAttributes() {
        return ["src", "visible", "alt", "crossorigin", "height"];
    };

    constructor() {
        super();

        // create shadow root for any children context
        this.attachShadow({mode: "open"});
        this.shadowRoot.appendChild(template.content.cloneNode(true));

        // add any initial variables here
        this.imageElement = null;
        this.loaded = false;
    }

    /**
     * Part of the custom element spec. Called after your element is attached to
     * the DOM. Do anything related to the element or its children here in most
     * cases.
     */
    connectedCallback() {
        io.observe(this);
    }

    /**
     * Part of the custom element spec. Called after your element is remove from
     * the DOM. Disconnect any listeners or anything else here.
     */
    disconnectedCallback() {
        io.unobserve(this);
    }

    /**
     * Part of the custom element spec. Called when one of the observed
     * attributes changes, either via setAttribute() or with the attribute being
     * manually set in the HTML.
     * 
     * @param {String} name the name of the attribute that changed
     * @param {Mixed} oldValue the previous value of the attribute
     * @param {Mixed} newValue the new value of the attribute
     */
    attributeChangedCallback(name, oldValue, newValue) {
        if(oldValue === newValue) {
            return;
        }

        switch(name) {
            case "visible":
                if(this.visible) {
                    this.loadImage();
                }
                break;
            default:
                this[name] = newValue;
                break;
        }
    }

    loadImage() {
        if(this.loaded) {
            return;
        }

        // create the image tag
        this.imageElement = document.createElement("img");

        // add all relevant values
        this.imageElement.src = this.src;
        this.imageElement.alt = this.alt || "";

        // add it to the shadow root so it is in the DOM tree
        this.shadowRoot.appendChild(this.imageElement);

        // make sure we can't double-load the image
        this.loaded = true;
    }

    syncAttribute(name, value, doParent = true) {
        if(this.imageElement) {
            if(value || value === 0) {
                this.imageElement.setAttribute(name, value);
            } else {
                this.imageElement.removeAttribute(name);
            }
        }

        if(doParent) {
            this.setAttribute(name, value);
        }
    }

    /* --- Getters and Setters --- */

    get src() {
        return this._src;
    }

    set src(newValue) {
        this._src = newValue;
    }

    get alt() {
        return this.getAttribute("alt");
    }

    set alt(newValue) {
        this.syncAttribute("alt", newValue);
    }

    get crossorigin() {
        return this.getAttribute("crossorigin");
    }

    set crossorigin(newValue) {
        if(newValue !== 'anonymous' && newValue !== 'use-credentials') {
            console.warn("Invalid crossorigin value set.");
            return;
        }

        this.syncAttribute("crossorigin", newValue);
    }

    get height() {
        return parseInt(this.getAttribute("height"));
    }

    set height(newValue) {
        this.syncAttribute("height", newValue);
    }

    get visible() {
        return this.hasAttribute("visible");
    }

    set visible(newValue) {
        if(newValue) {
            this.setAttribute("visible", "");
        } else {
            this.removeAttribute("visible");
        }
    }
}

customElements.define("lazy-img", LazyImage);
