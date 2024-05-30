import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styles from "./profilepage.module.css";
import { fetchProfileData, fetchLocationData, fetchOriginData, fetchEpisodeData } from "../utils/api";

export default function ProfilePage() {
    const { id } = useParams();
    const [profileData, setProfileData] = useState({ location: {}, origin: {} });
    const [locationData, setLocationData] = useState({});
    const [originData, setOriginData] = useState({});
    const [episodes, setEpisodes] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const profileData = await fetchProfileData(id);
            setProfileData(profileData);

            if (profileData.location.url) {
                const locationData = await fetchLocationData(profileData.location.url);
                setLocationData(locationData);
            }

            if (profileData.origin.url) {
                const originData = await fetchOriginData(profileData.origin.url);
                setOriginData(originData);
            }

            if (profileData.episode) {
                const episodesData = await fetchEpisodeData(profileData.episode);
                setEpisodes(episodesData);
            }
        };

        fetchData();
    }, [id]);

    return (
        <div className={styles.container}>
            <img className={styles.img} src={profileData.image} alt="Avatar" />
                <div>{profileData.name}</div>
                <div>{profileData.status} - {profileData.species}</div>
                <div>Gender: {profileData.gender}</div>
                <div>Last known location:</div>
                <div>
                    {profileData.location.name}
                    {locationData.type}
                    {locationData.dimension}
                    {locationData.residents && <div>Residents: {locationData.residents.length}</div>}
                </div>
                <div>First seen in:</div>
                <div>
                    {profileData.origin.name}
                    {originData.type}
                    {originData.dimension}
                    {originData.residents && <div>Residents: {originData.residents.length}</div>}
                </div>
                <div>Related Episodes:</div>
                <ul>
                    {episodes.map((episode) => (
                        <li key={episode.id}>{episode.name}</li>
                    ))}
                </ul>
        </div>
    );
}
