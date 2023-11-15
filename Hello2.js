// Open the default document
var newDocument = app.open(
  File(
    "C:/Users/Juan Diego/Desktop/Documentos Escritorio/Rabbit/Smurfit Kappa/default.ai"
  )
);

// Save a copy of the default document
var newFilePath =
  "C:/Users/Juan Diego/Desktop/Documentos Escritorio/Rabbit/Smurfit Kappa/newdefault.ai";
newDocument.saveAs(new File(newFilePath));

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

  var symbols = app.activeDocument.symbols;

  if (checkbox1Value) {
    //var symbols = app.activeDocument.symbols;
    if (symbols.length > 0) {
      var insertionPoint = [50, 750];
      var symbolItem = app.activeDocument.symbolItems.add(symbols[4]);
      symbolItem.position = insertionPoint;
    } else {
      alert("No symbols found in the current document.");
    }
  }

  if (checkbox2Value) {
    //Inserts Escuadra
    //var symbols2 = app.activeDocument.symbols;
    if (symbols.length > 0) {
      var insertionPoint2 = [500, 100];
      var symbolItem2 = app.activeDocument.symbolItems.add(symbols[6]);
      symbolItem2.position = insertionPoint2;
    } else {
      alert("No symbols found in the current document.");
    }
  }

  if (checkbox3Value) {
    if (symbols.length > 0) {
      //Inserts ficha symbol

      var symbolItem3 = app.activeDocument.symbolItems.add(symbols[0]);
      var insertionPoint3 = [0 - 1391, 1598];
      symbolItem3.position = insertionPoint3;

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
      /* function addColorRow(parent, labelText) {
        var colorGroup = parent.add("group");
        colorGroup.orientation = "row";
        colorGroup.alignChildren = ["left", "center"];

        colorGroup.add("statictext", undefined, labelText);
        colorGroup.add("edittext", undefined, "");
      } */
      function addColorRow(parent, labelText) {
        var colorGroup = parent.add("group");
        colorGroup.orientation = "row";
        colorGroup.alignChildren = ["left", "center"];

        colorGroup.add("statictext", undefined, labelText);
        var colorEdit = colorGroup.add("edittext", undefined, "");
        var colorButton = colorGroup.add(
          "button",
          undefined,
          "Select RGB Color"
        );

        colorButton.onClick = function () {
          var colorDialog = new Window("dialog", "Select RGB Color");
          var colorGroupDialog = colorDialog.add("group");
          var redInput = colorGroupDialog.add("edittext", undefined, "255");
          var greenInput = colorGroupDialog.add("edittext", undefined, "255");
          var blueInput = colorGroupDialog.add("edittext", undefined, "255");

          var okButton = colorDialog.add("button", undefined, "OK");
          var cancelButton = colorDialog.add("button", undefined, "Cancel");

          okButton.onClick = function () {
            var red = parseInt(redInput.text);
            var green = parseInt(greenInput.text);
            var blue = parseInt(blueInput.text);

            if (isNaN(red) || isNaN(green) || isNaN(blue)) {
              alert("Please enter valid RGB values.");
              return;
            }

            if (
              red < 0 ||
              red > 255 ||
              green < 0 ||
              green > 255 ||
              blue < 0 ||
              blue > 255
            ) {
              alert("RGB values should be in the range of 0 to 255.");
              return;
            }

            var rgbColor = [red, green, blue];
            colorEdit.text = rgbColor.toString(); // Display the RGB color in the edit text field
            colorDialog.close();
          };

          cancelButton.onClick = function () {
            colorDialog.close();
          };

          colorDialog.show();
        };
      }

      /* function addColorRow(parent, labelText) {
        var colorGroup = parent.add("group");
        colorGroup.orientation = "row";
        colorGroup.alignChildren = ["left", "center"];

        colorGroup.add("statictext", undefined, labelText);
        var colorEdit = colorGroup.add("edittext", undefined, "");
        var pantoneEdit = colorGroup.add("edittext", undefined, "");

        var colorButton = colorGroup.add(
          "button",
          undefined,
          "Select RGB Color"
        );

        colorButton.onClick = function () {
          var colorDialog = new Window("dialog", "Select RGB Color");
          var colorGroupDialog = colorDialog.add("group");
          var redInput = colorGroupDialog.add("edittext", undefined, "255");
          var greenInput = colorGroupDialog.add("edittext", undefined, "255");
          var blueInput = colorGroupDialog.add("edittext", undefined, "255");

          var okButton = colorDialog.add("button", undefined, "OK");
          var cancelButton = colorDialog.add("button", undefined, "Cancel");

          okButton.onClick = function () {
            var red = parseInt(redInput.text);
            var green = parseInt(greenInput.text);
            var blue = parseInt(blueInput.text);

            if (isNaN(red) || isNaN(green) || isNaN(blue)) {
              alert("Please enter valid RGB values.");
              return;
            }

            if (
              red < 0 ||
              red > 255 ||
              green < 0 ||
              green > 255 ||
              blue < 0 ||
              blue > 255
            ) {
              alert("RGB values should be in the range of 0 to 255.");
              return;
            }

            var rgbColor = [red / 255, green / 255, blue / 255];
            var hexColor = rgbToHex(red, green, blue); // Convert RGB to Hex

            colorEdit.text = hexColor; // Display the Hex color in the RGB field
            colorEdit.graphics.backgroundColor = rgbColor; // Set the background color of the RGB field
            pantoneEdit.text = "Pantone Color"; // Display Pantone color text (Replace this with your Pantone value)

            colorDialog.close();
          };

          cancelButton.onClick = function () {
            colorDialog.close();
          };

          colorDialog.show();
        };
      }

      // Function to convert RGB to Hex
      function rgbToHex(r, g, b) {
        return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
      }

      function componentToHex(c) {
        var hex = c.toString(16);
        return hex.length == 1 ? "0" + hex : hex;
      } */

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
          },
          {
            content: flexoDigitalV,
            id: "FlexoID",
            x: -1100,
            y: 1275,
            r: 0,
            g: 0,
            b: 0,
          },
          {
            content: acabadoV,
            id: "AcabadoID",
            x: -900,
            y: 1275,
            r: 0,
            g: 0,
            b: 0,
          },
          {
            content: impresoraV,
            id: "ImpID",
            x: 693,
            y: 1275,
            r: 0,
            g: 0,
            b: 0,
          },
          {
            content: canalV,
            id: "CanalID",
            x: 671,
            y: 1210,
            r: 0,
            g: 0,
            b: 0,
          },
          {
            content: troquelV,
            id: "TroquelID",
            x: 1229,
            y: 1335,
            r: 0,
            g: 0,
            b: 0,
          },
          {
            content: porcentajeImpV,
            id: "%ImpID",
            x: 977,
            y: 1210,
            r: 0,
            g: 0,
            b: 0,
          },
          {
            content: selectedReference,
            id: "ColorRefID",
            x: -700,
            y: 1275,
            r: 0,
            g: 0,
            b: 0,
          },
          {
            content: currentDateV,
            id: "DateID",
            x: 1195,
            y: 1210,
            r: 0,
            g: 0,
            b: 0,
          },
        ];

        // Include color values in the text frames
        for (var j = 0; j < colorValues.length; j++) {
          var colors = colorValues[j].split(",");
          var r = +colors[0];
          var g = +colors[1];
          var b = +colors[2];
          textFrames.push({
            content: colorValues[j],
            id: "ColorID" + (j + 1),
            x: j * 262.0762 - 1026,
            y: 1210,
            r: r,
            g: g,
            b: b,
          });
        }

        //set te text size
        var textSize = 50;

        for (var k = 0; k < textFrames.length; k++) {
          createTextFrameWithId(
            textFrames[k].content, //+ " (" + textFrames[k].id + ")",
            textFrames[k].id,
            [textFrames[k].x, textFrames[k].y],
            textSize,
            textFrames[k].r,
            textFrames[k].g,
            textFrames[k].b
          );
        }

        fichaDialog.close();
      };

      fichaDialog.show();
    } else {
      alert("No symbols found in the current document.");
    }
  }

  dialog.close();
};

cancelButton.onClick = function () {
  dialog.close();
};

dialog.show();
