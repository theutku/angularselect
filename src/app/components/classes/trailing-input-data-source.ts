import { TrailingInputItem } from "../interfaces/trailing-input-item";
import { TrailingInputItemValidator } from "./trailing-input-item-validator";

export class TrailingInputDataSource {
    data: TrailingInputItem[];

    constructor(public validator: TrailingInputItemValidator<any>) {

    }   

    fromDotNotation(notation : string) : TrailingInputItem {
        if(!notation){
            return null;
        }
        const notationHierarchy = notation.split('::').join('.').split(':').join('.').split('.');
        let currentItems = this.data;
        let pathIndex = 0;
        let foundItem : TrailingInputItem;
        do {
            let pathValue = notationHierarchy[pathIndex];
            foundItem = currentItems.find(d => d.value === pathValue);
            if (!foundItem) {
                break;
            }             
            currentItems = foundItem.children;
            pathIndex++; 
        } while(currentItems && currentItems.length && pathIndex < notationHierarchy.length)

        return foundItem;
    }
}