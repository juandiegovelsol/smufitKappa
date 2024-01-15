try {
  var AIversion = version.slice(0, 2);

  var thisDocument = null;

  var symbolFlag = true;
  var sourceDoc = null;
  var newDocument = null;

  if (app.documents.length > 0) {
    thisDocument = app.activeDocument;
  } else {
    thisDocument = app.documents.add();
  }

  var machineList = [
    "Martin RS",
    "Martin NT",
    "Miniline",
    "Celmach",
    "Dro",
    "Nozomi",
  ];

  // Obtener la ruta del archivo actual
  var currentScriptFile = File($.fileName);
  var currentScriptFolder = currentScriptFile.parent;

  // Obtener la ruta de la carpeta madre
  var parentFolder = currentScriptFolder.parent;

  // Obtener la ruta de la carpeta "plantillas" que contiene la carpeta madre
  var plantillasFolder = new Folder(parentFolder + "/plantillas");

  var defaultDocumentDirection =
    plantillasFolder.fsName + "/SmurfitKappa - Ficha.ai";

  var username = $.getenv("USERNAME");
  if (!username) {
    username = $.getenv("USER");
  }

  newDocument = app.open(File(defaultDocumentDirection));
  var symbols = app.activeDocument.symbols;

  if (symbols.length > 0) {
    //Creates dialog window
    var fichaDialog = new Window("dialog", "Ficha");
    fichaDialog.alignChildren = ["left", "top"];

    var listAcabadoBox = fichaDialog.add("panel");
    listAcabadoBox.text = "Acabado";
    listAcabadoBox.orientation = "column";
    listAcabadoBox.alignChildren = ["left", "top"];
    var acabado = listAcabadoBox.add("dropdownlist");
    acabado.add("item", "Blanco Estucado");
    acabado.add("item", "Blanco Mate");
    acabado.add("item", "Marrón");

    var listFlexoDigital = fichaDialog.add("group");
    listFlexoDigital.add("statictext", undefined, "Flexo/Digital: ");
    var flexoDigital = listFlexoDigital.add("dropdownlist");
    flexoDigital.add("item", "Flexo");
    flexoDigital.add("item", "Digital");

    var boxTypeGroup = fichaDialog.add("group");
    boxTypeGroup.add("statictext", undefined, "Tipo de caja");
    var boxType = boxTypeGroup.add("edittext", undefined, "");

    var inputGroup = fichaDialog.add("group");
    inputGroup.add("statictext", undefined, "Troquel:");
    var troquel = inputGroup.add("edittext", undefined, "");

    var listCanal = fichaDialog.add("group");
    listCanal.add("statictext", undefined, "Canal: ");
    var canal = listCanal.add("dropdownlist");
    canal.add("item", "E");
    canal.add("item", "B");
    canal.add("item", "S");
    canal.add("item", "EB");
    canal.add("item", "ES");
    canal.add("item", "BC");

    var listImpresora = fichaDialog.add("group");
    listImpresora.add("statictext", undefined, "Impresora: ");
    var impresora = listImpresora.add("dropdownlist");

    acabado.onChange = function () {
      updateImpresora(acabado, flexoDigital, impresora, machineList);
    };

    flexoDigital.onChange = function () {
      updateImpresora(acabado, flexoDigital, impresora, machineList);
    };

    var inputGroup2 = fichaDialog.add("group");
    inputGroup2.add("statictext", undefined, "% Impresión:");
    var porcentajeImp = inputGroup2.add("edittext", undefined, "");

    //Checkboxes para simbolos a adicionar
    var titleBox = fichaDialog.add("panel");
    titleBox.text = "Insertar Símbolos";
    titleBox.orientation = "column";
    titleBox.alignChildren = ["left", "top"];

    var checkboxGroup = titleBox.add("group");
    checkboxGroup.orientation = "column";
    checkboxGroup.alignChildren = ["left", "top"];
    var checkbox1 = checkboxGroup.add("checkbox", undefined, "Smurfit Kappa");
    var checkbox2 = checkboxGroup.add(
      "checkbox",
      undefined,
      "Escuadra de registro"
    );

    var buttonGroup = fichaDialog.add("group");
    var cancelButton = buttonGroup.add("button", undefined, "CANCELAR");
    cancelButton.onClick = function () {
      fichaDialog.close();
    };

    var OkButton = buttonGroup.add("button", undefined, "EJECUTAR");
    OkButton.onClick = function () {
      var flexoDigitalV =
        flexoDigital.selection !== null
          ? flexoDigital.selection.text
          : "Digital";
      var acabadoV = acabado.selection !== null ? acabado.selection.text : "-";
      var impresoraV =
        impresora.selection !== null ? impresora.selection.text : "-";
      var canalV = canal.selection !== null ? canal.selection.text : "-";
      var troquelV = troquel.text || "-";
      var porcentajeImpV = porcentajeImp.text || "-";
      var boxTypeV = boxType.text || "-";

      var checkbox1Value = checkbox1.value;
      var checkbox2Value = checkbox2.value;
      var currentDateV = getCurrentDate();

      if (checkbox1Value) {
        var insertionPoint = [50, 50];
        var sourceSymbol = symbols["SmurfitKappa stacked"];
        app.activeDocument = thisDocument;
        var destinationDoc = app.activeDocument;
        var symbolItem = newDocument.symbolItems.add(sourceSymbol);
        var symbolCopy = symbolItem.duplicate(destinationDoc);
        symbolCopy.position = insertionPoint;
      }

      if (checkbox2Value) {
        //Inserts Escuadra
        var insertionPoint2 = [100, 100];
        var sourceSymbol = symbols["SmurfitKappa stacked"];
        app.activeDocument = thisDocument;
        var destinationDoc = app.activeDocument;
        var symbolItem2 = newDocument.symbolItems.add(sourceSymbol);
        var symbolCopy = symbolItem2.duplicate(destinationDoc);
        symbolCopy.position = insertionPoint2;
      }

      var sourceSymbol = null;
      app.activeDocument = thisDocument;
      var destinationDoc = app.activeDocument;
      var symbolCopy = null;
      var symbolItem3 = null;

      var top6ColorsC = [];

      var textFrames = [];

      if (flexoDigitalV === "Digital") {
        textFrames = [
          {
            content: username,
            id: "UserID",
            c: 0,
            m: 0,
            y: 0,
            k: 0,
            position: 24,
          },
          {
            content: acabadoV,
            id: "AcabadoID",
            c: 0,
            m: 0,
            y: 0,
            k: 0,
            position: 25,
          },
          {
            content: impresoraV,
            id: "ImpID",
            c: 0,
            m: 0,
            y: 0,
            k: 0,
            position: 49,
          },
          {
            content: canalV,
            id: "CanalID",
            c: 0,
            m: 0,
            y: 0,
            k: 0,
            position: 56,
          },
          {
            content: troquelV,
            id: "TroquelID",
            c: 0,
            m: 0,
            y: 0,
            k: 0,
            position: 54,
          },
          {
            content: boxTypeV,
            id: "ColorRefID",
            c: 0,
            m: 0,
            y: 0,
            k: 0,
            position: 55,
          },
          {
            content: currentDateV,
            id: "DateID",
            c: 0,
            m: 0,
            y: 0,
            k: 0,
            position: 22,
          },
        ];
      } else if (flexoDigitalV === "Flexo") {
        textFrames = [
          {
            content: username,
            id: "UserID",
            c: 0,
            m: 0,
            y: 0,
            k: 0,
            position: 23,
          },
          {
            content: impresoraV,
            id: "ImpID",
            c: 0,
            m: 0,
            y: 0,
            k: 0,
            position: 45,
          },
          {
            content: canalV,
            id: "CanalID",
            c: 0,
            m: 0,
            y: 0,
            k: 0,
            position: 52,
          },
          {
            content: troquelV,
            id: "TroquelID",
            c: 0,
            m: 0,
            y: 0,
            k: 0,
            position: 50,
          },
          {
            content: porcentajeImpV,
            id: "%ImpID",
            c: 0,
            m: 0,
            y: 0,
            k: 0,
            position: 43,
          },
          {
            content: boxTypeV,
            id: "ColorRefID",
            c: 0,
            m: 0,
            y: 0,
            k: 0,
            position: 51,
          },
          {
            content: currentDateV,
            id: "DateID",
            c: 0,
            m: 0,
            y: 0,
            k: 0,
            position: 21,
          },
        ];
        app.activeDocument = thisDocument;

        var colors = {};

        // Iterate through page items
        for (var i = 0; i < thisDocument.pageItems.length; i++) {
          var currentItem = thisDocument.pageItems[i];

          // Check if the item is a filled path
          if (currentItem.typename === "PathItem" && currentItem.filled) {
            if (currentItem.fillColor.cyan !== undefined) {
              var c = currentItem.fillColor.cyan;
              var m = currentItem.fillColor.magenta;
              var y = currentItem.fillColor.yellow;
              var k = currentItem.fillColor.black;
            } else if (currentItem.fillColor.spot.color.cyan !== undefined) {
              var c = currentItem.fillColor.spot.color.cyan;
              var m = currentItem.fillColor.spot.color.magenta;
              var y = currentItem.fillColor.spot.color.yellow;
              var k = currentItem.fillColor.spot.color.black;
            }
            if (
              c !== undefined &&
              m !== undefined &&
              y !== undefined &&
              k !== undefined
            ) {
              // Generate a key
              var colorKey = c + "," + m + "," + y + "," + k;

              // Count the occurrence of each color
              if (!colors[colorKey]) {
                colors[colorKey] = 1;
              } else {
                colors[colorKey]++;
              }
            }
          }
        }

        // Find the 6 most common CMYK colors
        var sortedColors = [];
        for (var key in colors) {
          sortedColors.push({ key: key, count: colors[key] });
        }

        // Sort colors by occurrences
        sortedColors.sort(function (a, b) {
          return b.count - a.count;
        });

        // Get the 6 most common CMYK colors
        for (var i = 0; i < 6; i++) {
          var color = [];
          var sortedColor = sortedColors[i];
          if (sortedColor !== undefined) {
            color = sortedColors[i].key.split(",");
          } else {
            color = [0, 0, 0, 0];
          }
          var name = "";
          for (var j = 0; j < thisDocument.swatches.length; j++) {
            var swatch = thisDocument.swatches[j];
            if (swatch.color.typename === "CMYKColor") {
              var color1 = Math.floor(color[0]);
              var color2 = Math.floor(swatch.color.cyan);
              var color3 = Math.floor(color[1]);
              var color4 = Math.floor(swatch.color.magenta);
              var color5 = Math.floor(color[2]);
              var color6 = Math.floor(swatch.color.yellow);
              var color7 = Math.floor(color[3]);
              var color8 = Math.floor(swatch.color.black);
              if (
                color1 === color2 &&
                color3 === color4 &&
                color5 === color6 &&
                color7 === color8
              ) {
                name = swatch.name;
              }
            }
          }
          top6ColorsC.push({ color: color, name: name });
        }
        //Update colors position:
        top6ColorsC[0].position = 18;
        top6ColorsC[1].position = 17;
        top6ColorsC[2].position = 16;
        top6ColorsC[3].position = 15;
        top6ColorsC[4].position = 14;
        top6ColorsC[5].position = 13;

        // Include color values in the text frames
        for (var j = 0; j < top6ColorsC.length; j++) {
          var content = top6ColorsC[j].name;
          var pos = top6ColorsC[j].position;
          var topColor = top6ColorsC[j].color;
          var textcolor = 100;
          if (k > 50 || (c > 50 && m > 50)) {
            textcolor = 0;
          }
          textFrames.push({
            content: content,
            id: "ColorID" + (j + 1),
            c: 0,
            m: 0,
            y: 0,
            k: textcolor,
            position: pos,
          });
        }
      }

      //Inserts the background layer depending on user selection
      var targetDoc = app.activeDocument;

      var background = targetDoc.layers.add();
      background.zOrder(ZOrderMethod.SENDTOBACK);
      var rect = background.pathItems.rectangle(
        targetDoc.artboards[0].artboardRect[1],
        0,
        targetDoc.width,
        targetDoc.height
      );

      if (rect.fillColor.blue) {
        if (acabadoV === "Blanco Estucado") {
          rect.fillColor.red = 255;
          rect.fillColor.green = 255;
          rect.fillColor.blue = 255;
        } else if (acabadoV === "Blanco Mate") {
          rect.fillColor.red = 255;
          rect.fillColor.green = 255;
          rect.fillColor.blue = 255;
        } else if (acabadoV === "Marrón") {
          rect.fillColor.red = 166;
          rect.fillColor.green = 128;
          rect.fillColor.blue = 98;
        }
      } else {
        if (acabadoV === "Blanco Estucado") {
          rect.fillColor.cyan = 0;
          rect.fillColor.magenta = 0;
          rect.fillColor.yellow = 0;
          rect.fillColor.black = 0;
        } else if (acabadoV === "Blanco Mate") {
          rect.fillColor.cyan = 0;
          rect.fillColor.magenta = 0;
          rect.fillColor.yellow = 0;
          rect.fillColor.black = 0;
        } else if (acabadoV === "Marrón") {
          rect.fillColor.black = 35;
          rect.fillColor.cyan = 0;
          rect.fillColor.magenta = 23;
          rect.fillColor.yellow = 41;
        }
      }

      if (flexoDigitalV === "Digital") {
        sourceSymbol = symbols["FITXA DIGITAL 2"];
      } else {
        sourceSymbol = symbols["FITXA 2"];
      }

      symbolItem3 = newDocument.symbolItems.add(sourceSymbol);
      app.activeDocument = destinationDoc;
      symbolCopy = symbolItem3.duplicate(destinationDoc);

      // Scales ficha symbol according to destinationdoc heigth
      var documentHeight = destinationDoc.height;
      var originalSymbolHeight = symbolCopy.height;
      var scaleFactor = documentHeight / originalSymbolHeight;

      //Positions ficha symbol
      if (destinationDoc.height < 600) {
        symbolCopy.position = [
          symbolCopy.position[0] - 50,
          symbolCopy.position[1] - 4000,
        ];
      } else if (destinationDoc.height < 1000) {
        symbolCopy.position = [
          symbolCopy.position[0] - 100,
          symbolCopy.position[1] - 4050,
        ];
      } else {
        symbolCopy.position = [
          symbolCopy.position[0] - 150,
          symbolCopy.position[1] - 4100,
        ];
      }

      if (symbolFlag) {
        symbolCopy.resize(scaleFactor * 180, scaleFactor * 180);

        //Brakes symbolCopy symbol to be edditable
        symbolCopy.breakLink();
        symbolFlag = false;
      }
      if (flexoDigitalV === "Flexo") {
        var colorIndex = 0;
        // Iterate through page items to identify the color rectangles
        app.activeDocument = thisDocument;
        for (var i = 0; i < thisDocument.pageItems.length; i++) {
          var currentItem = thisDocument.pageItems[i];

          // Check if the item has name color

          if (currentItem.name.indexOf("color") !== -1) {
            var color = top6ColorsC[colorIndex];
            if (currentItem.fillColor.cyan !== undefined) {
              currentItem.fillColor.cyan = color.color[0];
              currentItem.fillColor.magenta = color.color[1];
              currentItem.fillColor.yellow = color.color[2];
              currentItem.fillColor.black = color.color[3];
            } else if (currentItem.fillColor.spot.color.cyan !== undefined) {
              currentItem.fillColor.spot.color.cyan = color.color[0];
              currentItem.fillColor.spot.color.magenta = color.color[1];
              currentItem.fillColor.spot.color.yellow = color.color[2];
              currentItem.fillColor.spot.color.black = color.color[3];
            }
            colorIndex++;
          }
        }
      }

      //set te text size
      var textSize = 50;

      //Insert text frames
      app.activeDocument = thisDocument;

      for (var k = 0; k < textFrames.length; k++) {
        var textFrame1 = activeDocument.textFrames[textFrames[k].position];
        UpdateNow(
          textFrames[k].position,
          textFrames[k].content,
          textFrames[k].c,
          textFrames[k].m,
          textFrames[k].y,
          textFrames[k].k,
          textFrame1
        );
      }
      fichaDialog.close();
    };

    var leftLogoGroup = fichaDialog.add("group");
    leftLogoGroup.alignChildren = ["left", "top"];
    var leftLogo = leftLogoGroup.add(
      "image",
      undefined,
      File(parentFolder + "/Logos/skw.png")
    );

    var footer = fichaDialog.add("group");
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
      File(parentFolder + "/Logos/rabbits.png")
    );
    fichaDialog.show();
  } else {
    alert("No se encontraron simbolos en el archivo base.");
  }

  if (newDocument !== null) {
    newDocument.close(SaveOptions.DONOTSAVECHANGES);
  }
  if (sourceDoc !== null) {
    sourceDoc.close(SaveOptions.DONOTSAVECHANGES);
  }

  function cmykToRgb(c, m, y, k) {
    var r, g, b;

    // CMYK to RGB conversion
    r = 255 * (1 - c / 100) * (1 - k / 100);
    g = 255 * (1 - m / 100) * (1 - k / 100);
    b = 255 * (1 - y / 100) * (1 - k / 100);

    // Round values and return as an object
    return {
      red: Math.round(r),
      green: Math.round(g),
      blue: Math.round(b),
    };
  }

  function integerPart(number) {
    const numberString = number.toString();
    const dotIndex = numberString.indexOf(".");
    var response = 0;
    if (dotIndex !== -1) {
      response = parseInt(numberString.substring(0, dotIndex), 10);
      return response;
    }
    response = parseInt(numberString, 10);
    return response;
  }

  function cmykToRgb2(c, m, y, k) {
    // Conversión de valores CMYK a valores entre 0 y 1
    var r = 1 - Math.min(1, (c / 100) * (1 - k / 100) + k / 100);
    var g = 1 - Math.min(1, (m / 100) * (1 - k / 100) + k / 100);
    var b = 1 - Math.min(1, (y / 100) * (1 - k / 100) + k / 100);

    // Retornar los valores en el rango de 0 a 1
    var rgba = {
      red: Math.round(r * 255),
      green: Math.round(g * 255),
      blue: Math.round(b * 255),
      alpha: 1,
    };

    return rgba;
  }

  //Function to get current date in the format DD/MM/YY
  function getCurrentDate() {
    var currentDate = new Date();

    // Get day, month, and year from the current date
    var day = currentDate.getDate();
    var month = currentDate.getMonth() + 1; // Months are zero-based (January is 0), so add 1
    var year = currentDate.getFullYear() % 100; // Get last two digits of the year

    // Format day, month, and year to have leading zeros if necessary
    var formattedDay = (day < 10 ? "0" : "") + day;
    var formattedMonth = (month < 10 ? "0" : "") + month;
    var formattedYear = (year < 10 ? "0" : "") + year;

    // Construct the date string in DD/MM/YY format
    var formattedDate =
      formattedDay + "/" + formattedMonth + "/" + formattedYear;

    return formattedDate;
  }

  function UpdateNow(position, value, c, m, y, k, textFrame1) {
    if (c === undefined) {
      c = 0;
    }
    if (m === undefined) {
      m = 0;
    }
    if (y === undefined) {
      y = 0;
    }
    if (k === undefined) {
      k = 0;
    }
    /* app.activeDocument = thisDocument; */
    if (AIversion == "10") {
    } else {
      /* var textFrame1 = activeDocument.textFrames[position]; */
      textFrame1.selected = true;
      textFrame1.contents = value;

      // Set the fill color of the text frame
      textFrame1.textRange.characterAttributes.fillColor.cyan = c;
      textFrame1.textRange.characterAttributes.fillColor.magenta = m;
      textFrame1.textRange.characterAttributes.fillColor.yellow = y;
      textFrame1.textRange.characterAttributes.fillColor.black = k;
      var c = 0;
    }
  }

  function updateImpresoraList(selectedList, impresora) {
    impresora.removeAll();
    for (var i = 0; i < selectedList.length; i++) {
      impresora.add("item", selectedList[i]);
    }
  }
} catch (e) {
  alert("Se produjo un error: " + e);
}
function updateImpresora(acabado, flexoDigital, impresora, machineList) {
  var acabadoV = acabado.selection.text;
  var flexoDigitalV = flexoDigital.selection.text;
  if (flexoDigitalV === "Digital") {
    updateImpresoraList(["Nozomi"], impresora);
  } else {
    if (acabadoV === "Blanco Estucado") {
      updateImpresoraList(["Asahi"], impresora); //Solo cuando acabado es estucado se muestra "Asahi", si no se muestra la lista completa
    } else {
      updateImpresoraList(machineList, impresora);
    }
  }
}
