import { PipeTransform, Pipe } from '@angular/core';

/**
 * The pipe searches for 'search' string inside 'text' and wraps found match with span element and highlighting class
 * 'dark' indicates what type of highlighting we want to use and show that directive can have several input parameters.
 * Can it be done with attribute directive?
 */
@Pipe({ name: 'highlight' })
export class HighlightPipe implements PipeTransform {
    transform(text: string, search: string, dark = false): string {
        if (search && text) {
            let pattern = search.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, '\\$&');
            pattern = pattern.split(' ').filter((t) => {
                return t.length > 0;
            }).join('|');
            const regex = new RegExp(pattern, 'gi');
            var cl = dark ? "dark" : 'light'
            return text.replace(regex, (match) => `<span class="search-highlight-${cl}">${match}</span>`);
        } else {
            return text;
        }
    }
}