import update from 'immutability-helper';

function setOpenFolder(event) {
    event.preventDefault();
    const id = event.target.getAttribute('data-folderid');
    const opened_folder = this.state.images.filter(item=>item.id==id);
    const newState = update(this.state, {
        open_folder: {$set: opened_folder}
    });
    this.clearError('image_upload');
    this.setState(newState);
}

function changeHandler(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const fieldname = target.name;
    
    if (_isValid.call(this,fieldname,value)) {
    	this.clearError(fieldname);
    	// var e = jQuery.extend({},this.state.errors);
    	// delete(e[fieldname]);
     //    const newState = update(this.state, {
     //        [fieldname]: {$set: value},
     //        errors: {$set: e}
     //    });
     //    this.setState(newState);
    } 
}

function _isValid(fieldname,value) {
	switch(fieldname) {
		case 'new_folder_name':
			if (value=='' || /^[a-zA-Z0-9\-_]+$/i.test(value)) return true;
			_setError.call(this,fieldname,'invalid folder name');
			return false;
			break;
		case 'image_upload':
			return true;
			break;
	}
	return false;
}


function createFolder(event) {
	event.preventDefault();
	if(this.state.new_folder_name){
		this.postToApi(
			'/admin/folders/new',
			{ name :this.state.new_folder_name },
			data=>{
				switch(data.status){
					case "error":
						this.setError('new_folder_name',data.message);
						break;
					case "ok":
						const open_folder = data.images.filter(item=>item.id==data.folder_id);
					    const newState = update(this.state, {
				            images: {$set: data.images},
				            open_folder: {$set: open_folder}
				        });
				        this.setState(newState); 
						break;			
				}
			});
	} else {
		this.setError('new_folder_name','folder name can not be empty');
	}
}

function uploadHandler(event) {
	event.preventDefault();
	const files = document.getElementById('image_upload').files;
	
	if (!files.length) return this.setError('image_upload','choose a file');
	
	if (!(this.state.open_folder && this.state.open_folder.length)) return this.setError('image_upload','no folder selected');


	
	var data = new FormData(document.getElementById('image_form'));
	data.append('folder_id',this.state.open_folder[0].id);

	jQuery.post({
	    url: 'admin/images/new',
	    data: data,
	    cache: false,
	    contentType: false,
	    processData: false,
	    statusCode: {
                403: function (xhr) {
                    window.console && console.log(xhr.responseText);
                    window.location.replace('/login');
                }
            }
        }).done(data => {
			switch(data.status){
				case "error":
					this.setError('image_upload',data.message);
					break;
				case "ok":
					document.getElementById('image_upload').value='';
					const open_folder = data.images.filter(item=>item.id==data.folder_id);
					const newState = update(this.state, {
				        images: {$set: data.images},
				        open_folder: {$set: open_folder}
				    });
				    this.setState(newState); 
					break;	
			}
	    });

}


export { setOpenFolder, changeHandler, createFolder, uploadHandler }