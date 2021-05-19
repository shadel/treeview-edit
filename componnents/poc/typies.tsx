import { ISmartData, SmartDataType } from "../types";

const DataTypeNames = {
  [SmartDataType.CATEGORY]: "Category",
  [SmartDataType.VALUE]: "Value",
  [SmartDataType.DATA]: "Data"
};

export function getTypeName(type: SmartDataType) {
  return DataTypeNames[type];
}

export function getItemTypeName(value: ISmartData) {
  return getTypeName(value.type);
}
export function getTitle(value: ISmartData) {
  const typeName = getItemTypeName(value);
  return `Edit ${typeName} ${value.name}`;
}

const ItemTypies = [
  SmartDataType.CATEGORY,
  SmartDataType.VALUE,
  SmartDataType.DATA
];

export function getChildType(value?: ISmartData) {
  if (!value) {
    return ItemTypies[0];
  }
  const currentIdx = ItemTypies.indexOf(value.type);
  return ItemTypies[currentIdx + 1];
}

export function canAddChild(value: ISmartData) {
  return !!getChildType(value);
}
export function getChildTypeName(value?: ISmartData) {
  return getTypeName(getChildType(value));
}
