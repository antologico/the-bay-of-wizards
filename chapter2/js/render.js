const elementSelected = []

function onClickBagElement(element) {
  store.dispatch({
    type: 'BAGS_SELECT',
    subject: element
  })
}

function renderBagElement(state, element) {
  const elementPresentation = gameElements.bag.elements[element]
  const selected = state.bagSelect.indexOf(element) !== -1 ? 'selected' : ''
  return '<img onClick="onClickBagElement(\''+element+'\')" '
    + 'class="'+ selected +' bagElement" src="' + elementPresentation.image + '">'
}

function renderBag(bag, state) {
  let bagContent = ''
  if (state.places.bag) {
    state.places.bag.elements.forEach(function(element) {
      bagContent += renderBagElement(state, element)
    })
  }
  bag.innerHTML = bagContent
}


// ------------------


function onClickGameElement(element) {
    store.dispatch(setAction(element))
}

function renderGameElement(state, element) {
  const elementPresentation = getGameElement(state, element)
  return '<img onClick="onClickGameElement(\''+element+'\')" class="boardElement" style="left:'+elementPresentation.x+'px; top:'+elementPresentation.y+'px"'
    + 'src="' + elementPresentation.image + '">'
}
function getGameElement(state, element) {
  return gameElements[state.location].elements[element]
}

function renderBoard(board, state) {
  let boardContent = ''
  boardContent += '<img style="position: absolute; left: 0; top: 0;" src="' + gameElements[state.location].image + '">'
  state.places[state.location].elements.forEach(function(element) {
    boardContent += renderGameElement(state, element)
  })
  state.places[state.location].available.forEach(function(element) {
    boardContent += renderGameElement(state, element)
  })
  board.innerHTML = boardContent
}

function renderGame(board, bag, state) {
  renderBoard(board, state)
  renderBag(bag, state)
}
