import * as React from 'react';
import { useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import axios from '../../api/axios';
import useRefreshToken from '../../hooks/useRefreshToken';
import { Button } from '@mui/material';

const columns = [
  { field: 'firstName', headerName: 'First name', width: 130 },
  { field: 'lastName', headerName: 'Last name', width: 130 },
  { field: 'username', headerName: 'Username', width: 90, },
];
const USERS_URL = "/users"
const UsersList = () => {

  const [users, setUsers] = React.useState();
  const refresh = useRefreshToken();

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();
    const getUsers = async () => {
      try {
        const response = await axios.get(USERS_URL, {
          signal: controller.signal
        });
        console.log(response.data);
        isMounted && setUsers(response.data);
      } catch (error) {
        console.error(error);
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
          ):
          (<><p>no users exists</p>
          <Button onClick={()=>refresh()}>refresh</Button></>
          
          )
    }
    </div>
  );
}
export default UsersList;
