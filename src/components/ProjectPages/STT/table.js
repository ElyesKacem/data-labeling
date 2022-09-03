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

export default function BasicTable(props) {
    const [rows, setRows] = React.useState([]);



    React.useEffect(() => {
        var data = [];
        props.data.map((line) => {
            // console.log('line : ',line)
            data.push({ ...line, 'completed': '-', 'annotated': 'felten' });
            const { _id, name } = line;
            console.log(_id);
            console.log(name);
            console.log({ _id, name });

        });

        console.log(data);
        setRows(data);

        return () => {

        }
    }, [props.data])

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell align="left"><b>Id</b></TableCell>
                        <TableCell align="left"><b>File Name</b></TableCell>
                        <TableCell align="center"><b>Annotated by</b></TableCell>
                        <TableCell align="center"><b>Annotated on</b></TableCell>
                        <TableCell align="center"><b>validated by</b></TableCell>
                        <TableCell align="center"><b>validated on</b></TableCell>
                        <TableCell align="center"><b></b></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((line, index) => (
                        <TableRow
                            key={index}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            className="clicked-row"
                            onClick={() => {
                                props.setSelectedFile(line);
                                console.log('selected line : ', line);
                            }}
                        >

                            <TableCell align="left">{index + 1}</TableCell>
                            <TableCell align="left">{line.name}</TableCell>
                            <TableCell align="center">{line.annotatedBy}</TableCell>
                            <TableCell align="center">{line.annotatedOn}</TableCell>
                            <TableCell align="center">{line.validatedBy}</TableCell>
                            <TableCell align="center">{line.validatedOn}</TableCell>

                            <TableCell align="center">
                                <IconButton aria-label="delete" onClick={
                                    () => {
                                        props.setSelectedFile(line);
                                    }
                                }>
                                    <PlayCircleIcon />
                                </IconButton></TableCell>

                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
