import { useEffect, useState } from "react";
import { LoadingPlaceHolder } from "../../components/LoadingPlaceHolder";
import { searchAuthors } from "../../api/api";
import { useSearchParams } from "react-router-dom";
import { ProfileCards } from "../../components/ProfileCards";
import { useCallback } from "react";
import LoadMoreButton from "../../components/LoadMoreButton";
import { ServiceError } from "../../components/ServiceError";

export const SearchAuthor = () => {
  const [isLoading, setLoading] = useState(false);
  const [loadMore, setLoadMore] = useState(false);
  const [clicks, setClicks] = useState(4);
  const [authorData, setAuthorData] = useState({});
  const [authorsProfile, setAuthorsProfile] = useState([]);
  const [searchParams] = useSearchParams();
  const [isError, setError] = useState(false);

  useEffect(() => {
    setLoading(true);
    searchAuthors(searchParams.get("q"))
      .then((res) => {
        setAuthorData(res.data);
        setLoading(false);
        if (res.data?.total !== 0) {
          setAuthorsProfile(res.data?.authors.slice(0, 4));
        }
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, [searchParams]);

  const loadMoreClick = useCallback(() => {
    setLoading(true);
    setLoadMore(true);
    setClicks(clicks + 4);
    setAuthorsProfile(authorData?.authors.slice(0, clicks + 4));
    setLoadMore(false);
    setLoading(false);
  }, [clicks, authorData]);

  return (
    <>
      {isLoading ? (
        <>
          <LoadingPlaceHolder times={4} showFor={"author"} />
        </>
      ) : isError ? (
        <ServiceError error={isError} />
      ) : (
        <div className="flex flex-col gap-4 items-center justify-center">
          <div className="font-rem md:w-9/12 w-full">
            Total Authors Found : {authorData?.total}
          </div>
          {authorData?.total === 0 ? (
            <div className="font-meri font-bold ">NO AUTHORS FOUND</div>
          ) : (
            <>
              <ProfileCards authors={authorsProfile} />
              {authorData?.total > clicks ? (
                <LoadMoreButton isLoading={loadMore} onClick={loadMoreClick} />
              ) : null}
            </>
          )}
        </div>
      )}
    </>
  );
};
