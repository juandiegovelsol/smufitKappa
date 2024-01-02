// Tiler v1.48
// Daniel Rodríguez Castro 
// jose-daniel.rodriguez@smurfitkappa.es - jdani.rodriguez@gmail.com
// 29/10/2020

/*
ideas:
- cuando se ejecute el script aparece una ventana para cambiar los datos
- imagenes embedded
- solapamiento
- se ha cambiado los desahogos de Canovelles a 15-15-15-15
- cuando se elije la planta de canovelles se cargan los simbolos de un archivo externo
- si no se parte de la plantilla se crean las capas de troquel e impresion
- se cambia la capa de troquel a no imprimible
- se ajustan los simbolos de Burgos a los nuevos recibidos
*/


var APP_NAME = "Tiler v1.48";

var PLANTAS = { "Alcala":     { "margenes":[5,5,5,5]},
				"Burgos": 	  { "margenes":[15,15,15,15]},
				"Canovelles": { "margenes":[15,15,15,15], archivoSimbolos:"/u/simbolos.ai"}
			  }

var PLANTA_POR_DEFECTO = "Canovelles";





var MM = 2.834645 ;	
var posesGiradas;
var x = y = 0;


main();



function main() {
	var impresiones = new Array();
	var planos = new Array();
	
	// comprobamos si hay un documento abierto
	if (documents.length == 0) {
		alert( "No hay ningun documento abierto." );
		return;
		}
		

	for (var i=0;i<activeDocument.selection.length;i++)
		if (activeDocument.selection[i].typename == "PlacedItem")
			impresiones.push(activeDocument.selection[i]);
		//else if (activeDocument.selection[i].typename == "GroupItem")
		else //if (activeDocument.selection[i].typename == "MeshItem")
			planos.push(activeDocument.selection[i]);

	// comprobamos que se ha enlazado la impresion
	if (impresiones.length == 0) {
		alert("No has seleccionado ninguna impresión, debes seleccionarla para poder continuar.");
		return;
	} else if (impresiones.length > 1) {
		alert("Has seleccionado más de una impresión, debes seleccionar sólo una para poder continuar.");
		return;	
	}
	
	// comprobamos que se ha seleccionado las poses del troquel	
	if (planos.length == 0) {
		alert("No has seleccionado ningun troquel, debes seleccionarlo para poder continuar.");
		return;
	} else if (planos.length > 1) {
		alert("Has seleccionado más de un troquel, debes seleccionar sólo uno para poder continuar.");
		return;	
	}
			
	// Mostramos ventana con los datos
	mostrarVentana(planos[0], impresiones[0]);
}



