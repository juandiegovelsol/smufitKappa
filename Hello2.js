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
      function createTextFrameWithId(content, id, position, textSize) {
        var textFrame = newDocument.textFrames.add();
        textFrame.contents = content;
        textFrame.position = position;
        textFrame.customId = id;
        textFrame.textRange.characterAttributes.size = textSize;
        return textFrame;
      }

      // Function to add a row of aligned text inputs for colors
      function addColorRow(parent, labelText) {
        var colorGroup = parent.add("group");
        colorGroup.orientation = "row";
        colorGroup.alignChildren = ["left", "center"];

        colorGroup.add("statictext", undefined, labelText);
        colorGroup.add("edittext", undefined, "");
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
          { content: username, id: "UserID", x: -1135, y: 1335 },
          { content: flexoDigitalV, id: "FlexoID", x: -1100, y: 1275 },
          { content: acabadoV, id: "AcabadoID", x: -900, y: 1275 },
          { content: impresoraV, id: "ImpID", x: 693, y: 1275 },
          { content: canalV, id: "CanalID", x: 671, y: 1210 },
          { content: troquelV, id: "TroquelID", x: 1229, y: 1335 },
          { content: porcentajeImpV, id: "%ImpID", x: 977, y: 1210 },
          { content: selectedReference, id: "ColorRefID", x: -700, y: 1275 },
          { content: currentDateV, id: "DateID", x: 1195, y: 1210 },
        ];

        // Include color values in the text frames
        for (var j = 0; j < colorValues.length; j++) {
          textFrames.push({
            content: colorValues[j],
            id: "ColorID" + (j + 1),
            x: j * 262.0762 - 1026,
            y: 1210,
          });
        }

        //set te text size
        var textSize = 50;

        for (var k = 0; k < textFrames.length; k++) {
          createTextFrameWithId(
            textFrames[k].content, //+ " (" + textFrames[k].id + ")",
            textFrames[k].id,
            [textFrames[k].x, textFrames[k].y],
            textSize
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
