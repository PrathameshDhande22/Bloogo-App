import { useEffect, useState } from "react";
import { test } from "../api/api";
import Prop from "prop-types";
import Spinner from "../components/Spinner";
import { ServiceError } from "../components/ServiceError";

export const SpinPage = ({ children }) => {
  const [isLoading, setLoading] = useState(false);
  const [isError, setasError] = useState(false);

  useEffect(() => {
    setLoading(true);
    test()
      .then((res) => {
        if (res.status === 200) {
          setLoading(false);
        }
      })
      .catch(() => {
        setLoading(false);
        setasError(true);
      });
  }, []);

  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        <ServiceError error={isError} showChildren>
          {children}
        </ServiceError>
      )}
    </>
  );
};

SpinPage.propTypes = {
  children: Prop.node,
};
