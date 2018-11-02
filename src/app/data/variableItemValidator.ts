import { TrailingInputItem } from "../components/interfaces/trailing-input-item";
import { TrailingInputItemValidator } from "../components/classes/trailing-input-item-validator";


export interface VariableTargetItem {
    type: string;
    isFlowVariable: boolean;
    flowId: string;
}

export class VariableToWidgetItemValidator extends TrailingInputItemValidator<VariableTargetItem> {
    constructor(targetItem: VariableTargetItem) {
        super(targetItem)
    }

    isSelectable(item: TrailingInputItem): boolean {
        return item.typeValue === this.targetItem.type;
    }
    
    isTargetValue(item: TrailingInputItem): boolean {
        if(item.children.length !== 0)
            return false;
        return true;
    }
} 