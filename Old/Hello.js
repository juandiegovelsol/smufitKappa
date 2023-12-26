// Create a dialog box with form fields
var dialog = new Window("dialog", "Variable Input Form");
dialog.alignChildren = ["left", "top"];

var inputGroup1 = dialog.add("group");
inputGroup1.add("statictext", undefined, "Variable 1:");
var variable1Input = inputGroup1.add("edittext", undefined, "");

var inputGroup2 = dialog.add("group");
inputGroup2.add("statictext", undefined, "Variable 2:");
var variable2Input = inputGroup2.add("edittext", undefined, "");

var buttonGroup = dialog.add("group");
var okButton = buttonGroup.add("button", undefined, "OK");
var cancelButton = buttonGroup.add("button", undefined, "Cancel");

okButton.onClick = function () {
  var variable1Value = variable1Input.text;
  var variable2Value = variable2Input.text;
  // Use the values as needed in your script
  alert("Variable 1: " + variable1Value + "\nVariable 2: " + variable2Value);
  dialog.close();
};

cancelButton.onClick = function () {
  dialog.close();
};

dialog.show();
