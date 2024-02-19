import { Grid } from "@mui/material";
import styles from "../css/app.module.css";
import { useMediaQuery } from 'react-responsive';
import MediaQuery from 'react-responsive'

export default function Skills() {
    return (
        <Grid className={styles.section} container direction="column" alignItems="center" justifyContent="start">
            <h5 className={styles.sectionIntro}>Skills</h5>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={4}>
                    <div className={styles.skillBox}>
                        <img src='Skills3.png' style={{ borderRadius: '10px' }} alt="Language Icon"></img>
                        <h3>Languages</h3>
                        C++, JavaScript, HTML/CSS, Mainframe Assembler, python
                    </div>
                </Grid>
                <Grid item xs={12} sm={4}>
                    <div className={styles.skillBox}>
                        <img src='Skills1.png' style={{ borderRadius: '10px' }} alt="Frameworks Icon"></img>
                        <h3>Frameworks and Databases</h3>
                        React.js, Node.js, Express.js, PostgreSQL, MySQL, Sequelize
                    </div>
                </Grid>
                <Grid item xs={12} sm={4}>
                    <div className={styles.skillBox}>
                        <img src='Skills2.png' style={{ borderRadius: '10px' }} alt="Tools Icon"></img>
                        <h3>Tools and technologies</h3>
                        Git, Linux, Docker, Google Cloud Plaborm, Cloud Run, Redis, Postman,OAS3, Github actions
                    </div>
                </Grid>
            </Grid>
        </Grid>
    )
}

