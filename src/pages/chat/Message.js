import { Avatar } from '@mui/material';
import React from 'react';

export const Message = ({ onwer }) => {
    return (
        <div className={`flex ${onwer ? 'flex-row-reverse' : 'flex-row'} flex-row gap-2`}>
            <div className="flex flex-col">
                <Avatar src="https://scontent.fsgn5-9.fna.fbcdn.net/v/t39.30808-6/169147778_3000080340318830_8496454307966035293_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=5f2048&_nc_ohc=TzbQ_XUUdtgQ7kNvgF-ySuc&_nc_ht=scontent.fsgn5-9.fna&oh=00_AYBrbVzxou4mPxSd8VDtsUXgpSPw7tUsjiEwBg_pdfFkFw&oe=66703F34" />
                <span className="text-gray-600 font-light text-sm">Just now</span>
            </div>
            <div className={`flex flex-col gap-2 ${onwer && 'items-end'} `}>
                <span
                    className={`bg-white px-3 py-2 ${onwer ? 'rounded-l-lg' : 'rounded-r-lg'} rounded-b-lg w-fit`}
                    style={{ maxWidth: '80%' }}
                >
                    hello
                </span>
                <img
                    className={`w-1/2   rounded-b-lg ${onwer ? 'rounded-l-lg' : 'rounded-r-lg'}`}
                    src="https://images.unsplash.com/photo-1502657877623-f66bf489d236?auto=format&fit=crop&w=800"
                    srcSet="https://images.unsplash.com/photo-1502657877623-f66bf489d236?auto=format&fit=crop&w=800&dpr=2 2x"
                    loading="lazy"
                    alt=""
                />
            </div>
        </div>
    );
};
