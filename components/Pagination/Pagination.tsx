import css from "./Pagination.module.css"
import ReactPaginate from "react-paginate"

interface PaginationProps {
    pageCount: number;
    onPageChange: (selectedItem: { selected: number }) => void;
    currentPage: number; 
}


const Pagination = ({
    pageCount,
    onPageChange,
    currentPage,
}: PaginationProps) => {
    return (
        <ReactPaginate
        pageCount={pageCount}
        onPageChange={onPageChange}
        forcePage={Math.max(0, (currentPage || 1) - 1)}
        containerClassName={css.pagination}
        activeClassName={css.active}
        pageLinkClassName={css.pageLink}
        previousLinkClassName={css.pageLink}
        nextLinkClassName={css.pageLink}
        breakLinkClassName={css.pageLink}
        previousLabel={"←"}
        nextLabel={"→"}
        />
    );
};

export default Pagination;