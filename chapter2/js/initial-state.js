const initalState = {
  places: {
    cocina: {
      elements: [
        'pollo',
        'sarten',
        'pimienta',
        'llave'
      ],
      available: [
        'pasillo',
      ]
    },
    pasillo: {
      available: [
        'cocina',
        'asador'
      ],
      elements: [
        'puerta'
      ]
    },
    dormitorio: {
      available: [
        'pasillo'
      ],
      elements: [
        'mechero'
      ]
    },
    asador: {
      elements: [
        'horno',
      ],
      available: [
        'pasillo',
      ]
    },
    bag: {
      elements: []
    }
  },
  bagSelect: [],
  end: false,
  messages: [],
  location: 'cocina'
}
