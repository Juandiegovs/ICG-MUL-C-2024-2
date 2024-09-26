// Clase para representar un punto
class Punto {
  constructor(x, y) {
      this._x = x; // Coordenada x del punto
      this._y = y; // Coordenada y del punto
  }

  // Métodos para obtener las coordenadas
  get x() {
      return this._x;
  }

  get y() {
      return this._y;
  }
}

// Clase base para todas las formas
class Forma {
  constructor(svg, color, punto) {
      this.svg = svg; // Almacena el elemento SVG donde se dibujará
      this.color = color; // Color de la forma
      this.punto = punto; // Objeto Punto asociado a la forma
  }

  // Método a ser sobrescrito por las subclases
  dibujar() {
      // Este método se implementará en las subclases
  }
}

// Clase para dibujar un círculo
class Circulo extends Forma {
  constructor(svg, cx, cy, radio, color) {
      const punto = new Punto(cx, cy); // Crea un objeto Punto
      super(svg, color, punto); // Llama al constructor de la clase base
      this.radio = radio; // Radio del círculo
  }

  // Implementación del método dibujar para el círculo
  dibujar() {
      const circulo = document.createElementNS("http://www.w3.org/2000/svg", "circle");
      circulo.setAttribute("cx", this.punto.x); // Usa la coordenada x del punto
      circulo.setAttribute("cy", this.punto.y); // Usa la coordenada y del punto
      circulo.setAttribute("r", this.radio);
      circulo.setAttribute("fill", this.color);
      this.svg.appendChild(circulo);
  }
}

// Clase para dibujar una elipse
class Elipse extends Forma {
  constructor(svg, cx, cy, rx, ry, color) {
      const punto = new Punto(cx, cy); // Crea un objeto Punto
      super(svg, color, punto); // Llama al constructor de la clase base
      this.rx = rx; // Radio horizontal de la elipse
      this.ry = ry; // Radio vertical de la elipse
  }

  // Implementación del método dibujar para la elipse
  dibujar() {
      const elipse = document.createElementNS("http://www.w3.org/2000/svg", "ellipse");
      elipse.setAttribute("cx", this.punto.x); // Usa la coordenada x del punto
      elipse.setAttribute("cy", this.punto.y); // Usa la coordenada y del punto
      elipse.setAttribute("rx", this.rx);
      elipse.setAttribute("ry", this.ry);
      elipse.setAttribute("fill", this.color);
      this.svg.appendChild(elipse);
  }
}

// Clase para dibujar una línea
class Linea extends Forma {
  constructor(svg, x1, y1, x2, y2, color, ancho) {
      const puntoInicio = new Punto(x1, y1); // Crea un objeto Punto para el inicio
      const puntoFin = new Punto(x2, y2); // Crea un objeto Punto para el final
      super(svg, color, puntoInicio); // Llama al constructor de la clase base
      this.puntoFin = puntoFin; // Almacena el punto final
      this.ancho = ancho; // Ancho de la línea
  }

  // Implementación del método dibujar para la línea
  dibujar() {
      const linea = document.createElementNS("http://www.w3.org/2000/svg", "line");
      linea.setAttribute("x1", this.punto.x); // Usa la coordenada x del punto de inicio
      linea.setAttribute("y1", this.punto.y); // Usa la coordenada y del punto de inicio
      linea.setAttribute("x2", this.puntoFin.x); // Usa la coordenada x del punto final
      linea.setAttribute("y2", this.puntoFin.y); // Usa la coordenada y del punto final
      linea.setAttribute("stroke", this.color);
      linea.setAttribute("stroke-width", this.ancho);
      this.svg.appendChild(linea);
  }
}

// Inicializar el SVG y dibujar las formas
const svg = document.getElementById('miSVG'); // Obtiene el elemento SVG

// Crear una instancia de Circulo y dibujarla
const circulo = new Circulo(svg, 100, 100, 50, 'red');
circulo.dibujar(); // Llama al método dibujar

// Crear una instancia de Elipse y dibujarla
const elipse = new Elipse(svg, 250, 100, 75, 50, 'blue');
elipse.dibujar(); // Llama al método dibujar

// Crear una instancia de Linea y dibujarla
const linea = new Linea(svg, 50, 200, 350, 200, 'green', 5);
linea.dibujar(); // Llama al método dibujar
