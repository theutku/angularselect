import { forwardRef, Component, ViewEncapsulation, OnInit, Input, ElementRef } from "@angular/core";
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { TrailingInputItem } from "./interfaces/trailing-input-item";
import { TrailingInputDataSource } from "./classes/trailing-input-data-source";

interface IDropdownItem {
    selectable: boolean;
    finalSelection: boolean;
    item: TrailingInputItem;
}

const EXPANDED_TEXTAREA_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => TrailingInputComponent),
    multi: true,
};

@Component({
    selector: 'trailing-input',
    templateUrl: './trailing-input.component.html',
    styleUrls: ['./trailing-input.component.scss'],
    providers: [EXPANDED_TEXTAREA_VALUE_ACCESSOR],
    encapsulation: ViewEncapsulation.None
})
export class TrailingInputComponent implements OnInit, ControlValueAccessor {

    private _isDisabled: boolean = false;

    @Input() set disabled(val: boolean) {
        this.setDisabledState(val);
    }

    get disabled() {
        return this._isDisabled;
    }

    @Input()
    dataSource: TrailingInputDataSource;

    @Input()
    dropdownContainer: string | HTMLElement | ElementRef;

    @Input()
    noValidate: boolean = false;

    isSelectionsOpen: boolean = false;

    dropdownDisplayItems: IDropdownItem[] = [];
    selectedDisplayItems: TrailingInputItem[] = [];
    currentFinalValue: TrailingInputItem;

    inputSearchValue: string = "";

    onChange = (selectedItem?: TrailingInputItem) => { };
    onTouched = () => { };

    constructor() {

    }

    ngOnInit() {
        this.setInitialSelectables();
    }

    private setInitialSelectables() {
        this.currentFinalValue = null;
        this.dropdownDisplayItems = [];
        this.selectedDisplayItems = [];
        this.dataSource.data.forEach((item) => {
            this.dropdownDisplayItems.push(this.createDropdownItem(item));
        });
    }

    private createDropdownItem(item: TrailingInputItem): IDropdownItem {
        return {
            item: item,
            selectable: this.dataSource.validator.isSelectable(item),
            finalSelection: this.dataSource.validator.isTargetValue(item)
        }
    }

    writeValue(selectedItem?: TrailingInputItem): void {
        if (!selectedItem) {
            this.setInitialSelectables();
        } else {
            this.setSelectedOption(selectedItem);
            this.currentFinalValue = selectedItem;
        }
    }

    registerOnChange(fn: any): void {
        this.onChange = fn;
    }
    registerOnTouched(fn: any): void {
        this.onTouched = fn;
    }

    setDisabledState(isDisabled: boolean): void {
        this.isSelectionsOpen = false;
        this._isDisabled = isDisabled;
    }

    searchInputClicked(event: MouseEvent) {
        if (!this.currentFinalValue)
            this.isSelectionsOpen = true;
    }

    optionSelected(event: MouseEvent, option: IDropdownItem) {
        if (option.selectable) {
            this.setSelectedOption(option.item);
        }
        event.stopPropagation();
    }

    selectedItemClicked(event: MouseEvent, selectedItem: TrailingInputItem) {
        if (this.disabled) {
            event.preventDefault();
            event.stopPropagation();
            return;
        }
        if (this.noValidate) {
            this.onChange(selectedItem)
            this.currentFinalValue = null;
        }
        if (selectedItem.parent) {
            this.updateSelectables(selectedItem.parent);
            this.updateSelectedItems(selectedItem.parent, true);
        } else {
            this.resetValue();
            this.setInitialSelectables();
        }
        this.isSelectionsOpen = true;
        this.selectedDisplayItems.reverse();
        event.stopPropagation();
    }

    clickedOutside(event: any) {
        if (event && event.value) {
            this.isSelectionsOpen = false;
        }
    }

    private setSelectedOption(option: TrailingInputItem) {
        this.updateSelectables(option);
        this.updateSelectedItems(option, true);
        this.selectedDisplayItems.reverse();
    }

    private updateSelectables(selectedOption: TrailingInputItem) {
        this.inputSearchValue = "";
        this.dropdownDisplayItems = [];
        if (this.dataSource.validator.isTargetValue(selectedOption)) {
            this.finalizeItemSelection(selectedOption);
            return;
        }

        if (this.noValidate)
            this.onChange(selectedOption)
        else
            this.resetValue();

        selectedOption.children.forEach((item) => {
            this.dropdownDisplayItems.push(this.createDropdownItem(item));
        });

    }

    private resetValue() {
        if (this.currentFinalValue || this.noValidate) {
            this.currentFinalValue = null;
            this.onChange(null);
        }
    }

    private updateSelectedItems(option: TrailingInputItem, initialize?: boolean) {
        if (initialize) {
            this.selectedDisplayItems = [option];
            this.updateSelectedItems(option);
            return;
        }
        if (option.parent) {
            this.selectedDisplayItems.push(option.parent);
            this.updateSelectedItems(option.parent);
        }
    }

    private finalizeItemSelection(finalOption: TrailingInputItem) {
        this.isSelectionsOpen = false;
        this.onChange(finalOption);
        this.currentFinalValue = finalOption;
    }

}