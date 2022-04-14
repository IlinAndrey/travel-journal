import React, { useContext } from 'react'
import { Popup } from 'react-map-gl'
import Avatar  from '@material-ui/core/Avatar'
import { makeStyles } from '@material-ui/core/styles'
import { AuthContext } from '../context/AuthContext'

const useStyles = makeStyles((theme) => ({
    avi:{
        width: theme.spacing(6),
        height: theme.spacing(6)
    }
}))


export default function CurrentLocationPopup(props){

    const classes = useStyles()
    const { currentUser } = useContext(AuthContext)
    const { currLocationPopup, setCurrLocationPopup, coordinates } = props

    if(currLocationPopup){
        return(
            <Popup
                latitude={coordinates.latitude}
                longitude={coordinates.longitude}
                closeButton={true}
                closeOnClick={false}
                onClose={() => setCurrLocationPopup(false)}
                anchor="top"
            >
                {currentUser ? <div className="card-map">
                    <div className="mt-1">
                        <Avatar className={classes.avi} alt="profile-avi" src="https://icons.veryicon.com/png/System/Android%201/Users%20user.png"/>
                    </div>
                    <small style={{fontWeight:'600', color:'tomato'}} className="mt-1">{currentUser.username && currentUser.username}</small>
                    <h6 style={{fontWeight:'300'}} className="mt-1">
                        Добро пожаловать, {currentUser.username && currentUser.username}. Ты находишься здесь. Чтобы создать пин, просто сделайте двойное нажатие на нужное место после чего вы сможете поделиться своими воспоминаниями, опытом или любимым делом, связанным с этим местом. Заполните все формы, чтобы создать пин.
                    </h6>
                    </div> :  <div className="card-map">
                    <div className="mt-1">
                        <Avatar className={classes.avi} alt="profile-avi" src="http://cdn.onlinewebfonts.com/svg/img_74993.png"/>
                    </div>
                    <small style={{fontWeight:'600', color:'tomato'}} className="mt-1">You</small>
                        <h6 style={{fontWeight:'300'}} className="mt-1">
                            Войдите чтобы делиться впечатлениями о любимых местах.
                        </h6>
                </div>}
            </Popup>
        )
    } else{
        return(
            <div></div>
        )
    }
}
