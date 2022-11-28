export interface IleftNavMenu{
    title:string;
    links:{
        id:number;
        icon:any;
        name:string;
        link?:string;
        method?:()=> any;
       vistas?:any;
    }[];
}