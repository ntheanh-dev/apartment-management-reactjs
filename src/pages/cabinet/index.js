import { Box, Breadcrumbs, Checkbox, IconButton, Link, Tooltip, Typography } from '@mui/material';
import React from 'react';
import { MdKeyboardArrowLeft } from 'react-icons/md';
import { BsArrowDown } from 'react-icons/bs';
import { visuallyHidden } from '@mui/utils';
import { FaTrashAlt } from 'react-icons/fa';
import { MdFilterList } from 'react-icons/md';
import { FormControl, FormLabel, Option, Select, Sheet, Table } from '@mui/joy';
import { MdOutlineKeyboardArrowLeft, MdOutlineKeyboardArrowRight } from 'react-icons/md';
import { Link as LinkTo } from 'react-router-dom';
function createData(name, description, deliveryDate, receivedDate, status) {
    return {
        name,
        description,
        deliveryDate,
        receivedDate,
        status,
    };
}

const rows = [
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Donut', 452, 25.0, 51, 4.9),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
    createData('Honeycomb', 408, 3.2, 87, 6.5),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Jelly Bean', 375, 0.0, 94, 0.0),
    createData('KitKat', 518, 26.0, 65, 7.0),
    createData('Lollipop', 392, 0.2, 98, 0.0),
    createData('Marshmallow', 318, 0, 81, 2.0),
    createData('Nougat', 360, 19.0, 9, 37.0),
    createData('Oreo', 437, 18.0, 63, 4.0),
];

function labelDisplayedRows({ from, to, count }) {
    return `${from}–${to} of ${count !== -1 ? count : `more than ${to}`}`;
}

function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function getComparator(order, orderBy) {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

// Since 2020 all major browsers ensure sort stability with Array.prototype.sort().
// stableSort() brings sort stability to non-modern browsers (notably IE11). If you
// only support modern browsers you can replace stableSort(exampleArray, exampleComparator)
// with exampleArray.slice().sort(exampleComparator)
function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) {
            return order;
        }
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}

const headCells = [
    {
        id: 'name',
        ableSort: true,
        disablePadding: false,
        label: 'Tên',
    },
    {
        id: 'description',
        ableSort: true,
        disablePadding: false,
        label: 'Mô Tả',
    },
    {
        id: 'deliveryDate',
        ableSort: true,
        disablePadding: false,
        label: 'Ngày Giao Tới',
    },
    {
        id: 'receivedDate',
        ableSort: true,
        disablePadding: false,
        label: 'Ngày Nhận',
    },
    {
        id: 'status',
        ableSort: false,
        disablePadding: false,
        label: 'Trạng Thái',
    },
];

