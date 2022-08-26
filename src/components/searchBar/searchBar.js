import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';


export default function SearchBar(props) {
  const options = props.data.map((user)=>user.username) || ['Option 1', 'Option 2'];
  
  const [value, setValue] = React.useState();
  const [inputValue, setInputValue] = React.useState('');

  return (
    <div>
      
      <Autocomplete
        value={value}
        // onChange={(event, newValue) => {
        //   props.sendToParent("false");
        // }}
        inputValue={inputValue}
        onInputChange={(event, newInputValue) => {
          setInputValue(newInputValue);
          const newCollabList = props.data.filter(line=>line.username!==newInputValue);
          const hiddenCollab=props.hiddenCollab;
          hiddenCollab.push(
            {
              user:newInputValue,
              id:props.id
            }
          );
          props.setHiddenCollab(hiddenCollab);
          props.sendToParent(newCollabList);
        }}
        id="controllable-states-demo"
        options={options}
        sx={{ width: `${props.width}` }}
        renderInput={(params) => <TextField {...params} label='Choose a collab' />}
      />
    </div>
  );
}
