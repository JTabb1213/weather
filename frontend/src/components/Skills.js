import { Grid } from "@mui/material";
import styles from "../css/app.module.css";

export default function Skills() {
    return (
        <Grid className={styles.section} container direction="column" alignItems="center" justifyContent="start">
            <h5 className={styles.sectionIntro}>Skills</h5>
            <div className={styles.skillsContainer}>

                <div className={styles.skillBox}>
                    <img src='Skills3.png' style={{ borderRadius: '10px' }}></img>
                    <h3>Languages</h3>
                    C++, JavaScript, HTML/CSS, Mainframe Assembler, python
                </div>

                <div className={styles.skillBox}>
                    <img src='Skills1.png' style={{ borderRadius: '10px' }}></img>
                    <h3>Frameworks and Databases</h3>
                    React.js, Node.js, Express.js, PostgreSQL, MySQL, Sequelize
                </div>

                <div className={styles.skillBox}>
                    <img src='Skills2.png' style={{ borderRadius: '10px' }}></img>
                    <h3>Tools and technologies</h3>
                    Git, Linux, Docker, Google Cloud Plaborm, Cloud Run, Redis, Postman,OAS3, Github actions
                </div>
            </div>
        </Grid>
    )
}