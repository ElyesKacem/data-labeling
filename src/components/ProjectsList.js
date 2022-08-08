import React from 'react'
import { Container, Grid } from '@mui/material';
import MediaCard from './media cards/mediacard'

const ProjectsList = () => {
    return (
        <Container>
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