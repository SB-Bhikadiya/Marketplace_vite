import { memo, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { PAGE_ROUTES } from "../../constants/routes";
import { fetchAuthorList } from "../../store/actions/thunks";
import * as selectors from "../../store/selectors";
import UserTopSeller from "./UserTopSeller";

const AuthorList = () => {
  const dispatch = useDispatch();
  const authorsState = useSelector(selectors.authorsState);
  const authors = authorsState.data ? authorsState.data : [];

  useEffect(() => {
    dispatch(fetchAuthorList());
  }, [dispatch]);

  return (
    <div>
      <ol className="author_list">
        {authors &&
          authors.map((author, index) => (
            <Link key={index} to={PAGE_ROUTES.GET_AUTHOR_PATH(author.wallet)}>
              <li>
                <UserTopSeller user={author} />
              </li>
            </Link>
          ))}
      </ol>
    </div>
  );
};
export default memo(AuthorList);
