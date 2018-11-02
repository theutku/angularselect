import { TrailingInputItem } from "../interfaces/trailing-input-item";

export abstract class TrailingInputItemValidator<ITarget> {

    constructor(protected targetItem: ITarget) {

    }

    abstract isSelectable(item: TrailingInputItem): boolean;
    abstract isTargetValue(item: TrailingInputItem): boolean;
}
