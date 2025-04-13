import React from "react";
import { useState } from "react";
import { MonitorCheck, MonitorX } from "lucide-react";


const Active_inActive_switch = ({isOn, toggleSwitch}) => {


  return (
    <div>
      <label className="relative inline-flex cursor-pointer select-none items-center justify-center rounded-md bg-white p-1">
        <input
          type="checkbox"
          className="sr-only"
          checked={isOn}
          onChange={toggleSwitch}
        />
        <span
          className={`flex items-center space-x-[6px] rounded py-2 px-[10px] mr-auto ml-auto text-sm font-medium transition-all duration-300 ${
            isOn
              ? "text-green-100 bg-green-500"
              : "text-black transition-all duration-300"
          }`}
        >

          <MonitorCheck />
        </span>
        <span
          className={`flex items-center space-x-[6px] rounded py-2 px-[10px] text-sm font-medium transition-all duration-300 ${
            !isOn
              ? "text-green-100 bg-green-500"
              : "text-black transition-all duration-300"
          }`}
        >

          <MonitorX />
        </span>
      </label>
    </div>
  );
};

export default Active_inActive_switch;
