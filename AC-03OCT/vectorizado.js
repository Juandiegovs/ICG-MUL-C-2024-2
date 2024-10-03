// Clase Punto con propiedades encapsuladas
class Punto {
    // Propiedades privadas para las coordenadas
    #x;
    #y;

    constructor(x, y) {
        this.#x = x; // Inicializar coordenada X
        this.#y = y; // Inicializar coordenada Y
    }

    // Método público para obtener coordenada X
    getX() {
        return this.#x;
    }

    // Método público para obtener coordenada Y
    getY() {
        return this.#y;
    }
}

// Clase Polígono
class Poligono {
    constructor(puntos) {
        this.puntos = puntos;
    }

    // Método para determinar si el polígono es convexo o cóncavo usando producto cruzado
    esConvexo() {
        const n = this.puntos.length;
        let signos = [];

        // Recorremos los puntos del polígono
        for (let i = 0; i < n; i++) {
            const p1 = this.puntos[i];
            const p2 = this.puntos[(i + 1) % n];
            const p3 = this.puntos[(i + 2) % n];

            const dx1 = p2.getX() - p1.getX();
            const dy1 = p2.getY() - p1.getY();
            const dx2 = p3.getX() - p2.getX();
            const dy2 = p3.getY() - p2.getY();

            // Producto cruzado de los vectores
            const cruz = dx1 * dy2 - dy1 * dx2;
            signos.push(Math.sign(cruz)); // Guardamos el signo del producto cruzado
        }

        // Si todos los signos son positivos o todos son negativos, el polígono es convexo
        const allPositive = signos.every(v => v >= 0);
        const allNegative = signos.every(v => v <= 0);

        return allPositive || allNegative;
    }

    // Método que retorna si el polígono es convexo o cóncavo
    tipoPoligono() {
        return this.esConvexo() ? "Convexo" : "Cóncavo";
    }

    // Método para calcular el centroide del polígono
    calcularCentroide() {
        let sumaX = 0, sumaY = 0;
        this.puntos.forEach(punto => {
            sumaX += punto.getX();
            sumaY += punto.getY();
        });
        const centroideX = sumaX / this.puntos.length;
        const centroideY = sumaY / this.puntos.length;
        return new Punto(centroideX, centroideY);
    }

    // Método para ordenar los puntos en sentido horario
    ordenarPuntos() {
        const centroide = this.calcularCentroide();
        this.puntos.sort((a, b) => {
            const angleA = Math.atan2(a.getY() - centroide.getY(), a.getX() - centroide.getX());
            const angleB = Math.atan2(b.getY() - centroide.getY(), b.getX() - centroide.getX());
            return angleA - angleB; // Ordenar por ángulo
        });
    }
}

// Función para generar un número aleatorio entre min y max
function numeroAleatorio(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Función para generar un polígono con puntos aleatorios
function generarPuntosAleatorios() {
    const numPuntos = numeroAleatorio(3, 20); // Número aleatorio de puntos entre 3 y 20
    const puntos = [];

    // Generar los puntos aleatorios dentro del área del SVG
    for (let i = 0; i < numPuntos; i++) {
        const x = numeroAleatorio(50, 450);
        const y = numeroAleatorio(50, 450);
        puntos.push(new Punto(x, y));
    }

    return puntos;
}

// Función para dibujar el polígono en SVG (vectorizado)
function dibujarVectorizado(puntos) {
    const svg = document.getElementById('svg');
    svg.innerHTML = ''; // Limpiar el SVG antes de dibujar

    // Crear el polígono
    const puntosString = puntos.map(p => `${p.getX()},${p.getY()}`).join(' ');
    const poligono = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
    poligono.setAttribute('points', puntosString);
    poligono.setAttribute('fill', 'lightblue');
    poligono.setAttribute('stroke', 'black');
    poligono.setAttribute('stroke-width', '2');
    svg.appendChild(poligono);

    // Dibujar líneas desde cada punto a su siguiente
    for (let i = 0; i < puntos.length; i++) {
        const linea = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        linea.setAttribute('x1', puntos[i].getX());
        linea.setAttribute('y1', puntos[i].getY());
        linea.setAttribute('x2', puntos[(i + 1) % puntos.length].getX());
        linea.setAttribute('y2', puntos[(i + 1) % puntos.length].getY());
        linea.setAttribute('stroke', 'black'); // Un solo color para las líneas
        linea.setAttribute('stroke-width', '1');
        svg.appendChild(linea);
    }
}

// Función principal para generar y mostrar el polígono aleatorio
function generarPoligono() {
    const puntos = generarPuntosAleatorios(); // Generar puntos aleatorios
    const poligono = new Poligono(puntos); // Crear el polígono con esos puntos
    poligono.ordenarPuntos(); // Ordenar los puntos en sentido horario

    // Dibujar el polígono y las líneas
    dibujarVectorizado(poligono.puntos);
    
    // Mostrar si el polígono es convexo o cóncavo
    document.getElementById('tipoPoligono').textContent = `El polígono es: ${poligono.tipoPoligono()}`;
}

// Generar un polígono al cargar la página
window.onload = generarPoligono;
