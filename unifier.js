var scriptFolder = Folder.selectDialog("Selecciona la carpeta de los scripts"); // Selecciona la carpeta de los scripts

if (scriptFolder) {
  var scriptsJS = scriptFolder.getFiles("*.js"); // Obtiene todos los archivos con extensión .jsx y .js en la carpeta seleccionada
  var scriptsJSX = scriptFolder.getFiles("*.jsx"); // Obtiene todos los archivos con extensión .jsx y .js en la carpeta seleccionada
  var scripts = [];
  pushFile(scripts, scriptsJS);
  pushFile(scripts, scriptsJSX);
  var scriptNames = [];
  pushNames(scripts, scriptNames);
  /* for (var i = 0; i < scriptsJS.length; i++) {
    var scriptName = scriptsJS[i].displayName;
    scriptNames.push(scriptName); // Guarda los nombres de los scripts en un arreglo
  } */
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
  alert("No se ha seleccionado ninguna carpeta.");
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
