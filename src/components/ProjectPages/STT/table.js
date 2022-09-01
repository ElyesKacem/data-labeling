import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import { IconButton } from '@mui/material';
import './style.css'

function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
}

const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
];

export default function BasicTable(props) {
    const [rows, setRows] = React.useState([]);
    React.useEffect(() => {
        var data = [];
        props.data.map((line) => {
            // console.log('line : ',line)
            data.push({ ...line, 'completed': '-', 'annotated': 'felten' });
            const {id,name}=line;
            console.log(id);
            console.log(name);
            console.log({id,name});
            // console.log(data)
            // console.log(typeof line);
        });
        // const data=[...props.data ,'Completed','Annotated'];
        // console.log(...props.data )
        console.log(data);
        setRows(data);

        //   console.log('data props : ',props.data);

        return () => {

        }
    }, [props.data])

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell align="left"><b>Id</b></TableCell>
                        <TableCell align="left"><b>Name</b></TableCell>
                        <TableCell align="center"><b>Completed</b></TableCell>
                        <TableCell align="center"><b>Annotator</b></TableCell>
                        <TableCell align="center"><b>Element</b></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((line, index) => (
                        <TableRow
                            key={index}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            className="clicked-row"
                            onClick={()=>{
                                console.log("clicked");
                            }}
                        >

                            <TableCell align="left">{index+1}</TableCell>
                            <TableCell align="left">{line.name}</TableCell>
                            <TableCell align="center">{line.completed}</TableCell>
                            <TableCell align="center">{line.annotated}</TableCell>

                            <TableCell align="center">
                                <IconButton aria-label="delete">
                                    <PlayCircleIcon />
                                </IconButton></TableCell>

                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
