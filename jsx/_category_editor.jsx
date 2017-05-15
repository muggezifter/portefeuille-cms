var CategoryEditor = props =>
<div className="editor">
    <form className="pure-form pure-form-stacked">
        <h1 className="item-title">categories :: { props.item.title || 'new category' }</h1>
    </form>
</div>;

export default CategoryEditor