import {
  Document,
  Packer,
  Paragraph,
  TextRun,
  AlignmentType,
  ImageRun,
  HorizontalPositionAlign,
  HorizontalPositionRelativeFrom,
  VerticalPositionRelativeFrom,
} from "docx";
import { saveAs } from "file-saver";

/* ********************************************** */

// ESTILOS PERSONALIZADOS SEGÚN INSTRUCCIONES

const imagen = (text: string) =>
  new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: {
      line: 240,
      lineRule: "auto",
    },
    children: [
      new TextRun({
        text,
        size: 14 * 2,
      }),
    ],
  });

const menu = (text: string) =>
  new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: {
      line: 240,
      lineRule: "auto",
    },
    children: [
      new TextRun({
        text,
        bold: true,
        underline: {},
        size: 20 * 2,
        font: "Century Gothic",
      }),
    ],
  });

const aperitivo = (text: string) =>
  new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: {
      line: 240,
      lineRule: "auto",
    },
    children: [
      new TextRun({
        text,
        size: 12 * 2,
        font: "Century Gothic",
      }),
    ],
  });

const simbolo = (text: string) =>
  new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: {
      line: 360,
      lineRule: "auto",
    },
    children: [
      new TextRun({
        text,
        size: 15 * 2,
        font: "Century Gothic",
      }),
    ],
  });

const normal = (text: string) =>
  new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: {
      line: 360,
      lineRule: "auto",
    },
    children: [
      new TextRun({
        text,
        size: 12 * 2,
        font: "Century Gothic",
      }),
    ],
  });

const bodega = (text: string) =>
  new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: {
      line: 360,
      lineRule: "auto",
    },
    children: [
      new TextRun({
        text,
        bold: true,
        italics: true,
        size: 11 * 2,
        font: "Century Gothic",
      }),
    ],
  });

const precio = (text: string) =>
  new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: {
      line: 360,
      lineRule: "auto",
    },
    children: [
      new TextRun({
        text,
        bold: true,
        size: 11 * 2,
        font: "Century Gothic",
      }),
    ],
  });

const horario = (text: string) =>
  new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: {
      line: 360,
      lineRule: "auto",
    },
    children: [
      new TextRun({
        text,
        bold: true,
        underline: {},
        size: 11 * 2,
        font: "Century Gothic",
      }),
    ],
  });

const final = (text: string) =>
  new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: {
      line: 360,
      lineRule: "auto",
    },
    children: [
      new TextRun({
        text,
        bold: true,
        italics: true,
        size: 10 * 2,
        font: "Century Gothic",
        color: "2F75B5",
      }),
    ],
  });

const espacios = (text: string) =>
  new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: {
      line: 360,
      lineRule: "auto",
    },
    children: [
      new TextRun({
        text,
        size: 10 * 2,
        font: "Century Gothic",
      }),
    ],
  });

/* ********************************************** */


const generateDoc = async () => {

  const logoB = await fetch("/TraduccionMenu/logo.jpg").then(res => res.arrayBuffer());
  const qrB = await fetch("/TraduccionMenu/qr.png").then(res => res.arrayBuffer());

  const doc = new Document({
    sections: [
      {
        properties: {
          page: {
            margin: {
              top: 720,      // 1.27 cm
              bottom: 720,   // puede ajustar si desea
              left: 720,
              right: 567,
            },
          },
        },
        children: [
          new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: {
              line: 240,
              lineRule: "auto",
            },
            children: [
              new ImageRun({
                type: "jpg",
                data: logoB,
                transformation: {
                  width: 251,
                  height: 83,
                },
              }),
              new ImageRun({
                type: "png",
                data: qrB,
                transformation: {
                  width: 66,
                  height: 66,
                },
                floating: {
                  horizontalPosition: {
                    relative: HorizontalPositionRelativeFrom.MARGIN, // Puede usar PAGE o MARGIN
                    align: HorizontalPositionAlign.RIGHT,
                  },
                  verticalPosition: {
                    relative: VerticalPositionRelativeFrom.PARAGRAPH,
                    offset: 0, // o el valor que necesite
                  },
                },
              }),
            ],
          }),
          /* new Paragraph({
            alignment: AlignmentType.CENTER,
            children: [
              new ImageRun({
                type: "png",
                data: qrB,
                transformation: {
                  width: 66,
                  height: 66,
                },
              }),
            ],
          }), */
          espacios(""),
          menu("MENÚ ESPECIAL"),
          espacios(""),
          aperitivo("APERITIVO DE BIENVENIDA"),
          simbolo("****"),
          normal("*ENSALADA DE LANGOSTINOS Y SALMÓN CON ALIÑO DE MIEL Y MOSTAZA"),
          normal("SOBRE TULIPA DE PASTA FILO"),
          normal("*PUERROS CONFITADOS CON ESPUMA DE AJOBLANCO"),
          normal("*ARROZ NEGRE CON JIBION EN SU TINTA"),
          normal("*VOLOVAN RELLENO DE PUERROS Y GAMBAS"),
          normal("*CAZUELITA DE ALMEJAS Y MEJILLONES EN SALSA MARINERA"),
          normal("*MARMITAKO DE BONITO"),
          simbolo("............................."),
          normal("*BACALAO A LA VIZCAÍNA"),
          normal("*MERLUZA BRASEADA CON SU REFRITO Y PATATA PANADERA"),
          normal("*BONITO DE TEMPORADA ENCEBOLLADO"),
          normal("*ENTRECOT GRILLÉ CON PATATAS FRITAS Y PIMIENTOS DEL PAÍS"),
          normal("*RABO ESTOFADO EN SU JUGO CON PARMENTIER"),
          normal("*CONFIT DE PATO CON COMPOTA DE MANZANA A LA REDUCCIÓN DE PEDRO XIMÉNEZ"),
          simbolo("..................................."),
          normal("*SURTIDO DE POSTRES CASEROS"),
          espacios(""),
          bodega("BODEGA NO INCLUIDA"),
          espacios(""),
          precio("PRECIO: 34,00 € IVA INCLUIDO"),
          precio("1 SOLO PLATO Y POSTRE...........24,00 € IVA INCLUIDO"),
          espacios(""),
          horario("HORARIO RESTAURANTE:"),
          horario("ALMUERZO DE 13:15 H. A 15:30 H. // CENA DE 20:30 H. A 22:30 H."),
          espacios(""),
          final("ESTE ESTABLECIMIENTO NO PUEDE GARANTIZAR LA CONTAMINACIÓN CRUZADA DE NINGÚN ALÉRGENO POR TRAZABILIDAD EN LA ELABORACIÓN DE LOS PRODUCTOS DE NUESTRA CARTA Y MENÚS."),
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
