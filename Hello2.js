var AIversion = version.slice(0, 2);

var thisDocument = null;

if (app.documents.length > 0) {
  thisDocument = app.activeDocument;
} else {
  thisDocument = app.documents.add();
}

/* var defaultDocumentDirection =
  "C:/Users/Juan Diego/Desktop/Documentos Escritorio/Rabbit/Smurfit Kappa/default.ai"; */
var defaultDocumentDirection =
  "C:/Users/Juan Diego/Desktop/Documentos Escritorio/Rabbit/Smurfit Kappa/Plantillas/SmurfitKappa - Ficha.ai";

// Create a dialog box with form fields
var dialog = new Window("dialog", "Guias");
dialog.alignChildren = ["left", "top"];
// Create a selectable input field
var dropdownGroup1 = dialog.add("group");
dropdownGroup1.add("statictext", undefined, "Digital");
var dropdown1 = dropdownGroup1.add("dropdownlist");
dropdown1.add("item", "Si");
dropdown1.add("item", "No");

var dropdownGroup2 = dialog.add("group");
dropdownGroup2.add("statictext", undefined, "Tipo de caja");
var dropdown2 = dropdownGroup2.add("dropdownlist");
dropdown2.add("item", "B1");
dropdown2.add("item", "ETC...");

//Create a box that contains all checkboxes
var titleBox = dialog.add("panel");
titleBox.text = "Simbolos a añadir";
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
var checkbox3 = checkboxGroup.add("checkbox", undefined, "Ficha");

var buttonGroup = dialog.add("group");
var okButton = buttonGroup.add("button", undefined, "Ejecutar");
var cancelButton = buttonGroup.add("button", undefined, "Cancelar");
var filePath = "";
var sourceDoc = null;

