export class CitaSearchResult {
    id_cita!:number;
    id_fisio!:number;
    id_cliente!:number;
    fecha!:any;
    hora:any;
    descripcion!:string;
    tipo_consulta!:string;
    estatus!:string;
    constructor(obj?:any){
        
        this.id_cita = obj && obj.id_cita || null;
        this.id_fisio = obj && obj.id_fisio || null;
        this.id_cliente =obj && obj.id_cliente || null;
        this.fecha = obj && obj.fecha || null;
        this. hora = obj && obj.hora|| null;
        this.descripcion =obj && obj.descripcion || null;
        this.tipo_consulta = obj && obj.tipo_consulta || null;
        this.estatus = obj && obj.estatus || null;
    }
}