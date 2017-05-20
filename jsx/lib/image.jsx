import update from 'immutability-helper';

function setOpenFolder(event) {
    event.preventDefault();
    const id = event.target.getAttribute('data-folderid');
    const opened_folder = this.state.images.filter(item=>item.id==id);
    const newState = update(this.state, {
        open_folder: {$set: opened_folder}
    });
    this.setState(newState);
}

function changeHandler(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const fieldname = target.name;
    
    if (isValid.call(this,fieldname,value)) {
    	var e = jQuery.extend({},this.state.errors);
    	delete(e[fieldname]);
        const newState = update(this.state, {
            [fieldname]: {$set: value},
            //errors: {$apply: err=>err.filter(e=>e.fieldname!=name) }
            errors: {$set: e}
        });
        this.setState(newState);
    } 
}

function isValid(fieldname,value) {
	if (fieldname=='new_folder_name') {
		if (value=='' || /^[a-zA-Z0-9\-_]+$/i.test(value)) return true;
		setError.call(this,fieldname,'invalid folder name');
		return false;
	}
	return false;
}

function setError(fieldname,message) {
	var e = {};
	e[fieldname]= message;
	const newState = update(this.state, {
        errors: {$merge: e}  	    	
    });
    this.setState(newState);
}


export { setOpenFolder,changeHandler }