import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';


export default function SearchBar(props) {
  // const options = props.data.map((user) => user.username) || ['Option 1', 'Option 2'];

  const [value, setValue] = React.useState();
  const [inputValue, setInputValue] = React.useState('');

  const [roleValue, setRoleValue] = React.useState('annotator');


  const updatingUserList = (id, username) => {
    const userToUpdate = props.projectUsers.filter((user) => user.id === id);


    const userLine = {
      id: userToUpdate[0].id,
      user: username,
      role: userToUpdate[0].role,
    }
    const finalProjectList = props.projectUsers.filter((user) => user.id !== id);
    finalProjectList.push(userLine);
    props.setProjectUsers(finalProjectList);
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'space-evenly', marginBottom: 10, alignItems: 'center' }}>

      <Autocomplete
        inputValue={inputValue}
        // value={value}
        value={inputValue}
        disableClearable
        onInputChange={(event, newInputValue) => {
          setInputValue(newInputValue);
        }}

        onChange={(event, newInputValue) => {

          if (inputValue === '') {
            const newUsersOptionList = props.options.filter(user => user !== newInputValue);
            props.hiddenCollab.push({
              id: props.id,
              user: newInputValue
            });
            props.setHiddenCollab(props.hiddenCollab);
            props.setUsersOptions(newUsersOptionList);
          }

          else {
            const newUsersOptionList = props.options.filter(user => user !== newInputValue);
            if (props.hiddenCollab.find(line => line.user === inputValue)) {
              newUsersOptionList.push(inputValue);
            }
            props.setUsersOptions(newUsersOptionList);
            props.hiddenCollab.push({
              id: props.id,
              user: newInputValue
            });
            const aux = props.hiddenCollab.filter(user => user.user !== inputValue);
            props.setHiddenCollab(aux);

          }
          updatingUserList(props.id, newInputValue);
          setInputValue(newInputValue);

        }}
        options={props.options}
        sx={{ width: `${props.width}` }}
        renderInput={(params) => <TextField {...params} label='Choose a collab' />}
      />
      <FormControl sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id={props.id}>Role</InputLabel>
        <Select

          id={String(props.id)}
          value={roleValue}
          label="Role"
          onChange={(e) => {
            setRoleValue(e.target.value);
          }}
        >
          <MenuItem value={'annotator'}>Annotator</MenuItem>
          <MenuItem value={'validator'}>Validator</MenuItem>

        </Select>
      </FormControl>
    </div>
  );
}