function mostrarVentana(plano, impresionPose) {
	var logoImagen = "%C2%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%02g%00%00%00%40%08%02%00%00%00%C3%90%C3%A6G%C3%A1%00%00%00%09pHYs%00%00%0B%13%00%00%0B%13%01%00%C2%9A%C2%9C%18%00%00%06%C2%B0iTXtXML%3Acom.adobe.xmp%00%00%00%00%00%3C%3Fxpacket%20begin%3D%22%C3%AF%C2%BB%C2%BF%22%20id%3D%22W5M0MpCehiHzreSzNTczkc9d%22%3F%3E%20%3Cx%3Axmpmeta%20xmlns%3Ax%3D%22adobe%3Ans%3Ameta%2F%22%20x%3Axmptk%3D%22Adobe%20XMP%20Core%206.0-c002%2079.164460%2C%202020%2F05%2F12-16%3A04%3A17%20%20%20%20%20%20%20%20%22%3E%20%3Crdf%3ARDF%20xmlns%3Ardf%3D%22http%3A%2F%2Fwww.w3.org%2F1999%2F02%2F22-rdf-syntax-ns%23%22%3E%20%3Crdf%3ADescription%20rdf%3Aabout%3D%22%22%20xmlns%3Axmp%3D%22http%3A%2F%2Fns.adobe.com%2Fxap%2F1.0%2F%22%20xmlns%3Adc%3D%22http%3A%2F%2Fpurl.org%2Fdc%2Felements%2F1.1%2F%22%20xmlns%3Aphotoshop%3D%22http%3A%2F%2Fns.adobe.com%2Fphotoshop%2F1.0%2F%22%20xmlns%3AxmpMM%3D%22http%3A%2F%2Fns.adobe.com%2Fxap%2F1.0%2Fmm%2F%22%20xmlns%3AstEvt%3D%22http%3A%2F%2Fns.adobe.com%2Fxap%2F1.0%2FsType%2FResourceEvent%23%22%20xmp%3ACreatorTool%3D%22Adobe%20Photoshop%2021.2%20(Windows)%22%20xmp%3ACreateDate%3D%222020-07-21T10%3A53%3A37%2B02%3A00%22%20xmp%3AModifyDate%3D%222020-10-29T13%3A38%3A01%2B01%3A00%22%20xmp%3AMetadataDate%3D%222020-10-29T13%3A38%3A01%2B01%3A00%22%20dc%3Aformat%3D%22image%2Fpng%22%20photoshop%3AColorMode%3D%223%22%20photoshop%3AICCProfile%3D%22sRGB%20IEC61966-2.1%22%20xmpMM%3AInstanceID%3D%22xmp.iid%3A382efc79-f87c-754b-ae80-73ba00514e3c%22%20xmpMM%3ADocumentID%3D%22xmp.did%3Aa4b956e6-71c9-aa42-a5e6-2658eb66fba9%22%20xmpMM%3AOriginalDocumentID%3D%22xmp.did%3Aa4b956e6-71c9-aa42-a5e6-2658eb66fba9%22%3E%20%3CxmpMM%3AHistory%3E%20%3Crdf%3ASeq%3E%20%3Crdf%3Ali%20stEvt%3Aaction%3D%22created%22%20stEvt%3AinstanceID%3D%22xmp.iid%3Aa4b956e6-71c9-aa42-a5e6-2658eb66fba9%22%20stEvt%3Awhen%3D%222020-07-21T10%3A53%3A37%2B02%3A00%22%20stEvt%3AsoftwareAgent%3D%22Adobe%20Photoshop%2021.2%20(Windows)%22%2F%3E%20%3Crdf%3Ali%20stEvt%3Aaction%3D%22saved%22%20stEvt%3AinstanceID%3D%22xmp.iid%3A52edd630-8a35-114b-9629-a0bdeba419ce%22%20stEvt%3Awhen%3D%222020-07-21T14%3A32%3A52%2B02%3A00%22%20stEvt%3AsoftwareAgent%3D%22Adobe%20Photoshop%2021.2%20(Windows)%22%20stEvt%3Achanged%3D%22%2F%22%2F%3E%20%3Crdf%3Ali%20stEvt%3Aaction%3D%22saved%22%20stEvt%3AinstanceID%3D%22xmp.iid%3A382efc79-f87c-754b-ae80-73ba00514e3c%22%20stEvt%3Awhen%3D%222020-10-29T13%3A38%3A01%2B01%3A00%22%20stEvt%3AsoftwareAgent%3D%22Adobe%20Photoshop%2021.2%20(Windows)%22%20stEvt%3Achanged%3D%22%2F%22%2F%3E%20%3C%2Frdf%3ASeq%3E%20%3C%2FxmpMM%3AHistory%3E%20%3C%2Frdf%3ADescription%3E%20%3C%2Frdf%3ARDF%3E%20%3C%2Fx%3Axmpmeta%3E%20%3C%3Fxpacket%20end%3D%22r%22%3F%3E%3DG%3B%1E%00%00%0CaIDATx%C3%9A%C3%AD%C2%9D%3FhTY%1B%C2%87%C3%87%C3%96B%C2%B4%C2%B0%13%0Cb%C2%95%C3%86%C2%80)%2C%C3%82%26%C2%85%2Cl'%C2%98%C2%B4%C2%AEl%11%C2%B7%1C%C2%B00%C3%8DJ%C2%BA%C3%98%2CH%0A!%C3%A4%2B%04%C3%A1%C2%83%C2%B5Jg%11%C3%84%C2%AF%C2%B1%08X%08%C2%8B%C3%85%16%01%C3%BB%C2%80%C3%98%C2%A4%C3%9E%C3%AFw%C3%B3%C3%86%C2%937%C3%A7%C3%9F%C3%9C%C3%8CLf2%C3%89%C3%B3p%C2%90%C3%A4%C3%8E%C2%B9%C3%A7%C3%BE%C2%99x%C2%9E%C3%BB%C2%9E%7F%C2%B7%C3%93%01%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00H%C3%B8%C3%B5%C3%8D%3F%C3%AD%C2%93%C3%B2%C3%9F%C2%B9s%C3%A7%7F%C2%AD%C2%99%C2%99%C2%99%C3%A1%0E%03%00%C3%80%C3%85%C2%B5%C3%A6%C3%BC%C3%BC%C3%BC%C2%BF%C2%ADYXX%C3%A8y%02%C3%9F%C2%BE%7D%C3%BBwH%5C%C2%BBv%C2%ADr%20%7D%C3%9A%26%1B%00%00%00%C3%96%C3%84%C2%9A%00%000%C3%B9%C3%96%C3%AC%C3%89%C2%8B%17%2FT%C3%94%C3%9B%C2%B7o%07%2C%07k%02%00%00%C3%96%C2%8CYZZ%C2%B2%C2%A3kG%C2%AC%09pa%C2%99%C2%9A%C2%9AR%154%C3%91%C2%A3%2B%C2%BA%C3%9D%C3%AE%C3%A7%C3%8F%C2%9FUk%C2%BD~%C3%BD%3Al%7C%C3%B0%C3%A0%C3%81%C3%AA%C3%AA%C2%AA%C2%AE%C2%8E%C2%AF%18kbM%C2%80%C3%89%C3%A7%C3%A6%C3%B4%C2%A5%C2%87%C3%9DKO7%2F%C3%BD%C3%B1%C3%97%C2%90%C3%93%C3%AF%7Fv~%C3%B9%C2%ADs%C3%B9J%C3%A5%C3%A0W%C2%AF%5E%0D%C2%A6%C3%B1%7C%C3%BF%C3%BE%7Dkk%C3%AB%C3%B1%C3%A3%C3%87%13t%23e%C3%8Ap%C3%BE%3Ay%C3%9B%C3%B8%C3%B2%C3%A5%C3%8B%C2%B0%C3%B1D%C3%A2%C3%94%C2%8E%C2%A5a%C2%9B%C3%A9m%C2%892%C3%ABW%C3%BE%C2%AE%C3%8F%C2%B35K%60M%C2%80%C3%93Fb%C2%BB%C3%B4%C3%9F%C2%AFGi%C3%BD%C3%A3%C2%A5G%C3%8F%1B%C2%89%0E%C2%92%24%60_%C3%A6%7F%C3%BE%C3%AE%C3%BC%C2%B4%C2%98%3D%C2%BA%C3%82%C3%8A%C2%AF_%C2%BF%C2%86%C3%BA%C3%87j%C3%BC%C2%A8R%C2%9A%C2%88%C3%9B(%C3%B7%7Be%C3%9A%C2%B5%C3%98G%C3%92%7F%C3%98%C2%A8%C3%A7%C2%834%C2%BCN7z%11FwC%C2%B7K%1B%15%C2%BCF%C2%85%C2%84%C2%A3(%C3%83%C3%84%3Dm%60M%C2%AC%090!%C3%8A%C2%94%20%C2%BD%C3%9E%14%1A%0E1~%5D%7B%C3%A7%0B%C3%AFL%C3%9FK%C2%85%11%C3%AAz%C2%99%40%C3%A2%09%1F%C2%A9%22%0A%C3%91%C3%A7D(%C3%93%C3%8EV%C3%86%C2%BAz%C2%80%C2%A4%15%C3%84%C3%A6%C3%8D%C3%A7m%C2%A7%C2%9FM%C2%B4%C2%BA%09%C3%B5%C2%88%C3%93W%C3%91i%C2%B4%1A%C2%8E%1E5%0B%03%C3%96%04%C2%80%C2%A1%22%C2%B1ye%3E%C3%9D%2C%C3%A6%C2%94%C3%B0B%C3%BA%C3%A5%C2%B7c1eh%C2%8C%C2%95%23%C3%B5%C3%AF%C2%A3%C3%A7GM%C2%B2%C3%97o(%C3%8A%3C*%C3%BF%C2%8F%C2%BF%C2%A2R%15%12%C3%B5%C2%94A%C2%88%C3%98%C3%8E2!%C3%8A%C3%8C%C2%B6%C2%8B%C3%9A%13%C2%80%C3%94%C3%A8%C2%95%C2%A6%C2%8DiT%C2%9Aeuu%C2%B5%12y%7Be%12_b%C3%8D%13X%C3%B3%C3%99%C2%B3g%C3%9B%C3%9B%C3%9B%C3%BEB666%C2%B4%C2%91%C2%BF%16%C2%80%C2%96%C2%81%C2%A6%24%C3%97%181X%C3%90%0B5M%C3%AB%1F%C2%9B%3C%0F%C2%BBM%C3%93%C2%ABTZ%C3%A8%C2%B9%C2%8C%0Fqs%C3%9AW%C3%B7i%17%60%C2%845%C3%98%C2%9E%C3%BD%3B%19.D%C2%86k%C2%B9K%7Bk%C3%BA%C2%9C%C2%A95Q%C3%A6%C3%85%C2%B5%C2%A6%C3%8D%01%C2%BD%7B%C3%B7%C3%AEI%C2%AD%C2%B9%C2%BC%C2%BC%5C%C2%99%3F%C2%BA%C2%BB%C2%BB%C2%BB%C2%B4%C2%B4T%3F%C2%AE%C2%88%04%C3%BC%C3%A9%C3%93%C2%A7%C2%963J%01%26%C3%98%C2%9A%C2%BE%05u%C3%AD%C3%9D%C3%A1V%C2%B9%C3%B3%C2%A7%C3%85%26%C2%88%C3%B4a%C2%A2%C3%AF%C2%A1%C2%9C%C3%BD%C2%B9%C3%AFp%C2%B6%09Cs2(%C3%89F%C2%A1%5B%7B%0F%C2%8D%C2%8B6%17rJ%C3%96%0C%0D%C2%BC%C2%AC%C3%A9%C2%865%C3%9BZ%C3%93%0E%24%14hF%C2%91%C2%A5%3E%0A%C3%B2%C2%AB%04%C2%9Dv%5C%2B_~%C2%95e%23%C3%A9%C3%B2%C3%B7%06%C3%A7%C3%96%C2%9A%5E%C2%87%C2%8F%C2%9E%C3%A7%C2%9D%C3%B7%C2%B0%1BwO*%C2%B8%C2%AC%C2%8E%C2%89%C2%AD%1D%C3%85%C3%B5%C2%9Bz%19(%60jS%C2%94%C3%82S%C3%AB%0B%C2%B4%C3%9EA%C2%A9B%C2%96R%C2%9C*%C2%B9%C3%BAHkjj%C3%8A%C2%B6%2B%C2%A7%C2%B6%C3%BB%C3%AERC%3Bv%C2%BB%C3%9D4%C3%80%C2%8D%C3%8A%C2%8F%C3%94%15%14n%C3%A5Ku%C3%96%C2%AA%C3%9C%C3%86%C2%9Ai%C3%89~%C2%AFR%C2%A8%5D%C2%B7%C3%A6%C2%89%C2%94%C2%A9Btn%C2%AF%0F%C3%90%0F%C3%A9.%C3%91%19%C3%9A%C2%AF%C2%AB%07%C3%A8%5E%C2%A5%C3%AD%C3%A7%C3%91%3D%C2%B4_-%7Fz%C3%B7%C3%82M%C2%B3%C3%B1M%C2%A5%3CX%C3%B3%C3%94%C2%AD)%17%C3%AA%23%C3%ADX%C2%89%26-%C2%8FPHZ%C2%B7f%C2%98%C3%BD%C2%B2%C2%B1%C2%B1q%C3%AB%C3%96-%C2%AAT8%C3%A7%5C%C2%BFq%C3%8Cg%0F%C2%BB%C2%B5%C3%8C%C3%92%C3%A4%C3%AC%C3%8F%C3%8Dh%C3%9B%C3%B5%C2%8F!6mvq-%C2%AE%C2%AD%22Z%C3%97%C2%B5%C2%A9z6%1Aq%C2%AA%C2%9A45%C2%9C%C2%90%C3%B9%C3%B4%C2%A9%C2%9F%C2%9A%C2%A2jW%1B%C2%A3%C2%BA%C3%8B%C3%BA%14U%C2%83%C3%B91%C2%AB%C2%A6d%15%C2%ABZ%5BJ%C3%B0%03sB%C2%84%C2%97%C2%96o%0E%C3%8E%C3%AE%C2%A2%C3%93%0E%C3%A5%5Bm%C3%A9%C3%BB%1DM%09%C3%A6%C3%AC%C3%87%07%C2%A4gn%07%C2%95c%C2%A2a%C2%B1%C2%A5%C3%A9%22Yk%C2%B6W%C2%A6%C2%AE%C3%82%C3%B7%1F%07%C2%AC%C2%935%7B%C2%86%C3%A9%3D%C2%B4%7B%12n%C2%88%C3%BF4%1D%3C%1C%C3%AEy8%C2%87%C2%A8k6%C2%9B%07k%C2%9E%C2%BA5%C3%AF%C3%9F%C2%BFo%C3%8A%C2%8Cv)%C2%89SQcV%C2%BD%C3%A1%C2%B8%C3%BAAyz%C2%96%06pN%C2%98%C2%BEW%1F%C3%A0%C3%9Ar%C3%87%C2%A6!%C3%B7%C3%A9f%13%C2%80%5E%C2%BF%C2%91%C2%B7%C2%A6%C3%AF%22%3D%3E%20(%C2%AD%C2%9A%C2%83B%2C%1C%C2%B1ZU.%C2%89fsfw4%13%C2%94%C2%B6%C3%8B.Qu%1F%C2%AC%C2%99%C2%96o%C3%95%C2%A0%C3%AD%12U%C3%B4%C2%91%60%C3%BC%C2%B4%C2%99T3%C2%A5%C2%92%C2%B3%1A%2B5%C3%95F%C3%96%C3%94%3D%09%C2%BB%C3%B7%C2%8C%C3%98%C2%94%C2%B9t%C2%AF%C3%ACd%C3%923L'%C3%8E%C3%BA%C3%AB%C2%8D%C3%AEa%25%7Fh%3F(%5D%C3%ACHG%C3%BC%C3%B6%C3%B1%C3%8E%C2%93%0F%C2%AD%C2%99%C2%9B%C2%9B%C2%9B%08kZ%C3%ABk%C3%8B%C3%B1%3E%C2%95%C3%8Cv%5Ce%C3%90%0F%C2%84%C2%98%C2%805%C3%AB%C2%BB4%5D%C2%9E%C3%91%C3%BCN%C2%9F%14V%3Ez%1E%15U%C2%B1f6%04%C2%89%C3%AC%18b%C2%A9h%02%C2%86%C2%B5%25%C2%8A%C2%A8%12W%1Dm%C3%9B%7Dm%1E%C2%A6vh%7BIQ%C2%BEr%C3%B7%C3%81%C2%83%C3%9F%25%C2%B5%C2%885%7B%C2%A6%C2%B1%C2%A6_%09%C3%88g%08%C3%A1iv%C2%AF%C2%AC%05%23k%C3%BA%C3%AB%C3%AA%19%C2%AE%C3%99%C2%BE%C2%BAu%C2%96M7%C3%93%C3%AF%1E%C2%A4%15%C2%89M%C3%9B%C2%B5%C2%A3%C2%AC%1F%3D%C2%85%C3%A8%11!m%24%C3%90F%C3%A54%01G%C3%8F%10v9v%C2%81v7%2CZ%C2%8D%0A%C2%9Cx%C2%86%C3%92%C2%AB%7C%C3%9A%C3%96%C2%B4%40%C2%B3%7D%C2%A7%C2%A3%C2%B5%C2%BEf%C3%B3%C2%87%C2%91D%C2%A5%26%5C%C2%80%C2%8Bh%C3%8D%C2%9B%C3%93M%C2%93%C3%AC%C3%83n%C3%A3Hi%2F%1D%19%C2%A4-~%0D%20%C2%B7%C3%84A3%5C%C3%88u%7CV%C2%AC%C2%99%C2%BA%C2%B0%14%C2%B4E%C2%8A%C3%B5-%C2%99%C3%9Ej%C2%B2c%C2%B0%C2%88*%C3%A8lw%60%C3%89%C2%9A%C2%BE%7Co%C3%8DHZ%C3%8Af%C3%931%C3%83%7B%15%7B%C3%B6kfKn%3F%C2%86(%3A%C2%81%C2%88z%C2%9F%C2%A8Y%C3%8A%C3%B7Jf%C2%9F%1B%C3%BC%19FK.DO6V%C2%94%C3%97%C2%9E%C3%97v%14%C3%9A%C2%9A%C2%95%C3%B5e%C3%B9%C2%A7%01%3Fvzt%C2%93q%15%3B%C3%8E%C2%B7C9%C3%AD%2C%C3%A7%5B3%3B%3B%7B%C3%B6%C2%ADi%C3%A5oll%C2%9C%C2%B4%C3%BC4%C2%9A%C2%B4%C3%AD%C2%8C%C3%BA%01%C2%AC%C3%99lT(y%7Ca%C2%A0c35%C2%83%0B%C3%BDF%C3%AD%12%C3%B2k%C3%9F%C2%A7%C2%9B%C3%8D%5E%C2%AE%C2%B5%C2%B6n%C3%8D%C3%8E%C2%8F%C3%85q%C3%92%C2%A6%C2%BF(Rlc%C2%B5H%C2%84%3E%C3%B4%19%C2%8A5%C2%B3%C2%A3%C2%96FlM%C3%9F!%C3%9A_%3Bg%C3%9D%C2%9Ai'%C2%9D%C3%BF%5E%C3%AC%C3%93J%C2%93r%C3%94%C3%8B%C2%9B%3D%01%C3%9F%C3%AE%3D%C2%A2%C2%BF%C3%B6t%C2%8D%C2%A5%12%1F%3E%7C%C3%A8%C2%9C%C3%87~M%C2%9B%C2%9Ay%C2%A2%C3%A8%C3%90%1Ai%C3%93%5D%C3%AC%C2%B8%C3%8C%C3%AC%04%C2%ACyh%C3%8D%C3%92%0A%06%C2%A5V%C3%99%C2%83%C3%85f%0F%C3%BD%C2%9A%1B%5B%C3%9B%C3%93%C2%9A%1E%3D%C3%A2%5B%5B_dP%1B%02zRkfk%C3%A7A%C2%AC%C3%99s%C2%B4%C3%8E%08%C2%AC%C3%999%18%C3%82%C2%93%0D%C3%87%C3%AB%C2%8D%C2%886%C3%A45Z%C2%BF%C2%B0%C2%8D5%C3%BDm%C3%ACi%C3%8D%C3%92%C3%97%C2%A1g%23k%C3%B2%C2%8D%C3%BAA%C2%B1%C3%A6%C2%88%C2%AC%C3%99%C3%B7%0B%3ES%3BZQ%C3%B59%C2%9D%00%C3%A7%C2%90%C3%AC%18Z%1B%2B%2Bef%5Be%C3%9D%12%07%C2%8D%23%0B%C3%83%7F%06%C2%B1%C2%A6%C2%AF%C3%A5%C3%8F%C2%A05%C2%B3z%1B%C2%BD5%3B%C3%87%C2%87%C3%A0%C3%96G%06%C3%B9!K%C2%B6%20%C3%BE%20%C3%96%C2%B4F%C3%A9%C2%96%C3%96%C2%B4%208%C3%AAc%C3%96.%C3%996%00%C2%ACy%C2%8A%C3%96%0C%1B%C3%BB%20z%C2%A7J%C3%A9%C2%B8%00%17%C2%816%C3%B35%0F%C2%87%C3%BFD%C2%B1%C3%A6%C3%9A%C2%BB%C2%96%C3%8A%C3%AC%C2%94%C3%A7kZUV%19%05%1A%0D%C3%8F%C3%81%C2%9A%C3%99%C3%B9%C2%9A%C3%99%C2%91S%C2%81t%3AM%1F-%C2%B4%C3%A16%C2%86AU-%C2%ADi38%7D%C2%A4n%C2%9D%C2%A0%C2%B4%C3%90%C2%8E%C3%8D%C2%9AC%09%10%C3%87k%C3%8D%C3%85%C3%85%C3%85%C3%9B%C2%B7oS%7D%C3%83x%C2%AC%C2%99%5D%1B%C2%A8%C2%84%C3%82%C3%90%C3%A9%7B%C2%87-%C2%B7%16%C2%86%C3%9A%C2%94M%3Fh%C3%A8%C2%A0S%C3%B3%C2%B0%C2%B5%C3%B6%C2%87wKk%03Y%C3%A5%5B%11F%C2%B4J%C3%ADi%5B%C3%93%C2%8FK%C2%9A%08kv%C2%92%C2%B1%C2%AF%C2%B2Zi%C3%A0%C2%8F%1F4%C3%94w%C2%BFfh%C2%A0%C2%AEX3%04%C3%81v2%C3%99%C2%81ZXsl-%C2%B4C%C3%A9%C2%8C%1C%C2%AE5%C2%A5%C3%80%C2%9D%C2%9D%C2%9D%2F_%C2%BE%C2%942%C3%A8%C3%937o%C3%9EX%C3%8E%C2%AF%07%C3%AC%C3%AF%C3%AF%C2%AF%C2%AD%C2%ADQ%C2%83%C3%83%18%C2%AC%C2%99%C2%AEC%7B%C2%92%06%C3%9E%C3%83%C2%A1Cr%C3%A7%C3%BAG%C3%AB%C3%9Al~%C2%B5e%10~%C2%AC%C2%99PY%C2%87%C2%B6%C2%A75%C3%BD%C3%ABP%3A%C3%A5q%C2%9E%7D%5B%C3%93%C3%97%C3%A3%C3%91%C3%A0%C3%8F%C2%925%C2%B3%C3%A3n%06%C2%B7f%7D8O%C3%94%C2%8B%C3%A9%3F%C3%B2K%C2%B7%C2%A7sQ%C3%BCqC%C2%A0%C3%A9%C2%87%C2%B0%C2%B6%C2%B1f0%C2%9F%C2%BF%5D%15k%C2%86%08%C3%98VK%C3%88%5E%C2%A3%3Fg%C2%AC9%22k%C3%9A%C3%90%C2%9E%13%C2%8D%C2%A1%1D%C2%8D5%25%C3%85W%C2%AF%5E%C2%95%C2%AC%C3%B9%C3%A4%C3%89%139%C3%92%C2%AC%C2%B9%C2%B2%C2%B2%C3%B2%C3%BE%C3%BD%7B%C3%BBv%C3%B6%C3%B6%C3%B6%C2%A8%C3%81a%0C%C2%B4%7F%C3%A7IO%C3%AC%5D(%C2%8A5%C2%A5%C3%890e3z%C3%A7%C3%89%C3%B1p6%C3%B4%5CfG%C2%B2%C3%B8~%C2%BBt%09%1E%2F%C2%A7%C2%8A5%C2%BD%08SkZ%04f%13%13%C2%B3k%11%C3%B4%2C%3F%C3%8D%C2%90%C2%9D%07%C2%92u%C2%92%C2%B7%C2%975%C2%AEjKv%C3%A2_%C3%BBw%C2%9ED%C3%A2%C3%B4%3B%C3%AA%C3%84%C3%AC%C3%AD%C3%9F%C3%99u%1EJ%C3%B7%C3%96%C2%87%C2%B3%C2%BE-%C3%9D%C3%8F%3C%C3%B1%C3%91m%C3%B8Nm%C2%B0%C2%B1%C2%BF3%C2%96%C3%93%C2%BF%00%0Ek%C2%8E%C3%94%C2%9A%C3%B2%C3%A5%C2%B0%C2%A6%C2%8B%C3%B4mM%05%C2%8B%3EF%C3%B4%3F%C2%97%C2%AC%C2%A9%C3%ADr%C2%AAYS%C3%B9%C3%AD%3F%C2%98%C3%8A%C3%81%C2%9A0%C2%B6p3z%7D%C3%B4P%C3%9E%C2%AF%C2%A90%C3%B4%C3%B2%C2%95F%C2%99%C3%95%C3%B7kF%C2%81%C2%88-%C3%98%C3%96%C3%B9%C2%B1%60i%14V%C2%AA%C3%86%C3%B7%C3%B5%C2%9E%C2%97S%C2%B44%C2%9D%C2%AF%C3%84%C2%B35%5Bv5%1F%C2%B9%C3%84%C3%97%C3%A6~%C2%AC%C2%ACo%C2%B9%C3%8D%C3%8E%C3%8A%C3%B7%19%C3%92%C2%A9)%C3%91%C2%99%C3%BB%C2%92%C3%93%C2%996%C3%A9%C3%AE%C3%B2P%C3%94%0C%C3%AB%C3%97O%08y%C3%92%C3%B5zt%C2%BD%C3%99%C3%B5%19%C3%BC%C3%A5%C2%87%C3%8B%C2%89%C3%84%C2%AC%13%C2%B6%C3%B7%C2%83%C3%9A%C2%A1%C3%93%1E%C3%93%C3%A8%C3%96%C3%A9%C2%A2%C2%AC%C3%A3%C3%99N%23%C2%84%C2%95%C3%91%C3%94%C3%8C%C2%90%C3%9F%C2%9Fm%C2%BA%C3%82-%C3%96%3C%15k%C3%9A*%07CY%C2%9A%60%C2%90XS%C2%B6%C2%B3%5EIkn%C2%AD%5B%C3%93%C2%82K%C2%85%C2%9B%C2%A1%C2%85V%C2%BB%C3%8B%C2%9D%C3%8Al%5B%00%C3%86%C3%80%C3%A5%2B%C2%B18%C3%97%3F%1E%C2%BD%C3%BF%C2%AB%C2%BF%C2%A4%C2%A0%C3%B3%C3%B7%3F%C2%A3!%C2%B8M%C2%81I%C2%88VY%C3%AC%C3%8D%C2%AAW%0BCKK%C2%B2%C2%95%C2%A6%C3%BF%C2%87%10*%C3%BD(%7B%5C%C2%B3B%C2%BAPQe)%C2%B8%C2%ACl%C3%92%C2%8A%C2%B4TW%5B%3C%17%C2%AD%C3%B0%C2%90.%C3%B4S%C2%A9%C3%AA%C2%A3%C2%880%C2%9D%C2%8Bby%C2%A2%C3%80%C3%8E%22%C3%8E(%5B4f%C2%A7%C3%8Dj%C2%B1%3D%C2%BF%C2%B2%C3%AC%23%C2%85%C2%95%C2%96%C2%AESX_%C2%A8%01k%0E%C3%87%C2%9A%C2%A1%C2%91v%C3%B0ps%10k%C3%8Av%16b%C3%AA_%05%C2%91ukJ%C2%AB%C3%BA%22%C2%825%C2%85%24%C2%BA%7F%C3%80%C3%A2%C3%A2%22%C2%B57%C2%8C%C2%93%C3%A9%7BM%C3%8B%C2%AA_%C3%ABgX%C3%A9%C3%A9f3%02%C2%A8%C3%9Cc%C2%AA%C2%80%C3%86%C3%9E%C2%83%C3%A1%03%20%5B%C3%BA%3CT%C3%96%C3%8A%C2%A3%C2%9A%7D%C3%A18%16r%C3%992%C3%AE~%C2%BBr%C2%86%C2%8A%3B%C3%9A%2B%C3%B4%C2%86%C2%86U%C3%88m%C3%81%C3%B4%C2%B0%C3%84%C2%8Fu%C3%85%C2%85%C3%B2%C3%AD%C2%A5%1F%C3%BA%C3%97%17%C2%A2%C3%82%C2%83%C2%B1%C3%8C%C2%B5%C3%91%C2%89%C2%99%C2%84%2C%C2%84R%C3%A6%C3%AC%C2%99%C2%87jV%19t%C2%B1v%1A%C2%A9%C2%9Cl%C3%BD%C3%B7%C2%85%C2%84%C3%ACKK%C3%AC%C3%82-%C2%83%C2%9D%C2%B9%C2%B5%C3%BA%C3%9A%C3%AD%C2%B5%C3%B0%C3%91%C3%A2%3F%7FQ%C3%9A%18%3D1%C3%98%7BQ%C2%94%C3%9F%1A%00%C2%B2%C3%9F%C2%9A%C3%BF%C2%B2lqZ%5B%140%1B8%C3%9A%12%16%C2%96%C3%81%C2%AE%C3%91_%C2%97-%7F%C2%885G%C2%B7z%7B%C3%8B%C2%A3%2C--moo%0F%C3%9D%C2%9A%C2%BA%C2%B1%3B%3B%3B%C2%9D%C2%83%C3%AEL%C3%BD%5C%C2%B1fh%C2%98%0D%C3%96%C2%94hm_%C3%AB%C3%AC%C2%A4%C3%9E%06%C2%80qQ%1FC%5B%C2%B1%C3%A6D%C2%BC3%1Ck%1E%11%C3%9E%02%26%23V%C3%9E%1D%1D%C3%9E%C3%81YY%C2%BD%C2%BD%C3%AF%C3%91%40z%C3%94R%C2%A4%18i2%C2%B5%C2%A6%C2%B6(%C2%A7%C3%BD%C2%BB%C2%B7%C2%B7g%C2%BB%04%C3%91Z%C3%8B-%C3%BFu%01%00kb%C3%8DS%C2%B4%C2%A67%C2%A2%C2%AD%60%C3%A0wW%7C%C3%A9%3F-MS%19%C3%90%C2%9A%0A%22%25%C3%82h%C3%AAHe%C3%A6I%C2%885%15h%C2%AE%C2%AC%C2%AC%C2%84%C3%BC4%C3%92%02%00%C3%96%C3%84%C2%9A%C2%A7nM%C2%B3%C3%A3%C3%AE%C3%AEn%C3%A5%C2%8A%14%C2%89V%C2%A48%C2%A05%C3%AD%C3%9E%C2%86%C2%95%0A%2C%C2%88%C3%9C%C3%9F%C3%9F%0F%22%C2%8C%C2%86V%07k%C3%AA%07%05%C2%9D%5B%5B%5B%C3%8AiM%C2%B5%00%00X%C3%B3%C2%82Zs%C3%B4%2C%2F%2F%C3%BB%C3%88%C3%92%5E%C2%99%19E%C2%9Fg%0D%1B%1CD%C3%9B%2C%00%C2%8C%17%3F%C3%92%C2%B5%C3%A7%C3%98%1C%C2%BF%C3%A2O%C3%B6%250g%C2%91%C2%99%C2%99%C2%99%C2%85v%C3%8C%C3%8D%C3%8D)%C3%B3%C3%AC%C3%AC%C3%ACBk%C3%AA%C3%AF8%05%00%C2%80s%C2%83%C2%8D%C3%88%C3%B5%C2%938%25B%1B%C2%99%5C%C2%8AJ%C2%A3%C3%B5oe%C3%9C%C3%92%C3%A8Y%00%00%C2%80sEi%C2%A6f%C2%A9%C3%A9%C3%B5%C2%9C5R%02%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%C3%80%C3%80%C3%BC%C3%BA%C3%A6%1F%12%C2%89D%22%C2%91Hm%12%C3%96%24%C2%91H%24%12%09k%C2%92H%24%12%C2%89%C2%845I%24%12%C2%89D%C3%82%C2%9A%24%12%C2%89D%22aM%12%C2%89D%22%C2%91%C2%B0%26%C2%89D%22%C2%91HX%C2%93D%22%C2%91H%24%12%C3%96%24%C2%91H%24%12i%C2%B0%C3%B4%7Fg%C3%A0%5C%C2%89s%10%05%3A%00%00%00%00IEND%C2%AEB%60%C2%82"; 
	var fondoImagen = "%C2%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%01%C3%8F%00%00%01l%08%02%00%00%00%25%C2%92%C2%A5%3C%00%00%00%09pHYs%00%00%0B%13%00%00%0B%13%01%00%C2%9A%C2%9C%18%00%00%06%C2%BEiTXtXML%3Acom.adobe.xmp%00%00%00%00%00%3C%3Fxpacket%20begin%3D%22%C3%AF%C2%BB%C2%BF%22%20id%3D%22W5M0MpCehiHzreSzNTczkc9d%22%3F%3E%20%3Cx%3Axmpmeta%20xmlns%3Ax%3D%22adobe%3Ans%3Ameta%2F%22%20x%3Axmptk%3D%22Adobe%20XMP%20Core%206.0-c002%2079.164460%2C%202020%2F05%2F12-16%3A04%3A17%20%20%20%20%20%20%20%20%22%3E%20%3Crdf%3ARDF%20xmlns%3Ardf%3D%22http%3A%2F%2Fwww.w3.org%2F1999%2F02%2F22-rdf-syntax-ns%23%22%3E%20%3Crdf%3ADescription%20rdf%3Aabout%3D%22%22%20xmlns%3Axmp%3D%22http%3A%2F%2Fns.adobe.com%2Fxap%2F1.0%2F%22%20xmlns%3Adc%3D%22http%3A%2F%2Fpurl.org%2Fdc%2Felements%2F1.1%2F%22%20xmlns%3Aphotoshop%3D%22http%3A%2F%2Fns.adobe.com%2Fphotoshop%2F1.0%2F%22%20xmlns%3AxmpMM%3D%22http%3A%2F%2Fns.adobe.com%2Fxap%2F1.0%2Fmm%2F%22%20xmlns%3AstEvt%3D%22http%3A%2F%2Fns.adobe.com%2Fxap%2F1.0%2FsType%2FResourceEvent%23%22%20xmp%3ACreatorTool%3D%22Adobe%20Photoshop%2021.2%20(Windows)%22%20xmp%3ACreateDate%3D%222020-07-21T13%3A18%3A11%2B02%3A00%22%20xmp%3AModifyDate%3D%222020-09-15T16%3A14%3A16%2B02%3A00%22%20xmp%3AMetadataDate%3D%222020-09-15T16%3A14%3A16%2B02%3A00%22%20dc%3Aformat%3D%22image%2Fpng%22%20photoshop%3AColorMode%3D%223%22%20photoshop%3AICCProfile%3D%22sRGB%20IEC61966-2.1%22%20xmpMM%3AInstanceID%3D%22xmp.iid%3Aa8c4a0cb-f505-864a-95b5-b2ea4c7b87be%22%20xmpMM%3ADocumentID%3D%22adobe%3Adocid%3Aphotoshop%3Addd37953-b505-f044-8a35-75d4e152e0b4%22%20xmpMM%3AOriginalDocumentID%3D%22xmp.did%3A4573bf9e-d52b-6940-a467-facb77030779%22%3E%20%3CxmpMM%3AHistory%3E%20%3Crdf%3ASeq%3E%20%3Crdf%3Ali%20stEvt%3Aaction%3D%22created%22%20stEvt%3AinstanceID%3D%22xmp.iid%3A4573bf9e-d52b-6940-a467-facb77030779%22%20stEvt%3Awhen%3D%222020-07-21T13%3A18%3A11%2B02%3A00%22%20stEvt%3AsoftwareAgent%3D%22Adobe%20Photoshop%2021.2%20(Windows)%22%2F%3E%20%3Crdf%3Ali%20stEvt%3Aaction%3D%22saved%22%20stEvt%3AinstanceID%3D%22xmp.iid%3Ad907ae30-7d88-fc48-b296-c5487b0af737%22%20stEvt%3Awhen%3D%222020-07-21T14%3A33%3A58%2B02%3A00%22%20stEvt%3AsoftwareAgent%3D%22Adobe%20Photoshop%2021.2%20(Windows)%22%20stEvt%3Achanged%3D%22%2F%22%2F%3E%20%3Crdf%3Ali%20stEvt%3Aaction%3D%22saved%22%20stEvt%3AinstanceID%3D%22xmp.iid%3Aa8c4a0cb-f505-864a-95b5-b2ea4c7b87be%22%20stEvt%3Awhen%3D%222020-09-15T16%3A14%3A16%2B02%3A00%22%20stEvt%3AsoftwareAgent%3D%22Adobe%20Photoshop%2021.2%20(Windows)%22%20stEvt%3Achanged%3D%22%2F%22%2F%3E%20%3C%2Frdf%3ASeq%3E%20%3C%2FxmpMM%3AHistory%3E%20%3C%2Frdf%3ADescription%3E%20%3C%2Frdf%3ARDF%3E%20%3C%2Fx%3Axmpmeta%3E%20%3C%3Fxpacket%20end%3D%22r%22%3F%3E5-%7Cx%00%00%06BIDATx%C2%9C%C3%AD%C3%9C%C3%8Bj%1B%01%10D%C3%91L%C3%B0%C3%BF%C3%BF%C3%B2da0%22%2F%C2%8C%C3%B0%5C%C2%8F%C2%BA%C3%8FY%C3%85%C2%89b%2BY%14%C2%8D%C2%AA%C2%A4%C3%A3%3C%C3%8F%1F%00%5C%C3%AC%C3%A7w%3F%01%C2%80%15%C2%A4-%40A%C3%9A%02%14%C2%A4-%40A%C3%9A%02%14%C2%A4-%40A%C3%9A%02%14%C2%A4-%40A%C3%9A%02%14%C2%A4-%40%C3%A1%C3%AD%C2%BAo%7D%1C%C3%87%C3%BB%2F%C3%8E%C3%B3%C3%BC%C3%B8%C3%B5%C3%BB%C2%97%C2%BF%C3%BD%C3%A9%C3%A3%C2%97%1E%C3%BF%C3%84%C3%A3o%C3%BE%C3%B4%06%3F%C3%BE%C3%A6Oo%C3%A4%C3%A3%2F%C3%BAq%7F~%C2%86%C3%81%C3%A3_%7C%C3%B4%C3%B4%C2%A7%1D%1C%C3%97%7DN%C3%82q%5C%C3%B8%C3%8D%01%C2%BE%C3%8A%C3%BF%C3%83%C3%AA%C2%AB%C2%A2%C3%AC%C3%82W%12D-%C3%B0%12%C2%9A%C2%B0%C2%BA0m%C3%BFu%C2%87%03%C3%9CJ%13VZ2%C2%80%C2%82%C2%B4%05(H%5B%C2%80%C2%82%C2%96%0C%C3%98%C3%AE%C3%A5%5B2%00%3E%C3%98%24%00%C3%9B%C3%99%24%00%C3%8C!m%01%0AZ2%60%C2%BB%26%C2%AC%7C%C2%94%01%C3%80_%C3%B8T%1A%C2%80%2F%C3%96%C2%84%C2%95%C3%97m%01%0A%C3%92%16%C2%A0%20m%01%0A%5EZ%05(x%2F%19%C2%B0%C2%9D%C3%B7%C2%92%01%C3%8C!m%01%0A%C3%92%16%C2%A0%C2%A0%25%03(%C2%B8m%01%0A6%09%C3%80v6%09%00sH%5B%C2%80%C2%82%C2%96%0C%C2%A0%C3%A0%C2%B6%05(h%C3%89%C2%80%C3%AD%C2%B4d%00sH%5B%C2%80%C2%82%C2%B4%05(%C3%98%24%00%14%C2%B4d%C3%80vZ2%C2%809%C2%A4-%40A%C3%9A%02%14%C2%B4d%00%05%C2%B7-%40%C3%81%26%01%C3%98%C3%8E%26%01%60%0Ei%0BP%C3%90%C2%92%01%14%C3%9C%C2%B6%00%05-%19%C2%B0%C2%9D%C2%96%0C%60%0Ei%0BP%C2%90%C2%B6%00%05%C2%9B%04%C2%80%C2%82%C2%96%0C%C3%98NK%060%C2%87%C2%B4%05(H%5B%C2%80%C2%82%C2%96%0C%C2%A0%C2%A0%25%03%C2%B6%C3%93%C2%92%01%C3%8C!m%01%0A%C3%92%16%C2%A0%C2%A0%25%03(%C2%B8m%01%0A6%09%C3%80v6%09%00sH%5B%C2%80%C2%82%C2%96%0C%C2%A0%C3%A0%C2%B6%05(h%C3%89%C2%80%C3%AD%C2%B4d%00sH%5B%C2%80%C2%82%C2%B4%05(%C3%98%24%00%14%C2%B4d%C3%80vZ2%C2%809%C2%A4-%40A%C3%9A%02%14%C2%B4d%00%05%C2%B7-%40%C3%81%26%01%C3%98%C3%8E%26%01%60%0Ei%0BP%C3%90%C2%92%01%14%C3%9C%C2%B6%00%05-%19%C2%B0%C2%9D%C2%96%0C%60%0Ei%0BP%C2%90%C2%B6%00%05%C2%9B%04%C2%80%C2%82%C2%96%0C%C3%98NK%060%C2%87%C2%B4%05(H%5B%C2%80%C2%82%C2%96%0C%C2%A0%C3%A0%C2%B6%05(%C3%98%24%00%C3%9B%C3%99%24%00%C3%8C!m%01%0AZ2%C2%80%C2%82%C3%9B%16%C2%A0%C2%A0%25%03%C2%B6%C3%93%C2%92%01%C3%8C!m%01%0AZ2%C2%80%C2%82%C3%9B%16%C2%A0%C2%A0%25%03%C2%B6%C3%93%C2%92%01%C3%8C!m%01%0A%C3%92%16%C2%A0%60%C2%93%00P%C3%90%C2%92%01%C3%9Bi%C3%89%00%C3%A6%C2%90%C2%B6%00%05i%0BP%C3%90%C2%92%01%14%C3%9C%C2%B6%00%05%C2%9B%04%60%3B%C2%9B%04%C2%809%C2%A4-%40AK%06Pp%C3%9B%02%14%C2%B4d%C3%80vZ2%C2%809%C2%A4-%40A%C3%9A%02%14l%12%00%0AZ2%60%3B-%19%C3%80%1C%C3%92%16%C2%A0%20m%01%0AZ2%C2%80%C2%82%C3%9B%16%C2%A0%60%C2%93%00lg%C2%93%000%C2%87%C2%B4%05(h%C3%89%00%0An%5B%C2%80%C2%82%C2%96%0C%C3%98NK%060%C2%87%C2%B4%05(H%5B%C2%80%C2%82M%02%40AK%06l%C2%A7%25%03%C2%98C%C3%9A%02%14%C2%A4-%40AK%06Pp%C3%9B%02%14l%12%C2%80%C3%ADl%12%00%C3%A6%C2%90%C2%B6%00%05-%19%40%C3%81m%0BP%C3%90%C2%92%01%C3%9Bi%C3%89%00%C3%A6%C2%90%C2%B6%00%05-%19%40%C3%81m%0BP%C3%90%C2%92%01%C3%9Bi%C3%89%00%C3%A6%C2%90%C2%B6%00%05i%0BP%C2%B0I%00(h%C3%89%C2%80%C3%AD%C2%B4d%00sH%5B%C2%80%C2%82%C2%B4%05(h%C3%89%00%0An%5B%C2%80%C2%82M%02%C2%B0%C2%9DM%02%C3%80%1C%C3%92%16%C2%A0%C2%A0%25%03(%C2%B8m%01%0AZ2%60%3B-%19%C3%80%1C%C3%92%16%C2%A0%20m%01%0A6%09%00%05-%19%C2%B0%C2%9D%C2%96%0C%60%0Ei%0BP%C2%90%C2%B6%00%05-%19%40%C3%81m%0BP%C2%B0I%00%C2%B6%C2%B3I%00%C2%98C%C3%9A%02%14%C2%B4d%00%05%C2%B7-%40AK%06l%C2%A7%25%03%C2%98C%C3%9A%02%14%C2%A4-%40%C3%81%26%01%C2%A0%C2%A0%25%03%C2%B6%C3%93%C2%92%01%C3%8C!m%01%0A%C3%92%16%C2%A0%C2%A0%25%03(h%C3%89%C2%80%C3%AD%C2%B4d%00sH%5B%C2%80%C2%82%C2%B4%05(h%C3%89%00%0An%5B%C2%80%C2%82M%02%C2%B0%C2%9DM%02%C3%80%1C%C3%92%16%C2%A0%C2%A0%25%03(%C2%B8m%01%0AZ2%60%3B-%19%C3%80%1C%C3%92%16%C2%A0%20m%01%0A6%09%00%05-%19%C2%B0%C2%9D%C2%96%0C%60%0Ei%0BP%C2%90%C2%B6%00%05-%19%40%C3%81m%0BP%C2%B0I%00%C2%B6%C2%B3I%00%C2%98C%C3%9A%02%14%C2%B4d%00%05%C2%B7-%40AK%06l%C2%A7%25%03%C2%98C%C3%9A%02%14%C2%A4-%40%C3%81%26%01%C2%A0%C2%A0%25%03%C2%B6%C3%93%C2%92%01%C3%8C!m%01%0A%C3%92%16%C2%A0%C2%A0%25%03(%C2%B8m%01%0A6%09%C3%80v6%09%00sH%5B%C2%80%C2%82%C2%96%0C%C2%A0%C3%A0%C2%B6%05(h%C3%89%C2%80%C3%AD%C2%B4d%00sH%5B%C2%80%C2%82%C2%B4%05(%C3%98%24%00%14%C2%B4d%C3%80vZ2%C2%809%C2%A4-%40A%C3%9A%02%14%C2%B4d%00%05-%19%C2%B0%C2%9D%C2%96%0C%60%0Ei%0BP%C2%90%C2%B6%00%05-%19%40%C3%81m%0BP%C2%B0I%00%C2%B6%C2%B3I%00%C2%98C%C3%9A%02%14%C2%B4d%00%05%C2%B7-%40AK%06l%C2%A7%25%03%C2%98C%C3%9A%02%14%C2%A4-%40%C3%81%26%01%C2%A0%C2%A0%25%03%C2%B6%C3%93%C2%92%01%C3%8C!m%01%0A%C3%92%16%C2%A0%C2%A0%25%03(%C2%B8m%01%0A6%09%C3%80v6%09%00sH%5B%C2%80%C2%82%C2%96%0C%C2%A0%C3%A0%C2%B6%05(h%C3%89%C2%80%C3%AD%C2%B4d%00sH%5B%C2%80%C2%82%C2%B4%05(%C3%98%24%00%14%C2%B4d%C3%80vZ2%C2%809%C2%A4-%40A%C3%9A%02%14%C2%B4d%00%05%C2%B7-%40%C3%81%26%01%C3%98%C3%8E%26%01%60%0Ei%0BP%C3%90%C2%92%01%14%C3%9C%C2%B6%00%05-%19%C2%B0%C2%9D%C2%96%0C%60%0Ei%0BP%C3%90%C2%92%01%14%C3%9C%C2%B6%00%05-%19%C2%B0%C2%9D%C2%96%0C%60%0Ei%0BP%C2%90%C2%B6%00%05%C2%9B%04%C2%80%C2%82%C2%96%0C%C3%98NK%060%C2%87%C2%B4%05(H%5B%C2%80%C2%82%C2%96%0C%C2%A0%C3%A0%C2%B6%05(%C3%98%24%00%C3%9B%C3%99%24%00%C3%8C!m%01%0AZ2%C2%80%C3%82%C3%9Bw%3F%01%C2%80%3B%C3%BA%C3%97%C2%8B%C2%B9O_%C2%A8%17%C3%9E%C2%B6%C3%87%C3%A1p%06%5E%C3%80%C3%BF%C3%83%C3%AA%C2%AB%C2%A2%C3%8C%C3%AB%C2%B6%00%05i%0BP%C2%90%C2%B6%00%C2%85%0B%C3%93%C3%96%C2%8B%C2%B6%C3%80Kh%C3%82%C3%8A%7B%C3%89%C2%80%C3%AD%C2%BC%C2%97%0C%60%0Ei%0BP%C2%90%C2%B6%00%05-%19%C2%B0%C3%9D%C3%8B%C2%B7d%00%7C%C2%B0I%00%C2%B6k%C3%82%C3%AA%C3%9AO%C2%A5y%C3%BF7%C2%9C%C3%A7%C3%B9%C3%B8%C2%8Fy%3F%C3%9A%3F~%C3%A7%C2%B7%2F%3D%C3%BE%C2%89%C3%87%C3%9F%C3%BC%C3%A9%0D~%C3%BC%C3%8D%C2%9F%C3%9E%C3%88%C3%87_%C3%BA%C3%A3%1E%3D%C3%BE%C3%BE%C2%9F%C3%9F%C3%A4%09%3E8%06%C2%A0%C3%A0u%5B%C2%80%C2%82%C2%B4%05(H%5B%C2%80%C2%82%C2%B4%05(H%5B%C2%80%C3%82-%C3%B6%C2%B6%C2%96%C2%B9%C3%80%15%3E%C2%99-%3E%03%0C%60%0Ei%0BP(%C3%9EK%06%C3%B0%5D%C3%AE%C2%93B%C3%97%C2%A6%C3%AD'%C3%9F%C2%A8v%C2%9F%C3%BF%0E%60%C2%98%C3%8F%C2%A4%C2%90%C3%97m%01%C3%A6%C2%90%C2%B6%00%05%C2%9FJ%03Pp%C3%9B%02%14%C2%A4-%40A%C3%9A%02%14%C2%A4-%40A%C3%9A%02%14%C2%A4-%40A%C3%9A%02%14%C2%A4-%40A%C3%9A%02%14%C2%A4-%40%C3%A1%17j%C2%AE%C3%90c%C2%B8%C3%B3C%C2%97%00%00%00%00IEND%C2%AEB%60%C2%82"; 
	

	var res1 = "Group {orientation: 'row', margins: [10,10,10,10], \
			listaPlantas: DropDownList {title: 'Planta:', alignment: ['left','center']}, \
			poses: Group {orientation: 'row', alignment: ['center','center'],  alignChildren:'center', \
				nPosesAncho: Group {orientation: 'row', \
					s: StaticText {text: 'Poses largo:'}, \
					e: EditText {characters: 4, text:'1'}, \
				}, \
				nPosesAlto: Group {orientation: 'row', \
					s: StaticText {text: 'ancho:'}, \
					e: EditText {characters: 4, text:'1'}, \
				}, \
			}, \
			personalizado: Checkbox {text: 'Personalizado', alignment: ['right','bottom']} \
	}";



	var res2 = "Group {orientation: 'stack', \
					grupoPlanchaAlto:  Group {margins: [460,-5,0,0],    planchaAlto: StaticText {characters: 3, justify: 'right', enabled: false}} \
					grupoPlanchaAncho: Group {margins: [0,355,0,0],     planchaAncho: StaticText {characters: 3, justify: 'center', enabled: false}} \
					grupoMargen0: 	   Group {margins: [460,-348,0,0],  margen:    EditText {characters: 2, justify: 'center', enabled: false}} \
					grupoMargen2: 	   Group {margins: [460,305,0,0],   margen:    EditText {characters: 2, justify: 'center', enabled: false}} \
					grupoMargen1: 	   Group {margins: [383,375,0,0],   margen:    EditText {characters: 2, justify: 'center', enabled: false}} \
					grupoMargen3: 	   Group {margins: [-417,375,0,0],  margen:    EditText {characters: 2, justify: 'center', enabled: false}} \
					grupoSolape0: 	   Group {margins: [-610,-70,0,0],  s: 		   StaticText{text:'Solapamiento'}} \
					grupoSolape1: 	   Group {margins: [-610,-5,0,0],   s: 		   StaticText{text:'Horizontal:'}} \
					grupoSolapeH: 	   Group {margins: [-480,-5,0,0],   solape:   EditText {characters: 2, justify: 'center', enabled: true, text:'0'}} \
					grupoSolape2: 	   Group {margins: [-610,45,0,0],   s: 		   StaticText{text:'Vertical:'}} \
					grupoSolapeV: 	   Group {margins: [-480,45,0,0],   solape:   EditText {characters: 2, justify: 'center', enabled: true, text:'0'}} \
				}";

	var res3 = "Group { orientation: 'row', alignment: 'fill', alignChildren:['center','center'], margins: [0,10,0,10],\
					botonOk: Button { text:'OK', properties:{name:'ok'} }, \
					botonCancel: Button { text:'Cancel', properties:{name:'cancel'} }, \
				}";
	
		
	
	//var plano = activeDocument.selection[0];	
	//var impresionPose = activeDocument.placedItems[0];
	var tam = size(plano); 				 // tamaño del plano en pixels
	var ancho = Math.round(tam[0]/MM); 	 // ancho de plancha sin margenes en mm
	var alto = Math.round(tam[1]/MM); 	 // alto de plancha sin margenes en mm
				
	var w = new Window("dialog { text:'"+APP_NAME+"', alignChildren: 'fill'}");	
		var logo = w.add("Image", undefined, File.decode(logoImagen));		
		logo.width = 100;
		w.datosPrincipales = w.add(res1);
		w.diagrama = w.add("group {orientation: 'stack', alignChildren: 'fill'}");
			var colorFondo = w.diagrama.add("group {}");
			colorFondo.graphics.backgroundColor = colorFondo.graphics.newBrush (w.graphics.BrushType.SOLID_COLOR,[1,1,1,1]);

			w.diagrama.add ("Image", undefined, File.decode(fondoImagen));
			
			boton = w.diagrama.add ("Button",undefined,undefined);			
			w.diagrama.grupo = w.diagrama.add (res2);	
			w.diagrama.grupo.codigo = 123456;

			boton.nPosesAncho = w.datosPrincipales.poses.nPosesAncho.e;
			boton.nPosesAlto = w.datosPrincipales.poses.nPosesAlto.e;
			boton.planchaAnchoMM = ancho;
			boton.planchaAltoMM = alto;
			boton.solapeH = w.diagrama.grupo.grupoSolapeH.solape;
			boton.solapeV = w.diagrama.grupo.grupoSolapeV.solape;
			boton.onDraw = dibujar;  
			w.diagrama.imagenPoses = boton;			
			
					
			
		var grupo = w.add("group {orientation: 'column', alignChildren:'fill', margins: [10,10,10,3]}");
			var botones = grupo.add(res3);
			w.about = grupo.add("statictext", undefined, 'José Daniel Rodríguez Castro. Córdoba, España 2020');
			w.about.justify = 'right';
			w.about.graphics.foregroundColor = w.about.graphics.newPen (w.graphics.PenType.SOLID_COLOR,[.6,.6,.6],1);
			
			
	
	w.margins = 0;
	w.spacing = 0		
	w.ancho = ancho;
	w.alto = alto;
	
	var datosPrincipales = w.datosPrincipales;
	var listaPlantas = datosPrincipales.listaPlantas;
    var diagrama = w.diagrama.grupo;	
	var nPosesAncho = datosPrincipales.poses.nPosesAncho.e;
	var nPosesAlto = datosPrincipales.poses.nPosesAlto.e;
	var margen0 = diagrama.grupoMargen0.margen;
	var margen1 = diagrama.grupoMargen1.margen;
	var margen2 = diagrama.grupoMargen2.margen;
	var margen3 = diagrama.grupoMargen3.margen;
	var planchaAlto = diagrama.grupoPlanchaAlto.planchaAlto;
	var planchaAncho = diagrama.grupoPlanchaAncho.planchaAncho;
	var diagramaPoses = w.diagrama.imagenPoses;
	var solapeH = diagrama.grupoSolapeH.solape;
	var solapeV = diagrama.grupoSolapeV.solape;
	
	w.actualizarValoresPoses = function() {		
		var a = parseInt(nPosesAncho.text);
		var b = parseInt(nPosesAlto.text);
		
		posesGiradas = new Array(a*b);
		for (var i=0;i<posesGiradas.length;i++)
			posesGiradas[i] = false;

		w.actualizarValores();
	}	
		
	w.actualizarValores = function() {		
		planchaAlto.text = w.alto + parseInt(margen0.text) + parseInt(margen2.text);
		planchaAncho.text = w.ancho + parseInt(margen1.text) + parseInt(margen3.text);				
		w.diagrama.imagenPoses.notify("onDraw");		
	}
		
	w.actualizarMargenes = function() {	
		var margenes = listaPlantas.selection.planta.margenes;		
		margen0.text = margenes[0];
		margen1.text = margenes[1];
		margen2.text = margenes[2];
		margen3.text = margenes[3];		
	}
		

    logo.addEventListener("mousedown", function() {
		alert(APP_NAME+"\rRealizado por José Daniel Rodríguez Castro\rCórdoba·España·®2020");
	});	

	
    diagrama.addEventListener("mousedown", function(e) {		
		if (this != e.target) return;

		x = e.clientX;
		y = e.clientY;
		var pixelsAncho = 373;
		var pixelsAlto = 303;
		var posesAncho = parseInt(nPosesAncho.text);
		var posesAlto = parseInt(nPosesAlto.text);
		var pixelsAnchoPose = pixelsAncho / posesAncho;
		var pixelsAltoPose = pixelsAlto / posesAlto;
		
		var x0 = e.clientX-119;
		var y0 = e.clientY-41;
		
		if (x0 < 0 || y0 < 0 ||
			x0 > pixelsAncho || y0 > pixelsAlto) 
			return;
		
		var columna = Math.floor((x0-1)/pixelsAnchoPose);
		var fila = Math.floor((y0-1)/pixelsAltoPose);
		
		//alert(posesAncho+","+posesAlto+"/"+pixelsAnchoPose+","+pixelsAltoPose+"/"+x0+","+y0+"/"+columna+","+fila);
		//alert(columna+","+fila);
		
		posesGiradas[fila*posesAncho+columna] = !posesGiradas[fila*posesAncho+columna];

		w.diagrama.imagenPoses.notify("onDraw");			
	});	
			
			
			
			
			
			
			
			
		
	// rellenamos la lista de plantas
	var n=0;
	for (var nombre in PLANTAS) {
		var item = listaPlantas.add('item', nombre);
		item.planta = PLANTAS[nombre];
		PLANTAS[nombre].id = n;
		n++;
	}
	
	// seleccionamos la planta por defecto
	listaPlantas.selection = PLANTAS[PLANTA_POR_DEFECTO].id;

	// actualizamos los valores de la pose cuando cambien
	nPosesAncho.onChange = w.actualizarValoresPoses;	
	nPosesAlto.onChange =  w.actualizarValoresPoses;	
	
	margen0.onChange = w.actualizarValores;
	margen1.onChange = w.actualizarValores;
	margen2.onChange = w.actualizarValores;
	margen3.onChange = w.actualizarValores;	
	solapeH.onChange = w.actualizarValores;	
	solapeV.onChange = w.actualizarValores;	
	
	
	listaPlantas.onChange = function() {
		w.actualizarMargenes();
		w.actualizarValores();
	}
		
	datosPrincipales.personalizado.onClick = function () {
		margen0.enabled = this.value;
		margen1.enabled = this.value;
		margen2.enabled = this.value;
		margen3.enabled = this.value;

		if (this.value) {
			margen0.active = true;
		}
		else (!this.value) {
			w.actualizarMargenes();
			w.actualizarValores();
		}
	}
	
	w.actualizarMargenes();
	w.actualizarValoresPoses();		
	nPosesAncho.active = true;
	w.center();	
	
	// cuando pulsamos el boton de aceptar continuamos ejecutando el script
	if (w.show() == 1) {	
		var opciones = new Array();
		opciones.plano = plano
		var tam = size(plano);
		var ancho = tam[0]; 	 // ancho de plancha sin margenes
		var alto = tam[1]; 	 // alto de plancha sin margenes
		
		opciones.top = plano.geometricBounds[1];
		opciones.left = plano.geometricBounds[0];
		opciones.right = opciones.left+ancho; 
		opciones.bottom = opciones.top-alto; 
		opciones.nPosesAncho = parseInt(nPosesAncho.text);
		opciones.nPosesAlto =  parseInt(nPosesAlto.text);
		opciones.tamPoseAncho =   ancho / opciones.nPosesAncho; //parseInt(tamPoseAncho.text) * MM;
		opciones.tamPoseAlto =  alto / opciones.nPosesAlto; 
		opciones.impresion = impresionPose;
		opciones.margenes = [parseInt(margen0.text), parseInt(margen1.text), parseInt(margen2.text), parseInt(margen3.text)];
		opciones.planta = listaPlantas.selection.text;	
		opciones.solapeH = parseFloat(solapeH.text);
		opciones.solapeV = parseFloat(solapeV.text);
		
		activeDocument.layers[0].pathItems.rectangle(opciones.top,opciones.left,ancho,alto);
		
		crearPoses(opciones);		
	}
}

