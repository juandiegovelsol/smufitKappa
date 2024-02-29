var thisDocument = app.activeDocument;
var textFrames = thisDocument.textFrames;
var placedItems = thisDocument.placedItems;
var docName = decodeURI(thisDocument.name);
var docPath = decodeURI(thisDocument.fullName.parent);
var folders = docPath.split("/");
var clientList = [
  {
    name: "Rabbit",
    symbols: "Ficha 1, Rabbit y Cualquier otro",
  },
  {
    name: "Smurfit Kappa",
    symbols: "Ficha 1, Ficha 2 y otros...",
  },
];

alert("Recuerda indicar el sentido de entrada!");

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

//Verificar si el documento tiene campos de texto editables en la capa AW
var awLayer = null;
for (var i = 0; i < thisDocument.layers.length; i++) {
  if (
    thisDocument.layers[i].name === "AW" ||
    thisDocument.layers[i].name === "AW trazada"
  ) {
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
      textFramesInAWLayer[j].contents !== "" &&
      textFramesInAWLayer[j].editable
    ) {
      hasEditableText = true;
      break;
    }
  }

  if (hasEditableText) {
    alert(
      "La capa 'AW' contiene campos de texto editables. Por favor revisa los campos de texto."
    );
  } else {
    alert(
      "Se verificó que la capa 'AW' no contiene campos de texto editables. Se procederá a guardar el documento..."
    );
  }

  // Verificar si la capa AW no está trazada
  if (!awLayer.locked && awLayer.name !== "AW trazada") {
    // Duplicar la capa AW y trazar la capa duplicada
    var duplicatedAWLayer = thisDocument.layers.add();
    duplicatedAWLayer.name = "AW trazada";

    // Copiar los elementos de la capa original a la capa duplicada
    for (var j = 0; j < awLayer.pageItems.length; j++) {
      var currentItem = awLayer.pageItems[j];
      var duplicatedItem = currentItem.duplicate(
        duplicatedAWLayer,
        ElementPlacement.PLACEATEND
      );
      // Crear contornos para los elementos duplicados
      duplicatedItem.createOutline();
    }

    // Bloquear la capa duplicada
    duplicatedAWLayer.locked = true;
    awLayer.visible = false;

    alert("Se duplicó y trazó la capa 'AW'.");
  } else {
    alert("La capa 'AW' ya está trazada. No se requiere acción adicional.");
  }
} else {
  alert("No se encontró la capa 'AW'. No se realizarán cambios.");
}

//Lanzar alerta según el nombre de la carpeta concuerda con alguno de los clientes
var client = [];
for (var i = 0; i < clientList.length; i++) {
  for (var j = 0; j < folders.length; j++) {
    if (clientList[i].name === folders[j]) {
      client = clientList[i];
      break;
    }
  }
  if (client.name) {
    alert(
      client.name +
        ", recuerde que los símbolos " +
        client.symbols +
        " no deben estar presentes en el archivo."
    );
    break;
  }
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
