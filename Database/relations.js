const Usuarios = require('../models/Usuarios.js');
const Grupos = require('../models/Grupos.js');
const Clases = require('../models/Clases.js');
const GruposUsuarios = require('../models/GruposUsuarios.js');
const Entregas = require('../models/Entregas.js');
const Tareas = require('../models/Tareas.js');

// Relación Clases - Usuarios (Profesor) (1:N)
Usuarios.hasMany(Clases, { foreignKey: 'id_profesor' });
Clases.belongsTo(Usuarios, { foreignKey: 'id_profesor' });

// Relación Clases -> Grupos (1:N)
Clases.hasMany(Grupos, { foreignKey: 'id_clase' });
Grupos.belongsTo(Clases, { foreignKey: 'id_clase' });

// Relación Grupos -> Usuarios (N:M)
Grupos.belongsToMany(Usuarios, { through: 'GruposUsuarios', foreignKey: 'id_grupo' });
Usuarios.belongsToMany(Grupos, { through: 'GruposUsuarios', foreignKey: 'id_usuario' });


// Relación Grupos -> Usuarios (N:M) con alias explícito
// Grupos.belongsToMany(Usuarios, { through: 'GruposUsuarios', foreignKey: 'id_grupo', as: 'Usuarios' });
// Usuarios.belongsToMany(Grupos, { through: 'GruposUsuarios', foreignKey: 'id_usuario', as: 'Grupos' });

// Relación Grupos -> Tareas (1:N)
Grupos.hasMany(Tareas, { foreignKey: 'id_grupo' });
Tareas.belongsTo(Grupos, { foreignKey: 'id_grupo' });

// Relación Usuarios (Alumno) -> Entregas (1:N)
Usuarios.hasMany(Entregas, { foreignKey: 'id_alumno' });
Entregas.belongsTo(Usuarios, { foreignKey: 'id_alumno' });

// Relación Tareas -> Entregas (1:N)
Tareas.hasMany(Entregas, { foreignKey: 'id_tarea' });
Entregas.belongsTo(Tareas, { foreignKey: 'id_tarea' });


module.exports = {
    Usuarios,
    Tareas,
    Grupos,
    Clases,
    GruposUsuarios,
    Entregas
};

// const Usuarios = require('../models/Usuarios.js');
// const Grupos = require('../models/Grupos.js');
// const Clases = require('../models/Clases.js');
// const GruposUsuarios = require('../models/GruposUsuarios.js');
// const Entregas = require('../models/Entregas.js');
// const Tareas = require('../models/Tareas.js');

// // Relación Clases - Usuarios (Profesor) (1:N)
// Usuarios.hasMany(Clases, { foreignKey: 'id_profesor' });
// Clases.belongsTo(Usuarios, { foreignKey: 'id_profesor' });

// // Relación Clases -> Grupos (1:N)
// Clases.hasMany(Grupos, { foreignKey: 'id_clase' });
// Grupos.belongsTo(Clases, { foreignKey: 'id_clase' });

// // Relación Grupos -> Usuarios (N:M) con alias explícito
// Grupos.belongsToMany(Usuarios, { through: 'GruposUsuarios', foreignKey: 'id_grupo', as: 'Usuarios' });
// Usuarios.belongsToMany(Grupos, { through: 'GruposUsuarios', foreignKey: 'id_usuario', as: 'Grupos' });

// // Relación Grupos -> Tareas (1:N)
// Grupos.hasMany(Tareas, { foreignKey: 'id_grupo' });
// Tareas.belongsTo(Grupos, { foreignKey: 'id_grupo' });

// // Relación Usuarios (Alumno) -> Entregas (1:N)
// Usuarios.hasMany(Entregas, { foreignKey: 'id_alumno' });
// Entregas.belongsTo(Usuarios, { foreignKey: 'id_alumno' });

// // Relación Tareas -> Entregas (1:N)
// Tareas.hasMany(Entregas, { foreignKey: 'id_tarea' });
// Entregas.belongsTo(Tareas, { foreignKey: 'id_tarea' });

// module.exports = {
//     Usuarios,
//     Tareas,
//     Grupos,
//     Clases,
//     GruposUsuarios,
//     Entregas
// };
