import { Grid } from "@mui/material";
import styles from "../css/app.module.css";

export default function Skills() {
    return (
        <Grid className={styles.section} sx={{backgroundColor: '#ebeeee'}} container direction="column" alignItems="center" justifyContent="start">
            <h5 className={styles.sectionIntro}>Skills</h5>
            <Grid container spacing={2} style={{ overflowWrap: 'break-word' }}>
                <Grid item xs={12} sm={12} md={4} lg={4} xl={4} container justifyContent='center'>
                    <div className={styles.skillBox}>
                        <img src='Skills3.png' style={{ borderRadius: '10px' }} alt="Language Icon"></img>
                        <h3>Languages</h3>
                        C++, JavaScript, Typescript, HTML/CSS, Mainframe Assembler, Python
                    </div>
                </Grid>
                <Grid item xs={12} sm={12} md={4} lg={4} xl={4} container justifyContent='center'>
                    <div className={styles.skillBox}>
                        <img src='Skills1.png' style={{ borderRadius: '10px' }} alt="Frameworks Icon"></img>
                        <h3>Frameworks and Databases</h3>
                        React.js, Node.js, Express.js, PostgreSQL, MySQL, Sequelize
                    </div>
                </Grid>
                <Grid item xs={12} sm={12} md={4} lg={4} s container justifyContent='center'>
                    <div className={styles.skillBox}>
                        <img src='Skills2.png' style={{ borderRadius: '10px' }} alt="Tools Icon"></img>
                        <h3>Tools and technologies</h3>
                        Git, Linux, Docker, Google Cloud Platform, Cloud Run, Redis, Postman, OAS3, Github actions
                    </div>
                </Grid>
            </Grid>
        </Grid>
    )
}

