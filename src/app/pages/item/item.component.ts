import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductosService } from '../../services/productos.service';
import { Item } from '../../interfaces/producto.interface';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {

  item: Item;
  itemID: string;


  productoSel = null;

  constructor(private route: ActivatedRoute, private productoService: ProductosService) { }

  ngOnInit() {

    this.route.params.subscribe(params => {
      this.itemID = params ['id'];
      this.productoService.getProducto(params.id).subscribe(  (resp: Item) => {
        console.log("ITEM ", resp.categoria);
        this.item = resp;
      })
      
    });

    

  }

}
