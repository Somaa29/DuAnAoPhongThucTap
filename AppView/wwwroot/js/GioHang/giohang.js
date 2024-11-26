
function ChonThanhPho() {
    var selectElement = document.getElementById("provinceList");
    var selectedOption = selectElement.options[selectElement.selectedIndex];

    if (selectedOption.value !== "") {
        var dataUrl = selectedOption.getAttribute("data-url");

        if (dataUrl) {
            $.ajax({
                url: dataUrl,
                method: "POST",
                contentType: "application/json; charset=utf-8",
                data: JSON.stringify(selectedOption.value), // Chuyển đổi sang chuỗi trước khi gửi
                success: function (data) {
                    updateDistrictList(data);
                    layDuLieuTuQuanHuyen();
                },
                error: function () {
                    console.log("Có lỗi xảy ra");
                }
            });
        } else {
            console.log("Không lấy được ID Tỉnh/Thành phố");
        }
    } else {
        console.log("Vui lòng chọn một Tỉnh/Thành phố");
    }
};

function ChonHuyen() {
    var selectElement = document.getElementById("districtList");
    var selectedOption = selectElement.options[selectElement.selectedIndex];

    if (selectedOption.value !== "") {
        var dataUrl = selectedOption.getAttribute("data-url");
        if (dataUrl) {
            $.ajax({
                url: dataUrl,
                method: "POST",
                contentType: "application/json; charset=utf-8",
                data: JSON.stringify(selectedOption.value),
                success: function (data) {
                    //alert("Lấy ID thành công: " + selectedId);
                    CapNhatXaPhuong(data)
                    layDuLieuTuXaPhuong();
                },
                error: function () {
                    console.log("Có lỗi xảy ra");
                }
            });
        } else {
            console.log("Không lấy được ID Quận huyện");
        }
    } else {
        console.log("Vui lòng chọn một Quận huyện.");
    }
};

function ChonPhuong() {
    var selectElement = document.getElementById("wardList");
    var selectedOption = selectElement.options[selectElement.selectedIndex];
    if (selectedOption.value !== "") {
        var dataUrl = selectedOption.getAttribute("data-url");
        if (dataUrl) {
            $.ajax({
                url: dataUrl,
                method: "POST",
                contentType: "application/json; charset=utf-8",
                data: JSON.stringify(selectedOption.value),
                success: function (data) {
                    //alert("Lấy ID thành công: " + selectedId);
                    layDuLieuTuXaPhuong();
                    hienthitienship();
                },
                error: function () {
                    console.log("Có lỗi xảy ra");
                }
            });

        } else {
            console.log("Không lấy được ID Phường Xã");
        }
    } else {
        console.log("Vui lòng chọn một Phường Xã");
    }
}
function SuDungVoucher() {
    var magiamgia = document.getElementById("magiamgia");
    if (magiamgia.value == null || magiamgia.value == '' || magiamgia.value == "") {
        alert("Không có voucher")
    }
};

function updateDistrictList(data) {
    // Xóa tất cả các option hiện tại trong dropdown "district"

    $("#districtList").empty();
    $("#districtList").append('<option value="">Chọn Quận/Huyện </option>');
    if (data != null) {
        for (var i = 0; i < data.length; i++) {
            $("#districtList").append('<option value="' + data[i].districtId + '" data-url="' + '/GioHang/NhanIDHuyen?IdQuanHuyen=' + data[i].districtId + '">' + data[i].districtName + '</option>');
        }
    }
}
function layDuLieuTuQuanHuyen() {
    $.ajax({
        type: 'GET',
        url: '/GioHang/LayQuanHuyen', // Điều chỉnh đường dẫn tùy thuộc vào định tuyến của bạn
        success: function (result) {
            // Dữ liệu được trả về từ controller
            var thongTinQuanHuyen = result.thongTinQuanHuyen;
            //updateDistrictDropdown(thongTinQuanHuyen)
            console.log(thongTinQuanHuyen);
        },
        error: function (error) {
            console.error('Lỗi khi lấy dữ liệu từ Session:', error);
        }
    });
};
function layDuLieuTuXaPhuong() {
    $.ajax({
        type: 'GET',
        url: '/GioHang/GetAllXaPhuong',
        success: function (result) {
            var ThongTinXaPhuong = result.thongTinXaPhuong;
            console.log(ThongTinXaPhuong);
        },
        error: function (error) {
            console.error('Lỗi khi lấy dữ liệu từ Session:', error);
        }
    });
};
function CapNhatXaPhuong(data) {
    // Xóa tất cả các option hiện tại trong dropdown "district"

    $("#wardList").empty();
    $("#wardList").append('<option value="">Chọn Xã/Phường </option>');
    if (data != null) {
        for (var i = 0; i < data.length; i++) {
            $("#wardList").append('<option value="' + data[i].wardCode + '" data-url="' + '/GioHang/TinhTienShip?WardCode=' + data[i].wardCode + '">' + data[i].wardName + '</option>');
        }
    }
};

