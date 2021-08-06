import { IconButton } from "@material-ui/core";
import { ArrowBackIosRounded, ArrowForwardIos } from "@material-ui/icons";
import { useRouter } from "next/dist/client/router";
import React from "react";
import { RiMenuFoldLine, RiMenuUnfoldLine, RiAdminLine } from "react-icons/ri";
import appBarStyles from "../../styles/components/commons/AppBar.module.css";

interface AppBarProps {
  open: boolean;
  setOpen: Function;
}

const AppBar = ({ open, setOpen }: AppBarProps) => {
  const router = useRouter();

  const gotoAdminPanel = () => {
    const promptAnswer = prompt("Enter a password for Admin Panel");
    if (promptAnswer === "Bhargavi@2012") {
      router.replace("/admin");
    } else {
      alert("You are not Admin 😂😂😂!");
    }
  };

  return (
    <div className={appBarStyles.appBar}>
      <section className={appBarStyles.left}>
        <IconButton style={{ color: "white" }} onClick={() => setOpen(!open)}>
          {open ? <RiMenuFoldLine /> : <RiMenuUnfoldLine />}
        </IconButton>
        <p className={appBarStyles.logo}>DevOM</p>
      </section>
      <section className={appBarStyles.right}>
        <IconButton style={{ color: "white" }} onClick={gotoAdminPanel}>
          <RiAdminLine />
        </IconButton>
      </section>
    </div>
  );
};

export default AppBar;
