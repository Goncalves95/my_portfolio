import Link from "next/link";

import { FaGithub, FaLinkedinIn, FaYoutube } from "react-icons/fa";

const socials = [
  { icon: <FaGithub />, path: "https://github.com/Goncalves95", target: "_blank" },
  { icon: <FaLinkedinIn />, path: "https://www.linkedin.com/in/fernandojcgoncalves/", target: "_blank" },
  { icon: <FaYoutube />, path: "https://www.youtube.com/channel/UCaDB7N_v5ZuUD1BHarmzUZQ", target: "_blank" },
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