function dibujar() {
	var x0 = 120;
	var y0 = 41;
	var anchoImagen = 372; //570
	var altoImagen = 303; //350
	var nPosesAncho = parseInt(this.nPosesAncho.text);
	var nPosesAlto = parseInt(this.nPosesAlto.text);
	var poseAnchoPx = anchoImagen/nPosesAncho;
	var poseAltoPx = altoImagen/nPosesAlto;
	var poseAnchoMM = this.planchaAnchoMM/nPosesAncho;
	var poseAltoMM = this.planchaAltoMM/nPosesAlto;
	var solapeHPx = (parseFloat(this.solapeH.text)/this.planchaAnchoMM)*anchoImagen;
	var solapeVPx = (parseFloat(this.solapeV.text)/this.planchaAltoMM)*altoImagen;
	var canvas = this.graphics;
	
	for (var i=0;i<nPosesAlto;i++) {
		for (var j=0;j<nPosesAncho;j++) {
			var id = i*nPosesAncho+j;
			var letraPose = String.fromCharCode("A".charCodeAt(0)+id);
			var girado = posesGiradas[id];
			var mostrarCotas = (i+j == 0);
			dibujarPose(canvas, x0+j*poseAnchoPx, y0+i*poseAltoPx, poseAnchoPx, poseAltoPx, letraPose, poseAnchoMM, poseAltoMM, girado, mostrarCotas);
		}
	}

	// dibujar solape horizontal
	var relleno = canvas.newBrush(canvas.BrushType.SOLID_COLOR, [.8,.8,.8,.5])
	for (var i=1;i<nPosesAlto;i++) {
		canvas.newPath();
		canvas.rectPath(x0, y0+i*poseAltoPx-solapeVPx/2, anchoImagen, solapeVPx);  
		canvas.fillPath(relleno);
		canvas.closePath();			
	}

	// dibujar solape vertical
	for (var i=1;i<nPosesAncho;i++) {
		canvas.newPath();
		canvas.rectPath(x0+i*poseAnchoPx-solapeHPx/2, y0, solapeHPx, altoImagen);  
		canvas.fillPath(relleno);
		canvas.closePath();			
	}
	/*
	canvas.newPath();
	canvas.rectPath(x, y, 5, 5);  
	canvas.fillPath(relleno);
	canvas.closePath();		
  	*/
}


