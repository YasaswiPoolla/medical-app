
import { useDispatch } from "react-redux";
import { nextPage, itemsPerPage } from "../Reducer/PaginationReducer";
import { useEffect, useState } from "react";
import Pagination from "@mui/material/Pagination";
import { DEFAULT_ITEMS_PER_PAGE, List, modalMargin } from "../Utils";

function CustomPagination(props) { 
  const [formValues, setFormValues] = useState({
    NoOfPageItems: DEFAULT_ITEMS_PER_PAGE,
  });
  const [currentPage, setCurrentPage] = useState(1);
  const dispatch = useDispatch();

  useEffect(() => {
    setCurrentPage(props?.currentPage);
  }, [props?.currentPage]);

  const handleChange = (event, value) => {
    setCurrentPage(value);
    nextPage(dispatch, value);
  };

  const handleItemsPerPage = (event) => {
    const value = parseInt(event.target.value);
    setFormValues({ ...formValues, noOfPageItems: value });
    itemsPerPage(dispatch, value);
  };

  let itemsList = List;

  return (
    <div style={modalMargin}>
      <div className="pagination-left">
        <div className="d-flex">
          <label className="me-2 mt-1 pagnation-font">Rows Per Page: </label>
          <select
            className="pagination_dropdown form-select"
            name="noOfPageItems"
            value={formValues.noOfPageItems}
            onChange={handleItemsPerPage}
          >
            {itemsList.map((val, index) => (
              <option key={index} value={val}>
                {val}
              </option>
            ))}
          </select>
        </div>
      </div>

      <Pagination
        count={props.totalPages}
        variant="outlined"
        shape="rounded"
        showFirstButton
        showLastButton
        page = {currentPage + 1}
        value = {formValues.noOfPageItems}
        onChange = {handleChange}
      />
    </div>
  );
}

export default CustomPagination;
