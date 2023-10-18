import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';

interface IUser {
  id: number;
  name: string;
  surname: string;
  lastname: string;
  email: string;
  username: string;
  role: boolean;
  threads: number;
  replies: number
}

@Component({
  selector: 'app-admin-user-detail-unrouted',
  templateUrl: './admin-user-detail-unrouted.component.html',
  styleUrls: ['./admin-user-detail-unrouted.component.css']
})
export class AdminUserDetailUnroutedComponent implements OnInit {

 
  @Input() id: number = 1;

  datos: IUser = { id: 0, name: "", surname: "", lastname: "", email: "", username: "", role: false, threads: 0, replies: 0 };
  

  constructor(
    private http: HttpClient
  ) { }

  ngOnInit() {
    this.getOne();
  }

  getOne(): void {    
    this.http.get("http://localhost:8083/user/" + this.id).subscribe({
      next: (data: any) => {
        console.log(data);
        this.datos = data;
      },
      error: (error: any) => {
        this.id=0;
        console.log(error);
      }

    })

  }

  onIdChange(): void { // Convierte el texto a un número entero
    if (!isNaN(this.id)) {
      // Realiza una solicitud a la API con el ID ingresado
      this.http.get(`http://localhost:8083/user/${this.id}`).subscribe({
        next: (data: any) => {
          console.log(data);
          this.datos = data; // Almacena los datos del usuario
        },
        error: (error) => {
          console.error("Error al cargar los datos del usuario", error);
        }
      });
    } else {
      // Si el valor no es un número válido, borra los datos
      
    }
  }

}
