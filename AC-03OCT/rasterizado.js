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

    // Método para calcular el centroide del polígono (no se dibuja)
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

    // Generar los puntos aleatorios dentro del área del canvas
    for (let i = 0; i < numPuntos; i++) {
        const x = numeroAleatorio(50, 450);
        const y = numeroAleatorio(50, 450);
        puntos.push(new Punto(x, y));
    }

    return puntos;
}

// Función para dibujar el polígono en canvas (rasterizado)
function dibujarRasterizado(puntos) {
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Limpiar el canvas antes de dibujar

    ctx.beginPath();
    ctx.moveTo(puntos[0].getX(), puntos[0].getY()); // Mover a la primera coordenada

    // Dibujar el polígono conectando todos los puntos
    for (let i = 1; i < puntos.length; i++) {
        ctx.lineTo(puntos[i].getX(), puntos[i].getY());
    }
    ctx.closePath(); // Cerrar el polígono

    // Establecer el color y dibujar el polígono
    ctx.fillStyle = 'lightblue';
    ctx.fill();
    ctx.strokeStyle = 'black'; // Un solo color para las líneas
    ctx.stroke();

    // Dibujar líneas desde cada punto a su siguiente
    ctx.strokeStyle = 'black'; // Usar un solo color para todas las líneas
    for (let i = 0; i < puntos.length; i++) {
        ctx.beginPath();
        ctx.moveTo(puntos[i].getX(), puntos[i].getY());
        ctx.lineTo(puntos[(i + 1) % puntos.length].getX(), puntos[(i + 1) % puntos.length].getY());
        ctx.stroke();
    }
}

// Función principal para generar y mostrar el polígono aleatorio
function generarPoligono() {
    const puntos = generarPuntosAleatorios(); // Generar puntos aleatorios
    const poligono = new Poligono(puntos); // Crear el polígono con esos puntos
    poligono.ordenarPuntos(); // Ordenar los puntos en sentido horario

    // Dibujar el polígono y las líneas
    dibujarRasterizado(poligono.puntos);
    
    // Mostrar si el polígono es convexo o cóncavo
    document.getElementById('tipoPoligono').textContent = `El polígono es: ${poligono.tipoPoligono()}`;
}

// Generar un polígono al cargar la página
window.onload = generarPoligono;
