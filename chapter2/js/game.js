var store = Redux.createStore(perform)

var bagEl = document.getElementById('bag')
var messageEl = document.getElementById('message')
var boardEl = document.getElementById('board')

function render() {
  const state = store.getState()
  messageEl.innerHTML = state.messages.toString()
  renderGame(boardEl, bagEl, state)
}

render()

store.subscribe(render)

function getGenerateAction(text) {
  const textElements = text.split(" ");
  if (textElements.length == 0) {
    return
  }
  store.dispatch(setAction(textElements))
}
