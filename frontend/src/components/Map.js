function Map({ map }) {
    return (
        <>
            {map && <div>
                <img style={{width: '100%', height: '100%'}} src={map.mapUrl} />
            </div>}
        </>
    )
}

export default Map;