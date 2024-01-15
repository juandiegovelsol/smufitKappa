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
  titleBox.margins.top = 20;

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

  var leftLogoGroup = dlg.add("group");
  leftLogoGroup.alignChildren = ["left", "top"];
  var leftLogo = leftLogoGroup.add(
    "image",
    undefined,
    File(currentScriptFolder + "/Logos/skw.png")
  );

  var footer = dlg.add("group");
  footer.alignChildren = ["fill", "top"];
  footer.orientation = "row";

  // Agregar logotipo orientado a la izquierda
  var leftFieldGroup = footer.add("group");
  leftFieldGroup.alignChildren = ["left", "top"];
  var leftTextField = leftFieldGroup.add(
    "statictext",
    undefined,
    "Versión RB1.5"
  );

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
