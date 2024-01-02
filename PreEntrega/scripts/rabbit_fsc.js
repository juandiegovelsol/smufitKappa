// Obtener la ruta del archivo actual
var currentScriptFile = File($.fileName);

// Obtener la ruta del directorio del archivo actual
var currentScriptFolder = currentScriptFile.parent;

// Crear una ruta que apunte a la carpeta "scripts" dentro del directorio padre
var fileRef = new File(currentScriptFolder.fsName + "/VALIDACION FSC.oft");

fileRef.execute();
