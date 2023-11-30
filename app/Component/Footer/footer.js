import React from "react";
import { FaTwitter } from "react-icons/fa";
import { RiInstagramFill } from "react-icons/ri";
import { FaFacebookF } from "react-icons/fa";

function Footer() {
  return (
    <div className="w-full bg-black text-white h-60">
      <div className="w-full h-10 bg-gradient-to-r from-white via-pink-500 to-red-500 shadow-lg flex justify-between px-8">
        <div>
          <img
            src="https://dilfoods.in/wp-content/uploads/2023/04/Dil-Foods-new-logo.png"
            className="h-full w-11"
          />
        </div>
        <div className="flex gap-5 items-center cursor-pointer">
          <FaFacebookF />
          <RiInstagramFill />
          <FaTwitter />
        </div>
      </div>
      <div className="w-full flex justify-center bg-black text-white">
        <div className="w-11/12 grid grid-cols-3 mt-6">
          <div className="w-3/4">
            <h4 className="mb-5">Dil Foods</h4>
            <p>
              We're bringing the restaurant biz into the 21st century by making
              it easy for foodies to chow down on their fave dishes from the
              comfort of their own couch.
            </p>
          </div>
          <div className="w-3/4">
            <ul className="mb-5">
              <li className="mb-2">
                <a href="#">Connect</a>
              </li>
              <li className="mb-2">
                <a href="#">Privacy Policy</a>
              </li>
              <li className="mb-2">
                <a href="#">Terms and Conditions</a>
              </li>
            </ul>
          </div>
          <div className="w-3/4">
            <h4>Contact us</h4>
            <ul className="my-2 ">
                <li className="mb-2">+917892972872</li>
                <li className="mb-2">heloo@dilfoods.com</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
