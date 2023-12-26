// Function to add a row for selecting Pantone colors and displaying a color preview

function cmykToRgb(c, m, y, k) {
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
      [0, 0, 0, 1.0]
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
      if (swatch.name.indexOf("PANTONE") !== -1) {
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
      var rgba = cmykToRgb(cmyk.cyan, cmyk.magenta, cmyk.yellow, cmyk.black);
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

// Create a dialog window to test the function
var colorDialog = new Window("dialog", "Color Selection");
colorDialog.alignChildren = ["left", "top"];

var colorTitleBox = colorDialog.add("panel");
colorTitleBox.text = "Enter colors:";
colorTitleBox.orientation = "column";
colorTitleBox.alignChildren = ["left", "top"];

// Replace the file path with your Pantone file path
var filePath = new File(
  "C:/Users/Juan Diego/Desktop/Documentos Escritorio/Rabbit/Smurfit Kappa/Plantillas/biblioteca_pantone_uncoated.ai"
);
open(filePath, null);
var sourceDoc = app.activeDocument;

addColorRow(colorTitleBox, "1:", sourceDoc);

colorDialog.show();
