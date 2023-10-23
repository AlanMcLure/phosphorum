import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { PaginatorState } from 'primeng/paginator';
import { IThread, IThreadPage } from 'src/app/model/model.interfaces';
import { AdminThreadDetailUnroutedComponent } from '../admin-thread-detail-unrouted/admin-thread-detail-unrouted.component';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-admin-thread-plist-unrouted',
  templateUrl: './admin-thread-plist-unrouted.component.html',
  styleUrls: ['./admin-thread-plist-unrouted.component.css']
})
export class AdminThreadPlistUnroutedComponent implements OnInit {

  oPage: any = [];
  orderField: string = "id";
  orderDirection: string = "asc";
  oPaginatorState: PaginatorState = { first: 0, rows: 10, page: 0, pageCount: 0 };
  status: HttpErrorResponse | null = null;

  constructor(
    private oHttpClient: HttpClient,
    public dialogService: DialogService,
    public messageService: MessageService,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    this.getPage();
  }

  getPage(): void {
    this.oHttpClient.get<IThreadPage>("http://localhost:8083/thread" + "?size=" + this.oPaginatorState.rows + "&page=" + this.oPaginatorState.page + "&sort=" + this.orderField + "," + this.orderDirection).subscribe({
      next: (data: IThreadPage) => {
        this.oPage = data;
        this.oPaginatorState.pageCount = data.totalPages;
        console.log(this.oPaginatorState);
      },
      error: (error: HttpErrorResponse) => {
        this.oPage.error = error;
        this.status = error;
      }
    })
  }

  onPageChang(event: PaginatorState) {
    this.oPaginatorState.rows = event.rows;
    this.oPaginatorState.page = event.page;
    this.getPage();
  }

  doOrder(fieldorder: string) {
    this.orderField = fieldorder;
    if (this.orderDirection == "asc") {
      this.orderDirection = "desc";
    } else {
      this.orderDirection = "asc";
    }
    this.getPage();
  }

  ref: DynamicDialogRef | undefined;

  goToView(u: IThread) {
    this.ref = this.dialogService.open(AdminThreadDetailUnroutedComponent, {
      data: {
        id: u.id
      },
      header: 'View of user',
      width: '70%',
      contentStyle: { overflow: 'auto' },
      baseZIndex: 10000,
      maximizable: false
    });
  }

  // Este método manejará el borrado de usuarios
  deleteThread(threadId: number) {
    // Realiza una solicitud de borrado al servidor
    this.oHttpClient.delete(`http://localhost:8083/thread/${threadId}`)
      .subscribe({
        next: () => {
          // Borrado exitoso
          console.log(`Thread con ID ${threadId} borrado correctamente.`);
          
          // Luego de borrar el usuario, puedes actualizar la lista de usuarios volviendo a llamar a getPage()
          this.getPage();
        },
        error: (error: HttpErrorResponse) => {
          console.error(`Error al borrar el thread con ID ${threadId}.`, error);
          // Manejo de errores, muestra notificaciones o toma acciones apropiadas
        }
      });
  }

  openDeleteConfirmationDialog(threadId: number): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Confirmar Borrado',
        message: '¿Estás seguro de que deseas borrar este thread? Esta acción no se puede deshacer.'
      }
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteThread(threadId);
      }
    });
  }
}
