import { makeStyles } from "@mui/styles";
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";

const useStyles = makeStyles({
  root: {
    maxWidth: 800,
    margin: "0 auto",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
});

const ExampleComponent = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.header}>
        <h2>titulo</h2>
        <Button variant="contained" color="primary">Agregar</Button>
      </div>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {/* Renderizar filas de datos aquí */}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default ExampleComponent;