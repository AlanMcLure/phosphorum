import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { IUser } from 'src/app/model/model.interfaces';

@Component({
  selector: 'app-admin-user-detail-unrouted',
  templateUrl: './admin-user-detail-unrouted.component.html',
  styleUrls: ['./admin-user-detail-unrouted.component.css']
})
export class AdminUserDetailUnroutedComponent implements OnInit {

 
  @Input() id: number = 1;

  textoDeEntrada: string = "";
  oUser: IUser | null = null;
  status: HttpErrorResponse | null = null;
  

  constructor(
    private oHttpClient: HttpClient
  ) { }

  ngOnInit() {
    this.getOne();
  }

  getOne(): void {    
    this.oHttpClient.get<IUser>("http://localhost:8083/user/" + this.id).subscribe({
      next: (data: IUser) => {
        this.oUser = data;
      },
      error: (error: any) => {
        this.status = error;
      }

    })

  }

  onTextoDeEntradaChange(): void {
    const userId = parseInt(this.textoDeEntrada, 10); // Convierte el texto a un número entero

    if (!isNaN(userId)) {
      // Realiza una solicitud a la API con el ID ingresado
      this.oHttpClient.get<IUser>("http://localhost:8083/user/" + userId).subscribe({
      next: (data: IUser) => {
        this.oUser = data;
      },
      error: (error: any) => {
        this.oUser = null;
      }

    })
    } else {
      // Si el valor no es un número válido, borra los datos
      this.oUser = null;
    }
  }

}
