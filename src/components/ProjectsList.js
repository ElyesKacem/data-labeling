import React from 'react'
import { Container, Grid } from '@mui/material';
import MediaCard from './media cards/mediacard';
import Button from '@mui/material/Button';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
const ProjectsList = () => {
    return (
        <Container>
            <Button 
            // onClick={handleClickOpen}
             style={{ textTransform: 'none', backgroundColor: '#38a728' }} variant="contained" startIcon={<AddOutlinedIcon />}>
            Create new project
          </Button> <br /> <br />
            <Grid container spacing={3}>
                <Grid item xs={3}>
                    <MediaCard />
                </Grid>
                <Grid item xs={3}>
                    <MediaCard />
                </Grid>
                <Grid item xs={3}>
                    <MediaCard />
                </Grid>
                <Grid item xs={3}>
                    <MediaCard />
                </Grid>
            </Grid>
        </Container>
    )
}
 export default ProjectsList