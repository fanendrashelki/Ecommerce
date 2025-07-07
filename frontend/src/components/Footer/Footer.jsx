import React from "react";
import { LiaShippingFastSolid } from "react-icons/lia";
import { TbTruckReturn } from "react-icons/tb";
import { BsWallet2 } from "react-icons/bs";
import { BiSupport } from "react-icons/bi";
import { LiaGiftSolid } from "react-icons/lia";
import { IoChatboxEllipsesOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { FaFacebookF, FaInstagram, FaPinterestP } from "react-icons/fa";
import { FiYoutube } from "react-icons/fi";
import { FaXTwitter } from "react-icons/fa6";

import img1 from "../../assets/master_card.png";
import img2 from "../../assets/carte_bleue.png";
import img3 from "../../assets/paypal.png";
import img4 from "../../assets/visa.png";
import img5 from "../../assets/american_express.png";

const Footer = () => {
  return (
    <>
      <footer className="py-6 bg-[#fafafa]">
        <div className="container mx-auto px-4">
          {/* Top Icons */}
          <div className="flex flex-wrap justify-center gap-y-6 gap-x-4 px-4 py-8 max-w-7xl mx-auto">
            {[
              {
                icon: <LiaShippingFastSolid />,
                title: "Free Shipping",
                subtitle: "For all Orders Over $100",
              },
              {
                icon: <TbTruckReturn />,
                title: "30 Days Returns",
                subtitle: "For all Exchange Products",
              },
              {
                icon: <BsWallet2 />,
                title: "Secured Payment",
                subtitle: "All Payment Cards Accepted",
              },
              {
                icon: <LiaGiftSolid />,
                title: "Special Gifts",
                subtitle: "On Your First Product Order",
              },
              {
                icon: <BiSupport />,
                title: "Support 24/7",
                subtitle: "Contact Us Anytime",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="w-[45%] sm:w-[30%] md:w-[18%] lg:w-[15%] flex flex-col items-center justify-center group text-center px-2"
              >
                <div className="text-[40px] transition-all duration-300 group-hover:text-[#35ac75] group-hover:-translate-y-1">
                  {item.icon}
                </div>
                <h3 className="text-[15px] font-semibold mt-2">{item.title}</h3>
                <p className="text-[11px] text-gray-600 font-medium leading-snug">
                  {item.subtitle}
                </p>
              </div>
            ))}
          </div>

          <hr className="border-t border-[rgba(0,0,0,0.1)]" />

          {/* Footer Content */}
          <div className="footer flex flex-col lg:flex-row py-8 gap-8">
            {/* Contact */}
            <div className="w-full lg:w-[25%] border-b lg:border-b-0 lg:border-r border-[rgba(0,0,0,0.1)] pb-4 lg:pb-0">
              <h2 className="text-[18px] font-[600] mb-4">Contact us</h2>
              <p className="text-[13px] font-[400] pb-4">
                Classyshop - Mega Super Store
                <br /> 507-Union Trade Centre France
              </p>
              <Link className="text-[13px] block" to="mailto:xyz@gmail.com">
                xyz@gmail.com
              </Link>
              <span className="text-[20px] font-[600] block mt-3 mb-5 text-[#35ac75]">
                (+91) 1234-123-123
              </span>
              <div className="flex items-start gap-2">
                <IoChatboxEllipsesOutline className="text-[40px] text-[#35ac75]" />
                <span className="text-[16px] font-[600] text-[#35ac75] leading-5">
                  Online Chat <br /> Get Expert Help
                </span>
              </div>
            </div>

            {/* Links */}
            <div className="w-full lg:w-[40%] flex flex-col md:flex-row pl-0 lg:pl-8 gap-6">
              {/* Products */}
              <div className="w-full md:w-1/2">
                <h2 className="text-[18px] font-[600] mb-4">Products</h2>
                <ul>
                  {[
                    "Price Drop",
                    "New products",
                    "Best sales",
                    "Contact us",
                    "Sitemap",
                    "Stores",
                  ].map((text, i) => (
                    <li key={i} className="text-[14px] my-2">
                      <Link to="/" className="hover:text-[#35ac75]">
                        {text}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Our Company */}
              <div className="w-full md:w-1/2">
                <h2 className="text-[18px] font-[600] mb-4">Our Company</h2>
                <ul>
                  {[
                    "Delivery",
                    "Legal Notice",
                    "Terms and conditions of use",
                    "About us",
                    "Secure payment",
                    "Login",
                  ].map((text, i) => (
                    <li key={i} className="text-[14px] my-2">
                      <Link to="/" className="hover:text-[#35ac75]">
                        {text}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Newsletter */}
            <div className="w-full lg:w-[35%] pl-0 lg:pl-8 pr-0 lg:pr-8">
              <h2 className="text-[18px] font-[600] mb-4">
                Subscribe to newsletter
              </h2>
              <p className="text-[13px] font-[500] mb-4">
                Subscribe to our latest newsletter to get news about special
                discounts.
              </p>
              <form className="mt-1">
                <input
                  type="email"
                  placeholder="Your Email Address"
                  className="w-full h-[40px] border border-[#908f8f] rounded-sm px-4 outline-none focus:border-[rgba(0,0,0,0.3)] mb-4"
                />
                <Button className="btn-org w-full md:w-auto">Subscribe</Button>
                <FormControlLabel
                  control={<Checkbox size="small" />}
                  label="I agree to the terms and conditions and the privacy policy"
                />
              </form>
            </div>
          </div>
        </div>
      </footer>

      {/* Bottom Bar */}
      <div className="bg-white border-t border-[rgba(0,0,0,0.1)] py-5">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
            {/* Social Icons */}
            <ul className="flex items-center justify-center gap-2">
              {[
                FaFacebookF,
                FaXTwitter,
                FaInstagram,
                FiYoutube,
                FaPinterestP,
              ].map((Icon, i) => (
                <li key={i}>
                  <Link
                    to="/"
                    className="w-[35px] h-[35px] border p-2 border-[rgba(0,0,0,0.1)] rounded-full flex items-center justify-center group hover:bg-[#35ac75]"
                  >
                    <Icon className="text-[15px] group-hover:text-white" />
                  </Link>
                </li>
              ))}
            </ul>

            {/* Copyright */}
            <p className="text-[13px]">© 2024 - Ecommerce Template</p>

            {/* Payment Icons */}
            <div className="flex items-center justify-center flex-wrap gap-2">
              {[img1, img2, img3, img4, img5].map((img, i) => (
                <img key={i} src={img} alt="" className="h-[25px]" />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
