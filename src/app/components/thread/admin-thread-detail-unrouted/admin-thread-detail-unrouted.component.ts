import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit, Optional } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { IThread } from 'src/app/model/model.interfaces';

@Component({
  selector: 'app-admin-thread-detail-unrouted',
  templateUrl: './admin-thread-detail-unrouted.component.html',
  styleUrls: ['./admin-thread-detail-unrouted.component.css']
})
export class AdminThreadDetailUnroutedComponent implements OnInit {


  @Input() id: number = 1;

  // textoDeEntrada: string = "";
  oThread: IThread | null = null;
  status: HttpErrorResponse | null = null;

  constructor(
    private oHttpClient: HttpClient,
    @Optional() public ref:DynamicDialogRef,
    @Optional() public config:DynamicDialogConfig
  ) {     
    if (config){
      if (config.data){
        this.id = config.data.id;
      }
    }    
  }

  ngOnInit() {
    this.getOne();
  }

  getOne(): void {
    this.oHttpClient.get<IThread>("http://localhost:8083/thread/" + this.id).subscribe({
      next: (data: IThread) => {
        this.oThread = data;
      },
      error: (error: any) => {
        this.status = error;
      }

    })

  }

  // onTextoDeEntradaChange(): void {
  //   const threadId = parseInt(this.textoDeEntrada, 10); // Convierte el texto a un número entero

  //   if (!isNaN(threadId)) {
  //     // Realiza una solicitud a la API con el ID ingresado
  //     this.oHttpClient.get<IThread>("http://localhost:8083/thread/" + threadId).subscribe({
  //     next: (data: IThread) => {
  //       this.oThread = data;
  //     },
  //     error: (error: any) => {
  //       this.oThread = null;
  //     }

  //   })
  //   } else {
  //     // Si el valor no es un número válido, borra los datos
  //     this.oThread = null;
  //   }
  // }

}
