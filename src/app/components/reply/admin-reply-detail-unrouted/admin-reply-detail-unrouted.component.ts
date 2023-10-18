import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Input } from '@angular/core';

interface IReply {
  id: number;
  title: string;
  body: string;
  thread: {
    title: string;
  }
  user: {
    username: string;
  };
}

@Component({
  selector: 'app-admin-reply-detail-unrouted',
  templateUrl: './admin-reply-detail-unrouted.component.html',
  styleUrls: ['./admin-reply-detail-unrouted.component.css']
})
export class AdminReplyDetailUnroutedComponent implements OnInit {

  @Input() id: number = 1;

  datos: IReply = { id: 0, title: "", body: "", thread: { title: ""}, user: { username: ""} };
  

  constructor(
    private http: HttpClient
  ) { }

  ngOnInit() {
    this.getOne();
  }

  getOne(): void {    
    this.http.get("http://localhost:8083/reply/" + this.id).subscribe({
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

}
