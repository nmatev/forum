import { Component, OnInit } from '@angular/core';
import { UsersDataService } from 'src/app/core/users-data.service';
import { NotificatorService } from 'src/app/core/notificator.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  constructor(
    private readonly noftificator: NotificatorService,
    private readonly usersDataService: UsersDataService,
  ) { }

  ngOnInit() {
  }

}
