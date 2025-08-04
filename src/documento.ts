import {
  Document,
  Packer,
  Paragraph,
  TextRun,
  AlignmentType,
} from "docx";
import { saveAs } from "file-saver";

const centered = (text: string, bold = false, size = 32) =>
  new Paragraph({
    alignment: AlignmentType.CENTER,
    children: [
      new TextRun({
        text,
        bold,
        size,
      }),
    ],
  });

const left = (text: string, bold = false, size = 24) =>
  new Paragraph({
    alignment: AlignmentType.LEFT,
    children: [
      new TextRun({
        text,
        bold,
        size,
      }),
    ],
  });

const generateDoc = async () => {
  const doc = new Document({
    sections: [
      {
        children: [
          centered("MENÚ ESPECIAL", true, 40),
          new Paragraph(""),
          centered("APERITIVO DE BIENVENIDA", true),
          centered("****"),
          centered("*ENSALADA DE LANGOSTINOS Y SALMÓN CON ALIÑO DE MIEL Y MOSTAZA"),
          centered("SOBRE TULIPA DE PASTA FILO"),
          centered("*PUERROS CONFITADOS CON ESPUMA DE AJOBLANCO"),
          centered("*ARROZ NEGRE CON JIBION EN SU TINTA"),
          centered("*VOLOVAN RELLENO DE PUERROS Y GAMBAS"),
          centered("*CAZUELITA DE ALMEJAS Y MEJILLONES EN SALSA MARINERA"),
          centered("*MARMITAKO DE BONITO"),
          centered("............................."),
          centered("*BACALAO A LA VIZCAÍNA"),
          centered("*MERLUZA BRASEADA CON SU REFRITO Y PATATA PANADERA"),
          centered("*BONITO DE TEMPORADA ENCEBOLLADO"),
          centered("*ENTRECOT GRILLÉ CON PATATAS FRITAS Y PIMIENTOS DEL PAÍS"),
          centered("*RABO ESTOFADO EN SU JUGO CON PARMENTIER"),
          centered("*CONFIT DE PATO CON COMPOTA DE MANZANA A LA REDUCCIÓN DE PEDRO XIMÉNEZ"),
          centered("..................................."),
          centered("*SURTIDO DE POSTRES CASEROS"),
          new Paragraph(""),
          centered("BODEGA NO INCLUIDA"),
          new Paragraph(""),
          centered("PRECIO: 34,00 € IVA INCLUIDO", true),
          centered("1 SOLO PLATO Y POSTRE...........24,00 € IVA INCLUIDO", true),
          new Paragraph(""),
          centered("HORARIO RESTAURANTE:", true),
          centered("ALMUERZO DE 13:15 H. A 15:30 H. // CENA DE 20:30 H. A 22:30 H."),
          new Paragraph(""),
          centered(
            "ESTE ESTABLECIMIENTO NO PUEDE GARANTIZAR LA CONTAMINACIÓN CRUZADA DE NINGÚN ALÉRGENO POR TRAZABILIDAD EN LA ELABORACIÓN DE LOS PRODUCTOS DE NUESTRA CARTA Y MENÚS.",
            false,
            20
          ),
        ],
      },
    ],
  });

  const blob = await Packer.toBlob(doc);
  saveAs(blob, "menu_especial.docx");
};

document.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById("descargarMenu") as HTMLButtonElement;
  btn?.addEventListener("click", generateDoc);
});
