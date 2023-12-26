/*********************************************************************************************************
SCRIPT GUIAS 
Unificar el script de B1 y el de Troquelados y que pregunte cuando se ejecuta cual necesitamos. 
Crear capas y añadir símbolos:   
    AW -> Añadir el logo de SK (los dos, stack y el logo2) 
        EJEMPLO PARA AÑADIR SIMBOLOS:
        var aDoc = app.activeDocument;
        var sym = aDoc.symbols["4-40"];
        var aSymInstance = aDoc.symbolItems.add(sym);
    FX -> Ahí iría el cajetín, puede ser el de la digital (Fitxa digital 2) o el normal (Fitxa 2), 
        que pregunte cual queremos poner. Además, cuando lo ponga, que haga ajuste a la mesa de trabajo. 

V1 -> 

***************************************************************************************************************
Creamos una caja de dialogo
En el posicionamiento de los objetos [20,40,150,40] se corresponde a [izquierda,superior,derecha, inferior]
**************************************************************************************************************/
var dlg = new Window("dialog", "Guias");
dlg.frameLocation = [100, 100];
dlg.size = [260, 300];

//Lista para definir si el cajetín es el de la digital o el normal
dlg.txtdigital = dlg.add("statictext", [30, 10, 150, 30]);
dlg.txtdigital.text = "Digital";
dlg.digital = dlg.add("dropdownlist", [30, 30, 150, 50]);
dlg.digital.selection = dlg.digital.add("item", "No");
dlg.digital.add("item", "Si");

//Lista para definir si el trazado de las guias es para B1 o troqueladas
// v1.01 se añade la opción de "Sin guias", por si no las necesitamos
dlg.txttipo = dlg.add("statictext", [30, 60, 150, 80]);
dlg.txttipo.text = "Tipo de caja";
dlg.tipo = dlg.add("dropdownlist", [30, 80, 150, 100]);
dlg.tipo.selection = dlg.tipo.add("item", "B1");
dlg.tipo.add("item", "Troquelada");
dlg.tipo.add("item", "Sin guias");

//Panel para seleccionar que simbolos queremos añadir.
dlg.simbolos = dlg.add("panel", [20, 110, 200, 220], "Simbolos a añadir:");
dlg.simbolos.sk = dlg.simbolos.add(
  "checkbox",
  [10, 20, 180, 40],
  "Smurfit Kappa"
);
dlg.simbolos.escuadra = dlg.simbolos.add(
  "checkbox",
  [10, 50, 180, 70],
  "Escuadra de registro"
);
dlg.simbolos.cajetin = dlg.simbolos.add(
  "checkbox",
  [10, 80, 180, 100],
  "Ficha"
);

dlg.simbolos.sk.value = true;
dlg.simbolos.escuadra.value = true;
dlg.simbolos.cajetin.value = true;

//botones para Ejecutar
dlg.btnOK = dlg.add("button", [20, 240, 120, 270], "Ejecutar", "ok");
dlg.btnKO = dlg.add("button", [140, 240, 240, 270], "Cancelar", "cancel");
/**************************************************************************************************************/

