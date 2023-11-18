var AIversion = version.slice(0, 2);

var thisDocument = null;

if (app.documents.length > 0) {
  thisDocument = app.activeDocument;
} else {
  thisDocument = app.documents.add();
}

var defaultDocumentDirection =
  "C:/Users/Juan Diego/Desktop/Documentos Escritorio/Rabbit/Smurfit Kappa/default.ai";
// Open the default document

// Save a copy of the default document
/* var newFilePath =
  "C:/Users/Juan Diego/Desktop/Documentos Escritorio/Rabbit/Smurfit Kappa/newdefault.ai";
newDocument.saveAs(new File(newFilePath)); */

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
      var sourceSymbol = symbols["SmurfitKappa logo"];
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
      var sourceSymbol = symbols["Escuadra de registro"];
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
      //Inserts ficha symbol

      var sourceSymbol = symbols["FITXA"];
      app.activeDocument = thisDocument;
      var destinationDoc = app.activeDocument;
      var symbolItem3 = newDocument.symbolItems.add(sourceSymbol);
      var symbolCopy = symbolItem3.duplicate(destinationDoc);
      symbolCopy.breakLink();

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
      acabado.add("item", "Brillo");
      acabado.add("item", "Blanco");
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
      var colorTitleBox = fichaDialog.add("panel");
      colorTitleBox.text = "Ingresar colores: ";
      colorTitleBox.orientation = "column";
      colorTitleBox.alignChildren = ["left", "top"];

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

      // Function to add a row of aligned text inputs for colors
      function addColorRow(parent, labelText) {
        var colorGroup = parent.add("group");
        colorGroup.orientation = "row";
        colorGroup.alignChildren = ["left", "center"];

        colorGroup.add("statictext", undefined, labelText);
        var colorEdit = colorGroup.add("edittext", undefined, "");
        var colorButton = colorGroup.add(
          "button",
          undefined,
          "Seleccionar RGB"
        );

        colorButton.onClick = function () {
          var colorDialog = new Window("dialog", "Select RGB Color");
          var colorGroupDialog = colorDialog.add("group");
          colorGroupDialog.add("statictext", undefined, "R:");
          var redInput = colorGroupDialog.add("edittext", undefined, "0");
          colorGroupDialog.add("statictext", undefined, "G:");
          var greenInput = colorGroupDialog.add("edittext", undefined, "0");
          colorGroupDialog.add("statictext", undefined, "B:");
          var blueInput = colorGroupDialog.add("edittext", undefined, "0");
          colorGroupDialog.add("statictext", undefined, "Pantone:");
          var pantoneInput = colorGroupDialog.add("edittext", undefined, "XX");

          var okButton = colorDialog.add("button", undefined, "OK");
          var cancelButton = colorDialog.add("button", undefined, "Cancelar");

          okButton.onClick = function () {
            var pantone = pantoneInput.text;
            var red = parseInt(redInput.text);
            var green = parseInt(greenInput.text);
            var blue = parseInt(blueInput.text);

            if (isNaN(red) || isNaN(green) || isNaN(blue)) {
              alert("Ingresar un valor RGB válido");
              return;
            }

            if (!pantone) {
              alert("Ingresar un código Pantone válido");
            }

            if (
              red < 0 ||
              red > 255 ||
              green < 0 ||
              green > 255 ||
              blue < 0 ||
              blue > 255
            ) {
              alert("los valores RGB deben estar entre 0 to 255.");
              return;
            }

            var rgbColor = [red, green, blue, pantone];
            colorEdit.text = rgbColor.toString(); // Display the RGB color in the edit text field
            colorDialog.close();
          };

          cancelButton.onClick = function () {
            colorDialog.close();
          };

          colorDialog.show();
        };
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

      function UpdateNow(position, value) {
        if (AIversion == "10") {
          /* var textArtItems = activeDocument.textArtItems;
          for (var i = 0; i < textArtItems.length; i++) {
            if (textArtItems[i].name.slice(0, 11) == "actualDate:") {
              textArtItems[i].selected = true;
              textArtItems[i].contents = currentDateV;
            }
          }
          console.log(); */
        } else {
          var textFrames1 = activeDocument.textFrames;
          textFrames1[position].selected = true;
          if (position === 11) {
            textFrames1[position].contents =
              textFrames1[position].contents + " " + value;
          } else {
            textFrames1[position].contents = value;
          }
        }
      }

      addColorRow(colorTitleBox, "1:");
      addColorRow(colorTitleBox, "2:");
      addColorRow(colorTitleBox, "3:");
      addColorRow(colorTitleBox, "4:");
      addColorRow(colorTitleBox, "5:");
      addColorRow(colorTitleBox, "6:");

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

        // Access the color values inside the colorTitleBox
        var colorValues = [];
        for (var i = 0; i < colorTitleBox.children.length; i++) {
          if (colorTitleBox.children[i] instanceof Group) {
            var colorInput = colorTitleBox.children[i].children[1].text;
            colorValues.push(colorInput);
          }
        }

        var textFrames = [
          {
            content: username,
            id: "UserID",
            x: -1135,
            y: 1335,
            r: 0,
            g: 0,
            b: 0,
            position: 3,
          },
          {
            content: flexoDigitalV,
            id: "FlexoID",
            x: -1100,
            y: 1275,
            r: 0,
            g: 0,
            b: 0,
            position: 10,
          },
          {
            content: acabadoV,
            id: "AcabadoID",
            x: -900,
            y: 1275,
            r: 0,
            g: 0,
            b: 0,
            position: 12,
          },
          {
            content: impresoraV,
            id: "ImpID",
            x: 693,
            y: 1275,
            r: 0,
            g: 0,
            b: 0,
            position: 6,
          },
          {
            content: canalV,
            id: "CanalID",
            x: 671,
            y: 1210,
            r: 0,
            g: 0,
            b: 0,
            position: 11,
          },
          {
            content: troquelV,
            id: "TroquelID",
            x: 1229,
            y: 1335,
            r: 0,
            g: 0,
            b: 0,
            position: 0,
          },
          {
            content: porcentajeImpV,
            id: "%ImpID",
            x: 977,
            y: 1210,
            r: 0,
            g: 0,
            b: 0,
            position: 4,
          },
          {
            content: selectedReference,
            id: "ColorRefID",
            x: -700,
            y: 1275,
            r: 0,
            g: 0,
            b: 0,
            position: 7,
          },
          {
            content: currentDateV,
            id: "DateID",
            x: 1195,
            y: 1210,
            r: 0,
            g: 0,
            b: 0,
            position: 5,
          },
        ];

        // Include color values in the text frames
        for (var j = 0; j < colorValues.length; j++) {
          var colors = colorValues[j].split(",");
          var r = +colors[0];
          var g = +colors[1];
          var b = +colors[2];
          var content = colors[3];
          textFrames.push({
            content: content,
            id: "ColorID" + (j + 1),
            x: j * 262.0762 - 1026,
            y: 1210,
            r: r,
            g: g,
            b: b,
            position: 19 - j,
          });
        }

        //set te text size
        var textSize = 50;

        //Insert text frames
        for (var k = 0; k < textFrames.length; k++) {
          if (textFrames[k].id === "TroquelID") {
            createTextFrameWithId(
              textFrames[k].content,
              textFrames[k].id,
              [textFrames[k].x, textFrames[k].y],
              textSize,
              textFrames[k].r,
              textFrames[k].g,
              textFrames[k].b
            );
          } else {
            UpdateNow(textFrames[k].position, textFrames[k].content);
          }
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
