// Evento que se activa al hacer clic en el botón "Dibujar"
document.getElementById('dibujar').addEventListener('click', function() {
    // Obtener los valores seleccionados por el usuario
    const figura = document.getElementById('figura').value; // Figura seleccionada
    const color = document.getElementById('color').value; // Color seleccionado
    const x = parseFloat(document.getElementById('coordenadasX').value); // Coordenada X
    const y = parseFloat(document.getElementById('coordenadasY').value); // Coordenada Y
    const canvas = document.getElementById('canvas'); // Obtener el canvas
    const ctx = canvas.getContext('2d'); // Obtener el contexto de dibujo

    // Limpiar el canvas antes de dibujar
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = color; // Establecer el color seleccionado

    // Dibujo de la figura según la selección del usuario
    if (figura === 'cuadrado') {
        ctx.fillRect(x, y, 50, 50); // Dibuja un cuadrado de 50x50
    } else if (figura === 'triangulo') {
        ctx.beginPath(); // Iniciar un nuevo camino
        ctx.moveTo(x, y); // Mover a la posición inicial
        ctx.lineTo(x + 50, y); // Línea hacia la derecha
        ctx.lineTo(x + 25, y - 50); // Línea hacia arriba
        ctx.closePath(); // Cerrar el camino
        ctx.fill(); // Rellenar el triángulo
    } else if (figura === 'circulo') {
        ctx.beginPath(); // Iniciar un nuevo camino
        ctx.arc(x, y, 25, 0, Math.PI * 2); // Dibuja un círculo de radio 25
        ctx.fill(); // Rellena el círculo
    }
});