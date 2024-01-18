import { DataUsuario } from "./data-usuarios.interface";

export interface ListaUsuarios{
    page: string;
    per_page: string;
    total: string;
    total_pages: string;
    data: DataUsuario[];
}