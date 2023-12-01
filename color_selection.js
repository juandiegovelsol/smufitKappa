// Ruta del archivo .ACB
/* var filePath =
  "C:/Users/Juan Diego/Desktop/Documentos Escritorio/Rabbit/Smurfit Kappa/Plantillas/biblioteca_pantone_uncoated.ai";
// Abrir el archivo como biblioteca de muestras
var colorbookFile = new File(filePath);

if (colorbookFile.exists) {
  app.open(colorbookFile); // Abre el archivo como una biblioteca de muestras
} else {
  alert("El archivo no se ha encontrado en la ruta especificada.");
} */

//target Illustrator

//  insert your path here, or a file picker prompt
var filePath = new File(
  "C:/Users/Juan Diego/Desktop/Documentos Escritorio/Rabbit/Smurfit Kappa/Plantillas/biblioteca_pantone_uncoated1.ai"
);
open(filePath, null);
var sourceDoc = app.activeDocument;
var targetDoc = app.documents[1];
if (sourceDoc.swatchGroups.length > 0) {
  var swatch = null;
  var newSwatch = null;
  for (var i = 0; i < sourceDoc.swatches.length; i++) {
    swatch = sourceDoc.swatches[i];
    newSwatch = targetDoc.swatches.add();
    newSwatch.name = swatch.name;
    newSwatch.color = swatch.color;
  }
  alert("El grupo de muestras se ha copiado al nuevo documento.");
} else {
  alert("No se encontraron grupos de muestras en el documento fuente.");
}
