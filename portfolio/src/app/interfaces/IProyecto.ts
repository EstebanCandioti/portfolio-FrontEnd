export interface IProyecto {
    id:number,
    nombre:string,
    fotoProyecto:string,
    descripcion:string,
    inicioProyecto:string,
    finalizacionProyecto:string,
    links:Array<{descripcionLink:string, url:string}>
}
