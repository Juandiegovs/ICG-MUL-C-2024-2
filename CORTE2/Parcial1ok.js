class Cartesiana {
    #x; // Atributo privado
    #y; // Atributo privado

    constructor(x, y) {
        this.#x = x;
        this.#y = y;
    }

    // Métodos para obtener las coordenadas
    getX() {
        return this.#x;
    }

    getY() {
        return this.#y;
    }
}

class Polar {
    #radio; // Atributo privado
    #angulo; // Atributo privado

    constructor(radio, angulo) {
        this.#radio = radio;
        this.#angulo = angulo;
    }

    // Métodos para obtener las coordenadas
    getRadio() {
        return this.#radio;
    }

    getAngulo() {
        return this.#angulo;
    }

    // Método para convertir a coordenadas cartesianas
    toCartesiana() {
        const x = this.#radio * Math.cos(this.#angulo);
        const y = this.#radio * Math.sin(this.#angulo);
        return new Cartesiana(x, y);
    }
}

function cambiarCampos() { 
    const tipoCoordenadas = document.getElementById('tipoCoordenadas').value; 
    const coordenadasCartesianas = document.getElementById('coordenadasCartesianas'); 
    const coordenadasPolares = document.getElementById('coordenadasPolares'); 

    if (tipoCoordenadas === 'cartesianas') { 
        coordenadasCartesianas.style.display = 'block'; 
        coordenadasPolares.style.display = 'none'; 
    } else { 
        coordenadasCartesianas.style.display = 'none'; 
        coordenadasPolares.style.display = 'block'; 
    }
}

function dibujarPoligono() { 
    const canvas = document.getElementById('miCanvas'); 
    const ctx = canvas.getContext('2d'); 

    const n = parseInt(document.getElementById('lados').value); // Número de lados
    const L = parseInt(document.getElementById('lado').value); // Longitud de los lados
    const trazar = document.getElementById('trazar').value; // Tipo de figura a trazar
    let centro; 

    const tipoCoordenadas = document.getElementById('tipoCoordenadas').value; 
    
    if (tipoCoordenadas === 'cartesianas') { 
        const centroX = parseInt(document.getElementById('centroX').value); 
        const centroY = parseInt(document.getElementById('centroY').value); 
        centro = new Cartesiana(centroX, centroY); // Crear objeto Cartesiana
    } else { 
        const angulo = parseInt(document.getElementById('angulo').value) * (Math.PI / 180); 
        const radioCentro = parseInt(document.getElementById('radioCentro').value); 
        const centroPolar = new Polar(radioCentro, angulo); // Crear objeto Polar
        centro = centroPolar.toCartesiana(); // Convertir a Cartesiana
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height); // Limpia el canvas 

    if (trazar === 'poligono') {
        const radio = L / (2 * Math.sin(Math.PI / n)); // Calcula el radio del polígono regular
        ctx.beginPath(); 

        for (let i = 0; i < n; i++) {
            const angulo = (2 * Math.PI / n) * i; 
            const x = centro.getX() + radio * Math.cos(angulo); 
            const y = centro.getY() + radio * Math.sin(angulo); 
            ctx.lineTo(x, y); 
        }

        ctx.closePath(); 
        ctx.stroke(); // Dibuja el contorno del polígono en el canvas
    } else if (trazar === 'apotema') {
        const apotema = L / (2 * Math.tan(Math.PI / n)); // Calcula el apotema
        ctx.beginPath();
        ctx.arc(centro.getX(), centro.getY(), apotema, 0, 2 * Math.PI); // Dibuja el círculo con apotema
        ctx.stroke(); // Dibuja el contorno del círculo
    }
}
