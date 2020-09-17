import React from "react";
import "./styles.scss";

const Directory = (props) => {
  return (
    <div className="directory">
      <div className="wrap">
        <div
          className="item"
          style={{
            backgroundImage:
              "url{https://www.marketingmag.com.au/wp-content/uploads/2015/04/young-women-shopping.jpg}"
          }}
        >
          <a>Shop Womens</a>
        </div>
        <div
          className="item"
          style={{
            backgroundImage:
              "url{https://i1.wp.com/nypost.com/wp-content/uploads/sites/2/2018/06/men-shopping-masculine.jpg?quality=80&strip=all&ssl=1}"
          }}
        >
          <a>Shop Mens</a>
        </div>
      </div>
    </div>
  );
};

export default Directory;
