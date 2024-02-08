import Prop from "prop-types";
import { useEffect, useState } from "react";
import { addTag, getTags } from "../../api/api";
import Creatable from "react-select/creatable";
import { useToken } from "../../Hooks/useToken";

export const Taglist = ({ selected, data, selectedValue }) => {
  const [tags, setTags] = useState([]);
  const token = useToken();
  const [isLoading, setLoading] = useState(false);
  const [value, setValue] = useState();

  const handleAddTag = (e) => {
    setLoading(true);
    addTag(token, e)
      .then((res) => {
        if (res.status === 200) {
          setLoading(false);
          setTags([...tags, { value: e, label: e }]);
          selected({ ...data, tag: e });
          setValue({ value: e, label: e });
        }
      })
      .catch(() => {
        setLoading(false);
      });
  };

  const handleChange = (newvalue) => {
    setValue(newvalue);
    selected({ ...data, tag: newvalue?.value });
  };

  useEffect(() => {
    if (selectedValue) {
      setValue(selectedValue);
    }
    getTags()
      .then((res) => {
        const tagopt = [];
        for (let d of res.data.tags) {
          tagopt.push({ value: d, label: d });
        }
        setTags(tagopt);
      })
      .catch(() => {});
  }, [selectedValue]);

  return (
    <div className="space-y-3">
      <span className="font-mono text-xl">Select Appropriate Tag : </span>
      <Creatable
        className="border-2 sm:w-60 w-full border-indigo-500 rounded-md"
        options={tags}
        isLoading={isLoading}
        onCreateOption={handleAddTag}
        isClearable
        isDisabled={isLoading}
        theme={{
          colors: {
            primary: "#4b54c5",
            neutral0: "white",
            primary25: "#e0e2ff",
          },
        }}
        onChange={handleChange}
        formatCreateLabel={(value) => {
          return `Create Tag ${value}`;
        }}
        value={value}
        required
      />
    </div>
  );
};

Taglist.propTypes = {
  selected: Prop.func,
  data: Prop.object,
  selectedValue: Prop.any,
};
