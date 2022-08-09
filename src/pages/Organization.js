import React from 'react'
import { Container, Grid } from '@mui/material';
import AddButton from '../components/AddButton/AddButton';
import DataTable from '../components/organization/UsersList';
const Organization = () => {
  return (
    <Container>
        <h1>Organization</h1>
        <AddButton  />
        <br />
        <br />
        <DataTable />
    </Container>
  )
}

export default Organization