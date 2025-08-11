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


export async function generateDocIngles(arrayPrimeros, arraySegundos) {

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
          menu("SPECIAL MENU"),
          espacios(""),
          espacios(""),
          aperitivo("WELCOME APPETIZERS"),
          simbolo("****"),
          ...arrayPrimeros.map(p => normal(`*${p}`)),
          simbolo("......................................................................................."),
          ...arraySegundos.map(p => normal(`*${p}`)),
          simbolo("............................................................................................."),
          normal("*ASSORTED HOMEMADE DESSERTS"),
          espacios(""),
          bodega("WINE NOT INCLUDED"),
          espacios(""),
          precio("PRICE: 34,00 € VAT INCLUDED"),
          precio("1 DISH AND DESSERT...........24,00 € VAT INCLUDED"),
          espacios(""),
          horario("RESTAURANT HOURS:"),
          horario("LUNCH 13:15 H. TO 15:30 H. // DINNER 20:30 H. TO 22:30 H."),
          espacios(""),
          final("THIS ESTABLISHMENT CANNOT GUARANTEE THE ABSENCE OF CROSS-CONTAMINATION OF ANY ALLERGIES DUE TO TRACEABILITY IN THE PREPARATION OF PRODUCTS FROM OUR MENU OFFERING."),
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
  const nombreArchivo = `MENU 34 € (INGLES) DESDE ${fechaFormateada}.docx`;

  // Guardar con FileSaver.js
  saveAs(blob, nombreArchivo);
};
