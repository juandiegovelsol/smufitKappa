//	var fileRef = new File("O:/90.RecursosDpt/Plantillas/GCMI_COLORS.ai");
//	var docRef = open(fileRef);

var fileRef = new File("P:/90.RecursosDpt/00.Illustrator/Scripts/VALIDACIÓN FSC.oft");
fileRef.execute(); 
//var docRef = open(fileRef);
//this.parent.parent.close();
/* Este código de JavaScript tiene como objetivo abrir un archivo de Illustrator (o cualquier otro archivo que esté asociado con la aplicación predeterminada en el sistema operativo) y cerrar la ventana que contiene el botón que activó el código
	Aquí se están realizando los siguientes pasos:
	Se crea un nuevo objeto File con el nombre del archivo a abrir. La propiedad this.properties.name se utiliza para obtener el nombre del archivo.
	Se llama al método execute() en el objeto fileRef, que abre el archivo en la aplicación predeterminada.
	Se cierra la ventana que contiene el botón que activó el código. La propiedad parent se utiliza para acceder al objeto padre del botón, que es el grupo de botones al que pertenece el botón. La propiedad parent se utiliza nuevamente para acceder al objeto padre del grupo de botones, que es la ventana que contiene el grupo de botones. Finalmente, se llama al método close() en la ventana para cerrarla.
	En resumen, este código de JavaScript se utiliza para abrir un archivo en la aplicación predeterminada y cerrar la ventana que contiene el botón que activó el código.
 */
//w.show ();		

/* El método show() se utiliza para mostrar una ventana o cuadro de diálogo en JavaScript. En el contexto de Adobe Illustrator, w es una variable que representa una ventana o cuadro de diálogo que se ha creado previamente mediante la función new Window().
	Cuando se llama al método show() en una ventana o cuadro de diálogo, se muestra la ventana en la pantalla. En este caso, el código w.show() muestra la ventana w que se ha creado previamente.
	Es importante tener en cuenta que, después de llamar al método show(), el código no se detendrá en ese punto y seguirá ejecutándose. La ventana o cuadro de diálogo se mostrará en la pantalla, pero el código continuará ejecutándose.
	Si se desea que el código espere a que el usuario interactúe con la ventana antes de continuar, se pueden utilizar métodos como alert() o confirm(), o se pueden utilizar funciones de devolución de llamada (callbacks) para capturar la interacción del usuario.
	*/