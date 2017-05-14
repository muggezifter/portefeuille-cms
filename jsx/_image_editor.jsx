var ImageEditor = props =>
<span>
    <h1 className="item-title">images { props.open_folder && props.open_folder.length  ? ' : '+ props.open_folder[0].name : '' }</h1>
        <div className="pure-u-1-3">
            <ul>
            { props.folders.map(
                folder => 
                <li className = 'pure-menu-item' key={ folder.id }>
                <a className = { props.open_folder && props.open_folder[0].id == folder.id ? "folder active" : "folder " } onClick = { props.setOpenFolder } data-folderid={ folder.id }><i className='fa fa-folder'  data-folderid={ folder.id }></i>{ folder.name }</a>
                </li>
            )}
            </ul>
         </div>
        <FolderContents
            content = { props.open_folder && props.open_folder.length ? props.open_folder[0].images : null }
        />

    <form className="pure-form pure-u-1"> 
        <br/>
        <fieldset>
            <legend>create a new folder</legend>
            <label for="folder_name"><input type="text" name="folder_name" /></label>
            <button type="submit" className ="pure-button pure-button-primary">submit</button>
        </fieldset>
    </form>
    <form className="pure-form pure-form-stacked pure-u-1"> 
        <br/>
        <fieldset>
            <legend>add an image</legend>
            <input type="file" name="image" />
        </fieldset>
    </form>

</span>;



var FolderContents = props =>
<div className="pure-u-1-2">
    { props.content 
        ? props.content.length==0 
            ? '[empty]'
            : props.content.map(image => <img src={ image.url } height='80' />)
        :''
     }
</div>

export default ImageEditor