import React, { useEffect, useRef, useState } from 'react';
import { FocusTrap } from '@mui/base/FocusTrap';
import { Alert, Backdrop, Box, Button, CircularProgress, Snackbar, Typography } from '@mui/material';
import { authApi, endPoints } from '../../configs/APIs';
import { Container } from 'react-bootstrap';
import QRCode from 'qrcode.react';
import { Link } from 'react-router-dom';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas'

export default function Bill() {
    const [listBill, setlistBill] = useState([]);
    const [open, setOpen] = useState(false);
    const [price, setPrice] = useState(0);
    const [Loading, setLoading] = useState(false);
    const [alertMessage, setAlertMessage] = useState('Đã có lỗi xảy ra');
    const [openAleart, setOpenAlert] = useState(false);
    const printRef = useRef();
    useEffect(() => {
        setLoading(true);
        const getBill = async () => {
            try {
                const res = await authApi().get(endPoints['getBill']);
                if (res.status === 200) {
                    setlistBill(res.data);
                    setPrice(TotalPrice(res.data[0]));
                } else {
                    setOpenAlert(true);
                }
            } catch (ex) {
                console.log(ex);
                setOpenAlert(true);
            } finally {
                setLoading(false);
            }
        };
        getBill();
    }, []);
    function TotalPrice(data) {
        let price = 0;
        price = data.contract.room.price;
        data.receiptDetails.map((detail, idx) => {
            price += detail.amount * detail.services.price;
        });
        return price;
    }
    function currencyFormat(num) {
        const config = { style: 'currency', currency: 'VND', maximumFractionDigits: 9 };
        const formated = new Intl.NumberFormat('vi-VN', config).format(num);
        return formated;
    }

    const handleDownloadPdf = async () => {
        if (!printRef.current) {
          console.error('Invalid element provided as first argument');
          return;
        }

        document.querySelectorAll('.hide-for-pdf').forEach(element => {
            element.style.display = 'none';
        });
    
        const element = printRef.current;
        try {
          const canvas = await html2canvas(element);
          const data = canvas.toDataURL('image/png');
          const pdf = new jsPDF({
            orientation: 'portrait',
            unit: 'mm',
            format: 'a4',
          });
    
          const imgProperties = pdf.getImageProperties(data);
          const pdfWidth = pdf.internal.pageSize.getWidth();
          const pdfHeight = (imgProperties.height * pdfWidth) / imgProperties.width;
    
          pdf.addImage(data, 'PNG', 0, 0, pdfWidth, pdfHeight);
          pdf.save('receipt.pdf');
        } catch (error) {
          console.error('An error occurred while generating the PDF:', error);
        }
        document.querySelectorAll('.hide-for-pdf').forEach(element => {
            element.style.display = '';
        });
      };
    
    

    return (
        <Container className="flex items-center gap-10 flex-col mt-10" component="main" maxWidth="xs">
            <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={Loading}>
                <CircularProgress color="inherit" />
            </Backdrop>
            <Typography component="h1" variant="h4">
                <b className="uppercase">Hóa đơn thanh toán tiền nhà</b>
                <i class="bi bi-cash-coin"></i>
            </Typography>
            {listBill != [] ? (
                listBill.map((bill, idx) => {
                    return (
                        <>
                            <div ref={printRef} className="w-50 p-10 bg-gray-100 rounded-md flex flex-col gap-3">
                                <div className="text-2xl">{bill.title}</div>
                                <div className="flex justify-between">
                                    <div>
                                        Từ ngày {bill.startedDate[2]}/{bill.startedDate[1]}/{bill.startedDate[0]}
                                    </div>
                                    <div>
                                        Đến ngày {bill.endDate[2]}/{bill.endDate[1]}/{bill.endDate[0]}
                                    </div>
                                </div>
                                {open && (
                                    <FocusTrap open>
                                        <Box tabIndex={-1} sx={{ mt: 1, p: 1 }}>
                                            <table class="table-fixed">
                                                <thead>
                                                    <tr className="text-cyan-600">
                                                        <th>Dịch vụ</th>
                                                        <th>Số lượng</th>
                                                        <th>Thành tiền</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr className="border-b-2 border-gray-300">
                                                        <td className="w-50 h-20">
                                                            <div className="font-bold">Tiền nhà</div>
                                                            <div>
                                                                {currencyFormat(bill.contract.room.price)}/1 tháng
                                                            </div>
                                                        </td>
                                                        <td className="w-50">1</td>
                                                        <td className="text-end">
                                                            {currencyFormat(bill.contract.room.price)}
                                                        </td>
                                                        
                                                    </tr>
                                                    {bill.receiptDetails.map((detail, idx) => {
                                                        return (
                                                            <tr className="border-b-2 border-gray-300">
                                                                <td className="w-50 h-20">
                                                                    <div className="font-bold">
                                                                        {detail.services.name}
                                                                    </div>
                                                                    <div>
                                                                        {currencyFormat(detail.services.price)}/
                                                                        {detail.services.unit}
                                                                    </div>
                                                                </td>
                                                                <td className="w-50">{detail.amount}</td>
                                                                <td className="text-end">
                                                                    {currencyFormat(
                                                                        detail.amount * detail.services.price,
                                                                    )}
                                                                </td>
                                                            </tr>
                                                        );
                                                    })}
                                                </tbody>
                                            </table>
                                        </Box>
                                    </FocusTrap>
                                )}
                                <div className='flex'>
                                    <div className='ml-10'>
                                        <QRCode
                                            id="qrcode"
                                            value={`http://192.168.10.215:8080/ApartmentManagement/payment/submitOrder?orderInfo=${bill.id}&amount=${price}`}
                                            size={150}
                                            level={'H'}
                                            includeMargin={true}
                                        />
                                    </div>
                                    <div className='ml-20 flex justify-end flex-col gap-10'>
                                        <table class="table-fixed">
                                            <thead>
                                                <tr>
                                                    <th className="w-40"></th>
                                                    <th className="w-50 text-xl">Tổng tiền:</th>
                                                    <th className="text-end text-xl">{currencyFormat(price)}</th>
                                                </tr>
                                            </thead>
                                        </table>
                                        <div className="hide-for-pdf flex justify-end gap-5">
                                            <Button
                                                onClick={() => setOpen((current) => !current)}
                                                className="w-30"
                                                variant="contained"
                                            >
                                                {open ? 'Ẩn bớt' : 'Chi tiết'}
                                            </Button>
                                            <Button
                                                onClick={handleDownloadPdf}
                                                className="w-30"
                                                color='error'
                                                variant="contained"
                                            >
                                                In pdf
                                            </Button>
                                            <Button className="w-30" color="success" variant="contained">
                                                <Link to={`http://localhost:8080/ApartmentManagement/payment/submitOrder?orderInfo=${bill.id}&amount=${price}`} target='black'>
                                                    Thanh toán
                                                </Link>
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </>
                    );
                })
            ) : (
                <></>
            )}
            <Snackbar
                open={openAleart}
                onClose={() => setOpenAlert(false)}
                autoHideDuration={6000}
                anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
            >
                <Alert severity="error" va sx={{ width: '100%' }}>
                    {alertMessage}
                </Alert>
            </Snackbar>
        </Container>
    );
}
