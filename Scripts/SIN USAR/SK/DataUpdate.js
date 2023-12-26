var language="es"; 
var WR="SO | FI DataUpdate";
var AIversion=version.slice(0,2);

var Dateformat = "dd/mm/yy";
var prepath = "P:\\30.Clientes\\";
var pospath = "\\CLICHES";
var FIblank = "FI-----";
var NomDoc = 'FI';

if (language == "es") {

  //var format_preset = "";
  //var MSG_unsetmark = "Si continúas, desvincularás este campo, ¿estás seguro?";
  //var MSG_setmark = "¿Realmente deseas cambiar la variable configurada para este campo de texto?";
  //var MSG_askformat = "¿Qué variable deseas asignarle a este campo de texto?\n¿{DATE}, {TIME}, {FILE}, {FILEPATH}, {FILENAME} o {FILEEXT}?"
  //var MSG_editformat = "Estás editando la variable de este campo de texto. Deja este campo en blanco para desvíncularlo.\n{DATE}, {TIME}, {FILE}, {FILEPATH}, {FILENAME} o {FILEEXT}"
  var MSG_selectedmany = "¿Actualizar sólo este campo (SÍ) o modificarlos todos (NO)?";
  var MSG_nodocs = "¡No tienes ningún documento abierto!";
  var MSG_createoutlines = "¿Deseas trazar este campo?";
  var MSG_createmultoutlines = "¿Deseas trazar todos los campos?";
  var MSG_textnotfound = "¡Los campos ya están trazados!";
 /*var Timeformat = 24;
  var TimeSep = ":";
  var AM = " am";
  var PM = " pm"; */

} else {
  //var format_preset = "";
  //var MSG_unsetmark = "If you continue, you will unlink this field. Are you f**king sure ?";
  //var MSG_setmark = "Do you really want to change the configured value for this text field ?";
  //var MSG_askformat = "Which value do you want to assign to this text field?\n{DATE}, {TIME}, {FILE}, {FILEPATH}, {FILENAME} or {FILEEXT} ?"
  //var MSG_editformat = "Edit date'n'time (empty = remove). Formats:\n{DATE}, {TIME}, {FILE}, {FILEPATH}, {FILENAME} and {FILEEXT}:"
  var MSG_selectedmany = "Do you want to update only this field (YES) or want to change them all (NO)?";
  var MSG_nodocs = "You have no open document!";
  var MSG_createcontour = "Do you want to create outlines for this field?";
  var MSG_createmultoutlines = "Do you want to create outlines of all fields?";
  var MSG_textnotfound = "All fields have been outlined!";
  /*var Timeformat = 24;
  var TimeSep = ":";
  var AM = " am";
  var PM = " pm";  */
}

function contours(){
     if (selection.length > 0) {  
                        for (var i=0; i<selection.length; i++) {  
                        app.executeMenuCommand("outline");  
                        }  
            } 
    }

