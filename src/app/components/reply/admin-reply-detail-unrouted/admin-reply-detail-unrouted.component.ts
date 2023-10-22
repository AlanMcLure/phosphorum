import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { IReply } from 'src/app/model/model.interfaces';

@Component({
  selector: 'app-admin-reply-detail-unrouted',
  templateUrl: './admin-reply-detail-unrouted.component.html',
  styleUrls: ['./admin-reply-detail-unrouted.component.css']
})
export class AdminReplyDetailUnroutedComponent implements OnInit {

  @Input() id: number = 1;

  textoDeEntrada: string = "";
  oReply: IReply | null = null;
  status: HttpErrorResponse | null = null;

  constructor(
    private oHttpClient: HttpClient
  ) { }

  ngOnInit() {
    this.getOne();
  }

  getOne(): void {
    this.oHttpClient.get<IReply>("http://localhost:8083/reply/" + this.id).subscribe({
      next: (data: IReply) => {
        this.oReply = data;
      },
      error: (error: any) => {
        this.status = error;
      }

    })

  }

  onTextoDeEntradaChange(): void {
    const replyId = parseInt(this.textoDeEntrada, 10); // Convierte el texto a un número entero

    if (!isNaN(replyId)) {
      // Realiza una solicitud a la API con el ID ingresado
      this.oHttpClient.get<IReply>("http://localhost:8083/reply/" + replyId).subscribe({
      next: (data: IReply) => {
        this.oReply = data;
      },
      error: (error: any) => {
        this.oReply = null;
      }

    })
    } else {
      // Si el valor no es un número válido, borra los datos
      this.oReply = null;
    }
  }

}
