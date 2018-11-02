import { Pipe, PipeTransform } from "@angular/core";
import { TrailingInputItem } from "../interfaces/trailing-input-item";

interface IDummyDropdownItem {
    item : TrailingInputItem
}

@Pipe({  
    name: 'trailingInputSearchFilter',  
    pure: true  
})  
export class TrailingInputSearch implements PipeTransform {  
    transform(dropdowns: IDummyDropdownItem[], filterValue: string): any {  
        if (!dropdowns || !filterValue) {  
            return dropdowns;  
        }  
        return dropdowns.filter(dropdown => dropdown.item.displayText.toLowerCase().indexOf(filterValue.toLowerCase()) !== -1);  
    }  
}
