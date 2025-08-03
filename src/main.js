import { mostrarError, mostrarExito } from "./utils";

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
		let maxCampos = 6;
		let clase = cat === "primero" ? "primerPlato" : "segundoPlato";
		let camposActuales = document.querySelectorAll("." + clase).length;


		if (camposActuales + 1 >= maxCampos) {

			mostrarError("Se han añadido el máximo de 6 campos");

			boton.disabled = true;
			boton.classList.add("botonDesactivado");
		}

		let input = document.createElement("input");
		input.classList.add(clase);

		boton.parentNode.insertBefore(input, boton);
	}

	botonRecogerPlatos.addEventListener("click", () => {
		let arrayPrimeros = Array.from(document.getElementsByClassName("primerPlato"));
		let arraySegundos = Array.from(document.getElementsByClassName("segundoPlato"));

		arrayPrimeros.forEach(element => {
			if (element.value != null && element.value != "") {
			console.log("Primer plato:", element.value);
			}
		});

		arraySegundos.forEach(element => {
			console.log("Segundo plato:", element.value);
		});


	});
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