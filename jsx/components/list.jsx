var List = props =>
<div className="pure-menu">
    <span className="pure-menu-heading">{ props.action }</span>
    <ul className="pure-menu-list list">
        { props.list.map(
            list => 
            <li className='pure-menu-item' key={ list.id }>
                <a href="#" onClick={ props.listClickHandler } className="pure-menu-link" data-item={ list.slug }>{ list.name }</a>
            </li>
        )}
        <li className='pure-menu-item' key='0'>
            <a href="#" onClick={ props.listClickHandler } className="pure-menu-link addnew" data-item=''>+ new { props.type }</a>
        </li>
    </ul>
</div>

export default List
