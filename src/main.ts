import * as readline from "readline";

// =====================================================
// TIPOS Y ABSTRACCIONES
// =====================================================

type Estado = "Pendiente" | "En Curso" | "Terminada" | "Cancelada";

interface Tarea {
    titulo: string;
    descripcion: string;
    estado: Estado;
    creacion: Date;
    ultimaEdicion: Date;
    vencimiento: Date | null;
    dificultad: number;
}

// =====================================================
// DATOS DEL PROGRAMA
// =====================================================

const tareas: Tarea[] = [];

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// =====================================================
// FUNCIONES DE ABSTRACCIÓN
// =====================================================

function crearTarea(
    titulo: string,
    descripcion: string = "",
    vencimiento: string | null = null,
    dificultad: number = 1
): Tarea {

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

function cambiarEstado(tarea: Tarea, nuevoEstado: string): void {

    const estadosValidos: Estado[] = [
        "Pendiente",
        "En Curso",
        "Terminada",
        "Cancelada"
    ];

    if (estadosValidos.includes(nuevoEstado as Estado)) {
        tarea.estado = nuevoEstado as Estado;
        tarea.ultimaEdicion = new Date();
    } else {
        console.log("Estado inválido.");
    }
}

function mostrarDetalle(tarea: Tarea): void {

    const dificultadMap: Record<number, string> = {
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
    Vencimiento: ${
        tarea.vencimiento
            ? tarea.vencimiento.toLocaleString()
            : "(sin vencimiento)"
    }
    Dificultad: ${dificultadMap[tarea.dificultad]}
    -------------------------
    `);
}

// =====================================================
// OPERACIONES SOBRE LAS TAREAS
// =====================================================

function listarTareas(): void {

    if (tareas.length === 0) {
        console.log("No hay tareas registradas.");
    } else {

        tareas.forEach((tarea, indice) => {
            console.log(
                `[${indice + 1}] ${tarea.titulo} - ${tarea.estado}`
            );
        });
    }

    menuPrincipal();
}

function buscarTarea(): void {

    rl.question(
        "Ingrese texto a buscar en títulos: ",
        (texto: string) => {

            const resultados: Tarea[] = tareas.filter(
                (tarea: Tarea) =>
                    tarea.titulo
                        .toLowerCase()
                        .includes(texto.toLowerCase())
            );

            if (resultados.length > 0) {

                resultados.forEach((tarea: Tarea) => {
                    mostrarDetalle(tarea);
                });

            } else {
                console.log(
                    "No se encontraron tareas con ese título."
                );
            }

            menuPrincipal();
        }
    );
}

function agregarTarea(): void {

    rl.question("Título: ", (titulo: string) => {

        rl.question(
            "Descripción (opcional): ",
            (descripcion: string) => {

                rl.question(
                    "Vencimiento (YYYY-MM-DD opcional): ",
                    (vencimiento: string) => {

                        rl.question(
                            "Dificultad [1=fácil, 2=medio, 3=difícil]: ",
                            (dif: string) => {

                                const dificultad: number =
                                    parseInt(dif) || 1;

                                const tarea: Tarea = crearTarea(
                                    titulo,
                                    descripcion,
                                    vencimiento || null,
                                    dificultad
                                );

                                tareas.push(tarea);

                                console.log(
                                    "¡Tarea agregada con éxito!"
                                );

                                mostrarDetalle(tarea);

                                menuPrincipal();
                            }
                        );
                    }
                );
            }
        );
    });
}

// =====================================================
// MENÚ PRINCIPAL
// =====================================================

function menuPrincipal(): void {

    console.log(`
    === MENU PRINCIPAL ===
    [1] Ver mis tareas
    [2] Buscar una tarea
    [3] Agregar una tarea
    [0] Salir
    `);

    rl.question(
        "Seleccione una opción: ",
        (opcion: string) => {

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
                    console.log(
                        "Gracias por usar la agenda. ¡Hasta pronto!"
                    );
                    rl.close();
                    break;

                default:
                    console.log(
                        "[!] Opción no disponible. Intente de nuevo."
                    );
                    menuPrincipal();
            }
        }
    );
}

// =====================================================
// INICIO DEL PROGRAMA
// =====================================================

menuPrincipal();
