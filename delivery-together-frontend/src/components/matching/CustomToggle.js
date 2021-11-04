import React from 'react';
import 카테고리 from '../../images/category.png';

const CustomToggle = React.forwardRef(({ onClick }, ref) => (
  <button
    ref={ref}
    style={{ background: 'transparent', outline: 'none', border: 'none' }}
    onClick={(e) => {
      e.preventDefault();
      onClick(e);
    }}
  >
    <img src={카테고리} alt="카테고리" style={{ width: 55, height: 40 }} />
  </button>
));

export default CustomToggle;
