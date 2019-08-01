import React from "react";

const  Pagination = ({currentPage, itemsPerPage, length, onChangePage})=>{
    const pageCount = Math.ceil(length/itemsPerPage);
    const pages = [];
    for(let i = 1; i<=pageCount; i++){
        pages.push(i)
    }

    return(<>
        {itemsPerPage < length &&
        <div className="mx-auto mt-2">
            <ul className="pagination pagination-sm bg-dark">
                <li className={"page-item "+(currentPage === 1 && "disabled")}>
                    <button
                        className="page-link"
                        onClick={()=>onChangePage(currentPage-1)}>
                        &laquo;
                    </button>
                </li>
                {pages.map( page =>(
                    <li key={page} className={"page-item "+(currentPage === page && "active")}>
                        <button
                            className="page-link"
                            onClick={()=>onChangePage(page)}>
                            {page}
                        </button>
                    </li>)
                )}
                <li className={"page-item "+(currentPage === pageCount && "disabled")}>
                    <button
                        className="page-link"
                        onClick={()=>onChangePage(currentPage+1)}>
                        &raquo;
                    </button>
                </li>
            </ul>
        </div>
        }
    </>);
};

/* Am slicing data here */
Pagination.getData = (items, currentPage, itemsPerPage) =>{
    const start = currentPage + itemsPerPage - itemsPerPage;
    return items.slice(start, start+itemsPerPage-1);
};

export default Pagination;