function anadirCosas() {
  var doc = activeDocument;

  if (documents.length == 0) {
    alert("No hay ningun documento abierto.");
    exit;
  }

  var valorSK = dlg.simbolos.sk.value;
  var valorEscuadra = dlg.simbolos.escuadra.value;
  var valorCajetin = dlg.simbolos.cajetin.value;
  var valorDigital = dlg.digital.selection.text;
  var valorTipo = dlg.tipo.selection.text;

  dlg.close();

  //definimos el grosor para pasarselo a la capa de sangrado
  //v1.01 cambiamos el condicional para que tenga en cuenta la nueva opción en la lista desplegable.
  if (valorTipo == "B1") ARDcrearCapaSangrado(20);
  else if (valorTipo == "Troquelada") ARDcrearCapaSangrado(12);

  /*
    Miramos la posición para 
    V1.01 Se cambia para que coja la posición de la mesa de trabajo en vez del documento como estaba antes y no funcionaba.
    */
  var posOriX = doc.artboards[0].artboardRect[0];
  var posOriY = doc.artboards[0].artboardRect[1];

  /***************************************************************************************************************************
   *** AÑADIMOS LOS SÍMBOLOS QUE NOS INTERESAN AL DOCUMENTO <-- No se comprueba si ya existen en la libreria del documento. ***
   ***************************************************************************************************************************/
  //v1.01 se elimina el 'SmurfitKappa logo 2'
  //var logoSK1 = 'SmurfitKappa logo 2'
  //doc.symbols.add(libSKFicha.simbolo(logoSK1));
  var logoSK2 = "SmurfitKappa stacked";
  var escuadra = "Escuadra de registro";
  var cajDIGI = "FITXA DIGITAL 2";
  var cajNORMAL = "FITXA 2";
  var fichero =
    "C:\\Program Files\\Adobe\\Adobe Illustrator 2023\\Presets\\es_ES\\Símbolos\\SmurfitKappa - Ficha.ai";
  var libSKFicha = new symbolLibrary();

  libSKFicha.begin(fichero);

  /**************************************************************************************************************************/

  doc.selection = null;

  // capa AW -> aqui van los simbolos de SK + escuadra
  // revisar porque no tiene en cuenta si se ha marcado el tick o no, y solo crear la capa si se han seleccionado los simbolos de dicha capa.
  //v1.01 se modifica el condicional para que no cree la capa si no seleccionamos que nos pegue los simbolos.
  if (valorSK == true || valorEscuadra == true) {
    try {
      var capaAW = doc.layers["AW"];
    } catch (err) {
      var capaAW = doc.layers.add();
      capaAW.name = "AW";
    }

    doc.activeLayer = doc.layers["AW"];

    if (valorSK == true) {
      try {
        libSKFicha.duplicar(doc, logoSK2).position = [
          posOriX + 40,
          posOriY + 40,
        ];
      } catch (err) {
        alert("Ha habido un problema con los simbolos SK");
      }
    }

    if (valorEscuadra == true) {
      try {
        //var simESC = doc.symbolItems.add(doc.symbols.getByName(escuadra)).position = [posOriX + 70, posOriY + 70];
        libSKFicha.duplicar(doc, escuadra).position = [
          posOriX + 70,
          posOriY + 70,
        ];
      } catch (err) {
        alert("Ha habido un problema con el simbolo escuadra de registro");
      }
    }
  }

  doc.selection = null;

  /*
capa FX -> aqui va símbolo de la ficha.
v1.01 se modifica el condicional para que no cree la capa si no seleccionamos que nos pegue los simbolos.
v1.01 se añade el redimensionado de la ficha mediante la función redimSimbolo.
*/

  if (valorCajetin == true) {
    try {
      var capaFX = doc.layers["FX"];
    } catch (err) {
      var capaFX = doc.layers.add();
      capaFX.name = "FX";
    }

    doc.activeLayer = doc.layers["FX"];

    try {
      if (valorDigital == "No") {
        //doc.symbolItems.add(doc.symbols.getByName(cajNORMAL)).position = [posOriX,posOriY];
        libSKFicha.duplicar(doc, cajNORMAL).position = [posOriX, posOriY];
      } else {
        //doc.symbolItems.add(doc.symbols.getByName(cajDIGI)).position = [posOriX,posOriY];
        libSKFicha.duplicar(doc, cajDIGI).position = [posOriX, posOriY];
      }
    } catch (err) {
      alert("Ha habido un problema al insertar el cajetín");
    }
  }

  libSKFicha.end();

  if (doc.symbolItems.length > 0) {
    for (i = 0; i < doc.symbolItems.length; i++) {
      if (doc.symbolItems[i].width > 1000) {
        redimSimbolo(doc.symbolItems[i]);
      }
    }
  }

  doc.selection = null;
}

function ARDcrearCapaSangrado(mm) {
  var doc = activeDocument;
  var capaARD = buscarCapaARD();
  var capaPlano = capaARD.layers.getByName("Main Design");

  try {
    var capaAntigua = doc.layers.getByName("Guias");
    capaAntigua.locked = false;
    capaAntigua.remove();
  } catch (e) {}

  // Quitamos toda la seleccion
  doc.selection = null;
  capaARD.locked = false;
  capaPlano.locked = false;

  capaPlano.hasSelectedArtwork = true;

  app.copy();

  //creamos una nueva capa que contiene lo mismo que la capa del ARD.
  var capaARD2 = doc.layers.add();
  capaARD2.name = activeDocument.name.substr(
    0,
    activeDocument.name.indexOf(".")
  );
  app.paste();

  //creamos una nueva capa que contiene lo mismo que la capa del ARD y que sea de color CRUDO
  /*var capaARD3 = doc.layers.add();
	capaARD3.name = activeDocument.name.substr(0, activeDocument.name.indexOf("."));
	app.paste();*/

  var capaNueva = doc.layers.add();
  capaNueva.name = "Guias";
  app.paste();

  doc.selection = null;
  capaARD.locked = true;
  capaPlano.locked = true;
  capaARD2.locked = true;
  var grosor = mmToPt(mm);

  for (var i = 0; i < capaNueva.pageItems.length; i++) {
    var item = capaNueva.pageItems[i];
    item.strokeWidth = grosor;
    item.strokeJoin = StrokeJoin.ROUNDENDJOIN;
    item.strokeCap = StrokeCap.ROUNDENDCAP;
  }

  doc.selection = null;
  capaNueva.hasSelectedArtwork = true;
  app.executeMenuCommand("OffsetPath v22");
  app.executeMenuCommand("group");
  app.executeMenuCommand("Live Pathfinder Add");
  app.executeMenuCommand("expandStyle");

  var grupo = capaNueva.pageItems[0].compoundPathItems[0];

  for (var i = 0; i < grupo.pathItems.length; i++)
    grupo.pathItems[i].guides = true;

  doc.selection = null;

  capaNueva.locked = true;
}

