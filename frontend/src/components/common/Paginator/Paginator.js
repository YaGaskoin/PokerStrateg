import React, {useState} from "react";
import css from './Paginator.module.css';

let Paginator = ({totalItemsCount, pageSize, currentPage, perPortion=10, onPageChanged}) => {
    let pagesCount = Math.ceil(totalItemsCount / pageSize);
    let pages = []
    console.log(onPageChanged)
    for (let i = 1; i <= Math.ceil(pagesCount); i++) {
        pages.push(i);
    }
    let portionCount = Math.ceil(pagesCount/ perPortion);
    let [portionNumber, setPortionNumber] = useState(1);
    let leftPortionPageNumber = (portionNumber - 1) * perPortion + 1;
    let rightPortionPageNumber = portionNumber * perPortion;
    return <div className={css.paginator}>
        { portionNumber > 1 &&
        <button onClick={() => {setPortionNumber(portionNumber - 1)}}>PREV</button>}

        {pages
            .filter(p => p >= leftPortionPageNumber && p <=rightPortionPageNumber)
            .map((p) => {
                return <span className={currentPage === p? css.currentPage : css.pageNumber}
                             key={p}
                             onClick={(e) => {
                             onPageChanged(p);}}>{p}</span>
            })
        }
        { portionCount > portionNumber && <button onClick={
            () => {setPortionNumber(portionNumber + 1)}
        }>NEXT</button> }
    </div>
}

export default Paginator