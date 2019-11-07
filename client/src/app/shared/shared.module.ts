import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [],
  imports: [CommonModule, NgbModule, HttpClientModule],
  exports: [CommonModule, NgbModule, HttpClientModule],
})
export class SharedModule { }
