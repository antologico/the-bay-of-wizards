const gameInteractions = [
      {
        elements: [
          'sarten'
        ],
        place:'cocina',
        message: 'No lo puedo guardar es muy pesada'
      },
      {
        elements: [
          'puerta'
        ],
        place:'pasillo',
        message: 'Sin la llave no puedo entrar'
      },
      {
        elements: [
          'llave',
          'puerta'
        ],
        place:'pasillo',
        result: [
          {
            elements: {
              remove: ['llave']
            },
            place: 'bag'
          }, {
            available: {
              add: ['dormitorio']
            },
            elements: {
              remove: ['puerta']
            },
            place: 'pasillo'
          }
        ]
      },
      {
        end: true,
        elements: [
          'pollo',
          'horno',
          'pimienta',
          'mechero'
        ],
        place:'asador',
        result: [
          {
            elements: {
              add: ['polloAsadoPimientado'],
            },
            place: 'asador'
          }
        ]
      },
      {
        elements: [
          'pollo'
        ],
        place: 'cocina',
        result: [
          {
            elements: {
              add: ['pollo'],
            },
            place: 'bag'
          },
          {
            elements: {
              remove: ['pollo'],
            },
            place: 'cocina'
          }
        ]
      },
      {
        elements: [
          'pimienta'
        ],
        place: 'cocina',
        result: [
          {
            elements: {
              add: ['pimienta'],
            },
            place: 'bag'
          }, {
            elements: {
              remove: ['pimienta'],
            },
            place: 'cocina'
          }
        ]
      },
      {
        elements: [
          'llave'
        ],
        place: 'cocina',
        result: [
          {
            elements: {
              add: ['llave'],
            },
            place: 'bag'
          }, {
            elements: {
              remove: ['llave'],
            },
            place: 'cocina'
          }
        ]
      },
      {
        elements: [
          'mechero'
        ],
        place: 'dormitorio',
        result: [
          {
            elements: {
              add: ['mechero'],
            },
            place: 'bag',
            messages: [
              'Esto me vendrá muy bien'
            ]
          }, {
            elements: {
              remove: ['mechero'],
            },
            place: 'dormitorio'
          }
        ]
      }
]
