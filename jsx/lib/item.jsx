import update from 'immutability-helper';

function _getMultiSelectVal(select) {
    return Array.from(select.options)
        .filter(option=>option.selected)
        .map(option => option.value);
}

function changeHandler(event) {
    const target = event.target;
    const value = target.multiple
        ? _getMultiSelectVal(target)
        : target.type === 'checkbox'
            ? target.checked
            : target.value;
    const name = target.name;
    
    //if (this.validate(target.name,value)) {
        const newState = update(this.state, {
            item: {
                [name]: {$set: value}
            }
        });
        this.setState(newState);
    //}
}

function saveHandler(event) {
        event.preventDefault();
        alert("save");
}

 
function resetHandler() {
    this.getItem(this.state.type, this.state.slug);
}


export { changeHandler, saveHandler, resetHandler }