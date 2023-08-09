import { useState } from "react";
import { LoadingPlaceHolder } from "../../components/LoadingPlaceHolder";
import { useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import { searchTags } from "../../api/api";
import { Tags } from "../../components/Tags";
import { ServiceError } from "../../components/ServiceError";

export const SearchTag = () => {
  const [isLoading, setLoading] = useState(false);
  const [tagsData, setTagsData] = useState({});
  const [searchParams] = useSearchParams();
  const [tags, setTags] = useState([]);
  const [isError, setError] = useState(false);

  useEffect(() => {
    setLoading(true);
    const query = searchParams.get("q");
    searchTags(query)
      .then((res) => {
        setTagsData(res.data);
        setLoading(false);
        setTags(res.data?.tags);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, [searchParams]);

  return (
    <>
      {isLoading ? (
        <>
          <LoadingPlaceHolder times={8} showFor={"tags"} />
        </>
      ) : isError ? (
        <ServiceError error={isError} />
      ) : (
        <div className="flex flex-col gap-4 items-center justify-center">
          <div className="font-rem md:w-9/12 w-full">
            Total Blogs Found : {tagsData?.total_tags}
          </div>
          {tagsData?.total_tags === 0 ? (
            <div className="font-meri font-bold ">NO TAG FOUND</div>
          ) : (
            <>
              <Tags tagList={tags} />
            </>
          )}
        </div>
      )}
    </>
  );
};
