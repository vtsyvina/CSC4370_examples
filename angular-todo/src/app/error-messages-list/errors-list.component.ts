import { Component, Input } from '@angular/core';

@Component({
    'selector': 'errors-list',
    'templateUrl': './errors-list.template.html'
})
export class ErrorsListComponent{
    @Input()
    errors: Array<ErrorMessage>

    close_error(index): void {
        this.errors.splice(index, 1);
    }
}

export class ErrorMessage{
    message: string
    type: string
}