function dibujarPose(canvas,x,y,ancho,alto, letra, cotaAncho, cotaAlto, girado, mostrarCotas) {
  var cota = .8;
  var cotaAncho = cotaAncho.toFixed(2);
  var cotaAlto = cotaAlto.toFixed(2);
  
  if (girado) letra = String.fromCharCode(0x21b7);
  else letra = "";
  
  var font = ScriptUI.newFont( 'Arial', ScriptUI.FontStyle.BOLD, 15);
  
  if (girado) {
	  canvas.newPath();
		canvas.ellipsePath(x+ancho/2-10, y+alto/2-10, 20,20);  
		canvas.fillPath(canvas.newBrush(canvas.BrushType.SOLID_COLOR, [0.8,0.8,0.8,1]));
		var borde2 = canvas.newPen(canvas.PenType.SOLID_COLOR, [1,1,1,1], 10);
		canvas.drawString(letra,borde2,x+ancho/2-5,y+alto/2-5,font);
	  canvas.closePath();  
  }

  if (mostrarCotas) {
	  canvas.newPath();
		canvas.rectPath(x, y, ancho, alto*cota);  
		canvas.rectPath(x, y, ancho*cota, alto);  
		var borde = canvas.newPen(canvas.PenType.SOLID_COLOR, [.7,.7,.7, 1], 0.01);
		canvas.strokePath(borde);	
		canvas.drawString(cotaAncho,borde,x+ancho*(1-cota),y+alto*cota-15);
		canvas.drawString(cotaAlto,borde,x+ancho*cota-canvas.measureString(cotaAlto)[0]-8,y+alto*(1-cota));
	  canvas.closePath();
  }
	
  canvas.newPath();
	canvas.rectPath(x, y, ancho, alto);  
	var borde = canvas.newPen(canvas.PenType.SOLID_COLOR, [0.1,0.1,0.1, 1], 0.01);  
	canvas.strokePath(borde);
  canvas.closePath();
  
}


