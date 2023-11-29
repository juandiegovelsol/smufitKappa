var thisDocument = app.activeDocument;
var textFrames = thisDocument.textFrames;

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

if (isDigital) {
  var docName = decodeURI(thisDocument.name);
  var docPath = decodeURI(thisDocument.fullName.parent);

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
