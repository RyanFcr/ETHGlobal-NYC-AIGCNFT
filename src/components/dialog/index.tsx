import React from "react";

export default function Dialog(props: any) {
  return (
    <div onClick={() => props.closeDialog()} className=" bg-black35 fixed top-0 z-20 w-full h-full flex items-center justify-center">
      {props.children}
    </div>
  );
}
