var ItemEditor = props =>
<form className="pure-form pure-form-aligned">
    <h1 className="item-title">{props.type} :: { props.item.title || 'new item' }</h1>
    <fieldset>
        <div className="pure-control-group">
            <label for="title">title</label>
            <input name="title" className="pure-u-3-4" type="text" value={ props.item.title } onChange={ props.inputChangeHandler } />
        </div>
        <div className="pure-control-group">
            <label for="slug">slug</label>
            <input name="slug" type="text" placeholder="slug" value={ props.item.slug } onChange={ props.inputChangeHandler } />
        </div>
    { props.type == "items" ?
        <div className="pure-control-group">
            <label for="details">details</label>
            <input name="details" className="pure-u-3-4" type="text" placeholder="details" value={ props.item.details }  onChange={ props.inputChangeHandler } />
        </div> : ''
    }
    { props.type == "items" ?
        <div className="pure-control-group">
            <label for="thumbnail">thumbnail</label>
            <input name="thumbnail" type="text" placeholder="thumbnail" value={ props.item.thumbnail } onChange={ props.inputChangeHandler } />
        </div> : ''
    }
    { props.type == "items" ?
        <div className="pure-control-group">
            <label for="textcol">text</label>
            <textarea className="pure-u-3-4 htmledit" name="textcol">{ props.item.textcol }</textarea>
        </div> : ''
    }
        <div className="pure-control-group">
            <label for="raw">raw</label>
            <textarea className="pure-u-3-4 htmledit" name="raw">{ props.item.raw }</textarea>
        </div>
    { props.type == "pages" ?
        <div className="pure-controls">
            <label for="in_menu" class="pure-checkbox">
                <input name="in_menu" type="checkbox" checked={ props.item.in_menu == 1 } onChange={ props.inputChangeHandler } />
                show in menu
            </label>
        </div> : ''
    }
        <div className="pure-controls">
            <label for="online" class="pure-checkbox">
                <input name="online" type="checkbox" checked={ props.item.online == 1 } onChange={ props.inputChangeHandler } />
                published
            </label>
        </div>
        <div className="pure-controls">
            <button type="reset"  onClick={ props.formResetHandler } className="pure-button editorbutton">
                <i className="fa fa-undo"></i>
                &nbsp;reset</button>
            <button type="submit" onClick={ props.itemSaveHandler } className="pure-button pure-button-primary">
                <i className="fa fa-save"></i>
                &nbsp;save</button>
        </div>
    </fieldset>
</form>;

export default ItemEditor
