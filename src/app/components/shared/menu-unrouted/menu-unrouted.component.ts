import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-menu-unrouted',
  templateUrl: './menu-unrouted.component.html',
  styleUrls: ['./menu-unrouted.component.css']
})
export class MenuUnroutedComponent implements OnInit {
  items: MenuItem[];

  constructor() {
    this.items = [
      { label: 'Home', routerLink: '/home' },
      {
        label: 'User',
        items: [
          { label: 'View', routerLink: '/admin/user/view/1' },
          { label: 'List', routerLink: '/admin/user/plist' }
        ]
      },
      {
        label: 'Thread',
        items: [
          { label: 'View', routerLink: '/admin/thread/view/1' },
          { label: 'List', routerLink: '/admin/thread/plist' }
        ]
      },
      {
        label: 'Reply',
        items: [
          { label: 'View', routerLink: '/admin/reply/view/1' },
          { label: 'List', routerLink: '/admin/reply/plist' }
        ]
      }
    ];
  }

  ngOnInit() {
  }

}