function crearPoses(opciones) {
	var plano = opciones.plano;
	var nPosesAncho = opciones.nPosesAncho;
	var nPosesAlto = opciones.nPosesAlto;
	var impresionPose = opciones.impresion;	
	
	// creamos las mascaras para cada pose
	var impresion = crearImpresiones(opciones);

	// creamos las marcas
	var marcas = crearMarcas(opciones);
	
	// creamos un texto informativo
	//var texto = crearTextoInformativo(opciones);
	
	// escalamos la mesa de trabajo	
	var mesa = activeDocument.artboards[0];
	mesa.artboardRect = medidaPlancha(opciones);	
	/*
	try { 
		var capaTroquel = activeDocument.layers.getByName("Troquel"); 
	} catch (e) {
		var capaTroquel = activeDocument.layers.add("Troquel");
		capaTroquel.name = "Troquel";
	}
*/
	try { 
		var capaImpresion = activeDocument.layers.getByName("AW");
	} catch (e) {
		var capaImpresion = activeDocument.layers.add();
		capaImpresion.name = "AW";
	}
	
		/*
	// movemos el plano a su capa
	plano.move(capaTroquel, ElementPlacement.PLACEATEND);	
	
	// la capa de plano no se debe imprimir
	capaTroquel.printable = false;
	*/	
	// movemos el diseño a su capa
	if (marcas != undefined) marcas.move(capaImpresion, ElementPlacement.PLACEATEND);
	impresion.move(capaImpresion, ElementPlacement.PLACEATEND);
	
	impresionPose.remove();
	
}






