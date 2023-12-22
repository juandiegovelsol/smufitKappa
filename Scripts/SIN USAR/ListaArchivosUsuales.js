//	var fileRef = new File("O:/90.RecursosDpt/Plantillas/GCMI_COLORS.ai");
//	var docRef = open(fileRef);

var enlaces = [["GCMI",	"P:/90.RecursosDpt/Plantillas/GCMI_COLORS.ai"],
["LOGOS",	"P:/90.RecursosDpt/Plantillas/LOGOS.ai"],
["Marcas Plotter",	"P:/90.RecursosDpt/Plantillas/MakeCropMarksAI.jsx"],
["ACOTAR",	"P:/90.RecursosDpt/Plantillas/Acotar.js"],
["RELLENAR",	"P:/90.RecursosDpt/Plantillas/fillinger.jsx"],
["FSC",	"P:/90.RecursosDpt/Plantillas/FSC.oft"]];//es una matriz que define nombre y ruta. Dentro de cada posición tiene 2 elementos.


/* Este código crea una nueva ventana (window) en Adobe Illustrator con un estilo de diálogo (dialog) y un título de "Enlaces". La ventana se asigna a la variable w para que pueda ser referenciada más adelante en el código.
El primer parámetro en la función new Window() especifica el tipo de ventana. En este caso, "dialog" se utiliza para crear una ventana que se comporta como un diálogo modal. Esto significa que la ventana aparecerá en la parte superior de otras ventanas abiertas en Illustrator y bloqueará la interacción con esas ventanas hasta que se cierre el diálogo.
El segundo parámetro en la función new Window() especifica el título de la ventana.
El tercer parámetro, que en este caso se establece en undefined, se utiliza para especificar el área de visualización de la ventana. Si se omite, la ventana se colocará en el centro de la pantalla. 
En resumen, este código crea una ventana de diálogo básica en Illustrator que puede ser utilizada para mostrar información al usuario o para recopilar datos a través de formularios. */
var w = new Window ('dialog', "Acciones rápidas", undefined); //tipo de ventana, título y posición

var buttons = w.add('group');
//Los grupos se utilizan comúnmente en Adobe Illustrator para agrupar elementos relacionados, como botones o campos de entrada de texto. En este caso, es probable que los botones se agreguen al grupo buttons para que puedan ser organizados juntos en la ventana.

//para añadir todos los botones por cada enlace que haya arriba definido. Haces un bucle que vaya pasando por todas las rutas
for (var i=0; i<enlaces.length; i++) {
boton = buttons.add ('button', undefined, enlaces[i][0],{name:enlaces[i][1]});
//te coge el primer elemento y le pone el nombre del primer elemento y después coge la ruta
/* Este código crea un nuevo botón (button) dentro del grupo buttons que se creó anteriormente. El botón se asigna a la variable boton para que pueda ser referenciado más adelante en el código.
El método add() se utiliza para agregar un nuevo elemento a un grupo. En este caso, add('button') se utiliza para crear un nuevo botón dentro del grupo buttons.
El segundo parámetro en la función add() especifica el título que se mostrará en el botón. En este caso, se utiliza enlaces[i][0] como título, lo que sugiere que el título del botón se está extrayendo de un array llamado enlaces en la posición i, índice que probablemente se esté utilizando en un bucle para crear varios botones.
El tercer parámetro en la función add() se establece en undefined. Este parámetro se utiliza para especificar un nombre de identificación para el botón, que se puede utilizar para referirse al botón en el código. En este caso, no se proporciona un nombre, por lo que el botón no se puede referir por su nombre.
El cuarto parámetro en la función add() es un objeto que se utiliza para especificar cualquier propiedad adicional que deba establecerse en el botón. En este caso, se establece la propiedad name en enlaces[i][1], lo que sugiere que se está utilizando un array llamado enlaces para almacenar tanto los títulos de los botones como las URLs correspondientes. La propiedad name se puede utilizar para almacenar la URL correspondiente al botón.
En resumen, este código crea un nuevo botón dentro del grupo buttons que se puede utilizar para redirigir al usuario a una URL específica. El título del botón y la URL a la que se redirige se pueden especificar utilizando los arrays enlaces[i][0] y enlaces[i][1], respectivamente.
 */
boton.onClick = function () { //este código establece una función de devolución de llamada que se ejecutará cuando el usuario haga clic en el botón boton. La función de devolución de llamada se asigna al evento onClick del botón y se utiliza para especificar la acción que se realizará cuando se haga clic en el botón.
var fileRef = new File(this.properties.name);
fileRef.execute(); 
//var docRef = open(fileRef);
this.parent.parent.close();
};
}
/* Este código de JavaScript tiene como objetivo abrir un archivo de Illustrator (o cualquier otro archivo que esté asociado con la aplicación predeterminada en el sistema operativo) y cerrar la ventana que contiene el botón que activó el código
	Aquí se están realizando los siguientes pasos:
	Se crea un nuevo objeto File con el nombre del archivo a abrir. La propiedad this.properties.name se utiliza para obtener el nombre del archivo.
	Se llama al método execute() en el objeto fileRef, que abre el archivo en la aplicación predeterminada.
	Se cierra la ventana que contiene el botón que activó el código. La propiedad parent se utiliza para acceder al objeto padre del botón, que es el grupo de botones al que pertenece el botón. La propiedad parent se utiliza nuevamente para acceder al objeto padre del grupo de botones, que es la ventana que contiene el grupo de botones. Finalmente, se llama al método close() en la ventana para cerrarla.
	En resumen, este código de JavaScript se utiliza para abrir un archivo en la aplicación predeterminada y cerrar la ventana que contiene el botón que activó el código.
 */
w.show ();		

/* El método show() se utiliza para mostrar una ventana o cuadro de diálogo en JavaScript. En el contexto de Adobe Illustrator, w es una variable que representa una ventana o cuadro de diálogo que se ha creado previamente mediante la función new Window().
	Cuando se llama al método show() en una ventana o cuadro de diálogo, se muestra la ventana en la pantalla. En este caso, el código w.show() muestra la ventana w que se ha creado previamente.
	Es importante tener en cuenta que, después de llamar al método show(), el código no se detendrá en ese punto y seguirá ejecutándose. La ventana o cuadro de diálogo se mostrará en la pantalla, pero el código continuará ejecutándose.
	Si se desea que el código espere a que el usuario interactúe con la ventana antes de continuar, se pueden utilizar métodos como alert() o confirm(), o se pueden utilizar funciones de devolución de llamada (callbacks) para capturar la interacción del usuario.
	*/