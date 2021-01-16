import React from 'react';
import ReactPaginate from 'react-paginate';
// import { Pagination } from 'react-bootstrap';
// import { LinkContainer } from 'react-router-bootstrap';

const Paginate = ({ page, pages, keyword, updatePage }) => {
  return pages > 1 && (
    // <Pagination className="row justify-content-center">
    //   <LinkContainer onClick={updatePage} key={page} to={keyword ? `/search/${keyword}/page/${1}` : `/page/${1}`}>
    //     <Pagination.Item active={1 === page}>{1}</Pagination.Item>
    //   </LinkContainer>
    //   <LinkContainer onClick={() => prev()} to={keyword ? `/search/${keyword}/page/${1}` : `/page/${1}`}>
    //     <Pagination.Prev />
    //   </LinkContainer>
    //   {[...Array(Number(page) - 10 <= 0 ? 10 - Number(page) : 5) ,...Array(Number(page) + 10 > Number(page) ? Number(page) - Number(page) : Number(page) + 5).keys()].slice(-11).map(x => (
    //     <LinkContainer onClick={updatePage} key={x + 1} to={keyword ? `/search/${keyword}/page/${x + 1}` : `/page/${x + 1}`}>
    //       <Pagination.Item active={x + 1 === page}>
    //         {x + 1}
    //       </Pagination.Item>
    //     </LinkContainer>
    //   ))}
    //   <LinkContainer onClick={() => next()} to={keyword ? `/search/${keyword}/page/${1}` : `/page/${1}`}>
    //     <Pagination.Next />
    //   </LinkContainer>
    //   <LinkContainer onClick={updatePage} key={pages} to={keyword ? `/search/${keyword}/page/${pages}` : `/page/${pages}`}>
    //     <Pagination.Item active={pages === page}>{pages}</Pagination.Item>
    //   </LinkContainer>
    // </Pagination>
    <ReactPaginate
      className="row justify-content-center"
      previousLabel={'previous'}
      nextLabel={'next'}
      forcePage={page - 1}
      breakLabel={'...'}
      pageCount={pages}
      marginPagesDisplayed={2}
      pageRangeDisplayed={5}
      onPageChange={(page) => updatePage(page.selected + 1, keyword)}
      subContainerClassName={'pages pagination'}
      breakClassName={'page-item'}
      breakLinkClassName={'page-link'}
      containerClassName={'pagination row justify-content-center'}
      pageClassName={'page-item'}
      pageLinkClassName={'page-link'}
      previousClassName={'page-item'}
      previousLinkClassName={'page-link'}
      nextClassName={'page-item'}
      nextLinkClassName={'page-link'}
      activeClassName={'active'}
    />
  );
};

export default Paginate;
