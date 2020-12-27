const descripcion = {
    demandOption: true,
    alias: 'd'
};

const completado = {
    alias: 'c',
    default: true
};

const argv = require('yargs')
    .command('crear', 'Crear un elemento por hacer', {
        descripcion
    })
    .command('actualizar', 'Actualiza el estado completado de una tarea', {
        descripcion,
        completado
    })
    .command('borrar', 'Se borra el registro del archivo data.json', {
        descripcion
    }).help().argv;

module.exports = {
    argv
}