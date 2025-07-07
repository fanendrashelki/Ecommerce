import React from "react";
import { Link } from "react-router-dom";
const BannerBox = (props) => {
  return (
    <div>
      <div className="box banner-box overflow-hidden rounded-lg group">
        <Link to={props.link}>
          <img
            src={props.img}
            alt=""
            className="w-full group-hover:scale-110 group-hover:rotate-2 transition-all "
          />
        </Link>
      </div>
    </div>
  );
};

export default BannerBox;
