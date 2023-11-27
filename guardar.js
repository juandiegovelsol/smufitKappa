var thisDocument = app.activeDocument;
var textFrames = thisDocument.textFrames;

var isDigital = false;
for (var i = 0; i < textFrames.length; i++) {
  if (textFrames[i].contents === "Digital") {
    isDigital = true;
    break;
  }
}

if (isDigital) {
  var docName = thisDocument.name;
  var docPath = thisDocument.fullName;

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
