import { Breadcrumbs, Button, IconButton, Tooltip, Typography } from '@mui/material';
import React from 'react';
import { MdKeyboardArrowLeft } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { AiOutlineInbox } from 'react-icons/ai';
import { IoIosAddCircleOutline } from 'react-icons/io';
import { Stack } from 'react-bootstrap';
const Evaluation = () => {
    const breadcrums = [
        {
            path: '/',
            text: 'Trang Chủ',
        },
        {
            path: '/evaluation',
            text: 'Đánh Giá',
        },
    ];
    return (
        <div className="p-6">
            <Breadcrumbs separator={<MdKeyboardArrowLeft />} aria-label="breadcrumbs">
                {breadcrums.map((item) => (
                    <Link key={item.path} to={item.path} color="neutral" href="#separators">
                        {item.text}
                    </Link>
                ))}
            </Breadcrumbs>
            <div className="flex justify-end">
                <Tooltip title="Nhận">
                    <Button variant="outlined" startIcon={<IoIosAddCircleOutline />}>
                        Phản Hồi
                    </Button>
                </Tooltip>
            </div>
            <div className="mt-40 flex flex-col justify-conten items-center">
                <AiOutlineInbox className="text-9xl text-gray-500" />
                <Typography variant="h4">Hiện chưa có đánh giá nào</Typography>
            </div>
        </div>
    );
};

export default Evaluation;
