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
		const primeros = Array.from(document.getElementsByClassName("primerPlato"))
			.map(el => el.value.trim())
			.filter(val => val !== "");

		const segundos = Array.from(document.getElementsByClassName("segundoPlato"))
			.map(el => el.value.trim())
			.filter(val => val !== "");

		return { primeros, segundos };
	}

	botonRecogerPlatos.addEventListener("click", () => {
		resumen();
	});

	function resumen() {

		const { primeros, segundos } = recogerPlatos();

		const dialogo = document.createElement("dialog");

		// Estilos con Tailwind para diseño flotante moderno
		dialogo.className = `
			bg-[#2a0e43b3] text-white rounded-xl p-6 
			max-w-3xl w-full border border-gray-300 shadow-2xl
			backdrop:bg-black/30 backdrop:backdrop-blur-sm
		`;
		dialogo.style.margin = "auto";

		// Contenido del diálogo
		dialogo.innerHTML = `
			<h1 class="text-xl font-semibold mb-3">Compruebe los datos introducidos y descargue los documentos</h1>
			
			<div>
				<h2 class="font-bold text-lg mb-2">PRIMEROS</h2>
				<div class="grid grid-cols-2 gap-6">
					<div>
						<h3 class="font-semibold mb-1">ESPAÑOL</h3>
						<ol id="listaPrimerosES" class="list-decimal list-inside"></ol>
					</div>
					<div>
						<h3 class="font-semibold mb-1">INGLÉS</h3>
						<ol id="listaPrimerosEN" class="list-decimal list-inside"></ol>
					</div>
				</div>
			</div>

			<div class="mt-6">
				<h2 class="font-bold text-lg mb-2">SEGUNDOS</h2>
				<div class="grid grid-cols-2 gap-6">
					<div>
						<h3 class="font-semibold mb-1">ESPAÑOL</h3>
						<ol id="listaSegundosES" class="list-decimal list-inside"></ol>
					</div>
					<div>
						<h3 class="font-semibold mb-1">INGLÉS</h3>
						<ol id="listaSegundosEN" class="list-decimal list-inside"></ol>
					</div>
				</div>
			</div>


			<button id="descargarDocumentos" class="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition">
				Descargar
			</button>

			<button id="cerrarDialogo" class="mt-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition">
				✘ Cerrar
			</button>
		`;

		// Agregar al DOM y mostrar
		document.body.appendChild(dialogo);

		// Rellenar listas dinámicamente
		const listaPrimeros = dialogo.querySelector("#listaPrimerosES");
		primeros.forEach(plato => {
			const li = document.createElement("li");
			li.textContent = plato;
			listaPrimeros.appendChild(li);
		});

		const listaSegundos = dialogo.querySelector("#listaSegundosES");
		segundos.forEach(plato => {
			const li = document.createElement("li");
			li.textContent = plato;
			listaSegundos.appendChild(li);
		});

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
	}

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






	async function traduccion(primeros, segundos) {

		let platos = [...primeros, ...segundos];

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

}