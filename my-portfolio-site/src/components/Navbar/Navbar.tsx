import { 
  AppBar, 
  Toolbar, 
  Container, 
  Box, 
  Typography, 
  Menu, 
  MenuItem, 
  IconButton,
  Button
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Link } from "react-router-dom";
import React, { useState } from "react";
import "./Navbar.css";
import type { DefaultProps } from "@/utils";

type NavbarProps = DefaultProps & {
  position?: "fixed" | "sticky" | "static", 
  maxWidth?: "xl" | "xs" | false
};

type PagesInfo = {
  name: string, 
  path: string
};

const pages: Array<PagesInfo> = [
  { name: "🏡HOME", path: "/" }, 
  { name: "🔧WORKS", path: "/works" }, 
  { name: "🌱SKILL", path: "/skill" }, 
  { name: "🏆AWARDS", path: "/awards" }
];

export default function Navbar( props: NavbarProps ){
  // ナビゲーションメニューと紐づけるHTML要素を保持
  const [anchorElNav, setAnchorElNav] = useState<HTMLElement | null>(/* initialState = */ null);

  const handleClickAnchor = (evt: React.MouseEvent<HTMLButtonElement>): void =>{
    // 親要素に伝播しないように
    evt.stopPropagation();
    setAnchorElNav(evt.currentTarget);
  };

  const unsetAnchor = (evt: React.MouseEvent<HTMLElement>): void =>{
    // 親要素に伝播しないように
    evt.stopPropagation();
    setAnchorElNav(null);
  }

  return (
    <AppBar 
    id="navbar" 
    className={props.className} 
    position={props.position ? props.position : "fixed"} 
    sx={{maxHeight: "10vh"}}
    >
      <Toolbar disableGutters>
        <Container maxWidth="xl">
          {/* スマホ用ナビバー */}
          <Box 
          sx={{
            display: {xs: "flex", sm: "none"}, 
            justifyContent: "center", 
            alignItems: "center"
          }}
          >
            {/* ハンバーガーメニュー */}
            <IconButton
            size="large" 
            aria-label="Open navigation menu" 
            aria-controls="menu-appbar" 
            aria-haspopup="true"
            onClick={ handleClickAnchor }
            color="inherit"
            >
              <MenuIcon />
            </IconButton>

            {/* ページメニュー */}
            <Menu 
            anchorEl={anchorElNav}
            anchorOrigin={{
              vertical: "top", 
              horizontal: "left"
            }}
            transformOrigin={{
              vertical: "top", 
              horizontal: "left"
            }} 
            open={Boolean(anchorElNav)} 
            onClose={unsetAnchor} 
            sx={{
              display: {
                xs: "block", 
                sm: "none"
              }
            }} 
            >
              {pages.map(page => (
                <MenuItem 
                key={page.name} 
                component={Link} 
                to={page.path} 
                onClick={unsetAnchor}
                >
                  {page.name}
                </MenuItem>
              ))}
            </Menu>

            <Typography 
            component={Link} 
            to="/" 
            sx={{
              fontSize: "1.3rem", 
              fontWeight: "bold"
            }}
            >
              💻dmk2E's Portfolio Site
            </Typography>
          </Box>
          
          {/* PC用ナビバー */}
          <Box 
          sx={{
            display: {xs: "none", sm:"flex"}, 
            justifyContent: "space-between", 
            alignItems: "center", 
          }} 
          onClick={unsetAnchor}
          >
            <Typography 
            component={Link} 
            to="/" 
            sx={{
              fontSize: "1.4rem", 
              fontWeight: "bold", 
              display: "flex", 
            }}
            >
              💻dmk2E's Portfolio Site
            </Typography>
            <Box 
            sx={{
              maxWidth: "50%", 
              flexGrow: 1, 
              display: "flex", 
              justifyContent: "space-evenly"
            }} 
            >
              {pages.map(page => (
                <Button 
                key={page.name} 
                component={Link}
                to={page.path} 
                sx={{fontSize: "1.2rem", fontWeight: "bold"}}
                >
                  {page.name}
                </Button>
              ))}
            </Box>
          </Box>
        </Container>
      </Toolbar>
    </AppBar>
  );
}