import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'todoSearch',
    /**
     * By default, pipes are stateless/pure. It means that  once we passed todos array it will process it,
     * but won't run again if we change todos array
     */
    pure: false
})
export class TodoSearchPipe implements PipeTransform {
    /**
     * The pipe to filter todos by title
     * @param todos the array of todos that is past to be formatted
     * @param args argumet list(search text)
     */
    transform(todos, args?): Array<any> {
        const searchText = new RegExp(args, 'ig');
        if (todos) {
            return todos.filter(todo => {
                if (todo.title) {
                    return todo.title.search(searchText) !== -1;
                } else{
                    return false;
                }
            });
        }
    }
}