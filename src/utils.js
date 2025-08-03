export function mostrarError(mensaje) {
    let errorDiv = document.getElementById("register-error");
    if (!errorDiv) {
        errorDiv = document.createElement("div");
        errorDiv.id = "register-error";
        errorDiv.className = `
            fixed top-4 left-1/2 transform -translate-x-1/2 
            bg-red-600 bg-opacity-60 text-white text-2xl px-6 py-4 
            rounded-xl shadow-lg z-50 slideDown
        `;
        document.body.appendChild(errorDiv);
    }
    errorDiv.textContent = mensaje;

     setTimeout(() => {
        errorDiv.classList.remove("slideDown");
        errorDiv.classList.add("slideUp");

        // Esperar a que termine la animación antes de eliminar
        errorDiv.addEventListener("animationend", () => {
            errorDiv.remove();
        }, { once: true });
    }, 2000);
}

export function mostrarExito(mensaje, tiempo) {
    let successDiv = document.getElementById("register-success");
    if (!successDiv) {
        successDiv = document.createElement("div");
        successDiv.id = "register-success";
        successDiv.className = `
            fixed top-10 left-1/2 transform -translate-x-1/2 
            bg-green-600 text-white text-2xl px-6 py-4 
            rounded-xl shadow-lg z-50 fadeIn
        `;
        document.body.appendChild(successDiv);
    }

    successDiv.textContent = mensaje;

    // Se elimina el div despues de 2 segundos
    setTimeout(() => {
        successDiv.remove();
    }, (tiempo || 2000));
}