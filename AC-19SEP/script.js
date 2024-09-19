// Clase base para todas las formas
class Forma {
    constructor(svg, color) {
        this.svg = svg; // Almacena el elemento SVG donde se dibujará
        this.color = color; // Color de la forma
    }

    // Método a ser sobrescrito por las subclases
    dibujar() {
        // Este método se implementará en las subclases
    }
}

// Clase para dibujar un círculo
class Circulo extends Forma {
    constructor(svg, cx, cy, radio, color) {
        super(svg, color); // Llama al constructor de la clase base
        this.cx = cx; // Coordenada x del centro
        this.cy = cy; // Coordenada y del centro
        this.radio = radio; // Radio del círculo
    }

    // Implementación del método dibujar para el círculo
    dibujar() {
        const circulo = document.createElementNS("http://www.w3.org/2000/svg", "circle"); // Crea un elemento <circle>
        circulo.setAttribute("cx", this.cx); // Establece la coordenada x del centro
        circulo.setAttribute("cy", this.cy); // Establece la coordenada y del centro
        circulo.setAttribute("r", this.radio); // Establece el radio
        circulo.setAttribute("fill", this.color); // Establece el color de relleno
        this.svg.appendChild(circulo); // Agrega el círculo al SVG
    }
}

// Clase para dibujar una elipse
class Elipse extends Forma {
    constructor(svg, cx, cy, rx, ry, color) {
        super(svg, color); // Llama al constructor de la clase base
        this.cx = cx; // Coordenada x del centro
        this.cy = cy; // Coordenada y del centro
        this.rx = rx; // Radio horizontal de la elipse
        this.ry = ry; // Radio vertical de la elipse
    }

    // Implementación del método dibujar para la elipse
    dibujar() {
        const elipse = document.createElementNS("http://www.w3.org/2000/svg", "ellipse"); // Crea un elemento <ellipse>
        elipse.setAttribute("cx", this.cx); // Establece la coordenada x del centro
        elipse.setAttribute("cy", this.cy); // Establece la coordenada y del centro
        elipse.setAttribute("rx", this.rx); // Establece el radio horizontal
        elipse.setAttribute("ry", this.ry); // Establece el radio vertical
        elipse.setAttribute("fill", this.color); // Establece el color de relleno
        this.svg.appendChild(elipse); // Agrega la elipse al SVG
    }
}

// Clase para dibujar una línea
class Linea extends Forma {
    constructor(svg, x1, y1, x2, y2, color, ancho) {
        super(svg, color); // Llama al constructor de la clase base
        this.x1 = x1; // Coordenada x del punto de inicio
        this.y1 = y1; // Coordenada y del punto de inicio
        this.x2 = x2; // Coordenada x del punto final
        this.y2 = y2; // Coordenada y del punto final
        this.ancho = ancho; // Ancho de la línea
    }

    // Implementación del método dibujar para la línea
    dibujar() {
        const linea = document.createElementNS("http://www.w3.org/2000/svg", "line"); // Crea un elemento <line>
        linea.setAttribute("x1", this.x1); // Establece la coordenada x del punto de inicio
        linea.setAttribute("y1", this.y1); // Establece la coordenada y del punto de inicio
        linea.setAttribute("x2", this.x2); // Establece la coordenada x del punto final
        linea.setAttribute("y2", this.y2); // Establece la coordenada y del punto final
        linea.setAttribute("stroke", this.color); // Establece el color de la línea
        linea.setAttribute("stroke-width", this.ancho); // Establece el ancho de la línea
        this.svg.appendChild(linea); // Agrega la línea al SVG
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