function size(obj) {
	var limite = obj.geometricBounds;
	ancho = limite[2]-limite[0];
	alto  = limite[1]-limite[3];
	
	return [ancho,alto];
}


function crearImpresiones(opciones) {
	var top = opciones.top;
	var left = opciones.left;
	var nPosesAncho = opciones.nPosesAncho;
	var nPosesAlto = opciones.nPosesAlto;
	var tamPoseAncho = opciones.tamPoseAncho;
	var tamPoseAlto = opciones.tamPoseAlto;
	var impresion = opciones.impresion;
	var margenes = opciones.margenes;
	var solapeH = opciones.solapeH*MM;
	var solapeV = opciones.solapeV*MM;	
	
	if (nPosesAlto<2) solapeV = 0;
	if (nPosesAncho<2) solapeH = 0;
	
	activeDocument.layers[0].pathItems.rectangle(
		top+margenes[0]*MM,
		left-margenes[3]*MM,
		ancho+margenes[1]*MM+margenes[3]*MM,
		alto+margenes[0]*MM+margenes[2]*MM
		);

	
	var grupoPoses = activeDocument.groupItems.add();
	
		
	for (i=0;i<nPosesAlto;i++)
		for (j=0;j<nPosesAncho;j++) {
			marginTop = 0;
			marginLeft = 0;
			marginRight = 0;
			marginBottom = 0;
			solapeTop = (solapeV/nPosesAlto)*i;
			solapeLeft = (solapeH/nPosesAncho)*j;
			solapeBottom = (solapeV/nPosesAlto)*(nPosesAlto-1-i);
			solapeRight = (solapeH/nPosesAncho)*(nPosesAncho-1-j);
			
			// primera fila de poses
			if (i == 0) {
				marginTop = margenes[0]*MM;
				solapeTop = 0;
			}
			
			// ultima fila de poses
			if (i == nPosesAlto-1) {
				marginBottom = margenes[2]*MM;
				solapeBottom = 0;
			}
			
			// primera columna de poses
			if (j == 0) {
				marginLeft = margenes[3]*MM;
				solapeLeft = 0;
			}
			
			// ultima columna de poses
			if (j == nPosesAncho-1) {
				marginRight = margenes[1]*MM;
				solapeRight = 0;
			}

						
			// creamos la mascara
			var mTop = top - i*tamPoseAlto + marginTop + solapeTop;
			var mLeft = left + j*tamPoseAncho - marginLeft - solapeLeft;
			var mWidth = tamPoseAncho + marginLeft + marginRight + solapeLeft + solapeRight;
			var mHeight = tamPoseAlto + marginTop + marginBottom + solapeTop + solapeBottom;
			mascara = activeDocument.pathItems.rectangle(mTop, mLeft, mWidth, mHeight);
			mascara.filled = true;
			mascara.fillColor = colorAleatorio();
			
			
			mascara.clipping = true;
			
			// creamos la copia de la impresion
			var grupo = activeDocument.groupItems.add();
			
			copia = impresion.duplicate(grupo, ElementPlacement.PLACEATEND);
			copia.left = mascara.left - (impresion.width - mWidth)/2 + marginLeft/2 - marginRight/2;
			copia.top = mascara.top + (impresion.height - mHeight)/2 - marginTop/2 + marginBottom/2;
			
			//rotamos la impresion si esta seleccionada
			if (posesGiradas[i*nPosesAncho+j])
				copia.rotate(180);
			
			// aplicamos a la impresion la mascara de recorte
			mascara.clipping = true;
			mascara.moveToBeginning(grupo);	
			grupo.clipped = true;
			
			grupo.move(grupoPoses, ElementPlacement.PLACEATEND);
		
		}	
				
	return grupoPoses;
}


