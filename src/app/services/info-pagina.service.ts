import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { InfoPagina } from '../interfaces/info-pagina.interface';

@Injectable({
  providedIn: 'root'
})
export class InfoPaginaService {

  info: InfoPagina = {};
  cargada = false;

  equipo: any[] = [];


  constructor( private http: HttpClient) {
    this.cargarInfo();
    this.cargarEquipo();
  }

  private cargarInfo () {
      //leer el archivo JSON
      this.http.get('assets/data/data-pagina.json')
      .subscribe( (resp: InfoPagina) =>  {

        this.cargada = true;
        this.info = resp;
        console.log(resp);
        console.log(resp['twitter']);
      })

  }

  private cargarEquipo() {
    //leer el archivo JSON
    this.http.get('https://angular-html-f0bfe.firebaseio.com/equipo.json')
    .subscribe( (resp: any[]) =>  {

      this.cargada = true;
      this.equipo = resp;
      console.log(resp);
 
    })

}
}
