import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Producto, Item } from '../interfaces/producto.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  cargando = true;
  productos: Producto[] = [];
  productosFiltrado: Producto[] = [];

  constructor(private http: HttpClient) {
    this.cargarProductos();
   }

  private cargarProductos() {

    return new Promise ( (resolve, reject) => {
      this.http.get("https://angular-html-f0bfe.firebaseio.com/productos_idx.json").subscribe( (resp: Producto[]) => {
        this.productos = resp;
        this.cargando = false;
        resolve();
      });
    });

  }

  getProducto (id: string) {
    return this.http.get(`https://angular-html-f0bfe.firebaseio.com/productos/${ id }.json`);
  }

  buscarProducto (texto: string) {
    if (this.productos.length === 0) {
      this.cargarProductos().then(() =>{
        this.filtrarProductos(texto);
      })
    } 
    else {
      this.filtrarProductos(texto);
    }
  }

  filtrarProductos( texto: string) {

    this.productosFiltrado = [];
    texto = texto.toLocaleLowerCase();

    this.productos.forEach(prod => {
      if (prod.categoria.toLocaleLowerCase().indexOf(texto) >= 0 || prod.titulo.toLocaleLowerCase().indexOf(texto) >= 0) {
        this.productosFiltrado.push(prod);
      }
    })

  }
}
