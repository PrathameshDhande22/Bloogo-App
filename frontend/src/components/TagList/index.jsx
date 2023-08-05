import Prop from "prop-types";
import { useEffect, useState } from "react";
import { addTag, getTags } from "../../api/api";
import Creatable from "react-select/creatable";
import { useToken } from "../../Hooks/useToken";

export const Taglist = ({ selected, data }) => {
  const [tags, setTags] = useState([]);
  const token = useToken();

  const handleAddTag = (e) => {
    addTag(token, e)
      .then((res) => {
        if (res.status === 200) {
          selected({ ...data, tag: e });
          setTags([...tags, { value: e, label: e }]);
        }
      })
      .catch(() => {});
  };

  useEffect(() => {
    getTags()
      .then((res) => {
        const tagopt = [];
        for (let d of res.data.tags) {
          tagopt.push({ value: d, label: d });
        }
        setTags(tagopt);
      })
      .catch(() => {});
  }, []);

  return (
    <div className="space-y-3">
      <span className="font-mono text-xl">Select Appropriate Tag : </span>
      <Creatable
        className="border-2 w-40 border-indigo-500 rounded-md"
        options={tags}
        onCreateOption={handleAddTag}
        theme={{
          colors: {
            primary: "#4b54c5",
            neutral0: "white",
            primary25: "#e0e2ff",
          },
        }}
        onChange={(e) => {
          selected({ ...data, tag: e.value });
        }}
        formatCreateLabel={(value) => {
          return `Create Tag ${value}`;
        }}
        required
      />
    </div>
  );
};

Taglist.propTypes = {
  selected: Prop.func,
  data: Prop.object,
};
