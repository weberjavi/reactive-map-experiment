'use strict'

function updateNode(selector, data) {
  document.querySelector(selector).innerHTML = data
}

function updateStyles() {

}

export {updateNode, updateStyles}
