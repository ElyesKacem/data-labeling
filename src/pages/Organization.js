import { Container } from '@mui/material';
import AddButton from '../components/AddButton/AddButton';
import UsersList from '../components/organization/UsersList';
const Organization = () => {
  return (
    <Container>
        <h1>Organization</h1>
        <AddButton  />
        <br />
        <br />
        <UsersList />
    </Container>
  )
}

export default Organization