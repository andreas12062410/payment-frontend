import React, { useState } from "react";
import polygon from "../../assets/Images/arrow-down.png";
import "./style.css";

interface Props {
  onSelectChange: (data: Object) => void;
  label?: string;
  optionsList?: any;
  selectValue?: string;
}

export function Select({
  label = "Select Milestone",
  optionsList,
  onSelectChange,
  selectValue = "",
}: Props) {
  let keys = Object.keys(optionsList);
  let values = Object.values(optionsList);
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = React.useRef() as React.MutableRefObject<HTMLInputElement>;
  const handelselect = (value: Object) => {
    setIsOpen(!isOpen);
    onSelectChange(value);
  };

  return (
    <div className="select-container">
      <div onClick={() => setIsOpen(!isOpen)} className="select-label">
        <input readOnly value={selectValue} placeholder={label} />
        <img src={polygon} alt="arrow-down" />
      </div>
      <div
        ref={selectRef}
        style={
          isOpen
            ? { height: selectRef.current.scrollHeight + "px" }
            : { height: "0px" }
        }
        className="select-options"
      >
        <div className="select-option-children">
          <ul>
            {keys.map((item, i) => (
              <li
                key={`${item}${values[i]}${i}`}
                onClick={(e) => {
                  handelselect({ key: item, value: values[i] });
                }}
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

// import React, { useRef, useState } from "react";

// import downAero from "../../assets/Images/arrow-down.png";

// import "./style.css";

// interface Props {
//   handleSelect: (data: string) => void;
//   milestones: Array<any>;
// }

// export const Select = ({ handleSelect, milestones }: Props) => {
//   const [showDropDown, setShowDropDown] = useState(false);
//   const selectRef = React.useRef() as React.MutableRefObject<HTMLInputElement>;

//   let keys = Object.keys(milestones);
//   let values = Object.values(milestones);
//   keys.unshift("Select Milestone");
//   values.unshift("");
//   return (
//     <div
//       ref={selectRef}
//       className="custom-select"
//       style={
//         showDropDown
//           ? { height: selectRef.current.scrollHeight + "px" }
//           : { height: "0px" }
//       }
//       onClick={() => setShowDropDown(!showDropDown)}
//     >
//       <div className="select-box">Select milestone</div>
//       {/* <div className="icon">
//         <img src={downAero} alt="down" />
//       </div> */}
//       {showDropDown && (
//         <div className="dropdown">
//           <div>Item one</div>
//           <div>Item two</div>
//           <div>Item three</div>
//         </div>
//       )}
//     </div>
//     // <select value="" onChange={(e) => handleSelect(e.target.value)}>
//     //   {keys.map((item, i) => {
//     //     return (
//     //       <option
//     //         key={item}
//     //         value={values[i]}
//     //         style={{ WebkitUserSelect: "none" }}
//     //       >
//     //         {item}
//     //       </option>
//     //     );
//     //   })}
//     // </select>
//   );
// };