function colorAleatorio() {
	color = new RGBColor();
	color.red = Math.random()*255;
	color.green = Math.random()*255;
	color.blue = Math.random()*255;
	
	return color;
}


function crearMarcas(opciones) {
	var sufijos = ["_TL","_TR","_BL","_BR","_IN"];
	var top = opciones.top + opciones.margenes[0] * MM;
	var right = opciones.right + opciones.margenes[1] * MM;
	var bottom = opciones.bottom - opciones.margenes[2] * MM;
	var left = opciones.left - opciones.margenes[3] * MM;
	var planta = opciones.planta;
	
	/*
	// Si la planta es Canovelles hay que cargar los simbolos desde un archivo
	if (planta == "Canovelles") {
		var documentoAbierto = activeDocument;
		var ruta = PLANTAS[opciones.planta].archivoSimbolos;
		
		try {
			var archivoSimbolos = app.open(new File(ruta));
		} catch (e) {
			alert("No se ha podido abrir el archivo de símbolos en la ruta "+ruta);
		} finally {			
			for (var i=0;i<sufijos.length;i++){
				try {
					var simbolo = archivoSimbolos.symbols.getByName(planta+sufijos[i]);
				} catch(e) {
					marcas.push(false);
					continue;
					}			
				
				var symbolItem = archivoSimbolos.symbolItems.add(simbolo);
				var simbolo = symbolItem.duplicate( documentoAbierto, ElementPlacement.PLACEATEND );
				simbolo.remove();			
			}
			
			archivoSimbolos.close(SaveOptions.DONOTSAVECHANGES);
			activeDocument = documentoAbierto;
		}
	}
	*/
	

	var grupoMarcas = activeDocument.groupItems.add();
	var marcas = new Array();
	
	for (var i=0;i<sufijos.length;i++){
		try {
			var simbolo = activeDocument.symbols.getByName(planta+sufijos[i]);
		} catch(e) {
		    marcas.push(false);
			continue;
			}			
		var marca = activeDocument.symbolItems.add(simbolo);		
		marcas.push(marca);		
	}

	var posiciones = [[top, left],
					  [top, right-marcas[1].width],
					  [bottom+marcas[2].height, left],
					  [bottom+marcas[3].height, right-marcas[3].width],
					  [bottom+marcas[4].height, left+(right-left)/2-marcas[4].width/2]];

	for (var i=0;i<marcas.length;i++) {
		if (marcas[i] == false) continue;			
		if (marcas[i] == false) continue;			
		marcas[i].top = posiciones[i][0];	
		marcas[i].left = posiciones[i][1];
		marcas[i].move(grupoMarcas, ElementPlacement.PLACEATEND);
		
	}
	
	return grupoMarcas;
}

	
function medidaPlancha(opciones) {
    var plancha = [];

    plancha[0] = opciones.left - opciones.margenes[3] * MM;
    plancha[1] = opciones.top + opciones.margenes[0] * MM;
    plancha[2] = opciones.right + opciones.margenes[1] * MM;
    plancha[3] = opciones.bottom - opciones.margenes[2] * MM;

    return plancha;
}

