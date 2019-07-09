import { NgModule } from '@angular/core';
import { ErrorsListComponent } from './errors-list.component';
import { NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';




@NgModule({
    declarations: [ErrorsListComponent],
    exports: [ErrorsListComponent],
    imports: [NgbAlertModule, CommonModule]
})
export class ErrorsListModule{

}