function contoursVariable(){
    var docname = activeDocument.name;
//COMPROBAR SI TRAZA NUMERO DE FICHA O SOLICITUD
 if( docname.indexOf(NomDoc) >= 0){ //SI EL ARCHIVO ES UN FI, ENTONCES TRAZAR FECHA Y FI:
                      app.activeDocument.selection=false;    
              try{
                      var doc = app.activeDocument;
                      doc.textFrames.getByName("actualDate:{DATE}").selected = true;
                      doc.textFrames.getByName("actualDate:{FILEPATH}").selected = true;
                      doc.textFrames.getByName("actualDate:{FILENAME}").selected = true;
                      contours ();
                      } catch (a) { try {
                                                doc.textFrames.getByName("actualDate:{DATE}").selected = true;
                                                doc.textFrames.getByName("actualDate:{CLIENT}").selected = true;
                                                doc.textFrames.getByName("actualDate:{FILENAME}").selected = true;
                                                contours (); }
                                     catch (b) { try {
                                                doc.textFrames.getByName("actualDate:{FILENAME}").selected = true;
                                                doc.textFrames.getByName("actualDate:{DATE}").selected = true;
                                                contours ();  }
                                      catch (c) { try {
                                                doc.textFrames.getByName("actualDate:{FILENAME}").selected = true;
                                                app.executeMenuCommand("outline");  }
                                      catch (d) { alert (MSG_textnotfound, WR, 1); }}}}
                      
              }
          else { //SI EL ARCHIVO ES UNA SOLICITUD, ENTONCES TRAZAR NÚMERO DE SOLICITUD (DEJAR FECHA EDITABLE):
                      app.activeDocument.selection=false;                          
                       try{
                      var doc = app.activeDocument;
                      doc.textFrames.getByName("actualDate:{DATE}").selected = true;
                      doc.textFrames.getByName("actualDate:{FILEPATH}").selected = true;
                      doc.textFrames.getByName("actualDate:{SOLICITUD}").selected = true;
                      contours ();
                      } catch (a) { try {
                                                doc.textFrames.getByName("actualDate:{DATE}").selected = true;
                                                doc.textFrames.getByName("actualDate:{CLIENT}").selected = true;
                                                doc.textFrames.getByName("actualDate:{SOLICITUD}").selected = true;
                                                contours (); }
                                     catch (b) { try {
                                                doc.textFrames.getByName("actualDate:{SOLICITUD}").selected = true;
                                                doc.textFrames.getByName("actualDate:{DATE}").selected = true;
                                                contours ();  }
                                      catch (c) { try {
                                                doc.textFrames.getByName("actualDate:{SOLICITUD}").selected = true;
                                                contours ();  }
                                      catch (d) { alert (MSG_textnotfound, WR, 1); }}}}}

}
// DOCUMENTO ABIERTO
var error=0;
if (documents.length<1) {
  error++;
  alert(MSG_nodocs,0,WR)
}

if (error < 1) {
  date_n_time();
}

// FORMATO FECHA
function TodayDate() {
  var Today = new Date();
  var Day = Today.getDate();
  var Month = Today.getMonth() + 1;
  var Year = Today.getYear();
  var PreMon = ((Month < 10) ? "0" : "");
  var PreDay = ((Day < 10) ? "0" : "");
  if(Year < 999) Year += 1900;

	var theDate = Dateformat.replace(/dd/,PreDay+Day);
	theDate = theDate.replace(/mm/,PreMon+Month);
	theDate = theDate.replace(/d/,Day);
	theDate = theDate.replace(/m/,Month);
	theDate = theDate.replace(/yyyy/,Year);
	theDate = theDate.replace(/yy/,Year.toString().substr(2,2));

	return theDate;
}

/* HORA
function TodayTime()
{
  var Today = new Date();
  var Hours = Today.getHours();
  var Minutes = Today.getMinutes();
  var Suffix = "";
  if (Timeformat == 12) {
    if (Hours >= 12 ) {
			Suffix = PM;
		} else {
		  Suffix = AM;
		}
		if (Hours >= 13) {
			Hours = Hours - 12;
		}
		if (Hours < 1) {
			Hours = Hours + 12;
		}
	}
  var PreHour = ((Hours < 10) ? "0" : "");
  var PreMin = ((Minutes < 10) ? "0" : "");
  return PreHour+Hours+TimeSep+PreMin+Minutes+Suffix;
}
*/


