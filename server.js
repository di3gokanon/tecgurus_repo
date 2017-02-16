//Se importa el framework de express.
const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
//Permite registrar los archivos hbs como pantallas templates.
app.set('view engine', 'hbs');
//dirname contiene el directorio raiz del proyecto
//app.use(express.static(__dirname + '/public')); cuando la página está en mantemiento, esta linea se cambia abajo.

app.use((request, response, next) => {
	var now = new Date().toString();
	var log = `${now}: ${request.method} ${request.url}`;
	
	console.log(log);
	
	fs.appendFile('server.log', log + '\n', (err) => {
		if(err) {
			console.log('No se puede agregar el mensaje en el log.');
		}
	})

	next();
});

/*
//Middleware de mantenimiento
app.use((request, response, next) => {
	response.render('maintenance.hbs');
});
*/

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
	return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
	return text.toUpperCase();
}),

//Se genera una funcion por peticion get para mostrar el saludo de Express
app.get('/', (request, response) => {
	response.render('home.hbs', {
		pageTitle: 'Home',
		welcomeMessage: 'Bienvenido a mi sitio web de TecGurus',
	});
});

app.get('/about', (request, response) => {
	response.render('about.hbs', {
		pageTitle: 'Acerca de la Página',
	});
});

app.get('/projects', (request, response) => {
	response.render('projects.hbs', {
		pageTitle: 'Proyectos',
	});
});

// /bad - enviar en formato json con un mensaje de error.

app.get('/bad', (request, response) => {
	response.send({
		errorMessage: 'No se encuentra el manipulador de eventos.'
	});
});


//Se indica en que puerto se levantará el servidor
app.listen(port, () => {
	console.log(`El servidor está corriendo en el puerto ${port}`);
});

