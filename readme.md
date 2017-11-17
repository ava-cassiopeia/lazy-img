# Lazy Image Custom Element

[![npm version](https://badge.fury.io/js/lazy-img-element.svg)](https://badge.fury.io/js/lazy-img-element)

Custom, production-ready HTML element (`<lazy-img>`) that lazily loads images
as they come on to the screen.

## Getting the Element

Please see the
[releases](https://github.com/aeolingamenfel/lazy-img/releases) page to get the 
latest, minified version of the source for the `<lazy-img>`. Import into your 
project as needed.

The element is built on top of the custom element API, and uses the newer
`IntersectionObserver` API. 

If you just need to polyfill the `IntersectionObserver`, you can add the
following:

```HTML
<script src="https://polyfill.io/v2/polyfill.min.js?features=IntersectionObserver"></script>
```

If you need to polyfill web components, please see
[webcomponents.org/polyfills/](https://www.webcomponents.org/polyfills/)

## Using the Element

The element is a 1-to-1 copy of the standard HTML `<img />` element, so all 
in-spec attributes and features should also be available to `<lazy-img>` 
elements as well.

*Example:*

```HTML
<lazy-img src="..."></lazy-img>
```

## Aspect Ratio Space

In addition to all normal features of the `<img />` tag, you can specify a 
`ratio` attribute so that the `<lazy-img>` will occupy the proper space on the 
page while the image is loading. To do so, specify an aspect ratio like:
`[width]:[height]`.

*Example:*

```HTML
<lazy-img src="..." ratio="16:9"></lazy-img>
```