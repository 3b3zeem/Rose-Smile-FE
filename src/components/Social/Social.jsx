import React from "react";
import {
  FaInstagram,
  FaSnapchatGhost,
  FaTiktok,
  FaWhatsapp,
  FaYoutube,
} from "react-icons/fa";

const Social = () => {
  return (
    <div class="fixed top-1/2 left-0 transform -translate-y-1/2 hidden sm:flex flex-col z-500">
      <a
        href="https://www.instagram.com/rosesmileclinic"
        target="_blank"
        class="group relative flex items-center w-8 h-8 ps-1 md:w-12 md:h-12 md:ps-3 bg-[#8b4e3a] hover:w-40 transition-all duration-300 overflow-hidden"
      >
        <FaInstagram color="white" size={20} />
        <span class="absolute left-12 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
          Instagram
        </span>
      </a>

      <a
        href="https://wa.me/966543015553"
        target="_blank"
        class="group relative flex items-center w-8 h-8 ps-1 md:w-12 md:h-12 md:ps-3 bg-[#25D366] hover:w-40 transition-all duration-300 overflow-hidden"
      >
        <FaWhatsapp color="white" size={20} />
        <span class="absolute left-12 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
          WhatsApp
        </span>
      </a>

      <a
        href="https://www.snapchat.com/add/rosesmilesa"
        target="_blank"
        class="group relative flex items-center w-8 h-8 ps-1 md:w-12 md:h-12 md:ps-3 bg-[#FFFC00] hover:w-40 transition-all duration-300 overflow-hidden"
      >
        <FaSnapchatGhost color="white" size={20} />
        <span class="absolute left-12 text-black opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
          Snapchat
        </span>
      </a>

      <a
        href="https://www.tiktok.com/@rosesmiletaif"
        target="_blank"
        class="group relative flex items-center w-8 h-8 ps-1 md:w-12 md:h-12 md:ps-3 bg-black hover:w-40 transition-all duration-300 overflow-hidden"
      >
        <FaTiktok color="white" size={20} />
        <span class="absolute left-12 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
          TikTok
        </span>
      </a>

      <a
        href="https://www.youtube.com/@RoseSmileMakkah"
        target="_blank"
        class="group relative flex items-center w-8 h-8 ps-1.5 md:w-12 md:h-12 md:ps-3 bg-red-700 hover:w-40 transition-all duration-300 overflow-hidden"
      >
        <FaYoutube color="white" size={20} />
        <span class="absolute left-12 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
          YouTube
        </span>
      </a>
    </div>
  );
};

export default Social;
