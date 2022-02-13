import Link from "next/link";

import { navLinkIcons } from "../../../utils";
import { getProfileIcon } from "../../../utils";
import DropdownContainer from "../DropdownContainer/DropdownContainer";
import { toggleDropdown } from "../../../redux/dropdown/dropdown.actions";
import ProfileDropdown from "../ProfileDropdown/ProfileDropdown";
import Notifications from "../Notifications/Notifications";

import styles from "./NavLinks.module.css";

const generateNavLinks = (pathNames, currentPath) => {
  const navLinks = pathNames.map((pathName) => {
    const path = navLinkIcons[pathName].path;
    const icon =
      path === currentPath
        ? navLinkIcons[pathName].fill
        : navLinkIcons[pathName].outline;

    return (
      <Link key={path} href={path}>
        <a className={styles.navLinkIcon}>{icon}</a>
      </Link>
    );
  });

  return navLinks;
};

const generateMobileNavLinks = (currentPath) => {
  const pathNames = ["home", "messenger", "createPost", "notifications"];
  const navLinks = generateNavLinks(pathNames, currentPath);

  // add profile picture Nav Link
  navLinks.push(
    <div key="profileIconButton" className={styles.dropdownButton}>
      <Link href="/ape" key="/[username]">
        <a>{getProfileIcon("s", currentPath === "/[username]")}</a>
      </Link>
    </div>
  );

  return navLinks;
};

const generateDesktopNavLinks = (currentPath, dropdown, dispatch) => {
  const pathNames = ["home", "messenger", "createPost"];
  const navLinks = generateNavLinks(pathNames, currentPath);

  // add notifications button and profile button
  const getDropdownContainer = (buttonType) => {
    if (dropdown === buttonType) {
      return (
        <DropdownContainer
          topOffset={buttonType === "profile" ? "100%" : "70%"}
        >
          {buttonType === "profile" ? <ProfileDropdown /> : <Notifications />}
        </DropdownContainer>
      );
    }
  };

  const notificationsButton = (
    <div
      key="notificationsButton"
      className={styles.dropdownButton}
      tabIndex={0}
      onBlur={() => dispatch(toggleDropdown(""))}
    >
      <div
        className={styles.dropdownIconContainer}
        onClick={() => dispatch(toggleDropdown("notifications"))}
      >
        {
          navLinkIcons.notifications[
            dropdown === "notifications" ? "fill" : "outline"
          ]
        }
      </div>
      {getDropdownContainer("notifications")}
      {currentPath !== "/account/notifications" && <Notifications />}
    </div>
  );

  const profileButton = (
    <div key="profileIconButton" className={styles.dropdownButton}>
      <div
        className={styles.dropdownIconContainer}
        tabIndex={0}
        onClick={() => dispatch(toggleDropdown("profile"))}
        onBlur={() => dispatch(toggleDropdown(""))}
      >
        {getProfileIcon("s", currentPath === "/[username]")}
        {getDropdownContainer("profile")}
      </div>
    </div>
  );

  navLinks.push(notificationsButton, profileButton);

  return navLinks;
};

export { generateMobileNavLinks, generateDesktopNavLinks };
