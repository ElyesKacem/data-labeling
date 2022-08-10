import * as React from 'react';
import { useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import { useNavigate, useLocation } from 'react-router-dom';


const columns = [
  { field: 'firstName', headerName: 'First name', width: 130 },
  { field: 'lastName', headerName: 'Last name', width: 130 },
  { field: 'username', headerName: 'Username', width: 90, },
];
const USERS_URL = "/users"
const UsersList = () => {

  const [users, setUsers] = React.useState();
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();
    const getUsers = async () => {
      try {
        const response = await axiosPrivate.get(USERS_URL, {
          signal: controller.signal
        });
        console.log('get all users response', response.data);
        isMounted && setUsers(response.data);
      } catch (error) {
        console.error(error);
        navigate('/login', { state: { from: location }, replace: true })
      }
    }
    getUsers();

    return () => {
      isMounted = false;
      controller.abort();
    }
  }, [])
  return (
    <div style={{ height: 400, width: '100%' }}>
      {users?.length
        ? (
          <DataGrid
            rows={users}
            columns={columns}
            getRowId={(row) => row._id}
            pageSize={5}
            rowsPerPageOptions={[5]}
          />
        ) :
        <p>no users exists</p>
      }
    </div>
  );
}
export default UsersList;