function hienthitienship() {
    $.ajax({
        type: 'GET',
        url: '/GioHang/HienThiTienShip', // Điều chỉnh đường dẫn tùy thuộc vào định tuyến của bạn
        success: function (result) {
            // Dữ liệu được trả về từ controller
            var tienship = result.tienship;
            var hienthitiienship = document.getElementById("tienship");
            var number2 = 0;
            if (tienship == null) {
                number2 = 0;
            } else {
                var formattedNumber = tienship.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
                hienthitiienship.innerText = formattedNumber;
                number2 = parseFloat(tienship)
            }
            if (hienthitiienship == '') {
                jQuery("#btnChon").attr("style", "pointer-events: none;");
            }
            else {
                const tongtien = document.getElementById("tongtien").innerText;
                const number = parseFloat(tongtien.replace(/[^\d]/g, ''));
                var tiemgiamgia = document.getElementById("tiemgiamgia").innerText;
                var tiengiam;
                if (tiemgiamgia == "" || tiemgiamgia == undefined || tiemgiamgia == null) {
                    tiemgiamgia = 0;
                    tiengiam = 0;
                } else {
                    tiengiam = parseFloat(tiemgiamgia.replace(/[^\d]/g, ''));
                }

                var number1 = parseFloat(number);
                var tiemgiamgia1 = parseFloat(tiengiam);
                var sum = number1 + number2 - tiemgiamgia1;
                var formattedNumber1 = sum.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
                document.getElementById("thanhtien").innerText = formattedNumber1;
                console.log(formattedNumber);
                console.log(formattedNumber1);
                jQuery("#btnChon").attr("style", "pointer-events: auto;");
            }

        },
        error: function (error) {
            console.error('Lỗi khi lấy dữ liệu từ Session:', error);
        }
    });
};
function ApDungVoucher(event) {
    event.preventDefault();
    var inPutVoucher = document.getElementById("magiamgia").value;
    if (inPutVoucher == "") {
        const tongtien = document.getElementById("tongtien").innerText;
        document.getElementById("phantramgiamgia").innerText = "";
        const number = parseFloat(tongtien.replace(/[^\d]/g, ''));
        const tiengiamgia = 0;
        document.getElementById("tiemgiamgia").innerText = "";
        const thanhtien = number - tiengiamgia;
        document.getElementById("thanhtien").innerText = thanhtien.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
        document.getElementById("errorvoucher").innerText = "";
    } else {
        $.ajax({
            url: '/KhachHang/GioHang/TimKiemVoucher',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(inPutVoucher),
            success: function (result) {
                if (result.length == 0 ) {
                    document.getElementById("errorvoucher").innerText = "Không có voucher.";
                    return;
                } else {
                    const ngaybatdau = new Date(result.ngayBatDau);
                    const ngayketthuc = new Date(result.ngayKetThuc);
                    const datebd = ngaybatdau.getDate();
                    const monthbd = ngaybatdau.getMonth();
                    const yearbd = ngaybatdau.getFullYear();
                    console.log(datebd, monthbd, yearbd);


                    const today = new Date();
                    const Datetoday = today.getDate();
                    const Monthtoday = today.getMonth();
                    const YearToday = today.getFullYear();
                    console.log(Datetoday, Monthtoday, YearToday);


                    const datekt = ngayketthuc.getDate();
                    const monthkt = ngayketthuc.getMonth();
                    const yearkt = ngayketthuc.getFullYear();
                    console.log(datekt, monthkt, yearkt);
                    if (datebd > Datetoday && monthbd > Monthtoday && yearbd > YearToday) {
                        document.getElementById("errorvoucher").innerText = "Không sử dụng được.";
                        return;
                    } else if (datekt < Datetoday || monthkt < Monthtoday || yearkt < YearToday) {
                        document.getElementById("errorvoucher").innerText = "Hết hạn sử dụng voucher.";
                        return;
                    } else if (result.trangThai != 1) {
                        document.getElementById("errorvoucher").innerText = "Không sử dụng được.";
                        return;
                    } else {
                        const tongtien = document.getElementById("tongtien").innerText;
                        var giatrivoucher = result.giaTriVoucher + "%";
                        $("#phantramgiamgia").text(giatrivoucher);
                        const number = parseFloat(tongtien.replace(/[^\d]/g, ''));
                        const tiengiamgia = number * result.giaTriVoucher / 100;
                        const tiengiamgiahoanthien = tiengiamgia.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
                        document.getElementById("tiemgiamgia").innerText = tiengiamgiahoanthien;
                        const thanhtien = number - tiengiamgia;
                        document.getElementById("thanhtien").innerText = thanhtien.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
                        document.getElementById("errorvoucher").innerText = result.id;
                    }
                }
                console.log(result);
            },
            error: function (xhr, status, error) {
                alert('Lỗi gọi api', error);
            }
        });
    }
    
};
function KiemTraTruocKhiThanhToan() {
    var tenkhachhang = document.getElementById("name");

    var sdtkh = document.getElementById("sdt");

    var email = document.getElementById("email");

    var diachi = document.getElementById("diachi");

    var hinhthucthanhtoan = document.getElementById("");
};

