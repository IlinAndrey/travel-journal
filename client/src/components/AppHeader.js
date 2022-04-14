import React, { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import { IconButton } from "@material-ui/core"
import { makeStyles } from '@material-ui/core/styles'
import HelpOutlineOutlinedIcon from '@material-ui/icons/HelpOutlineOutlined';
import axios from 'axios'

import { Link } from "react-router-dom"

const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      alignItems:'center',
      '& > *': {
        marginLeft: theme.spacing(0.50),
      },
      fontFamily: ['Poppins', 'sans-serif'].join(','),
    },
  }))

export default function AppHeader(props) {

    const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext)
    const classes = useStyles()

    const { handleClickOpen } = props

    const SignOut = async() => {
      try {
        const res = await axios.get('/api/users/logout', { withCredentials: true })
        setIsAuthenticated(true)
        window.location.pathname = '/login'
      } catch (error) {
        console.log('Невозможно выйти')
      }

    }

    return (
    <div style={{position:'relative', backgroundColor:'#99999'}} className="header">
      <div className="navbar fixed-top bg-header">
        <div className="container-fluid">
          <div className="w-100" style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
            <h6 className="navbar-brand header-title">
                My Travel Journal
            </h6>
            <div className={classes.root}>
              <div style={{marginRight:'10px', marginTop:'12px'}} onClick={handleClickOpen}>
                <p style={{fontSize:18, color:'black', cursor:'pointer', color:'aliceblue'}}>Профиль</p>
              </div>
              <div>
              {isAuthenticated 
              ? <button className="btn btn-primary border-0 shadow-none" onClick={() => SignOut()}>Выйти</button>
              : <Link to="/login">
                    <button className="btn btn-primary border-0 shadow-none">Войти</button>
                </Link>}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    )
}
