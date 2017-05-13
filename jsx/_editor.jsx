import ItemEditor from './_item_editor';
import CategoryEditor from './_category_editor';

var Editor = props =>
<div className="editor">
    { getEditor(props) }
</div>;

var getEditor = props => {
    switch(props.type) {
        case 'categories':
            return <CategoryEditor
                item={ props.item }
                inputChangeHandler={ props.inputChangeHandler }
            />;
            break;
        default: 
            return <ItemEditor
                type={ props.type }
                item={ props.item }
                inputChangeHandler={ props.inputChangeHandler }
                itemSaveHandler={ props.itemSaveHandler }
                formResetHandler={ props.formResetHandler }
            />;
    }
}


export default Editor