function validatediachi1() {
    var diachi = document.getElementById("diachi");
    var errorDiaChi = document.getElementById("errorDiaChi");
    // Kiểm tra điều kiện nếu tên rỗng
    if (diachi.value.trim() === '') {
        errorDiaChi.innerText = "Địa chỉ không được để trống";
    } else {
        errorDiaChi.textContent = ""; // Xóa thông báo lỗi nếu tên hợp lệ
    }
};

function DanhSachHinhThucJson() {
    $.ajax({
        type: 'GET',
        url: '/Admin/HinhThucThanhToan/DanhSachHinhThucJson', // Điều chỉnh đường dẫn tùy thuộc vào định tuyến của bạn
        success: function (result) {
            var lstThanhToan = result.lstThanhToan;
            $("#HinhThucThanhToan").empty();
            var content = '';
            content += '<h3>Hình thức thanh toán</h3>';
            content += '<label>';
            if (lstThanhToan != null) {
                for (var i = 0; i < lstThanhToan.length; i++) {
                    if (lstThanhToan[i].hinhThucThanhToan == "Thanh toán khi nhận hàng") {
                        content += '<span class="paymant-method__item-cutom-checkbox custom-radio">';
                        content += '<input   type="radio" id="payment-COD" name="payment-method" value="' + lstThanhToan[i].id + '" />';
                        content += '</span>';
                        content += '<span class="payment-method__item-name"> Thanh toán khi nhận hàng</span>';
                        content += '<br>';
                    }
                    // Thanh toán ATM Nội địa
                    if (lstThanhToan[i].hinhThucThanhToan == "Thanh toán online") {
                        content += '<span class="paymant-method__item-cutom-checkbox custom-radio">';
                        content += '<input  type="radio" style="margin-left: 20px;" id="bankcode_Vnbank" name="payment-method" value="' + lstThanhToan[i].id + '" />';
                        content += '</span>';
                        content += '<span class="payment-method__item-name"> Thanh toán online</span>';
                        content += '<br>';
                    }
                }
            }
            content += '</label>';
            $("#HinhThucThanhToan").append(content);
            const btnThanhToan = document.getElementById('btnThanhToan');
            const btn_online = document.getElementById('btn_online');
            const radioButtons = document.querySelectorAll('label input[type="radio"]');
            radioButtons.forEach(radioButton => {
                radioButton.addEventListener('click', function () {
                    idthanhtoan = this.value;
                    if (this.id === 'bankcode_Vnbank') {
                        ThanhToanOnline();
                        btnThanhToan.style.display = 'none';
                        btn_online.style.display = 'block';
                    } else {
                        btnThanhToan.style.display = 'block';
                        btn_online.style.display = 'none';
                    }
                });
            });
        },
        error: function (error) {
            console.error('Lỗi khi lấy dữ liệu từ Session:', error);
        }
    });
}

