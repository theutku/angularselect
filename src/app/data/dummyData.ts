import {  TrailingInputItem } from "../components/interfaces/trailing-input-item";
import { VariableToWidgetItemValidator, VariableTargetItem } from "./variableItemValidator";
import { TrailingInputDataSource } from "../components/classes/trailing-input-data-source";


export class DummyData extends TrailingInputDataSource {
    createDummyObject(name: string, parent?: TrailingInputItem, level?: number): TrailingInputItem {
        let item = {
            parent: parent,
            children: [],
            displayText: name,
            typeText: 'complex',
            typeValue: 'complex',
            value: name
        };

        return item;
    }
    constructor() {
        let targetItem: VariableTargetItem = {
            flowId: "",
            isFlowVariable: true,
            type: "complex"
        } 
        let validator = new VariableToWidgetItemValidator(targetItem); 
        super(validator);

        this.data = [];

        let root1 = this.createDummyObject('Root 1', null);
        let root2 = this.createDummyObject('Root 2', null);

        let root11 = this.createDummyObject('Root 1-1', root1);
        let root12 = this.createDummyObject('Root 1-2', root1);

        let unAcceptedItem: TrailingInputItem = {
            children: [],
            displayText: 'Root 1-2-1',
            parent: root12,
            typeText: "String",
            typeValue: "String",
            value: "String Value"
        }
        root12.children.push(unAcceptedItem);

        let root21 = this.createDummyObject('Root 2-1', root2);
        let root22 = this.createDummyObject('Root 2-2', root2);
        let root23 = this.createDummyObject('Root 2-3', root2);
        let root24 = this.createDummyObject('Root 2-4', root2);

        let root111 = this.createDummyObject('Root 1-1-1', root11);
        let root112 = this.createDummyObject('Root 1-1-2', root11);
        let root113 = this.createDummyObject('Root 1-1-3', root11);
        let root114 = this.createDummyObject('Root 1-1-4', root11);

        let root211 = this.createDummyObject('Root 2-1-1', root21);
        let root212 = this.createDummyObject('Root 2-1-2', root21);
        let root213 = this.createDummyObject('Root 2-1-3', root21);
        let root214 = this.createDummyObject('Root 2-1-4', root21);

        root11.children.push(root111);
        root11.children.push(root112);
        root11.children.push(root113);
        root11.children.push(root114);

        root21.children.push(root211);
        root21.children.push(root212);
        root21.children.push(root213);
        root21.children.push(root214);

        root1.children.push(root11);
        root1.children.push(root12);
        root2.children.push(root21);
        root2.children.push(root22);
        root2.children.push(root23);
        root2.children.push(root24);

        this.data.push(root1);         
        this.data.push(root2);         
    }


} 