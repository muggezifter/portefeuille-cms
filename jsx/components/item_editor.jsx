var ItemEditor = props =>
<div className="editor">
<form className="pure-form pure-form-aligned">
    <h1 className="item-title">{props.type} :: { props.item.title || 'new item' }</h1>
    <fieldset>
        <div className="pure-control-group">
            <label for="title">title</label>
            <input name="title" className="pure-u-3-4" type="text" value={ props.item.title } onChange={ props.changeHandler } />
        </div>
        <div className="pure-control-group">
            <label for="slug">slug</label>
            <input name="slug" type="text" placeholder="slug" value={ props.item.slug } onChange={ props.changeHandler } />
        </div>
    { props.type == "items" ?
        <div className="pure-control-group">
            <label for="details">details</label>
            <input name="details" className="pure-u-3-4" type="text" placeholder="details" value={ props.item.details }  onChange={ props.changeHandler } />
        </div> : ''
    }
    { props.type == "items" ?
        <div className="pure-control-group">
            <label>thumbnail</label>
            <div className="img-picker">
            { !!props.item.thumbnail  ?
                <img className="thumbnail" src={ props.item.thumbnail }  />
                : <span className="no_thumbnail">[no image]</span>
            }
                <div class="btns">
                    <button onClick={ props.pickImage } className="pure-button pure-button-primary" data-field="thumbnail">{ !!props.item.thumbnail ? "change":"select" }</button>
                    { !!props.item.thumbnail  ?
                        <button onClick={ props.removeImage } className="pure-button pure-button-primary" data-field="thumbnail">remove</button>
                        :''
                    }
                </div>
            <input name="thumbnail" type="hidden" placeholder="thumbnail" value={ props.item.thumbnail } />
            </div>
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
            <label for="in_menu" className="pure-checkbox">
                <input name="in_menu" type="checkbox" checked={ props.item.in_menu == 1 } onChange={ props.changeHandler } />
                show in menu
            </label>
        </div> : ''
    }
    { props.type == "items" ?
        <div className="pure-control-group">
            <label for="categories">categories:</label>
            <select name="categories" multiple="multiple" value={ props.item.categories }  onChange={ props.changeHandler }>
            { props.item.all_categories ? props.item.all_categories.map(category =>
                <option value={ category.id }>{ category.name }</option> ) : ''
            }
            </select>
        </div>: ''
    }
        <div className="pure-controls">
            <label for="online" className="pure-checkbox">
                <input name="online" type="checkbox" checked={ props.item.online == 1 } onChange={ props.changeHandler } />
                published
            </label>
        </div>
        <div className="pure-controls">
            <button type="reset"  onClick={ props.resetHandler } className="pure-button editorbutton">
                <i className="fa fa-undo"></i>
                &nbsp;reset</button>
            <button type="submit" onClick={ props.saveHandler } className="pure-button pure-button-primary">
                <i className="fa fa-save"></i>
                &nbsp;save</button>
        </div>
    </fieldset>
</form>
</div>;

export default ItemEditor
