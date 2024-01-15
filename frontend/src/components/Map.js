import {Grid} from "@mui/material";

function Map({ map }) {
    return (
        <>
            {map && <img style={{width: '100%', height: '100%'}} src={map.mapUrl} />
            }
        </>
    )
}

export default Map;