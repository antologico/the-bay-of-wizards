const gameElements = {
  cocina: {
    image: 'images/places/cocina/cocina.svg',
    elements: {
      llave: {
        image: 'images/places/cocina/llave.svg',
        x:'400', y:'500'
      },
      sarten: {
        image: 'images/places/cocina/sarten.svg',
        x:'200', y:'270'
      },
      pasillo: {
        image: 'images/places/cocina/pasillo.svg',
        x:'600', y:'250'
      },
      pollo: {
        image: 'images/places/cocina/pollo.svg',
        x:'200', y:'230'
      },
      pimienta: {
        image: 'images/places/cocina/pimienta.svg',
        x:'170', y:'245'
      },
    }
  },
  pasillo: {
    image: 'images/places/pasillo/pasillo.svg',
    elements: {
      cocina: {
        image: 'images/places/pasillo/abierta.svg',
        x:'100', y:'250'
      },
      puerta: {
        image: 'images/places/pasillo/cerrada.svg',
        x:'350', y:'250'
      },
      dormitorio: {
        image: 'images/places/pasillo/abierta.svg',
        x:'350', y:'250'
      },
      asador: {
        image: 'images/places/pasillo/abierta.svg',
        x:'600', y:'250'
      },
    }
  },
  dormitorio: {
    image: 'images/places/dormitorio/dormitorio.svg',
    elements: {
      pasillo: {
        image: 'images/places/dormitorio/pasillo.svg',
        x:'600', y:'250'
      },
      mechero: {
        image: 'images/places/dormitorio/mechero.svg',
        x:'600', y:'550'
      },
    }
  },
  asador: {
    image: 'images/places/asador/asador.svg',
    elements: {
      pasillo: {
        image: 'images/places/asador/pasillo.svg',
        x:'500', y:'250'
      },
      horno: {
        image: 'images/places/asador/horno.svg',
        x:'200', y:'340'
      },
      polloAsadoPimientado: {
        image: 'images/places/asador/pollo.svg',
        x:'280', y:'400'
      }
    }
  },
  bag: {
    elements: {
      pollo: { image: 'images/places/bag/pollo.svg' },
      mechero: { image: 'images/places/bag/mechero.svg' },
      llave: { image: 'images/places/bag/llave.svg' },
      pimienta: { image: 'images/places/bag/pimienta.svg' },
    }
  }
}
