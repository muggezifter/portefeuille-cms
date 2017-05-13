var CategoryEditor = props =>
<form className="pure-form pure-form-stacked">
    <h1 className="item-title">categories :: { props.item.title || 'new category' }</h1>
</form>;

export default CategoryEditor