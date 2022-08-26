import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';


export default function SearchBar(props) {
  // const options = props.data.map((user) => user.username) || ['Option 1', 'Option 2'];

  const [value, setValue] = React.useState();
  const [inputValue, setInputValue] = React.useState('');

  return (
    <div>

      <Autocomplete
        // value={value}
        // onChange={(event, newValue) => {
        //   props.sendToParent("false");
        // }}
        inputValue={inputValue}
        onInputChange={(event, newInputValue) => {
          // if(inputValue===""){
          if (inputValue === '') {
            const newUsersOptionList = props.options.filter(user=>user!==newInputValue);
            props.hiddenCollab.push({
              id:props.id,
              user:newInputValue
            });
            props.setHiddenCollab(props.hiddenCollab);
            props.setUsersOptions(newUsersOptionList);

            // const newCollabList = props.data.filter(line => line.username !== newInputValue);
            // // const hiddenCollab = props.hiddenCollab;
            // props.hiddenCollab.push(newInputValue);
            // props.setHiddenCollab(props.hiddenCollab);
            // props.sendToParent(newCollabList);
            // console.log(newCollabList);
            console.log('hidden collabs :',props.hiddenCollab);
          }
          else {
            const newUsersOptionList = props.options.filter(user=>user!==newInputValue);
            props.hiddenCollab.push({
              id:props.id,
              user:newInputValue
            });

            props.hiddenCollab.filter(user=>user.user!==inputValue);
            props.setHiddenCollab(props.hiddenCollab);

            newUsersOptionList.push(inputValue);

            props.setUsersOptions(newUsersOptionList);

            console.log('hidden collabs :',props.hiddenCollab);
            // console.log('inputValue',inputValue);
            // props.data.push(inputValue);
            // const newCollabList = props.data.filter(line => line.username !== newInputValue);
            // props.sendToParent(newCollabList);
            // console.log('adding ',inputValue,'to the list bellow : ',props.data);
            // props.hiddenCollab.push(newInputValue);
            // props.setHiddenCollab(props.hiddenCollab);
          }
          setInputValue(newInputValue);
          
          
          
          
          
          // }
          // const hiddenCollab=props.hiddenCollab;
          // hiddenCollab.push(
          //   {
          //     user:newInputValue,
          //     id:props.id
          //   }
          // );
          // props.setHiddenCollab(hiddenCollab);
          // console.log('hiddenCollab : ',hiddenCollab);
        }}
        // id={props.id}
        options={props.options}
        sx={{ width: `${props.width}` }}
        renderInput={(params) => <TextField {...params} label='Choose a collab' />}
      />
    </div>
  );
}
