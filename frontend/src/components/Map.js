function Map({ map }) {
    return (
        <>
            {map && <img style={{ width: '100%', height: '100%' }} src={map.mapUrl} alt="City map" />
            }
        </>
    )
}

export default Map;