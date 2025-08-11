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


export async function generateDoc(arrayPrimeros, arraySegundos) {

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
              left: 900,
              right: 900,
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
          espacios(""),
          aperitivo("APERITIVO DE BIENVENIDA"),
          simbolo("****"),
          ...arrayPrimeros.map(p => normal(`*${p}`)),
          simbolo("......................................................................................."),
          ...arraySegundos.map(p => normal(`*${p}`)),
          simbolo("............................................................................................."),
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


  // Obtener fecha actual
  const fecha = new Date();

  // Formatear fecha en español (día y mes)
  const opciones: Intl.DateTimeFormatOptions = { day: "2-digit", month: "long" };
  const fechaFormateada = fecha.toLocaleDateString("es-ES", opciones).toUpperCase();

  // Construir nombre de archivo dinámico
  const nombreArchivo = `MENU 34 € CASTELLANO DESDE ${fechaFormateada}.docx`;

  // Guardar con FileSaver.js
  saveAs(blob, nombreArchivo);
};
