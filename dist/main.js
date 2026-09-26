"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const readline = __importStar(require("readline"));
// =====================================================
// DATOS DEL PROGRAMA
// =====================================================
const tareas = [];
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
// =====================================================
// FUNCIONES DE ABSTRACCIÓN
// =====================================================
function crearTarea(titulo, descripcion = "", vencimiento = null, dificultad = 1) {
    return {
        titulo: titulo.substring(0, 100),
        descripcion: descripcion.substring(0, 500),
        estado: "Pendiente",
        creacion: new Date(),
        ultimaEdicion: new Date(),
        vencimiento: vencimiento ? new Date(vencimiento) : null,
        dificultad: dificultad
    };
}
function cambiarEstado(tarea, nuevoEstado) {
    const estadosValidos = [
        "Pendiente",
        "En Curso",
        "Terminada",
        "Cancelada"
    ];
    if (estadosValidos.includes(nuevoEstado)) {
        tarea.estado = nuevoEstado;
        tarea.ultimaEdicion = new Date();
    }
    else {
        console.log("Estado inválido.");
    }
}
function mostrarDetalle(tarea) {
    const dificultadMap = {
        1: "⭐ Fácil",
        2: "⭐⭐ Medio",
        3: "⭐⭐⭐ Difícil"
    };
    console.log(`
    -------------------------
    Título: ${tarea.titulo}
    Descripción: ${tarea.descripcion || "(sin descripción)"}
    Estado: ${tarea.estado}
    Creación: ${tarea.creacion.toLocaleString()}
    Última edición: ${tarea.ultimaEdicion.toLocaleString()}
    Vencimiento: ${tarea.vencimiento
        ? tarea.vencimiento.toLocaleString()
        : "(sin vencimiento)"}
    Dificultad: ${dificultadMap[tarea.dificultad]}
    -------------------------
    `);
}
// =====================================================
// OPERACIONES SOBRE LAS TAREAS
// =====================================================
function listarTareas() {
    if (tareas.length === 0) {
        console.log("No hay tareas registradas.");
    }
    else {
        tareas.forEach((tarea, indice) => {
            console.log(`[${indice + 1}] ${tarea.titulo} - ${tarea.estado}`);
        });
    }
    menuPrincipal();
}
function buscarTarea() {
    rl.question("Ingrese texto a buscar en títulos: ", (texto) => {
        const resultados = tareas.filter((tarea) => tarea.titulo
            .toLowerCase()
            .includes(texto.toLowerCase()));
        if (resultados.length > 0) {
            resultados.forEach((tarea) => {
                mostrarDetalle(tarea);
            });
        }
        else {
            console.log("No se encontraron tareas con ese título.");
        }
        menuPrincipal();
    });
}
function agregarTarea() {
    rl.question("Título: ", (titulo) => {
        rl.question("Descripción (opcional): ", (descripcion) => {
            rl.question("Vencimiento (YYYY-MM-DD opcional): ", (vencimiento) => {
                rl.question("Dificultad [1=fácil, 2=medio, 3=difícil]: ", (dif) => {
                    const dificultad = parseInt(dif) || 1;
                    const tarea = crearTarea(titulo, descripcion, vencimiento || null, dificultad);
                    tareas.push(tarea);
                    console.log("¡Tarea agregada con éxito!");
                    mostrarDetalle(tarea);
                    menuPrincipal();
                });
            });
        });
    });
}
// =====================================================
// MENÚ PRINCIPAL
// =====================================================
function menuPrincipal() {
    console.log(`
    === MENU PRINCIPAL ===
    [1] Ver mis tareas
    [2] Buscar una tarea
    [3] Agregar una tarea
    [0] Salir
    `);
    rl.question("Seleccione una opción: ", (opcion) => {
        switch (opcion) {
            case "1":
                listarTareas();
                break;
            case "2":
                buscarTarea();
                break;
            case "3":
                agregarTarea();
                break;
            case "0":
                console.log("Gracias por usar la agenda. ¡Hasta pronto!");
                rl.close();
                break;
            default:
                console.log("[!] Opción no disponible. Intente de nuevo.");
                menuPrincipal();
        }
    });
}
// =====================================================
// INICIO DEL PROGRAMA
// =====================================================
menuPrincipal();
//# sourceMappingURL=main.js.map