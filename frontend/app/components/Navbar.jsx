"use client";
import React, { useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import Logo from "./Logo";
import { Menu, MenuItem, IconButton } from "@mui/material";
import LogoutIcon from '@mui/icons-material/Logout';

function Navbar() {
  const { data } = useSession();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    signOut();
    handleClose();
  };

  return (
    <div className="absolute top-0 flex justify-between h-20 bg-blue-200 shadow-md w-full ">
      <Logo />
      <div>
          <IconButton onClick={handleClick}>
            <Image
              src={data.user.image}
              alt={data.user.name || "User Avatar"}
              width={50}
              height={50}
              className="rounded-full"
            />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
          >
            <MenuItem onClick={handleLogout}>Logout <span className='ml-10'><LogoutIcon /></span></MenuItem>
          </Menu>
        </div>
    </div>
  );
}

export default Navbar;
