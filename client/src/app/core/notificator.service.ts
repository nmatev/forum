import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class NotificatorService {

  constructor(private readonly toastr: ToastrService) { }

  public success(message: string, title?: string): void {
    this.toastr.success(message, title);
  }

  public error(message: string, title?: string): void {
    this.toastr.error(message, title);
  }
  public log(): void {
    console.log(`this shit works`);
  }
}