function buscarCapaARD() {
  var doc = activeDocument;

  for (var i = 0; i < doc.layers.length; i++)
    if (doc.layers[i].name.indexOf(".ARD") >= 0) return doc.layers[i];

  return undefined;
}

function mmToPt(mm) {
  return (mm * 72) / 25.4;
}

function symbolLibrary() {
  this.symbolsDoc = null;
  this.len = 0;

  this.begin = function (symbolFileName) {
    var file1 = File(symbolFileName);
    //open the symbol library
    var optRef = new OpenOptions();
    //optRef.openAs = LibraryType.SYMBOLS; //broken. just open as regular doc
    this.symbolsDoc = app.open(file1, null, optRef);
    this.len = this.symbolsDoc.symbols.length;
    return this.symbolsDoc;
  };

  this.list = function () {
    for (var i = 0; i < symbolsDoc.symbols.length; i++) {
      $.writeln(symbolsDoc.symbols[i]);
    }
    return symbolsDoc.symbols;
  };

  this.place = function (targetDoc, index) {
    var symbolItem = this.symbolsDoc.symbolItems.add(
      this.symbolsDoc.symbols[index]
    );
    finalItem = symbolItem.duplicate(targetDoc, ElementPlacement.INSIDE);
    symbolItem.remove();
    return finalItem;
  };

  this.duplicar = function (targetDoc, nombre) {
    var simboloItem = this.symbolsDoc.symbolItems.add(
      this.symbolsDoc.symbols.getByName(nombre)
    );
    simboloFinal = simboloItem.duplicate(targetDoc, ElementPlacement.INSIDE);
    simboloItem.remove();
    return simboloFinal;
  };

  this.simbolo = function (nombre) {
    var simbolItem = this.symbolsDoc.symbolItems.add(
      this.symbolsDoc.symbols.getByName(nombre)
    );
    return simbolItem;
  };

  this.end = function () {
    this.symbolsDoc.close(SaveOptions.DONOTSAVECHANGES);
  };
}

/*
v1.01 se añade la función redimSimbolo.
Extraemos las medidas de la mesa, normalmente, el ARD está ajustado a la mesa, se le da un 5% de margen en el cálculo.
Multiplicamos las medidas del símbolo (W*0.95 y H*0.66) para que solamente tengamos encuenta la parte donde debe ir encajado el plano ARD.
    Se ha calculado, si se cambia el simbolo original modificando medidas, hay que volver a realizar el calculo.
Calcula la proporción a aumentar o disminuir el símbolo,
    se empieza con el ancho y se comprueba si el alto multiplicado por el factor entra en las medidas, si no es así, se calcula el factor para el alto y se usa ese.
*/
function redimSimbolo(simbolo) {
  var doc = activeDocument;

  if (documents.length == 0) {
    alert("No hay ningun documento abierto.");
    exit;
  }

  var j = doc.artboards.getActiveArtboardIndex();
  var mesa = doc.artboards[j];

  var izq = mesa.artboardRect[0];
  var sup = mesa.artboardRect[1];
  var der = mesa.artboardRect[2];
  var inf = mesa.artboardRect[3];

  var factorA = 0.95;
  var factorH = 0.6;

  var ancho = der - izq;
  var alto = inf - sup;

  if (ancho < 0) ancho *= -1;
  if (alto < 0) alto *= -1;

  var anchoSIM = simbolo.width * factorA;
  var altoSIM = simbolo.height * factorH;

  var percent = ancho / anchoSIM;
  /*
    alert('W mesa => ' + ancho + ' H mesa => ' + alto);
    alert('SimbW => ' + simbolo.width + ' SimbH => ' + simbolo.height);
    alert('espacioW => ' + anchoSIM + ' espacioH => ' + altoSIM);
    alert('percentW => ' + percent);
    alert (anchoSIM * percent + ' VS W mesa ' + ancho);
    alert (altoSIM * percent + ' VS H mesa ' + alto);
*/
  if (altoSIM * percent < alto) percent = alto / altoSIM;
  /*
    alert('percentH => ' + percent)
    alert (anchoSIM * percent + ' VS W mesa ' + ancho);
    alert (altoSIM * percent + ' VS H mesa ' + alto);
*/

  percent *= 100;

  simbolo.resize(percent, percent, true);
  /*
    simbY = simbolo.position[1] - (difCentro * percent);
    simbolo.translate(0, simbY);
*/ //mesa.artboardRect = simbolo.visibleBounds;
}

//dlg.btnOK.addEventListener('click', anadirCosas);
dlg.btnOK.onClick = anadirCosas;
dlg.show();