function TaoHoaDon() {
    const tongtien = document.getElementById("tongtien").innerText;
    if (tongtien == "" || tongtien == undefined || tongtien == null) {
        alert("Bạn chưa mua sản phẩm.");
        return;
    } else {
        var tenkh = document.getElementById("name").value;
        var idvoucher = document.getElementById("errorvoucher").innerText;
        var sdtkh = document.getElementById("sdt").value;
        var diachi = document.getElementById("diachi").value;
        var thanhtien = parseFloat(document.getElementById("tongtien").innerText.replace(/[^\d]/g, ''));
        var tienship = parseFloat(document.getElementById("tienship").innerText.replace(/[^\d]/g, ''));
        var tiengiamgia;
        if (document.getElementById("tiemgiamgia").innerText == "" || document.getElementById("tiemgiamgia").innerText == null || document.getElementById("tiemgiamgia").innerText == undefined) {
            tiengiamgia = 0;
        } else {
            tiengiamgia = parseFloat(document.getElementById("tiemgiamgia").innerText.replace(/[^\d]/g, ''));
        }
        var ghichu = document.getElementById("w3review").value;
        if (idvoucher == "") {
            idvoucher = null;
        } else {
            idvoucher == $("#errorvoucher").text();
        }
        var data = {
            IDHinhThucThanhToan: idthanhtoan,
            IDVoucherChiTiet: idvoucher,
            TenKhachHang: tenkh,
            SDTKhachHang: sdtkh,
            DiaChi: diachi,
            TongSoLuong: 0,
            ThanhTien: thanhtien,
            TienShip: tienship,
            TienGiamGia: tiengiamgia,
            GhiChu: ghichu
        };
        jQuery.ajax({
            type: 'POST',
            url: '/KhachHang/GioHang/TaoHoaDon',
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(data),
            success: function (response) {
                // Handle success response, if needed
                if (response.message == "Đơn hàng đang chờ xử lý") {
                    alert('Đặt hàng thành công.');
                    window.location.href = '/KhachHang/HoaDonKH/DanhSachHoaDonTheoNguoiDungKH';
                } else {
                    alert('Đặt hàng thất bại.');
                    hienthitienship();
                    LoadGioHangChiTiet();
                    ViewSoLuong();
                }
            },
            error: function (xhr, status, error) {
                alert('Đặt hàng thất bại.');
                hienthitienship();
                LoadGioHangChiTiet();
            }
        });
    }
};
function ThanhToanOnline() {
    const tongtien = document.getElementById("tongtien").innerText;
    if (tongtien == "" || tongtien == undefined || tongtien == null) {
      
        return;
    } else {
        var tenkh = document.getElementById("name").value;
        var idvoucher = document.getElementById("errorvoucher").innerText;
        var sdtkh = document.getElementById("sdt").value;
        var diachi = document.getElementById("diachi").value;
        var thanhtien = parseFloat(document.getElementById("tongtien").innerText.replace(/[^\d]/g, ''));
        var tienship = parseFloat(document.getElementById("tienship").innerText.replace(/[^\d]/g, ''));
        var tiengiamgia;
        if (document.getElementById("tiemgiamgia").innerText == "" || document.getElementById("tiemgiamgia").innerText == null || document.getElementById("tiemgiamgia").innerText == undefined) {
            tiengiamgia = 0;
        } else {
            tiengiamgia = parseFloat(document.getElementById("tiemgiamgia").innerText.replace(/[^\d]/g, ''));
        }
        var ghichu = document.getElementById("w3review").value;
        if (idvoucher == "") {
            idvoucher = null;
        } else {
            idvoucher == $("#errorvoucher").text();
        }
        var data = {
            IDHinhThucThanhToan: idthanhtoan,
            IDVoucherChiTiet: idvoucher,
            TenKhachHang: tenkh,
            SDTKhachHang: sdtkh,
            DiaChi: diachi,
            TongSoLuong: 0,
            ThanhTien: thanhtien,
            TienShip: tienship,
            TienGiamGia: tiengiamgia,
            GhiChu: ghichu
        };
        jQuery.ajax({
            type: 'POST',
            url: '/KhachHang/GioHang/NhanHoaDon',
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(data),
            success: function (response) {
            },
            error: function (xhr, status, error) {
                alert('Đặt hàng thất bại.');
                hienthitienship();
                LoadGioHangChiTiet();
            }
        });
    }
};
function LoadGioHangChiTiet() {
    $.ajax({
        type: 'GET',
        url: '/KhachHang/GioHang/GioHangChiTietJson',
        success: function (result) {

            $("#danhSachsanpham").empty();
            if (result != null) {
                var sum = 0;
                for (var i = 0; i < result.length; i++) {
                    var TienSP = result[i].gia.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
                    var ThanhTien = result[i].thanhTien.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
                    var data = {
                        TenSP: result[i].tenSP,
                        MauSac: result[i].mauSac,
                        LoaiSanPham: result[i].loaiSanPham,
                        TenThuongHieu: result[i].thuongHieu,
                    }
                    var droplstId = result[i].id.toString();
                    var content = '';
                    content += '<div class="product-cart d-flex">';
                    content += '<div class="one-forth">';
                    if (result[i].duongDanAnh == null || result[i].duongDanAnh == undefined || result[i].duongDanAnh == "") {
                        content += '<img class="product-img" src="https://congtygiaphat104.com/template/Default/img/no.png" />';
                    } else {
                        content += '<img class="product-img" src="/Admin/Anh/DisplayImage?DuongDan=' + result[i].duongDanAnh + '" />';
                    }
                    content += ' <div class="display-tc">';
                    content += '<h3 id="tensanpham">' + result[i].tenSP + '</h3>';
                    content += ' </div>';
                    content += ' </div>';
                    content += '<div class="one-eight">';
                    content += '<div class="display-tc">';
                    content += '<div class="mausac">';
                    content += ' Màu sắc: <span id="MauSac">' + result[i].mauSac + '</span>';
                    content += '</div>';
                    content += '<div class="droplst-size" id="' + droplstId + '" style"margin-top: 10px;">';

                    content += '</div>';
                    content += '<button onclick="XoaSanPham(\'' + result[i].id + '\');" class="" style="color: red; font-size:16px; border:none; background-color :white; margin-left: -4px;margin-top: 10px; "> Xóa</button>';
                    content += '</div>';
                    content += '</div>';
                    content += '<div class="one-eight text-center">';
                    content += ' <div class="display-tc">';
                    content += ' <span class="price">' + TienSP + '</span>';
                    content += '</div>';
                    content += '</div>';
                    content += '<div class="one-eight text-center">';
                    content += '<div class="display-tc">';
                    content += '<form action="#">';
                    content += '<div class="inputsoluong" style="display:flex;">';
                    content += '<button id="GiamSoLuong" onclick="ClickGiamSoLuong(\'' + result[i].id + '\');"><i class="far fa-minus-square"></i> </button>';
                    content += '<input type="text" id="' + result[i].id + '" name="soluong" class="form-control input-number text-center" value="' + result[i].soLuong + '" min="1" max="100" style"width: 50px;height: 33px"/>';
                    content += '<button id="TangSoLuong" onclick="ClickTangSoLuong(\'' + result[i].id + '\');"><i class="far fa-plus-square"></i> </button>';
                    content += '</div>';
                    content += '</form>';
                    content += ' </div>'
                    content += ' </div>'
                    content += '  <div class="one-eight text-center">';
                    content += '<div class="display-tc">';
                    content += ' <span class="price">' + ThanhTien + '</span>'
                    content += ' </div>';
                    content += ' </div>';
                    DanhSachSanPhamCungTenCungMau(data, droplstId);
                    $("#danhSachsanpham").append(content);

                    sum += result[i].thanhTien;
                    var fomatVND = sum.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
                    document.getElementById("tongtien").innerText = fomatVND;
                    hienthitienship();
                }

                console.log(result);
            }
        },
        error: function (xhr, status, error) {
            // Handle error response, if needed
            // Display error message or retry, based on your application logic
        }
    });
};

