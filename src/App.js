import React from "react"
import Home from "./pages/Home/Home"
import CharacterDetails from "./pages/CharacterDetails/CharacterDetails"
import Locations from "./pages/Locations/Locations"
import LocationDetails from "./pages/LocationDetails/LocationDetails"
import Episodes from "./pages/Episodes/Episodes"
import EpisodeDetails from "./pages/EpisodeDetails/EpisodeDetails"
import {BrowserRouter, Routes, Route} from "react-router-dom"
import './styles/globals.css'
import './styles/variables.css'
import './styles/mixins.css'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/character/:id" element={<CharacterDetails />} />
        <Route path="/locations" element={<Locations />} />
        <Route path="/location/:id" element={<LocationDetails />} />
        <Route path="/episodes" element={<Episodes />} />
        <Route path="/episode/:id" element={<EpisodeDetails />} />
      </Routes>
    </BrowserRouter>
  )
}
