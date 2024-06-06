const moment = require('moment-timezone');

const jsonUsuarios = [
    { Usuario: "AlvarO", Pais: "Argentina", Ciudad: "Buenos Aires", horas_vistas: "14:30:00", ultima_conexion: "12:05:2022 - 12:15:2022" },
    { Usuario: "Nahuel", Pais: "Brasil", Ciudad: "Sao Paulo", horas_vistas: "20:45:00", ultima_conexion: "12:10:2022 - 12:20:2022" },
    { Usuario: "ivan", Pais: "España", Ciudad: "Madrid", horas_vistas: "167", ultima_conexion: "12:15:2022 - 12:25:2022" },
    { Usuario: "DAmian", Pais: "Estados Unidos", Ciudad: "Nueva York", horas_vistas: "2300", ultima_conexion: "12:20:2022 - 12:30:2022" },
    { Usuario: "Belen", Pais: "Francia", Ciudad: "París", horas_vistas: "299", ultima_conexion: "12:25:2022 - 12:35:2022" }
];

const filtroNombre = (json) =>{
    return json.map(usuario =>{
        const primera_letra = usuario.Usuario.charAt(0).toUpperCase();
        const sgts_letras = usuario.Usuario.slice(1).toLowerCase();
       usuario.Usuario = primera_letra+sgts_letras;
       return usuario;
    });
};

const filtroHora = (json) => {
    return json.map(usuario => {
        if (usuario.horas_vistas.includes(':')) {
            return usuario; 
        }

        const minutos = parseInt(usuario.horas_vistas);
        const horas = Math.floor(minutos / 60); 
        const minutosRestantes = minutos % 60; 
        const segundos = 0; //no estamos manejando segundos en este caso

        usuario.horas_vistas = `${horas}:${minutosRestantes.toString().padStart(2, '0')}:${segundos.toString().padStart(2, '0')}`;
        return usuario;
    });
};



const filtroMayusculas = (json) =>{
    return json.map (usuario =>{
        usuario.Pais = usuario.Pais.toUpperCase();
        usuario.Ciudad = usuario.Ciudad.toUpperCase();
        return usuario;
    });
} ;

const filtroFecha = (json) => {
    return json.map(usuario =>{
        usuario.ultima_conexion = moment(usuario.ultima_conexion, 'hh:mm:ss - MM:DD:YYYY').format('MM:DD:YYYY')
    return usuario;
    });
};
const aplicarTuberia = (json) =>{
    return filtroHora(filtroMayusculas(filtroNombre(filtroFecha(json))));
};
const jsonFiltrado = aplicarTuberia(jsonUsuarios);
console.log(jsonFiltrado);