function DanhSachSanPhamCungTenCungMau(data, droplstId) {
    $.ajax({
        url: '/KhachHang/TrangChu/TruyVanSize',
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(data),
        success: function (response) {
            $("#" + droplstId).empty();
            if (response != null) {
                for (var i = 0; i < response.length; i++) {
                    var content1 = '';
                    content1 += '<select style="width: 70px; height: 30px; font-size: 15px; ">';
                    content1 += '<option value="' + response[i].size + '">' + response[i].size + '</option>';
                    content1 += '</select>';
                }
                $("#" + droplstId).append(content1);
            };
            console.log(response);
        },
        error: function (xhr, status, error) {
            alert('Lỗi gọi api', error);
        }
    });
};
function XoaSanPham(id) {
    if (id == "" || id == null || id == undefined) {
        alert("Thất bại.");
    } else {
        $.ajax({
            type: 'POST',
            url: '/KhachHang/GioHangChiTiet/DeleteCartDetail',
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(id),
            success: function (result) {
                if (result.message == "true") {
                    alert("Xóa thành công.");
                    ViewSoLuong();
                }
                else {
                    alert("Xóa thất bại.");
                }
                console.log(result);
                LoadGioHangChiTiet();
            },
            error: function (error) {

            }
        });
    }
};

function ClickGiamSoLuong(id) {
    var stringid = String(id);
    var quantityInput = $('input[id="' + stringid + '"]').val();
    var soluong = parseInt(quantityInput);
    var currentValue = soluong;
    if (currentValue > 1) { // Đảm bảo số lượng không nhỏ hơn 1
        var soluongsautru = currentValue - 1;
        $('input[id="' + stringid + '"]').val(soluongsautru);
        UpdateSoLuong(id);
    }
    event.preventDefault();
};

