export interface TrailingInputItem {
    parent?: TrailingInputItem;
    children: TrailingInputItem[];
    displayText: string;
    typeText: string;
    typeValue: string;
    value: any;
}