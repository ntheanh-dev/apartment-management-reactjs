import React, { useState } from 'react';

const Login = () => {
    const fields = [
        {
            label: 'Tên đăng nhập',
            type: 'text',
            field: 'username',
        },
        {
            label: 'Mật khẩu',
            type: 'password',
            field: 'password',
        },
    ];
    const [user, setUser] = useState({});
    const change = (e, field) => {
        setUser((current) => {
            return { ...current, [field]: e.target.value };
        });
    };
    return (
        <div class="h-screen bg-gradient-to-br from-blue-600 to-indigo-600 flex justify-center items-center w-full">
            <form>
                <div class="bg-white px-10 py-8 rounded-xl w-screen shadow-md max-w-sm">
                    <div class="space-y-4">
                        <h1 class="text-center text-2xl font-semibold text-gray-600">
                            Đăng nhập bằng tài khoản của bạn
                        </h1>
                        {fields.map((f, i) => (
                            <div key={i}>
                                <label for="email" class="block mb-1 text-gray-600 font-semibold">
                                    {f.label}
                                </label>
                                <input
                                    onChange={(e) => change(e, f.field)}
                                    value={user[f.field]}
                                    type="text"
                                    class="bg-indigo-50 px-4 py-2 outline-none rounded-md w-full"
                                />
                            </div>
                        ))}
                    </div>
                    <button class="mt-4 w-full bg-gradient-to-tr from-blue-600 to-indigo-600 text-indigo-100 py-2 rounded-md text-lg tracking-wide">
                        Đăng Nhập
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Login;
