import React from 'react'

interface Props {
    bgColor: string;
}

const Square2 = ({bgColor}: Props) => {
  return (
      <div className={`w-[12.5%] aspect-square  ${bgColor}`}></div>
  );
}

export default Square2