function DateUpdate(Name) {
  var docprepath = activeDocument.path.fsName.replace(prepath,""); 
  var client = docprepath.replace(pospath,"");  
  var docpath = activeDocument.path.fsName.replace(pospath,""); 
  var docname = activeDocument.name.replace(/(.*?)(?:\.([^.]+))?$/,'$1');
  var extension = activeDocument.name.replace(/(.*?)(?:(\.[^.]+))?$/,'$2');
/* FORMATO RUTA DE ARCHIVO Y NOMBRE
  if (docpath.slice(2,3) == "\\") {
    docsep = "\\";
  } else {
    docsep = ":";
  }
*/  
  var content = Name.slice(11);
  var content = content.replace(/\{CLIENT\}/,client);
  var content = content.replace(/\{FILEPATH\}/,docpath);
  var content = content.replace(/\{DATE\}/,TodayDate());
  var content = content.replace(/\{SOLICITUD\}/,docname);    
    /* INCLUIR FICHA DE IMPRESIÓN */
      if( docname.indexOf(NomDoc) >= 0){
                  var content = content.replace(/\{FILENAME\}/,docname);    
              } else {
                  var content = content.replace(/\{FILENAME\}/,FIblank);   
                  }
              return content;
  //var content = content.replace(/\{FILE\}/,docpath+docsep+docname); 
  //var content = content.replace(/\{FILEEXT\}/,extension);
  }
/* ACTUALIZAR DATOS */
function UpdateNow() {
if (AIversion == "10") {
      var textArtItems = activeDocument.textArtItems;
      for (var i = 0 ; i < textArtItems.length; i++)
      {
        if (textArtItems[i].name.slice(0,11) == "actualDate:") {
          textArtItems[i].selected = true;
          textArtItems[i].contents = DateUpdate(textArtItems[i].name);
        }
      }
    } else {
      var textFrames = activeDocument.textFrames;
      for (var i = 0 ; i < textFrames.length; i++)
      {
        if (textFrames[i].name.slice(0,11) == "actualDate:") {
          textFrames[i].selected = true;
          textFrames[i].contents = DateUpdate(textFrames[i].name);
        }
      }
    }
          var contr = confirm(MSG_createmultoutlines,0,WR);
          if (contr == true) {
                contoursVariable();
              } else { /*donothing*/ }
}
   
/* ACTUALIZAR DATOS SELECCIONADOS */
function date_n_time() {
  if (selection.length == 1) {
    if (selection[0].typename == "TextArtItem" || selection[0].typename == "TextFrame") {
      if (selection[0].name.slice(0,11) == "actualDate:") {
        dateformat = selection[0].name.slice(11);
        Check = false;
        if (AIversion == "10") {
          return;
        } else {
          var multip = confirm(MSG_selectedmany,0,WR);
          if (multip == true) {
             selection[0].name="actualDate:"+dateformat;
             selection[0].contents = DateUpdate(selection[0].name); 
            
            /* PREGUNTA CREAR CONTORNOS PARA UN ITEM */
          var contr = confirm(MSG_createoutlines,0,WR);
          if (contr == true) {
              contours ();
              } else { /*donothing*/ }
          } else {
             UpdateNow ();
          }
       }
      /*  if(dateformat != "" && Check) {
          selection[0].contents = selection[0].name.slice(11);
          selection[0].name="";
          selection[0].selected = false;
        }
        if(dateformat == "" && !Check) {
          selection[0].name="";
          selection[0].selected = false;
        }
        if(dateformat && dateformat !="" && !Check) {
          selection[0].name="actualDate:"+dateformat;
          selection[0].contents = DateUpdate(selection[0].name);
        } */
      } else {
	  UpdateNow();
	}

	/*else {
        dateformat = selection[0].contents;
        if(dateformat.search(/\{DATE\}/) == -1 && dateformat.search(/\{TIME\}/) == -1 && dateformat.search(/\{FILE[A-Z]*\}/) == -1) dateformat = format_preset;
        Check = false;
        if (AIversion == "10") {
          Check = confirm( MSG_setmark ,0,WR);
        } else {
          dateformat = prompt(MSG_askformat, dateformat,0,WR);
        }
        if (dateformat || Check) {
          selection[0].name="actualDate:"+dateformat;
          selection[0].contents = DateUpdate(selection[0].name);
          selection[0].selected = false;
        }
      }*/
    } else {
     UpdateNow ();
    }
  } else if (selection.length > 1) {
    UpdateNow ();
  } else {
    UpdateNow ();
  }
}