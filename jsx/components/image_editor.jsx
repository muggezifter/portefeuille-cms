var ImageEditor = props =>
<div className="editor">
    <h1 className="item-title">images { props.open_folder && props.open_folder.length  ? ' : '+ props.open_folder[0].name : '' }</h1>
        <div className="pure-u-1-3">
            <ul>
            { props.folders.map(
                folder => 
                <li className = 'pure-menu-item' key={ folder.id }>
                    <a className = { props.open_folder && props.open_folder[0].id == folder.id ? "folder active" : "folder " } onClick = { props.setOpenFolder } data-folderid={ folder.id }><i className='fa fa-folder'  data-folderid={ folder.id }></i>
                    { folder.name }
                    ({ folder.images.length })
                    </a>
                </li>
            )}
            </ul>
         </div>
        <FolderContents
            errors = { props.errors }
            deleteFolder = { props.deleteFolder }
            selectImage = { props.selectImage }
            deleteImage = { props.deleteImage }
            moveImageToFolder = { props.moveImageToFolder }
            folders = { props.folders }
            folderid = { props.open_folder && props.open_folder.length ? props.open_folder[0].id : null }
            content = { props.open_folder && props.open_folder.length ? props.open_folder[0].images : null }
            selected_image_id = { props.selected_image_id }
        />

    <form className="pure-form pure-form-stacked pure-u-1" id="new_folder_form"> 
        <br/>
        <fieldset>
            <legend>create a new folder</legend>
            <label for="new_folder_name">
                <input type="text" name="new_folder_name" value={ props.new_folder_name || "" } onChange={ props.changeHandler } />
                <span className="pure-form-message error">{ props.errors.new_folder_name || '' }</span>
            </label>
            
            <button onClick={ props.createFolder } className ="pure-button pure-button-primary">submit</button>
        </fieldset>
    </form>
    <form className="pure-form pure-form-stacked pure-u-1" id="image_form"> 
        <br />
        <fieldset>
        <legend>add an image</legend>
        <label for="image_upload">
            <input type="file" name="image_upload" id="image_upload" onChange={ props.changeHandler } />
            <span className="pure-form-message error">{ props.errors.image_upload || '' }</span>
        </label>
        <button onClick={ props.uploadHandler } className ="pure-button pure-button-primary">submit</button>
        </fieldset>
    </form>
</div>;



var FolderContents = props =>
<div className="pure-u-1-2 image-folder">
    { props.content 
        ? props.content.length==0 
            ? <span>[empty] 
                <button className="pure-button pure-button-primary" onClick={ props.deleteFolder } data-folderid={ props.folderid }>delete this folder</button>
                <span className="pure-form-message error">{ props.errors.delete_folder || '' }</span>
            </span>
            : props.content.map(
                image => <span>
                    <img className="preview" 
                        src={ image.url } 
                        title={ image.filename + ' (' + image.width + 'x' + image.height + ')' + image.id} 
                        onClick={ props.selectImage } 
                        data-imageid={ image.id } 
                    />
                    <div className={ props.selected_image_id == image.id ?  "overlay visible" : "overlay hidden" }>
                        <div className="frame">
                            <img 
                                onClick={ props.selectImage }
                                src={ image.url } 
                                title={ image.filename + ' (' + image.width + ' x' + image.height + ')' } 
                                data-imageid="0"
                            />
                            <div className="info">
                                { image.filename + ' (' + image.width + 'x' + image.height + ')' }
                                <button onClick={ props.deleteImage } className="pure-button pure-button-primary">delete</button>
                                <select onChange={ props.moveImageToFolder } className="pure-select">
                                    <option value="0">move to folder...</option>
                                    { props.folders.filter(folder => folder.id != props.folderid).map(
                                        folder =>  <option value={ folder.id }>{folder.name }</option>
                                        )}
                                </select>
                                <span className="pure-form-message error">{ props.errors.selected_image_error  || '' }</span>
                            </div>
                        </div>
                    </div>
                </span>
            )
        :''
     }
</div>

export default ImageEditor