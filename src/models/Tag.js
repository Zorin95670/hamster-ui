export default class Tag {
  constructor(props = {}) {
    this.uuid = props.uuid || null;
    this.name = props.name || null;
    this.type = props.type || null;
    this.backgroundColor = props.backgroundColor || '#000000';
    this.textColor = props.textColor || '#FFFFFF';
  }
}
