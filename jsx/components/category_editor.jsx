var CategoryEditor = props =>
<div className="editor">
    <form className="pure-form pure-form-aligned">
        <h1 className="item-title">categories :: { props.item.name || 'new category' }</h1>
        <fieldset >
            <div className="pure-control-group">
                <label for="name">name</label>
                <input name="name" 
                    type="text" 
                    placeholder="name" 
                    value={ props.item.name } 
                    onChange={ props.changeHandler } />
            </div>
            <div className="pure-control-group">
                <label for="slug">slug</label>
                <input name="slug" 
                    type="text" 
                    placeholder="slug" 
                    value={ props.item.slug } 
                    onChange={ props.changeHandler } />
            </div>
            <div className="pure-controls">
                <label for="online" className="pure-checkbox">
                    <input name="online" 
                        type="checkbox" 
                        checked={ props.item.online == 1 } 
                        onChange={ props.changeHandler } />
                    online
                </label>
            </div>
            <div className="pure-controls">
                <button type="reset"  
                    onClick={ props.resetHandler } 
                    className="pure-button editorbutton">
                    <i className="fa fa-undo"></i>&nbsp;reset</button>
                <button type="submit" 
                    onClick={ props.saveHandler } 
                    className="pure-button pure-button-primary">
                    <i className="fa fa-save"></i>&nbsp;save</button>
            </div>
        </fieldset>
    </form>
</div>;

export default CategoryEditor