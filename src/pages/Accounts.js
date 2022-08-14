import React from 'react'
import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import AccountsCard from '../components/AccountsCard/AccountsCard'
import AddAccountButton from '../components/AddAccountButton/AddAccountButton'
import useAxiosPrivate from '../hooks/useAxiosPrivate';

const Accounts = () => {
  
  const [users, setUsers] = React.useState([]);
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const location = useLocation();
  const USERS_URL = "/users"

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
        // navigate('/login', { state: { from: location }, replace: true })
      }
    }
    getUsers();

    return () => {
      isMounted = false;
      controller.abort();
    }
  }, [])

  return (
    <div>
        <h2>Accounts</h2>
        <p>All accounts :</p>
        <AddAccountButton />


        <br />

{users.map((data) => (

        <AccountsCard data={data}/>
))}
    </div>
  )
}

export default Accounts