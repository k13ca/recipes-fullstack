import { Outlet } from "react-router-dom";
import Header from "../components/header";
import { FaGithub } from "react-icons/fa";
import { CgWebsite } from "react-icons/cg";

export default function Main() {
  return (
    <>
      <Header></Header>
      <Outlet />
      <footer id="footer">
        <a
          href="https://k13caportfolio.netlify.app/"
          target="_blank"
          className="footer-icons"
        >
          <CgWebsite />
        </a>
        <a
          href="https://github.com/k13ca"
          target="_blank"
          className="footer-icons"
        >
          <FaGithub />
        </a>
      </footer>
    </>
  );
}
