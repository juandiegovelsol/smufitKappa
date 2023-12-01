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

/* var openOpt = new OpenOptions();
  get swatches
 openOpt.openAs=LibraryType.SWATCHES; */

/* open(filePath, null);
var doc2 = app.activeDocument,
  doc = app.documents[1];
var thisSw, newSw;

for (var i = 0; i < 5; i++) {
  thisSw = doc2.swatches[i];

  if (thisSw.name == "[Registro]" || thisSw.name == "[Ninguno]") {
    continue;
  }
  alert(thisSw.name);
  newSw = doc.swatches.add();
  newSw.name = thisSw.name;
  newSw.color = thisSw.color;
}
doc2.close(SaveOptions.DONOTSAVECHANGES); */
open(filePath, null);

var sourceDoc = app.activeDocument;
var targetDoc = app.documents[0];

if (sourceDoc.swatchGroups.length > 0) {
  var sourceSwatchGroup = sourceDoc.swatchGroups["Pantone"]; // Selecciona el primer grupo de muestras

  var newSwatchGroup = targetDoc.swatchGroups.add();
  newSwatchGroup.name = sourceSwatchGroup.name;

  // Copia las muestras del grupo fuente al grupo de destino
  var swatch = null;
  var newSwatch = null;
  for (var i = 0; i < 10 /* sourceDoc.swatches.length */; i++) {
    swatch = sourceDoc.swatches[i];
    newSwatch = targetDoc.swatches.add();
    newSwatch.name = swatch.name;
    newSwatch.color = swatch.color;
  }

  alert("El grupo de muestras se ha copiado al nuevo documento.");
} else {
  alert("No se encontraron grupos de muestras en el documento fuente.");
}