okButton.onClick = function () {
  var selectedOption1 = dropdown1.selection.text;
  var selectedOption2 = dropdown2.selection.text;
  var checkbox1Value = checkbox1.value;
  var checkbox2Value = checkbox2.value;
  var checkbox3Value = checkbox3.value;

  var username = $.getenv("USERNAME");
  if (!username) {
    username = $.getenv("USER");
  }

  var newDocument = app.open(File(defaultDocumentDirection));
  var symbols = app.activeDocument.symbols;

  if (checkbox1Value) {
    if (symbols.length > 0) {
      var insertionPoint = [50, 50];
      var sourceSymbol = symbols["SmurfitKappa stacked"];
      app.activeDocument = thisDocument;
      var destinationDoc = app.activeDocument;
      var symbolItem = newDocument.symbolItems.add(sourceSymbol);
      var symbolCopy = symbolItem.duplicate(destinationDoc);
      symbolCopy.position = insertionPoint;
    } else {
      alert("No symbols found in the current document.");
    }
  }

  if (checkbox2Value) {
    //Inserts Escuadra

    if (symbols.length > 0) {
      var insertionPoint2 = [100, 100];
      var sourceSymbol = symbols["SmurfitKappa stacked"];
      app.activeDocument = thisDocument;
      var destinationDoc = app.activeDocument;
      var symbolItem2 = newDocument.symbolItems.add(sourceSymbol);
      var symbolCopy = symbolItem2.duplicate(destinationDoc);
      symbolCopy.position = insertionPoint2;
    } else {
      alert("No symbols found in the current document.");
    }
  }

  if (checkbox3Value) {
    if (symbols.length > 0) {
      //Creates dialog window
      var fichaDialog = new Window("dialog", "Ficha");
      fichaDialog.alignChildren = ["left", "top"];

      var listFlexoDigital = fichaDialog.add("group");
      listFlexoDigital.add("statictext", undefined, "Flexo/Digital: ");
      var flexoDigital = listFlexoDigital.add("dropdownlist");
      flexoDigital.add("item", "Flexo");
      flexoDigital.add("item", "Digital");

      var listAcabado = fichaDialog.add("group");
      listAcabado.add("statictext", undefined, "Acabado: ");
      var acabado = listAcabado.add("dropdownlist");
      acabado.add("item", "Blanco Estucado");
      acabado.add("item", "Blanco Mate");
      acabado.add("item", "Marrón");

      var listImpresora = fichaDialog.add("group");
      listImpresora.add("statictext", undefined, "Impresora: ");
      var impresora = listImpresora.add("dropdownlist");
      impresora.add("item", "Martin RS");
      impresora.add("item", "Martin NT");
      impresora.add("item", "Miniline");
      impresora.add("item", "Celmach");
      impresora.add("item", "Dro");
      impresora.add("item", "Nozomi");

      var listCanal = fichaDialog.add("group");
      listCanal.add("statictext", undefined, "Canal: ");
      var canal = listCanal.add("dropdownlist");
      canal.add("item", "E");
      canal.add("item", "B");
      canal.add("item", "S");
      canal.add("item", "EB");
      canal.add("item", "ES");
      canal.add("item", "BC");

      var inputGroup = fichaDialog.add("group");
      inputGroup.add("statictext", undefined, "Troquel:");
      var troquel = inputGroup.add("edittext", undefined, "");

      var inputGroup2 = fichaDialog.add("group");
      inputGroup2.add("statictext", undefined, "% Impresión:");
      var porcentajeImp = inputGroup2.add("edittext", undefined, "");

      // Title Box with Row-Aligned Text Inputs for Colors
      /* var colorTitleBox = fichaDialog.add("panel");
      colorTitleBox.text = "Ingresar colores: ";
      colorTitleBox.orientation = "column";
      colorTitleBox.alignChildren = ["left", "top"]; */

      // Function to create a text frame with a custom ID property
      function createTextFrameWithId(content, id, position, textSize, r, g, b) {
        var textFrame = newDocument.textFrames.add();
        textFrame.contents = content;
        textFrame.position = position;
        textFrame.customId = id;
        textFrame.textRange.characterAttributes.size = textSize;

        var newColor = new RGBColor();
        newColor.red = r; // Replace with your desired RGB values
        newColor.green = g;
        newColor.blue = b;

        textFrame.textRange.characterAttributes.fillColor = newColor;
        return textFrame;
      }

      /*       function UpdateNow(position, value, c, m, y, k) {
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
        app.activeDocument = thisDocument;
        if (AIversion == "10") {
        } else {
          var textFrame1 = activeDocument.textFrames[position];
          textFrame1.selected = true;
          textFrame1.contents = value;

          // Set the fill color of the text frame
          textFrame1.textRange.characterAttributes.fillColor.cyan = c;
          textFrame1.textRange.characterAttributes.fillColor.magenta = m;
          textFrame1.textRange.characterAttributes.fillColor.yellow = y;
          textFrame1.textRange.characterAttributes.fillColor.black = k;
        }
      } */

      // Selectable Field for Color reference
      var referenceDropdownGroup = fichaDialog.add("group");
      referenceDropdownGroup.add(
        "statictext",
        undefined,
        "Referencia de color:"
      );
      var referenceDropdown = referenceDropdownGroup.add("dropdownlist");
      referenceDropdown.add("item", "RGB");
      referenceDropdown.add("item", "CMYK");

      var additionalOKButton = fichaDialog.add("button", undefined, "OK");
      additionalOKButton.onClick = function () {
        var flexoDigitalV = flexoDigital.selection.text;
        var acabadoV = acabado.selection.text;
        var impresoraV = impresora.selection.text;
        var canalV = canal.selection.text;
        var troquelV = troquel.text;
        var porcentajeImpV = porcentajeImp.text;
        var selectedReference = referenceDropdown.selection.text;
        var currentDateV = getCurrentDate();

        var sourceSymbol = null;
        app.activeDocument = thisDocument;
        var destinationDoc = app.activeDocument;
        var symbolCopy = null;
        var symbolItem3 = null;

        var top6ColorsC = [];
        /* var sourceDoc = null; */

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
              content: selectedReference,
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
          /* var top6Colors = []; */

          for (var i = 0; i < Math.min(6, sortedColors.length); i++) {
            var color = sortedColors[i].key.split(",");
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
            /* top6Colors.push(
              "Q: " + sortedColors[i].count + "C: " + sortedColors[i].key
            ); */
            top6ColorsC.push({ color: color, name: name });
          }
          //Update colors position:
          top6ColorsC[0].position = 19;
          top6ColorsC[1].position = 15;
          top6ColorsC[2].position = 14;
          top6ColorsC[3].position = 18;
          top6ColorsC[4].position = 17;
          top6ColorsC[5].position = 16;
          // Display the top 6 CMYK colors
          /*  alert(
            "Top 6 CMYK colors: " +
              top6ColorsC[0].name +
              top6ColorsC[1].name +
              top6ColorsC[2].name +
              top6ColorsC[3].name +
              top6ColorsC[4].name +
              top6ColorsC[5].name
          ); */

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
        } else {
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
              content: selectedReference,
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

          //Creates dialog window
          var colorDialog = new Window("dialog", "Colores");
          colorDialog.alignChildren = ["left", "top"];

          var colorTitleBox = colorDialog.add("panel");
          colorTitleBox.text = "Ingresar colores: ";
          colorTitleBox.orientation = "column";
          colorTitleBox.alignChildren = ["left", "top"];

          // Depending on acabado value opens diferent library

          if (acabadoV === "Blanco Estucado") {
            filePath = new File(
              "C:/Users/Juan Diego/Desktop/Documentos Escritorio/Rabbit/Smurfit Kappa/Plantillas/biblioteca_pantone_coated.ai"
            );
          } else if (acabadoV === "Blanco Mate") {
            filePath = new File(
              "C:/Users/Juan Diego/Desktop/Documentos Escritorio/Rabbit/Smurfit Kappa/Plantillas/biblioteca_pantone_uncoated.ai"
            );
          } else if (acabadoV === "Marrón") {
            //Change this whit GCMI library
            filePath = new File(
              "C:/Users/Juan Diego/Desktop/Documentos Escritorio/Rabbit/Smurfit Kappa/Plantillas/GCMI_COLORS.ai"
            );
          }

          open(filePath, null);
          sourceDoc = app.activeDocument;

          addColorRow(colorTitleBox, "1:", sourceDoc);
          addColorRow(colorTitleBox, "2:", sourceDoc);
          addColorRow(colorTitleBox, "3:", sourceDoc);
          addColorRow(colorTitleBox, "4:", sourceDoc);
          addColorRow(colorTitleBox, "5:", sourceDoc);
          addColorRow(colorTitleBox, "6:", sourceDoc);

          var colorsOKButton = colorDialog.add("button", undefined, "OK");
          colorsOKButton.onClick = function () {
            var colorValues = [];
            for (var i = 0; i < colorTitleBox.children.length; i++) {
              if (colorTitleBox.children[i] instanceof Group) {
                var colorInputText = colorTitleBox.children[i].children[1].text;
                var thisColor =
                  sourceDoc.swatches[colorInputText].color.spot.color;
                var k = thisColor.black;
                var c = thisColor.cyan;
                var m = thisColor.magenta;
                var y = thisColor.yellow;
                var rgb = cmykToRgb(c, m, y, k);
                var textcolor = 100;
                if (k > 50 || (c > 50 && m > 50)) {
                  textcolor = 0;
                }
                var colorInput = {
                  colorInputText: colorInputText,
                  c: 0,
                  m: 0,
                  y: 0,
                  k: textcolor,
                };

                top6ColorsC.push({ color: [c, m, y, k] });
                colorValues.push(colorInput);
              }
            }
            top6ColorsC.reverse();
            // Include color values in the text frames
            for (var j = 0; j < colorValues.length; j++) {
              var content = colorValues[j].colorInputText;
              textFrames.push({
                content: content,
                id: "ColorID" + (j + 1),
                c: colorValues[j].c,
                m: colorValues[j].m,
                y: colorValues[j].y,
                k: colorValues[j].k,
                position: 18 - j,
              });
            }
            colorDialog.close();
          };
          colorDialog.show();
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
        symbolCopy = symbolItem3.duplicate(destinationDoc);

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

        // Scales ficha symbol according to destinationdoc heigth
        var documentHeight = destinationDoc.height;
        var originalSymbolHeight = symbolCopy.height;
        var scaleFactor = documentHeight / originalSymbolHeight;
        symbolCopy.resize(scaleFactor * 180, scaleFactor * 180);

        //Brakes symbolCopy symbol to be edditable
        symbolCopy.breakLink();

        var colorIndex = 1;
        // Iterate through page items to identify the color rectangles
        app.activeDocument = thisDocument;
        for (var i = 0; i < thisDocument.pageItems.length; i++) {
          var currentItem = thisDocument.pageItems[i];

          // Check if the item has name color

          if (currentItem.name.indexOf("color") !== -1) {
            var color = top6ColorsC[6 - colorIndex];
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
            /* currentItem.fillColor.cyan = color.color[0];
            currentItem.fillColor.magenta = color.color[1];
            currentItem.fillColor.yellow = color.color[2];
            currentItem.fillColor.black = color.color[3]; */
            colorIndex++;
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
        /* for (var k = 0; k < 70; k++) {
          UpdateNow(k, k, 0, 0, 0, 100);
        } */
        /* sourceDoc.close(SaveOptions.DONOTSAVECHANGES); */
        if (sourceDoc !== null) {
          sourceDoc.close(SaveOptions.DONOTSAVECHANGES);
        }
        fichaDialog.close();
      };

      fichaDialog.show();
    } else {
      alert("No symbols found in the current document.");
    }
  }

  newDocument.close(SaveOptions.DONOTSAVECHANGES);
  dialog.close();
};

cancelButton.onClick = function () {
  dialog.close();
};

dialog.show();

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

function addColorRow(parent, labelText, sourceDoc) {
  var colorGroup = parent.add("group");
  colorGroup.orientation = "row";
  colorGroup.alignChildren = ["left", "center"];

  colorGroup.add("statictext", undefined, labelText);
  var colorEdit = colorGroup.add("edittext", undefined, "");
  var colorButton = colorGroup.add("button", undefined, "Select Color");

  colorButton.onClick = function () {
    var colorDialog = new Window("dialog", "Select Color");
    var colorGroupDialog = colorDialog.add("group");
    colorGroupDialog.add("statictext", undefined, "Color:");
    var pantoneDropdown = colorGroupDialog.add("dropdownlist");

    var colorPreview = colorGroupDialog.add("panel");
    colorPreview.size = [30, 20];
    var colorPreviewGraphics = colorPreview.graphics;
    colorPreview.fillBrush = colorPreviewGraphics.newBrush(
      colorPreviewGraphics.BrushType.SOLID_COLOR,
      [0, 0, 0, 1]
    );

    colorPreview.onDraw = function () {
      with (this) {
        graphics.rectPath(0, 0, size[0], size[1]);
        graphics.fillPath(fillBrush);
      }
    };

    // Populate dropdown list with Pantone colors from sourceDoc.swatches
    for (var i = 0; i < sourceDoc.swatches.length; i++) {
      var swatch = sourceDoc.swatches[i];
      if (
        swatch.name.indexOf("PANTONE") !== -1 ||
        swatch.name.indexOf("GCMI") !== -1
      ) {
        pantoneDropdown.add("item", swatch.name);
      }
    }

    pantoneDropdown.onChange = function () {
      var selectedPantone = pantoneDropdown.selection;
      var selectedColor = selectedPantone.text;
      colorEdit.text = selectedColor;

      // Change the panel color to the selected color
      var swatchColor = sourceDoc.swatches.getByName(selectedColor).color;
      var cmyk = swatchColor.spot.color;
      var rgba = cmykToRgb2(cmyk.cyan, cmyk.magenta, cmyk.yellow, cmyk.black);
      colorPreview.fillBrush = colorPreviewGraphics.newBrush(
        colorPreviewGraphics.BrushType.SOLID_COLOR,
        [rgba.red / 255, rgba.green / 255, rgba.blue / 255, rgba.alpha]
      );
      colorPreview.visible = false; // Hide the panel briefly
      colorPreview.visible = true; // Show the panel to trigger redraw
    };

    var okButton = colorDialog.add("button", undefined, "OK");
    var cancelButton = colorDialog.add("button", undefined, "Cancel");

    okButton.onClick = function () {
      var selectedPantone = pantoneDropdown.selection;
      if (!selectedPantone) {
        alert("Please select a valid color code");
        return;
      }
      colorEdit.text = selectedPantone.text;
      colorDialog.close();
    };

    cancelButton.onClick = function () {
      colorDialog.close();
    };

    colorDialog.show(); // Show the dialog window
  };
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
  var formattedDate = formattedDay + "/" + formattedMonth + "/" + formattedYear;

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
