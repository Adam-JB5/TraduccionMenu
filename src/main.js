import { mostrarError, mostrarExito } from "./utils";
import { generateDoc } from "./documento.ts";

document.addEventListener("DOMContentLoaded", inicio);

function inicio() {
	let botonPrimero = document.getElementById("annadirPrimero");
	let botonSegundo = document.getElementById("annadirSegundo");
	let botonRecogerPlatos = document.getElementById("recogerPlatos");

	botonPrimero.addEventListener("click", () => {
		annadirCampo("primero", botonPrimero);
	});

	botonSegundo.addEventListener("click", () => {
		annadirCampo("segundo", botonSegundo);
	});

	function annadirCampo(cat, boton) {
		/* Campos maximos */
		let maxCampos = 6;

		/* Clase que se añade segun es se pasa por argumento primero */
		let clase = cat === "primero" ? "primerPlato" : "segundoPlato";
		let camposActuales = document.querySelectorAll("." + clase).length;


		if (camposActuales + 1 >= maxCampos) {

			mostrarError("Se han añadido el máximo de 6 campos");

			boton.disabled = true;
			boton.classList.add("botonDesactivado");
		}

		let input = document.createElement("textarea");
		input.classList.add(clase);
		input.classList.add("w-full", "placeholder-gray-400", "p-2", "rounded-md", "border", "border-gray-300", "focus:outline-none", "focus:ring-2", "focus:ring-amber-500", "animate__animated", "animate__fadeInLeft");
		input.setAttribute("placeholder", "Ingrese un plato");
		input.setAttribute("spellcheck", "true");


		if (cat === "primero") {
			document.getElementById("divInputsPrimeros").appendChild(input);
		} else {
			document.getElementById("divInputsSegundos").appendChild(input);
		}
	}

	function recogerPlatos() {
		botonRecogerPlatos.addEventListener("click", () => {

			const primeros = Array.from(document.getElementsByClassName("primerPlato"))
				.map(el => el.value.trim())
				.filter(val => val !== "");

			const segundos = Array.from(document.getElementsByClassName("segundoPlato"))
				.map(el => el.value.trim())
				.filter(val => val !== "");

			generateDoc(primeros, segundos);


		});
	}

	recogerPlatos();

	function informacion() {
		const botonInfo = document.getElementById("botonInformacion");

		botonInfo.addEventListener("click", () => {
			const dialogo = document.createElement("dialog");

			// Estilos con Tailwind para diseño flotante moderno
			dialogo.className = `
			bg-[#2a0e43b3] text-white rounded-xl p-6 max-w-md w-full border border-gray-300 shadow-2xl
			backdrop:bg-black/30 backdrop:backdrop-blur-sm
		`;

			// Contenido del diálogo
			dialogo.innerHTML = `
			<h1 class="text-2xl font-semibold mb-3">Información</h1>
			<p class="mb-4">
				Este es un diálogo flotante personalizado usando el elemento <code>&lt;dialog&gt;</code>.
			</p>
			<button id="cerrarDialogo" class="mt-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition">
				✘ Cerrar
			</button>
		`;

			// Agregar al DOM y mostrar
			document.body.appendChild(dialogo);
			dialogo.showModal();

			// Cierre por botón
			dialogo.querySelector("#cerrarDialogo").addEventListener("click", () => {
				dialogo.close();
				dialogo.remove();
			});

			// Cierre al hacer clic fuera del diálogo
			dialogo.addEventListener("click", (e) => {
				if (e.target === dialogo) {
					dialogo.close();
					dialogo.remove();
				}
			});
		});
	}

	informacion();


}



function traduccion() {
	const platos = [
		"Ensalada de tomate",
		"Croquetas de jamón",
		"Pulpo a la gallega"
	];

	const params = new URLSearchParams();
	params.append("auth_key", "e4209ca8-0b79-4723-9397-8f7f695ca017:fx");
	params.append("source_lang", "ES");
	params.append("target_lang", "EN");
	platos.forEach(p => params.append("text", p));

	fetch("https://api-free.deepl.com/v2/translate", {
		method: "POST",
		headers: { "Content-Type": "application/x-www-form-urlencoded" },
		body: params.toString()
	})
		.then(res => res.json())
		.then(data => {
			data.translations.forEach((obj, i) => {
				console.log(`${platos[i]} → ${obj.text}`);
			});
		});
}