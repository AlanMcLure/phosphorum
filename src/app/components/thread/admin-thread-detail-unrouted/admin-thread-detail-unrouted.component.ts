import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Input } from '@angular/core';

interface IThread {
  id: number;
  title: string;
  user: {
    username: string;
  };
}

@Component({
  selector: 'app-admin-thread-detail-unrouted',
  templateUrl: './admin-thread-detail-unrouted.component.html',
  styleUrls: ['./admin-thread-detail-unrouted.component.css']
})
export class AdminThreadDetailUnroutedComponent implements OnInit {

  @Input() id: number = 1;

  datos: IThread = { id: 0, title: "", user: { username: ""} };
  
  errorOcurred: boolean = false;

  constructor(
    private http: HttpClient
  ) { }

  ngOnInit() {
    this.getOne();
  }

  getOne(): void {    
    this.http.get("http://localhost:8083/thread/" + this.id).subscribe({
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

  onIdChange(): void {
    if (!isNaN(this.id)) {
      this.http.get(`http://localhost:8083/reply/${this.id}`).subscribe({
        next: (data: any) => {
          console.log(data);
          this.datos = data;
          this.errorOcurred = false; // La solicitud se realizó con éxito, restablece el error a false
        },
        error: (error) => {
          console.error("Error al cargar los datos de la respuesta", error);
          this.errorOcurred = true; // Hubo un error, establece el error a true
        }
      });
    } else {
      this.errorOcurred = false; // Restablece el error a false si el valor no es un número válido
    }
  }

}
