import update from 'immutability-helper';

export function changeHandler(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
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

export function saveHandler(event) {
        event.preventDefault();
        alert("save");
    }

 
export function resetHandler() {
    alert('reset');
    this.getItem(this.state.type, this.state.slug);
}

