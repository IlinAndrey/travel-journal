import React, { useState, useEffect, useContext } from 'react'
import ReactMapGL from 'react-map-gl'
import AppHeader from '../components/AppHeader'
import { AuthContext } from '../context/AuthContext'
import useGeolocation from "../hooks/useGeolocation"
import InfoModal from '../components/InfoModal'
import CurrentLocationMarker from '../components/CurrentLocationMarker'
import CurrentLocationPopup from '../components/CurrentLocationPopup'
import DisplayDroppedPin from '../components/DisplayDroppedPin'
import DisplaySavedPins from '../components/DisplaySavedPins'

export default function Home() {

    const { currentUser } = useContext(AuthContext)

    const coordinates = useGeolocation()
    const [ currLocationPopup, setCurrLocationPopup ] = useState(null)
    const [ locationAccess, setLocationAccess ] = useState('Not Granted')

    const [ newPlace, setNewPlace ] = useState()
    
    const handleAddClick = e => {
        const [longitude, latitude] = e.lngLat;
        setNewPlace({
          lat: latitude,
          long: longitude,
        })
    }

    const [ modalOpen, setModalOpen ] = useState(false)

    const handleClickOpen = () => {
        setModalOpen(true)
    }

    const handleClose = () => {
        setModalOpen(false)
    }

    const [viewport, setViewport] = useState({
        width: "100vw",
        height: "100vh",
        latitude: 39,
        longitude: 44,
        zoom: 3
      })

    useEffect(() => {
        console.log('Home')
        setViewport({
            ...viewport, 
            zoom: 9,
            latitude: coordinates.latitude, 
            longitude: coordinates.longitude
        })
        if(coordinates.location === 'Granted'){
            setLocationAccess('Granted')
        }
    }, [coordinates])

    return (
        <div className="map">
            <AppHeader handleClickOpen={handleClickOpen}/>
            <InfoModal open={modalOpen} handleClose={handleClose}/>
            <ReactMapGL
                width="100vw" 
                height="100vh"
                {...viewport}
                mapboxApiAccessToken='pk.eyJ1IjoieW91Z3hsIiwiYSI6ImNrenVueHJubjE4dmUyb21vbDFlbHJ6MmgifQ.xrcqtzTV5exBR3oKOsucPQ'
                onViewportChange={nextViewport => setViewport(nextViewport)}
                mapStyle="mapbox://styles/yougxl/cl1qy3zds001s15mt5vvt1koz"
                onDblClick={currentUser && handleAddClick}
            >
                <CurrentLocationMarker 
                    coordinates = {coordinates}
                    viewport = {viewport}
                    locationAccess = {locationAccess} 
                    setCurrLocationPopup = {setCurrLocationPopup}/>

                <CurrentLocationPopup
                    currLocationPopup = {currLocationPopup}
                    setCurrLocationPopup = {setCurrLocationPopup}
                    coordinates = {coordinates}
                />
                <DisplaySavedPins viewport = {viewport}/>
                <DisplayDroppedPin 
                    newPlace={newPlace}
                    setNewPlace = {setNewPlace} 
                    viewport={viewport}/>
            </ReactMapGL>
        </div>
    )
}
