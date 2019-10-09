export function ListItem(UID, itemData) {
  this.id = UID;
  this.itemData = itemData;
}

export function ToDoData(text) {
  this.text = text;
  this.isDone = false;
}
