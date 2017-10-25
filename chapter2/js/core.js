function areElementsAvailables(state, elements) {
  for (const i in elements) {
    if ((state.places[state.location].elements.indexOf(elements[i]) === -1) &&
      (state.places.bag.elements.indexOf(elements[i]) === -1)
    ) {
      return false
    }
  }
  return true
}

function arraysIdentical(a, b = []) {
    const a1 = a.sort()
    const b1 = b.sort()
    var i = a1.length;
    if (i != b1.length) return false;
    while (i--) {
        if (a1[i] !== b1[i]) return false;
    }
    return true;
};

function getResult(state = initalState, action) {
  const newPlaces = Object.assign({}, state.places)
  let end = false;
  let messages = []
  const subjects = state.bagSelect
  subjects.push(action.subject)
    gameInteractions.forEach(function(interaction) {
      if (arraysIdentical(interaction.elements, subjects) && areElementsAvailables(state, subjects) ) {
        if (interaction.place === state.location) {
          const results = interaction.result
          end = end || interaction.end
          interaction.message && messages.push(interaction.message)
          results && results.forEach(function(interactionResult) {
            const elementResult = interactionResult.elements
            if (elementResult) {
              if (elementResult.add) {
                const olders = newPlaces[interactionResult.place].elements
                const news = olders.concat(elementResult.add)
                newPlaces[interactionResult.place].elements = Array.from(new Set(news))
              }
              if (elementResult.remove) {
                const olders = newPlaces[interactionResult.place].elements
                newPlaces[interactionResult.place].elements = olders.filter(function(element) {
                  return elementResult.remove.indexOf(element) === -1
                });
              }
            }
            const availablePlaces = interactionResult.available
            if (availablePlaces) {
              if (availablePlaces.add) {
                const olders = newPlaces[interactionResult.place].available
                const news = olders.concat(availablePlaces.add)
                newPlaces[interactionResult.place].available = Array.from(new Set(news))
              }
              if (interactionResult.available.remove) {
                const olders = newPlaces[interactionResult.place].available
                newPlaces[interactionResult.place].available = olders.filter(function(element) {
                  return !interactionResult.remove.indexOf(element)
                });
              }
            }
          })
        }
      }
    })
  return Object.assign({}, state, { messages: messages, places: newPlaces, end: end, bagSelect: [] })
}

function gotTo(state, location) {
  if (state.places[state.location].available.indexOf(location) != -1) {
    return location
  }

  return state.location
}

function perform(state = initalState, action) {
  switch (action.type) {
    case 'GOTO':
      const loc = gotTo(state, action.subject)
      return Object.assign({}, state, { location: loc, messages:[] })
    case 'INTERACTUE':
      return getResult(state, action)
    case 'BAGS_SELECT':
      const bagSelect = state.bagSelect
      bagSelect.push(action.subject)
      return Object.assign({}, state, { bagSelect: bagSelect })
    default:
      return state
  }
}

function getActionType(location) {
  return (location && initalState.places[location])
    ? 'GOTO'
    : 'INTERACTUE'
}

function setAction(subject) {
  return {
      type: getActionType(subject),
      subject: subject,
  }
}
