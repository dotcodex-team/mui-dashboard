import React, { useEffect, Fragment,useCallback} from 'react';
import clsx from 'clsx';
import _ from 'lodash'
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Portlet from '@components/shared/Portlet';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import SearchIcon from '@material-ui/icons/Search';
import ClearIcon from '@material-ui/icons/Clear';
import { lighten } from '@material-ui/core/styles/colorManipulator';
import { InputAdornment, TextField, Grid } from '@material-ui/core';
import { searchByText } from '@helpers';

function desc(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function stableSort(array, cmp) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = cmp(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map(el => el[0]);
}

function getSorting(order, orderBy) {
  return order === 'desc' ? (a, b) => desc(a, b, orderBy) : (a, b) => -desc(a, b, orderBy);
}

function EnhancedTableHead(props) {
  const { rows,onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;
  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={numSelected === rowCount && numSelected !== 0}
            onChange={onSelectAllClick}
          />
        </TableCell>
        {Object.keys(rows).map(
          rowName => (
            <TableCell
              key={rowName}
              // sortDirection={orderBy === rowName ? order : false}
              // {...rows[rowName].headProps}
            >
              {/* <TableSortLabel
                active={orderBy === rowName}
                direction={order}
                onClick={createSortHandler(rowName)}
              > */}
                {rows[rowName].headProps.label}
              {/* </TableSortLabel> */}
            </TableCell>
          ),
          this,
        )}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.string.isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const useToolbarStyles = makeStyles(theme => ({
  root: {
    position : 'relative',
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
  },
  highlight:
    theme.palette.type === 'light'
      ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85),
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark,
        },
  spacer: {
    flex: '1 1 100%',
  },
  actions: {
    position : 'absolute',
    right : 10,
    color: theme.palette.text.secondary,
    minWidth : 200
  },
  title: {
    flex: '0 0 auto',
  },
  searchField: {
    maxWidth : 200,
    paddingRight: theme.spacing(2),
    paddingLeft: theme.spacing(2)
  }
}));

const EnhancedTableToolbar = props => {
  const classes = useToolbarStyles();
  const { numSelected,extraHeader,searchText,onSearchChanged,actions,setPage} = props;
  function renderSearch() {
      return (
        <TextField
          className={classes.searchField}
          classes={{root : classes.searchField}}
          value={searchText}
          onChange={event => onSearchChanged(event.target.value)}
          color="inherit"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Tooltip placement="left" title={"Buscar"}>
                  <div>
                    <SearchIcon color="inherit" fontSize="small" />
                  </div>
                </Tooltip>
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  disabled={!searchText}
                  onClick={() => onSearchChanged("")}
                >
                  <ClearIcon color="inherit" fontSize="small" />
                </IconButton>
              </InputAdornment>
            )
          }}
        />
      );
  }
  return (
    <Fragment>
      <Toolbar
        className={clsx(classes.root, {
          [classes.highlight]: numSelected > 0,
        })}
      >
        <div className={classes.title}>
          {numSelected > 0 ? (
            <Typography color="inherit" variant="subtitle1">
              {numSelected} seleccionado(s)
            </Typography>
          ) : (
            <Typography variant="h6" id="tableTitle">
              {props.title}
            </Typography>
          )}
        </div>
        <div className={classes.spacer} />
        <div className={classes.actions}>
          {numSelected > 0 ? (
            <Grid container justify="flex-end" alignItems="center">
              {actions(()=>{
                setPage(0)
              })}
            </Grid>
          ) : (
            renderSearch()
          )}
        </div>
      </Toolbar>
      {extraHeader}
    </Fragment>
  );
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing(3),
  },
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 750,
  },
  tableWrapper: {
    overflowX: 'auto',
  },
}));

function EnhancedTable(props) {
  const classes = useStyles();
  const {title,data : remoteData,rows,setSelected,selected,actions,extraHeader,callbackAction} = props;
  const [searchText, setSearchText] = React.useState('');
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('calories');
  const [page, setPage] = React.useState(0);
  const [data, setData] = React.useState([]);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  
  useEffect(()=>{
      setData(remoteData)
  },[remoteData])

  const onSearchChange = useCallback(searchText=>{
      setSearchText(searchText)
      setData(searchByText(remoteData,searchText,[]))
      setPage(0)
  },[data])
 

  function handleRequestSort(event, property) {
    const isDesc = orderBy === property && order === 'desc';
    setOrder(isDesc ? 'asc' : 'desc');
    setOrderBy(property);
  }

  function handleSelectAllClick(event) {
    if (event.target.checked) {
      const newSelecteds = data.map(n => n.id);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  }

  function handleClick(event, id) {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }
    setSelected(newSelected);
  }

  function handleChangePage(event, newPage) {
    setPage(newPage);
  }

  function handleChangeRowsPerPage(event) {
    setRowsPerPage(event.target.value);
  }
  const isSelected = name => selected.indexOf(name) !== -1;

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);

  function searchFilter(d){
    return searchByText(d,searchText,[]);
  }
  return (
    <div className={classes.root}>
      <Portlet className={classes.paper}>
        <EnhancedTableToolbar 
        title={title} 
        extraHeader={extraHeader}
        actions={actions}
        setPage={setPage}
        numSelected={selected.length} 
        selected={selected}
        searchText={searchText} 
        onSearchChanged={onSearchChange} />
        <div className={classes.tableWrapper}>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            size={'medium'}
          >
            <EnhancedTableHead
              rows={rows}
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={data.length}
            />
              <TableBody style={{position : 'relative'}}>
                {stableSort(data, getSorting(order, orderBy))
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map(row => {
                    const isItemSelected = isSelected(row.id);
                    return (
                      <TableRow
                        hover
                        onClick={event => handleClick(event, row.id)}
                        role="checkbox"
                        aria-checked={isItemSelected}
                        tabIndex={-1}
                        key={row.id}
                        selected={isItemSelected}
                      >
                        <TableCell padding="checkbox">
                          <Checkbox checked={isItemSelected} />
                        </TableCell>
                        {Object.keys(rows).map(rowKey=>(
                          <TableCell key={rowKey}> {
                            rows[rowKey].render(row)
                          }
                          </TableCell>
                        ))}
                      </TableRow>
                  );
                }) 
              }
              {emptyRows > 0 && (
                <TableRow style={{ height: 49 * emptyRows }}>
                  <TableCell colSpan={6}>
                      { data.length === 0 && (
                        <Typography component="p" variant="caption" color="textSecondary" align="center">
                          {`No se encontraron ${_.lowerCase(title)}`}
                        </Typography>
                      )}
                  </TableCell>
                </TableRow>
              )}
              {/* {renderEmpty(emptyRows, data)} */}
            </TableBody> 
          </Table>
        </div>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={data.length}
          rowsPerPage={rowsPerPage}
          page={page}
          labelRowsPerPage="Usuarios por página"
          labelDisplayedRows={(row) => `${row.from}-${row.to} de ${row.count}`}
          backIconButtonProps={{
            'aria-label': 'Previous Page',
          }}
          nextIconButtonProps={{
            'aria-label': 'Next Page',
          }}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Portlet>
    </div>
  );
}


export default EnhancedTable;