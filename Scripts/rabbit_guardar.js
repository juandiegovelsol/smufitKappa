var thisDocument = app.activeDocument;
var textFrames = thisDocument.textFrames;
var placedItems = thisDocument.placedItems;
var docName = decodeURI(thisDocument.name);
var docPath = decodeURI(thisDocument.fullName.parent);

if (thisDocument.rulerUnits.toString().split(".")[1] !== "Millimeters") {
  alert(
    "Las unidades de este documento son: " +
      thisDocument.rulerUnits.toString().split(".")[1] +
      ", por favor recuerda cambiarlas a milímetros!"
  );
}

var isDigital = false;
for (var i = 0; i < textFrames.length; i++) {
  var content = textFrames[i].contents;
  var regex = /Digital/;
  if (regex.test(content)) {
    isDigital = true;
    break;
  }
}

// Incrustar las imágenes colocadas en el documento
for (var i = 0; i < placedItems.length; i++) {
  var currentItem = placedItems[i];
  if (currentItem.typename === "PlacedItem") {
    try {
      currentItem.embed();
    } catch (e) {
      alert("Error al incrustar la imagen: " + e.message);
    }
  }
}

//Verificar si el documento tiene campos de texto editables en la capa AW -- VERIFICAR!!
var awLayer = null;
for (var i = 0; i < thisDocument.layers.length; i++) {
  if (thisDocument.layers[i].name === "AW") {
    awLayer = thisDocument.layers[i];
    break;
  }
}
if (awLayer) {
  var textFramesInAWLayer = awLayer.textFrames;
  var hasEditableText = false;

  for (var j = 0; j < textFramesInAWLayer.length; j++) {
    if (
      textFramesInAWLayer[j].kind === TextType.POINTTEXT &&
      textFramesInAWLayer[j].contents !== ""
    ) {
      hasEditableText = true;
      break;
    }
  }

  if (hasEditableText) {
    alert(
      "La capa 'AW' contiene campos de texto editables. Por favor, revisa y elimina los campos de texto antes de guardar."
    );
  }
} else {
  alert("El documento no tiene la capa llamada 'AW'.");
}

if (!thisDocument.path.exists) {
  // El documento no ha sido guardado previamente, pedir al usuario que seleccione una ubicación
  var newDoc = File.saveDialog("Guardar como");
  if (newDoc != null) {
    thisDocument.saveAs(newDoc);
    alert("El archivo se guardó como: " + decodeURI(newDoc.name));
  } else {
    alert("No se ha seleccionado una ubicación para guardar el archivo.");
  }
} else {
  thisDocument.save();
}

if (isDigital) {
  if (docName.charAt(0) !== "D" || docName.charAt(1) !== "P") {
    var newName = "DP" + docName;
    var newDocPath = docPath + "/" + newName;

    if (new File(newDocPath).exists) {
      alert(
        "Ya existe un archivo con el mismo nombre. Intenta de nuevo con otro nombre."
      );
    } else {
      thisDocument.saveAs(new File(newDocPath));
      alert("El archivo se guardó como: " + newName);
    }
  } else {
    alert("El nombre del archivo ya empieza por 'DP'.");
  }
} else {
  alert("No se pudo detectar que el documento es del tipo Digital");
}