function EnhancedTableHead(props) {
    const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };

    return (
        <thead>
            <tr>
                <th>
                    <Checkbox
                        indeterminate={numSelected > 0 && numSelected < rowCount}
                        checked={rowCount > 0 && numSelected === rowCount}
                        onChange={onSelectAllClick}
                        slotProps={{
                            input: {
                                'aria-label': 'select all desserts',
                            },
                        }}
                        sx={{ verticalAlign: 'sub' }}
                    />
                </th>
                {headCells.map((headCell) => {
                    const active = orderBy === headCell.id;
                    return (
                        <th
                            key={headCell.id}
                            aria-sort={active ? { asc: 'ascending', desc: 'descending' }[order] : undefined}
                        >
                            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                            <Link
                                underline="none"
                                color="neutral"
                                textColor={active ? 'primary.plainColor' : undefined}
                                component="button"
                                onClick={createSortHandler(headCell.id)}
                                fontWeight="lg"
                                className="flex flex-row-reverse items-center space-x-4"
                                sx={{
                                    '& svg': {
                                        transition: '0.2s',
                                        transform: active && order === 'desc' ? 'rotate(0deg)' : 'rotate(180deg)',
                                    },
                                    '&:hover': { '& svg': { opacity: 1 } },
                                }}
                            >
                                {active && <BsArrowDown />}
                                {headCell.label}
                                {active ? (
                                    <Box component="span" sx={visuallyHidden}>
                                        {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                    </Box>
                                ) : null}
                            </Link>
                        </th>
                    );
                })}
            </tr>
        </thead>
    );
}
function EnhancedTableToolbar(props) {
    const { numSelected } = props;

    return (
        <Box
            sx={{
                display: 'flex',
                alignItems: 'center',
                py: 1,
                pl: { sm: 2 },
                pr: { xs: 1, sm: 1 },
                ...(numSelected > 0 && {
                    bgcolor: 'background.level1',
                }),
                borderTopLeftRadius: 'var(--unstable_actionRadius)',
                borderTopRightRadius: 'var(--unstable_actionRadius)',
            }}
        >
            {numSelected > 0 ? (
                <Typography sx={{ flex: '1 1 100%' }} component="div">
                    {numSelected} selected
                </Typography>
            ) : (
                <Typography level="body-lg" sx={{ flex: '1 1 100%' }} id="tableTitle" component="div">
                    Món Hàng
                </Typography>
            )}

            {numSelected > 0 ? (
                <Tooltip title="Delete">
                    <IconButton size="sm" color="danger" variant="solid">
                        <FaTrashAlt />
                    </IconButton>
                </Tooltip>
            ) : (
                <Tooltip title="Filter list">
                    <IconButton size="sm" variant="outlined" color="neutral">
                        <MdFilterList />
                    </IconButton>
                </Tooltip>
            )}
        </Box>
    );
}
const Cabinet = () => {
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('description');
    const [selected, setSelected] = React.useState([]);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    const handleRequestSort = (event, property) => {
        if (headCells.find((e) => e.id === property && e.ableSort)) {
            const isAsc = orderBy === property && order === 'asc';
            setOrder(isAsc ? 'desc' : 'asc');
            setOrderBy(property);
        }
    };

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelected = rows.map((n) => n.name);
            setSelected(newSelected);
            return;
        }
        setSelected([]);
    };

    const handleClick = (event, name) => {
        const selectedIndex = selected.indexOf(name);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, name);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
        }

        setSelected(newSelected);
    };

    const handleChangePage = (newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event, newValue) => {
        setRowsPerPage(parseInt(newValue.toString(), 10));
        setPage(0);
    };

    const getLabelDisplayedRowsTo = () => {
        if (rows.length === -1) {
            return (page + 1) * rowsPerPage;
        }
        return rowsPerPage === -1 ? rows.length : Math.min(rows.length, (page + 1) * rowsPerPage);
    };

    const isSelected = (name) => selected.indexOf(name) !== -1;

    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

    const breadcrums = [
        {
            path: '/',
            text: 'Trang Chủ',
        },
        {
            path: '/cabinet',
            text: 'Tủ Đồ',
        },
    ];
    return (
        <div className="p-6 flex flex-col gap-3">
            <Breadcrumbs separator={<MdKeyboardArrowLeft />} aria-label="breadcrumbs">
                {breadcrums.map((item) => (
                    <LinkTo key={item.path} to={item.path} color="neutral" href="#separators">
                        {item.text}
                    </LinkTo>
                ))}
            </Breadcrumbs>

            <Sheet variant="outlined" sx={{ width: '100%', boxShadow: 'sm', borderRadius: 'sm' }}>
                <EnhancedTableToolbar numSelected={selected.length} />
                <Table
                    aria-labelledby="tableTitle"
                    hoverRow
                    sx={{
                        '--TableCell-headBackground': 'transparent',
                        '--TableCell-selectedBackground': (theme) => theme.vars.palette.success.softBg,
                        '& thead th:nth-child(1)': {
                            width: '40px',
                        },
                        '& thead th:nth-child(2)': {
                            width: '30%',
                        },
                        '& tr > *:nth-child(n+3)': { textAlign: 'left' },
                    }}
                >
                    <EnhancedTableHead
                        numSelected={selected.length}
                        order={order}
                        orderBy={orderBy}
                        onSelectAllClick={handleSelectAllClick}
                        onRequestSort={handleRequestSort}
                        rowCount={rows.length}
                    />
                    <tbody>
                        {stableSort(rows, getComparator(order, orderBy))
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((row, index) => {
                                const isItemSelected = isSelected(row.name);
                                const labelId = `enhanced-table-checkbox-${index}`;

                                return (
                                    <tr
                                        onClick={(event) => handleClick(event, row.name)}
                                        role="checkbox"
                                        aria-checked={isItemSelected}
                                        tabIndex={-1}
                                        key={row.name}
                                        // selected={isItemSelected}
                                        style={
                                            isItemSelected
                                                ? {
                                                      '--TableCell-dataBackground':
                                                          'var(--TableCell-selectedBackground)',
                                                      '--TableCell-headBackground':
                                                          'var(--TableCell-selectedBackground)',
                                                  }
                                                : {}
                                        }
                                    >
                                        <th scope="row">
                                            <Checkbox
                                                checked={isItemSelected}
                                                slotProps={{
                                                    input: {
                                                        'aria-labelledby': labelId,
                                                    },
                                                }}
                                                sx={{ verticalAlign: 'top' }}
                                            />
                                        </th>
                                        <th id={labelId} scope="row">
                                            {row.name}
                                        </th>
                                        <td>{row.description}</td>
                                        <td>{row.deliveryDate}</td>
                                        <td>{row.receivedDate}</td>
                                        <td>{row.status}</td>
                                    </tr>
                                );
                            })}
                        {emptyRows > 0 && (
                            <tr
                                style={{
                                    height: `calc(${emptyRows} * 40px)`,
                                    '--TableRow-hoverBackground': 'transparent',
                                }}
                            >
                                <td colSpan={6} aria-hidden />
                            </tr>
                        )}
                    </tbody>
                    <tfoot>
                        <tr>
                            <td colSpan={6}>
                                <Box
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: 2,
                                        justifyContent: 'flex-end',
                                    }}
                                >
                                    <FormControl orientation="horizontal" size="sm">
                                        <FormLabel>Số Hàng Hiện Thị:</FormLabel>
                                        <Select onChange={handleChangeRowsPerPage} value={rowsPerPage}>
                                            <Option value={5}>5</Option>
                                            <Option value={10}>10</Option>
                                            <Option value={25}>25</Option>
                                        </Select>
                                    </FormControl>
                                    <Typography textAlign="center" sx={{ minWidth: 80 }}>
                                        {labelDisplayedRows({
                                            from: rows.length === 0 ? 0 : page * rowsPerPage + 1,
                                            to: getLabelDisplayedRowsTo(),
                                            count: rows.length === -1 ? -1 : rows.length,
                                        })}
                                    </Typography>
                                    <Box sx={{ display: 'flex', gap: 1 }}>
                                        <IconButton
                                            size="sm"
                                            color="neutral"
                                            variant="outlined"
                                            disabled={page === 0}
                                            onClick={() => handleChangePage(page - 1)}
                                            sx={{ bgcolor: 'background.surface' }}
                                        >
                                            <MdOutlineKeyboardArrowLeft />
                                        </IconButton>
                                        <IconButton
                                            size="sm"
                                            color="neutral"
                                            variant="outlined"
                                            disabled={
                                                rows.length !== -1
                                                    ? page >= Math.ceil(rows.length / rowsPerPage) - 1
                                                    : false
                                            }
                                            onClick={() => handleChangePage(page + 1)}
                                            sx={{ bgcolor: 'background.surface' }}
                                        >
                                            <MdOutlineKeyboardArrowRight />
                                        </IconButton>
                                    </Box>
                                </Box>
                            </td>
                        </tr>
                    </tfoot>
                </Table>
            </Sheet>
        </div>
    );
};

export default Cabinet;
