import ItemEditor from './_item_editor';
import CategoryEditor from './_category_editor';
import ImageEditor from './_image_editor';
import MenuEditor from './_menu_editor';

var Editor = props =>
<div className="editor">
    { getEditor(props) }
</div>;

var getEditor = props => {
    switch(props.action) {
        case 'categories':
            return <CategoryEditor
                item={ props.item }
                inputChangeHandler={ props.inputChangeHandler }
            />;
            break;
        case 'images':
            return <ImageEditor 
                folders={ props.images }
                open_folder={ props.open_folder }
                setOpenFolder={ props.setOpenFolder }
            />
            break;
        case 'menu':
            return <MenuEditor />
            break;
        default: 
            return <ItemEditor
                type={ props.action }
                item={ props.item }
                inputChangeHandler={ props.inputChangeHandler }
                itemSaveHandler={ props.itemSaveHandler }
                formResetHandler={ props.formResetHandler }
            />;
    }
}


export default Editor
