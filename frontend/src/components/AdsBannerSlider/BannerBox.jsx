import { Link } from "react-router-dom";

const BannerBox = ({ img, link }) => {
  return (
    <div className="relative rounded-xl overflow-hidden group transition-transform duration-500 hover:shadow-2xl hover:-translate-y-1">
      <Link to={link}>
        {/* Image with zoom and brightness change */}
        <img
          src={img.banner}
          alt="Banner"
          className="w-full h-full object-cover transform transition-transform duration-700 ease-in-out group-hover:scale-105 group-hover:brightness-110"
        />

        {/* Gradient overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-tr from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
      </Link>
    </div>
  );
};

export default BannerBox;
