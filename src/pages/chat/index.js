import { IconButton, Typography } from '@mui/material';
import React from 'react';
import { Button } from 'react-bootstrap';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { CiImageOn } from 'react-icons/ci';
import { Message } from './Message';
const Chat = () => {
    return (
        <div className="w-full h-full flex flex-col">
            <div className="flex flex-row justify-between items-center py-2 px-6 border-blue-700 border-b-2">
                <Typography variant="h6" noWrap component="div">
                    Nhóm Chat Chung
                </Typography>
                <IconButton color="inherit" aria-label="open drawer" edge="start">
                    <BsThreeDotsVertical />
                </IconButton>
            </div>
            <div className="flex-1 bg-purple-200 px-6 py-2 overflow-y-auto flex flex-col gap-4">
                <Message onwer={true} />
                <Message onwer={false} />
                <Message onwer={true} />
            </div>
            <div className="flex flex-row h-16 items-center px-6">
                <input
                    className="w-100 border-none outline-none"
                    type="text"
                    placeholder="Gửi tin nhắn đến nhóm của bạn..."
                />
                <div className="flex flex-row items-center space-x-2">
                    <input type="file" hidden={true} id="image" />
                    <label htmlFor="image" className="cursor-hover ">
                        <IconButton color="inherit" aria-label="open drawer" edge="start">
                            <CiImageOn />
                        </IconButton>
                    </label>
                    <Button>Gửi</Button>
                </div>
            </div>
        </div>
    );
};

export default Chat;
