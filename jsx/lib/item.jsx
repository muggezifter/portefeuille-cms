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

function pickImage(event) {
    event.preventDefault();
    alert("pick image");
}

function removeImage(event) {
    event.preventDefault();
    const field = event.target.attributes["data-field"].value;
    const newState = update(this.state, {
        item: {
            [field]: {$set: null}
        }
    });
    this.setState(newState);  
}

function saveHandler(event) {
    event.preventDefault();
    const id = (!this.state.item.id)? "new" : this.state.item.id;
    this.postToApi(
        'admin/' + this.state.type + '/' + id,
        this.state.item,
        (data)=>{
            console.log(data);
            switch(data.status){
                case "error":
                    //
                    break;
                case "ok":
                    this.setFlashMessage('success', data.message);
            }
        })
}

 
function resetHandler() {
    this.getItem(this.state.type, this.state.item.id);
}


export { changeHandler, pickImage, removeImage, saveHandler, resetHandler }