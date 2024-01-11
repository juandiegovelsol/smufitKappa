// Obtener la ruta del archivo actual
var currentScriptFile = File($.fileName);

// Obtener la ruta del directorio del archivo actual
var currentScriptFolder = currentScriptFile.parent;

// Crear una ruta que apunte a la carpeta "scripts" dentro del directorio padre
var scriptFolder = new Folder(currentScriptFolder + "/scripts");

// Verificar si la carpeta "scripts" existe
if (scriptFolder.exists) {
  var scriptsJS = scriptFolder.getFiles("*.js"); // Obtiene todos los archivos con extensión .jsx y .js en la carpeta seleccionada
  var scriptsJSX = scriptFolder.getFiles("*.jsx"); // Obtiene todos los archivos con extensión .jsx y .js en la carpeta seleccionada
  var scripts = [];
  pushFile(scripts, scriptsJS);
  pushFile(scripts, scriptsJSX);
  var scriptNames = [];
  pushNames(scripts, scriptNames);
  var a = 0;
  var dlg = new Window("dialog", "RBupdate");
  dlg.alignChildren = ["left", "top"];

  var titleBox = dlg.add("panel");
  titleBox.text = "Selecciona el script a ejecutar";
  titleBox.orientation = "column";
  titleBox.alignChildren = ["left", "top"];

  var scriptCheckboxesGroup = titleBox.add("group");
  scriptCheckboxesGroup.alignChildren = ["left", "top"];
  scriptCheckboxesGroup.orientation = "column";

  var scriptCheckboxes = [];
  for (var i = 0; i < scriptNames.length; i++) {
    var checkbox = scriptCheckboxesGroup.add(
      "checkbox",
      undefined,
      scriptNames[i]
    );

    // Personalizar el tamaño del checkbox
    checkbox.preferredSize = [200, 20]; // Ajusta los valores según sea necesario
    checkbox.index = i;
    // Quitar el borde del checkbox
    /* checkbox.graphics.newPath();
    checkbox.graphics.rectPath(
      0,
      0,
      checkbox.preferredSize[0],
      checkbox.preferredSize[1]
    );
    checkbox.graphics.strokePath();
    checkbox.graphics.foregroundColor = checkbox.graphics.newPen(
      checkbox.graphics.PenType.SOLID_COLOR,
      [1, 1, 1], // Cambia el color del fondo del checkbox según sea necesario
      1
    );
    checkbox.graphics.fillPath(
      checkbox.graphics.newBrush(
        checkbox.graphics.BrushType.SOLID_COLOR,
        [1, 1, 1] // Cambia el color del fondo del checkbox según sea necesario
      )
    ); */

    // Agregar un manejador de eventos para ejecutar el script al cambiar el estado del checkbox
    checkbox.onClick = function () {
      if (this.value) {
        var selectedScript = scripts[this.index];
        this.value = false;
        $.evalFile(selectedScript); // Ejecuta el script seleccionado
      }
    };
    scriptCheckboxes.push(checkbox);
  }

  var footer = dlg.add("group");
  footer.alignChildren = ["center", "top"];
  footer.orientation = "row";

  // Agregar logotipo orientado a la izquierda
  var leftLogoGroup = footer.add("group");
  leftLogoGroup.alignChildren = ["left", "top"];
  var leftLogo = leftLogoGroup.add(
    "image",
    undefined,
    File(currentScriptFolder + "/Logos/skw.png")
  );
  //leftLogo.preferredSize = [100, 13]; // Ajusta el tamaño según sea necesario

  // Agregar campo de texto orientado a la derecha con texto y logotipo
  var rightFieldGroup = footer.add("group");
  rightFieldGroup.alignChildren = ["right", "top"];
  var rightTextField = rightFieldGroup.add(
    "statictext",
    undefined,
    "Built with ❤ by"
  );
  var rightLogo = rightFieldGroup.add(
    "image",
    undefined,
    File(currentScriptFolder + "/Logos/rabbits.png")
  );
  //rightLogo.preferredSize = [20, 10]; // Ajusta el tamaño según sea necesario

  dlg.show();
} else {
  // La carpeta "scripts" no existe
  $.writeln(
    "La carpeta 'scripts' no existe en la ruta: " + scriptFolder.fsName
  );
}

function pushNames(scripts, scriptNames) {
  for (var i = 0; i < scripts.length; i++) {
    var scriptName = scripts[i].displayName;
    scriptNames.push(scriptName); // Guarda los nombres de los scripts en un arreglo
  }
}

function pushFile(scripts, scriptFiles) {
  for (var i = 0; i < scriptFiles.length; i++) {
    scripts.push(scriptFiles[i]);
  }
}

/* function resizeImage(image, maxWidth, maxHeight) {
  var imageSize = image.icon.size;
  var aspectRatio = imageSize[0] / imageSize[1];

  if (imageSize[0] > maxWidth) {
    image.icon.size.width = maxWidth;
    image.icon.size.height = maxWidth / aspectRatio;
    var a = 0;
  }

  if (imageSize[1] > maxHeight) {
    image.icon.size.width = maxHeight * aspectRatio;
    image.icon.size.height = maxWidth;
    var a = 0;
  }
} */
