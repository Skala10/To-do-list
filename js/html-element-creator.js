
export class ElementCreator {
  static createHTMLElement({ tag, props, attrs, styles, events }) {
    const el = document.createElement(tag)
    if (props) {
      for (const propKey in props) {
        el[propKey] = props[propKey]
      }
    }
    if (attrs) {
      for (const attrKey in attrs) {
        el.setAttribute(attrKey, attrs[attrKey])
      }
    }
    if (styles) {
      for (const cssProp in styles) {
        el.style[cssProp] = styles[cssProp]
      }
    }
    if (events) {
      for (const event in events) {
        el.addEventListener(event, events[event])
      }
    }
    return el
  }
}
