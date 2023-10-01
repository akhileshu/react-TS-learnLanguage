import { AppBar, Toolbar, Typography } from "@mui/material"
import { Link } from "react-router-dom"


function Header() {
  return <AppBar position="static" className="header">
    <Toolbar>
        <Typography mr={"auto"}>
            LearnLanguage
        </Typography>
        <Link  className="link" to={'/'}>Home</Link>
        <Link className="link" to={'/login'}>Login</Link>
    </Toolbar>
  </AppBar>
}

export default Header