function crearTextoInformativo(opciones) {
	var cadena = "Impresion:" + opciones.impresion.file + " Poses:" +opciones.nPosesAncho+"x"+opciones.nPosesAlto+" ("+fechaActual()+" - "+APP_NAME+")";

	var texto = activeDocument.textFrames.add();
	texto.contents = cadena;
	texto.textRange.characterAttributes.size = 5*MM;
	texto.top = opciones.top + (opciones.margenes[0] - 2) * MM;
	texto.left = opciones.left - (opciones.margenes[3] - 25 )* MM;
	
	return texto;
}

function fechaActual() {
  var Today = new Date();
  var Day = Today.getDate();
  var Month = Today.getMonth() + 1;
  var Year = Today.getYear();
  if(Year < 999) Year += 1900;
  
  return (Day + "/"+Month+"/"+Year);
}		

function hexToArray(hexString, alpha) {
  if (alpha == undefined) alpha = 1;
  var hexColor = hexString.replace('#', '');
  var r = parseInt(hexColor.slice(0, 2), 16) / 255;
  var g = parseInt(hexColor.slice(2, 4), 16) / 255;
  var b = parseInt(hexColor.slice(4, 6), 16) / 255;
  return [r, g, b, alpha];
}


function mostrarDatos(obj) {
		var texto = "";
		for(var key in obj) {
			texto += key+"="+obj[key]+"\r";
			//if (obj[key] instanceof Object)
				//mostrarDatos(obj[key]);
		}
		alert(texto);
}


