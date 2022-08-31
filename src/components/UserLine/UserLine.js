import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { Navigate, useLocation } from 'react-router-dom';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import AddIcon from '@mui/icons-material/Add';
import Button from '@mui/material/Button';



export default function UserLine(props) {
    const [users, setUsers] = React.useState([]);

    const [role, setRole] = React.useState('Annotator');
    const [options, setOptions] = React.useState(['first', 'second']);
    // const [selectedUsers, setSelectedUsers] = React.useState([ { id: '', username: '', role: 'Annotator' }]);



    const handleFormChangeCollab = (index,value)=>{
        let data=[...props.selectedUsers];
        if(data[index].username!==''){
            
            
            let d=options;
            d.push(data[index].username);
            
            setOptions(d.sort());
        }
        setOptions(options.filter((line)=>line!==value));
        data[index].username=value;
        const id=users.filter((user)=>user.username===value)[0]._id;
        data[index].id=id
        props.setSelectedUsers(data);
        // console.log(data);
    }

    const handleFormChangeRole = (index,value)=>{
        let data=[...props.selectedUsers];
        data[index].role=value.props.value;
        props.setSelectedUsers(data);
    }

    const addUserCollab = () => {
        props.setSelectedUsers([...props.selectedUsers, { id: '', username: '', role: 'Annotator' }]);
    }

    const handleDeleteCollab = (index) =>{
        let o = [...options];
        if(props.selectedUsers[index].username!==''){

            o.push(props.selectedUsers[index].username);
        }
        setOptions(o.sort());
        let data=[...props.selectedUsers];
        data.splice(index,1);
        props.setSelectedUsers(data);
    }

    const location = useLocation();
    const axiosPrivate = useAxiosPrivate();

    React.useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();
        const getUsers = async () => {
            try {
                const response = await axiosPrivate.get("/users", {
                    signal: controller.signal
                });

                isMounted && setUsers(response.data);

                // setUsersOptionsList(response.data.map((user) => user.username));

            } catch (error) {
                console.error(error);
                Navigate('/login', { state: { from: location }, replace: true })
            }
        }
        getUsers();


        return () => {
            isMounted = false;
            controller.abort();
        }
    }, [])


    React.useEffect(() => {
        //   console.log(...users);
        let newList=users.map((user) => user.username);
        setOptions(newList.sort());
        console.log('users',users);
    }, [users]);


    return (
        <div>


            {
                props.selectedUsers.map((data, index) =>

                    <div key={index}>
                        <div id={index} style={{ display: 'flex', alignItems: 'center' }}>
                            <Autocomplete
                                disableClearable
                                name='username'
                                value={data.username}
                                onChange={(event, newValue) => {
                                    handleFormChangeCollab(index,newValue);
                                    
                                }}
                                // inputValue={inputValue}
                                // onInputChange={(event, newInputValue) => {
                                //     setInputValue(newInputValue);
                                // }}
                                id="controllable-states-demo"
                                // options={options}
                                options={options}
                                sx={{ width: 300 }}
                                renderInput={(params) => <TextField {...params} label="Collaborator" />}
                            />

                            <FormControl sx={{ m: 1, minWidth: 140 }}>
                                <InputLabel id="demo-simple-select-label">Role</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={data.role}
                                    label="Role"
                                    onChange={(e,value)=>{
                                        handleFormChangeRole(index,value);
                                    }}
                                    name='role'
                                >
                                    <MenuItem value='Annotator'>Annotator</MenuItem>
                                    <MenuItem value='Validator'>Validator</MenuItem>

                                </Select>
                            </FormControl>

                            <IconButton onClick={()=>{
                                console.log('hi');
                                handleDeleteCollab(index);
                            }} aria-label="delete">
                                <DeleteIcon />
                            </IconButton>
                        </div>
                    </div>)

            }
            <Button style={{ textTransform: 'none', marginTop: 30 }} variant="outlined" startIcon={<AddIcon />}

                onClick={(e) => {
                    addUserCollab();
                }}
            >
                Add new collab
            </Button>
        </div>
    );
}
