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
  var dlg = new Window("dialog", "Seleccionar script a ejecutar");
  dlg.alignChildren = ["left", "top"];

  var scriptList = dlg.add("listbox", undefined, scriptNames);
  scriptList.maximumSize.width = 300;

  var btnGroup = dlg.add("group");
  var okButton = btnGroup.add("button", undefined, "OK");
  var cancelButton = btnGroup.add("button", undefined, "Cancelar");

  okButton.onClick = function () {
    var selectedIndex = scriptList.selection.index;
    dlg.close();
    if (selectedIndex >= 0 && selectedIndex < scripts.length) {
      var selectedScript = scripts[selectedIndex];
      $.evalFile(selectedScript); // Ejecuta el script seleccionado
    }
  };

  cancelButton.onClick = function () {
    dlg.close();
  };

  dlg.show();
} else {
  // La carpeta "scripts" no existe
  $.writeln(
    "La carpeta 'scripts' no existe en la ruta: " + scriptsFolder.fsName
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
