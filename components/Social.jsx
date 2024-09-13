import Link from "next/link";

import { FaGithub, FaLinkedinIn, FaYoutube, FaTwitter } from "react-icons/fa";

const socials = [
  { icon: <FaGithub />, path: "https://github.com/Goncalves95", target: "_blank" },
  { icon: <FaLinkedinIn />, path: "https://www.linkedin.com/in/fernando-goncalves2202/", target: "_blank" },
  { icon: <FaYoutube />, path: "", target: "_blank" },
  { icon: <FaTwitter />, path: "", target: "_blank" },
];

const Social = ({ containerStyles, iconStyles }) => {
  return (
    <div className={containerStyles}>
      {socials.map((item, index) => {
        return (
          <Link key={index} href={item.path} target={item.target} className={iconStyles}>
            {item.icon}
          </Link>
        );
      })}
    </div>
  );
};

export default Social;
