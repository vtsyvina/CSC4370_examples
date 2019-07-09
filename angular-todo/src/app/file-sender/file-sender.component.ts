import { Component, ViewChild } from '@angular/core';


@Component({
    selector: 'file-sender',
    template: '<div><input type="file" multiple #fileinput /><button (click)=send()>Send files</button>'
})
export class FileSenderComponent{

    @ViewChild('fileinput')
    fileInputElement

    send() : void {
        var data = new FormData();
        var element = this.fileInputElement.nativeElement
        for (var i=0; i< element.files.length; i++){
            data.append('file-'+i, element.files[i]);
        }
        fetch("/api/v1/file",{
            method: "POST",
            body: data
        }).then(r => r.json()).then(r => console.log(r))
    }
}