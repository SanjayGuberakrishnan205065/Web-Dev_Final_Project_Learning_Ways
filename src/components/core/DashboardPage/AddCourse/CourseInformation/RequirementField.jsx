import React, { useState, useEffect } from "react";

export default function RequirementField({
  name,
  label,
  register,
  errors,
  setValue,
  getValue,
}) {
  const [requirement, setRequirement] = useState("");
  const [requirementList, setRequirementList] = useState([]);

  const addRequirement = () => {
    if (requirement) {
      setRequirementList([...requirementList, requirement]);
      setRequirement("");
    }
  };

  const removeRerquirement = (index) => {
    const updatedRequirementList = [...requirementList];
    updatedRequirementList.splice(index, 1);
    setRequirementList(updatedRequirementList);
  };

  // register the input value in form on first render

  useEffect(() => {
    register(name, { required: true, validate: (value) => value.length > 0 });
  }, []);

  useEffect(() => {
    setValue(name, requirementList);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [requirementList]);

  return (
    <div className="flex flex-col space-y-2">
      <label htmlFor={label} className=" lable-style">

        {label} <sup className="text-pink-200">*</sup>
      </label>

      <div className="flex flex-col items-start space-y-2">
        <input
          type="text"
          id={name}
          value={requirement}
          onChange={(e) => setRequirement(e.target.value)}
          className=" form-style w-full"
          placeholder="Enter Requirements"
        />
        <button
          type="button"
          onClick={addRequirement}
          className=" font-semibold text-yellow-300"
        >
          Add
        </button>
      </div>

      {requirementList.length > 0 && (
        <ul className="mt-2 list-inside list-disc">
          {requirementList.map((requirement, index) => (
            <li key={index} className="flex items-center text-richblack-100">
              <span>{requirement}</span>
              <button
                type=" button"
                className="ml-2 text-xs text-pure-greys-300 "
                onClick={() => removeRerquirement(index)}
              >
                {" "}
                Remove{" "}
              </button>
            </li>
          ))}
        </ul>
      )}
      {errors[name] && (
        <span className="ml-2 text-xs tracking-wide text-pink-200">
          {label} is required
        </span>
      )}

    </div>
  );
}
