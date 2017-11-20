'use strict'

function selectNode(selector) {
  return document.querySelector(selector)
}

function updateNodeContent(selector, data) {
  selectNode(selector).innerHTML = data
}

function updateHeaderStyles() {
  addClassToNodesList('.big-data', 'big-data-visible')
  addClassToNodesList('.small-data', 'small-data-visible')
  addClassToNodesList('.label', 'label-visible')
}
function addClassToNodesList(targetSelector, newClass) {
  document.querySelectorAll(targetSelector).forEach(node => {
    node.classList.add(newClass);
  })
}

export {updateNodeContent, updateHeaderStyles}