function ClickTangSoLuong(id) {
    var stringid = String(id);
    var quantityInput = $('input[id="' + stringid + '"]').val();
    var soluong = parseInt(quantityInput);
    var currentValue = soluong;
    // Đảm bảo số lượng không nhỏ hơn 1
    var soluongsautru = currentValue + 1;
    $('input[id="' + stringid + '"]').val(soluongsautru);
    UpdateSoLuong(id);
    event.preventDefault();
};

function UpdateSoLuong(id) {
    var soluong = $('input[id="' + id + '"]').val();
    var data = {
        ID: id,
        SoLuong: soluong,
    }
    $.ajax({
        url: '/KhachHang/GioHang/UpdateSoluongtronggiohang',
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(data),
        success: function (response) {
            if (response != null) {
                LoadGioHangChiTiet();
            }
            console.log(response);
        },
        error: function (xhr, status, error) {
            alert('Lỗi gọi api', error);
        }
    });
};
function ViewSoLuong() {
    $.ajax({
        type: 'GET',
        url: '/KhachHang/GioHang/Soluong',
        success: function (result) {
            $('p[id="soluongtrongiohang"]').text("Giỏ hàng [" + result + "]");
            console.log(result);
        },
        error: function (xhr, status, error) {
            console.log('Lỗi gọi api: ' + error);
        }
    });
};

