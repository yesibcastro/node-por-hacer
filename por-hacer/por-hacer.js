//Archivo que realiza persitencia sobre los parametros enviados por consola 
const fs = require('fs');
const colors = require('colors');

let listadoPorHacer = [];

//Funcion que guarda informacion en formato JSON en el archivo data.json
const guardarDB = () => {
    let data = JSON.stringify(listadoPorHacer);

    fs.writeFile('db/data.json', data, (err) => {
        if (err) throw new Error('No se pudo grabar');
    });
}

//Funcion que que carga la informacion que se encuentra dentro del archivo data.json
const cargarDB = () => {
        try {
            listadoPorHacer = require('../db/data.json');
        } catch (error) {
            listadoPorHacer = [];
        }
    }
    //Funcion que crea informacion para almacenar en el archivo data.json
const crear = (descripcion) => {

    cargarDB();
    let porHacer = {
        descripcion,
        completado: false
    }

    listadoPorHacer.push(porHacer);
    guardarDB();

    return porHacer;
}

const getListado = () => {
    cargarDB();
    return listadoPorHacer;
}

//Funcion que se encarga de actualizar la variable de completado del archivo data.json
const actualizar = (descripcion, completado = true) => {
    cargarDB();
    let index = listadoPorHacer.findIndex(tarea => tarea.descripcion === descripcion);

    if (index >= 0) {
        listadoPorHacer[index].completado = completado;
        guardarDB();
        return true;
    } else {
        return false;
    }
}

//Funcion que permite borrar un registro del archivo data.json
const borrar = (descripcion) => {
    cargarDB();
    let nuevoListado = listadoPorHacer.filter(tarea => tarea.descripcion !== descripcion);

    if (listadoPorHacer.length === nuevoListado.length) {
        return false;
    } else {
        listadoPorHacer = nuevoListado;
        guardarDB();
        return true;
    }
}
module.exports = {
    crear,
    getListado,
    actualizar,
    borrar
}