import { Component, OnInit, Input } from '@angular/core';
import { AllUsers } from 'src/app/models/all-users';
import { Router } from '@angular/router';
import { UsersDataService } from 'src/app/core/users-data.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  public users: AllUsers[] = [];
  constructor(
    public readonly userService: UsersDataService,
    private readonly router: Router
  ) { }

  ngOnInit(): void {
    this.userService.getAllUsers().subscribe((data: AllUsers[]) => {
      this.users = data;
    });
  }
}
