import { useState } from "react";

//salaaah!!!
// export function useInput(defaultValue) {
//   e.preventDefault();
//   const [value, setValue] = useState(defaultValue);
//   const handleValueChange = (e) => setValue(e.target.value);
//   return [value, handleValueChange];
// }

export function useInput(defaultValue) {
  const [value, setValue] = useState(defaultValue);

  const handleValueChange = async (e) => {
    e.preventDefault();
    await setValue(e.target.value);
  };

  return {
    value,
    onChange: handleValueChange,
    //optional jika ada reset
    //reset:()=>setValue(defaultValue)
  };
}
