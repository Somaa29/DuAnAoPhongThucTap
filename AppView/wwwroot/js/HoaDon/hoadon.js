function DanhSachHoaDon() {
    $.ajax({
        type: 'GET',
        url: '/Admin/HoaDon/DanhSachHoaDonJson', // Điều chỉnh đường dẫn tùy thuộc vào định tuyến của bạn
        success: function (result) {
            $("#DanhSachHoaDonjson").empty();
            if (result != null) {
                for (var i = 0; i < result.length; i++) {
                    var formattedNumber = result[i].tongTien.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
                    var content = '';
                    content += '<tr>';
                    content += '<td style="display:none;">' + result[i].id;
                    content += '</td>';
                    content += '<td><a href="/Admin/HoaDon/HoaDonChiTiet?idhd=' + result[i].id + '">' + result[i].maHoaDon + '</a></td>';
                    content += '<td>' + result[i].ngayTao + '</td>';
                    content += '<td>' + result[i].tenKhachHang + '</td>';
                    content += '<td>' + result[i].sdtKhachHang + '</td >';
                    content += '<td>' + formattedNumber + '</td>';
                    content += '<td>';
                    if (result[i].trangThai == 1) {
                        content += '<p>Đang xử lý</p>';
                    } else if (result[i].trangThai == 2) {
                        content += '<p>Hóa đơn chờ</p>';
                    } else if (result[i].trangThai == 3) { // 3 là thanh toán trước nhận hàng sau
                        content += '<p>Đã thanh toán chờ xác nhận.</p>';
                    } else if (result[i].trangThai == 4) {  // 4 là hoàn thành đơn hàng
                        content += '<p>Giao thành công</p>';
                    } else if (result[i].trangThai == 5) {
                        content += '<p>Đang giao</p>';
                    } else if (result[i].trangThai == 6) {
                        content += '<p>Đã hủy</p>';
                    } else if (result[i].trangThai == 7) {
                        content += '<p>Đã xác nhận đơn hàng.</p>';
                    } else if (result[i].trangThai == 8) {
                        content += '<p>Hoàn hàng.</p>';
                    } else if (result[i].trangThai == 9) {
                        content += '<p>Xác nhận hoàn hàng.</p>';
                    } else {
                        content += '<p>Đã hủy</p>';
                    }
                    content += '</td>';
                    content += '<td>';
                    if (result[i].trangThai == 1 || result[i].trangThai == 3) {
                        content += '<button class="btn btn-primary" onclick="XacNhanDonHang(\'' + result[i].id + '\');">Xác nhận đơn hàng</button> <button class="btn btn-danger" onclick="HuyDonHang1(\'' + result[i].id + '\');">Hủy</button>';
                    } else if (result[i].trangThai == 2) {  // 4 là hoàn thành đơn hàng
                        content += '<button class="btn btn-primary" onclick="XacNhanDonHang(\'' + result[i].id + '\');"> Xác nhận đơn hàng</button> <button class="btn btn-danger" onclick="HuyDonHang1(\'' + result[i].id + '\');">Hủy</button> <button class="btn btn-danger" onclick="XoaHoaDonCho(\'' + result[i].id + '\');"> Xóa</button>';
                    } else if (result[i].trangThai == 4) {  // 4 là hoàn thành đơn hàng
                        content += '<p>Giao thành công</p>';
                    } else if (result[i].trangThai == 5) {
                        content += '<button class="btn btn-success" onclick="DaNhan1(\'' + result[i].id + '\')"> Đã nhận</button >';
                    } else if (result[i].trangThai == 6) {
                        content += '<p>Đã hủy</p>';
                    } else if (result[i].trangThai == 7) {
                        content += '<button class="btn btn-primary" onclick="DangGiao(\'' + result[i].id + '\');">Giao sản phẩm</button>';
                    } else if (result[i].trangThai == 8) {
                        content += '<button class="btn btn-primary" onclick="XacNhanHoanHang(\'' + result[i].id + '\');">Xác nhận hoàn hàng</button>';
                    } else if (result[i].trangThai == 9) {
                        content += '<p>Xác nhận hoàn hàng.</p>';
                    } else {
                        content += '';
                    }
                    content += '</td>';
                    content += '</tr>'
                    $("#DanhSachHoaDonjson").append(content);

                    //'<option value="' + result[i].wardCode + '" data-url="' + '/GioHang/TinhTienShip?WardCode=' + data[i].wardCode + '">' + data[i].wardName + '</option>'

                }
            }
            console.log(result);
            PhanTrangAdmin();
        },
        error: function (error) {
            console.error('Lỗi khi lấy dữ liệu từ Session:', error);
        }
    });
};
function DanhSachHoaDonTheoTuKhoa() {
    var tukhoa = document.getElementById("tukhoa").value;
    if (tukhoa == null || tukhoa == "" || tukhoa == undefined) {
        DanhSachHoaDon();
    } else {
        $.ajax({
            type: 'POST',
            url: '/Admin/HoaDon/DanhSachHoaDonTheoTuKhoaJson', // Điều chỉnh đường dẫn tùy thuộc vào định tuyến của bạn
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(tukhoa),
            success: function (result) {
                $("#DanhSachHoaDonjson").empty();
                if (result != null) {
                    for (var i = 0; i < result.length; i++) {
                        var formattedNumber = result[i].tongTien.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
                        var content = '';
                        content += '<tr>';
                        content += '<td style="display:none;">' + result[i].id;
                        content += '</td>';
                        content += '<td><a href="/Admin/HoaDon/HoaDonChiTiet?idhd=' + result[i].id + '">' + result[i].maHoaDon + '</a></td>';
                        content += '<td>' + result[i].ngayTao + '</td>';
                        content += '<td>' + result[i].tenKhachHang + '</td>';
                        content += '<td>' + result[i].sdtKhachHang + '</td >';
                        content += '<td>' + formattedNumber + '</td>';
                        content += '<td>';
                        if (result[i].trangThai == 1) {
                            content += '<p>Đang xử lý</p>';
                        } else if (result[i].trangThai == 2) {
                            content += '<p>Hóa đơn chờ</p>';
                        } else if (result[i].trangThai == 3) { // 3 là thanh toán trước nhận hàng sau
                            content += '<p>Đã thanh toán chờ xác nhận.</p>';
                        } else if (result[i].trangThai == 4) {  // 4 là hoàn thành đơn hàng
                            content += '<p>Giao thành công</p>';
                        } else if (result[i].trangThai == 5) {
                            content += '<p>Đang giao</p>';
                        } else if (result[i].trangThai == 6) {
                            content += '<p>Đã hủy</p>';
                        } else if (result[i].trangThai == 7) {
                            content += '<p>Đã xác nhận đơn hàng.</p>';
                        } else if (result[i].trangThai == 8) {
                            content += '<p>Hoàn hàng.</p>';
                        } else if (result[i].trangThai == 9) {
                            content += '<p>Đã xác nhận đơn hàng.</p>';
                        } else {
                            content += '<p>Đã hủy</p>';
                        }
                        content += '</td>';
                        content += '<td>';
                        if (result[i].trangThai == 1 || result[i].trangThai == 3) {
                            content += '<button class="btn btn-primary" onclick="XacNhanDonHang(\'' + result[i].id + '\');">Xác nhận đơn hàng</button> <button class="btn btn-danger" onclick="HuyDonHang1(\'' + result[i].id + '\');">Hủy</button>';
                        } else if (result[i].trangThai == 2) {  // 4 là hoàn thành đơn hàng
                            content += '<button class="btn btn-primary" onclick="XacNhanDonHang(\'' + result[i].id + '\');"> Xác nhận đơn hàng</button> <button class="btn btn-danger" onclick="HuyDonHang1(\'' + result[i].id + '\');">Hủy</button> <button class="btn btn-danger" onclick="XoaHoaDonCho(\'' + result[i].id + '\');"> Xóa</button>';
                        } else if (result[i].trangThai == 4) {  // 4 là hoàn thành đơn hàng
                            content += '<p>Giao thành công</p>';
                        } else if (result[i].trangThai == 5) {
                            content += '<button class="btn btn-success" onclick="DaNhan1(\'' + result[i].id + '\')"> Đã nhận</button >';
                        } else if (result[i].trangThai == 6) {
                            content += '<p>Đã hủy</p>';
                        } else if (result[i].trangThai == 7) {
                            content += '<button class="btn btn-primary" onclick="DangGiao(\'' + result[i].id + '\');">Giao sản phẩm</button>';
                        } else if (result[i].trangThai == 8) {
                            content += '<button class="btn btn-primary" onclick="XacNhanHoanHang(\'' + result[i].id + '\');">Xác nhận hoàn hàng</button>';
                        } else if (result[i].trangThai == 9) {
                            content += '<p>Xác nhận hoàn hàng.</p>';
                        } else {
                            content += '';
                        }
                        content += '</td>';
                        content += '</tr>'
                        $("#DanhSachHoaDonjson").append(content);

                        //'<option value="' + result[i].wardCode + '" data-url="' + '/GioHang/TinhTienShip?WardCode=' + data[i].wardCode + '">' + data[i].wardName + '</option>'

                    }
                }
                console.log(result);
                PhanTrangAdmin();
            },
            error: function (error) {
                console.error('Lỗi khi lấy dữ liệu từ Session:', error);
            }
        });
    }
};
document.getElementById("trangthaiFilter").addEventListener("change", function () {
    var selectedValue = this.value;
    if (selectedValue == "-1") {
        DanhSachHoaDon();
    } else {
        $.ajax({
            type: 'POST',
            url: '/Admin/HoaDon/DanhSachHoaDonTheoTrangThaiJson', // Điều chỉnh đường dẫn tùy thuộc vào định tuyến của bạn
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(selectedValue),
            success: function (result) {
                $("#DanhSachHoaDonjson").empty();
                if (result != null) {
                    for (var i = 0; i < result.length; i++) {
                        var formattedNumber = result[i].tongTien.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
                        var content = '';
                        content += '<tr>';
                        content += '<td style="display:none;">' + result[i].id;
                        content += '</td>';
                        content += '<td><a href="/Admin/HoaDon/HoaDonChiTiet?idhd=' + result[i].id + '">' + result[i].maHoaDon + '</a></td>';
                        content += '<td>' + result[i].ngayTao + '</td>';
                        content += '<td>' + result[i].tenKhachHang + '</td>';
                        content += '<td>' + result[i].sdtKhachHang + '</td >';
                        content += '<td>' + formattedNumber + '</td>';
                        content += '<td>';
                        if (result[i].trangThai == 1) {
                            content += '<p>Đang xử lý</p>';
                        } else if (result[i].trangThai == 2) {
                            content += '<p>Hóa đơn chờ</p>';
                        } else if (result[i].trangThai == 3) { // 3 là thanh toán trước nhận hàng sau
                            content += '<p>Đã thanh toán chờ xác nhận.</p>';
                        } else if (result[i].trangThai == 4) {  // 4 là hoàn thành đơn hàng
                            content += '<p>Giao thành công</p>';
                        } else if (result[i].trangThai == 5) {
                            content += '<p>Đang giao</p>';
                        } else if (result[i].trangThai == 6) {
                            content += '<p>Đã hủy</p>';
                        } else if (result[i].trangThai == 7) {
                            content += '<p>Đã xác nhận đơn hàng.</p>';
                        } else if (result[i].trangThai == 8) {
                            content += '<p>Hoàn hàng.</p>';
                        } else if (result[i].trangThai == 9) {
                            content += '<p>Xác nhận hoàn hàng.</p>';
                        } else {
                            content += '<p>Đã hủy</p>';
                        }
                        content += '</td>';
                        content += '<td>';
                        if (result[i].trangThai == 1 || result[i].trangThai == 3) {
                            content += '<button class="btn btn-primary" onclick="XacNhanDonHang(\'' + result[i].id + '\');">Xác nhận đơn hàng</button> <button class="btn btn-danger" onclick="HuyDonHang1(\'' + result[i].id + '\');">Hủy</button>';
                        } else if (result[i].trangThai == 2) {  // 4 là hoàn thành đơn hàng
                            content += '<button class="btn btn-primary" onclick="XacNhanDonHang(\'' + result[i].id + '\');"> Xác nhận đơn hàng</button> <button class="btn btn-danger" onclick="HuyDonHang1(\'' + result[i].id + '\');">Hủy</button> <button class="btn btn-danger" onclick="XoaHoaDonCho(\'' + result[i].id + '\');"> Xóa</button>';
                        } else if (result[i].trangThai == 4) {  // 4 là hoàn thành đơn hàng
                            content += '<p>Giao thành công</p>';
                        } else if (result[i].trangThai == 5) {
                            content += '<button class="btn btn-success" onclick="DaNhan(\'' + result[i].id + '\')"> Đã nhận</button >';
                        } else if (result[i].trangThai == 6) {
                            content += '<p>Đã hủy</p>';
                        } else if (result[i].trangThai == 7) {
                            content += '<button class="btn btn-primary" onclick="DangGiao(\'' + result[i].id + '\');">Giao sản phẩm</button>';
                        } else if (result[i].trangThai == 8) {
                            content += '<button class="btn btn-primary" onclick="XacNhanHoanHang(\'' + result[i].id + '\');">Xác nhận hoàn hàng</button>';
                        } else if (result[i].trangThai == 9) {
                            content += '<p>Xác nhận hoàn hàng.</p>';
                        } else {
                            content += '';
                        }
                        content += '</td>';
                        content += '</tr>'
                        $("#DanhSachHoaDonjson").append(content);

                    }
                    console.log(result);
                    PhanTrangAdmin();
                }
            },
            error: function (error) {
                console.error('Lỗi khi lấy dữ liệu từ Session:', error);
            }
        });
    }
});
function DanhSachHoaDonTheoNguoiDungKH() {
    $.ajax({
        type: 'GET',
        url: '/KhachHang/HoaDonKH/DanhSachHoaDonTheoNguoiDungKHJson', // Điều chỉnh đường dẫn tùy thuộc vào định tuyến của bạn
        success: function (result) {
            $("#DanhSachHDKH").empty();
            var content = '';
            var stt = 0;
            if (result.length > 0) {
                for (var i = 0; i < result.length; i++) {
                    stt++;
                    var formattedNumber = result[i].tongTien.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
                    content += '<tr>';
                    content += '<td style="display:none;">' + result[i].id + '</td>';
                    content += '<td>' + stt + '</td>';
                    content += '<td><a href="/KhachHang/HoaDonKH/HoaDonChiTietKH?idhd=' + result[i].id + '">' + result[i].maHoaDon + '</a></td>';
                    content += '<td>' + result[i].ngayTao + '</td>';
                    content += '<td>' + result[i].tenKhachHang + '</td>';
                    content += '<td>' + result[i].sdtKhachHang + '</td>';
                    content += '<td>' + formattedNumber + '</td>';
                    content += '<td>';
                    if (result[i].trangThai == 1) {
                        content += '<p>Đang xử lý</p>';
                    } else if (result[i].trangThai == 2) {
                        content += '<p>Hóa đơn chờ</p>';
                    } else if (result[i].trangThai == 3) { // 3 là thanh toán trước nhận hàng sau
                        content += '<p>Đã thanh toán chờ xác nhận.</p>';
                    } else if (result[i].trangThai == 4) {  // 4 là hoàn thành đơn hàng
                        content += '<p>Giao thành công</p>';
                    } else if (result[i].trangThai == 5) {
                        content += '<p>Đang giao</p>';
                    } else if (result[i].trangThai == 6) {
                        content += '<p>Đã hủy</p>';
                    } else if (result[i].trangThai == 7) {
                        content += '<p>Đã xác nhận đơn hàng.</p>';
                    } else if (result[i].trangThai == 8) {
                        content += '<p>Hoàn hàng.</p>';
                    } else if (result[i].trangThai == 9) {
                        content += '<p>Đã xác nhận hoàn hàng.</p>';
                    } else {
                        content += '';
                    }
                    content += '</td>';

                    content += '<td>';
                    if (result[i].trangThai == 1 || result[i].trangThai == 2) {
                        content += '<button class="btn btn-danger" style="border:none; color:white;" onclick="HuyDonHang(\'' + result[i].id + '\')"> Hủy</button > ';
                    } else if (result[i].trangThai == 4) {  // 4 là hoàn thành đơn hàng
                        content += '<p>Giao thành công</p>';
                    } else if (result[i].trangThai == 5) {
                        content += '<button class="btn btn-success" style="border:none; color:white;" onclick="DaNhan(\'' + result[i].id + '\')"> Đã nhận</button > ';
                    } else if (result[i].trangThai == 7) {
                        content += '<button class="btn btn-primary" onclick="HoanHang(\'' + result[i].id + '\');">Hoàn hàng</button>';   // Khách hàng hoàn hàng
                    } else if (result[i].trangThai == 6) {
                        content += '<p>Đã hủy</p>';
                    } else if (result[i].trangThai == 8) {
                        content += '<p>Chờ xác nhận.</p>';
                    } else if (result[i].trangThai == 9) {
                        content += content += '<p>Đã xác nhận đơn hàng.</p>';;
                    } else {
                        content += '';
                    }
                    content += '</td>';
                    content += '</tr>';
                }
                $("#DanhSachHDKH").append(content);
            }
            console.log(result);
            PhanTrangKH();
        },
        error: function (error) {
            console.error('Lỗi khi lấy dữ liệu từ Session:', error);
        }
    });
};
function PhanTrangKH() {
    const table = document.getElementById('dataTable');
    const tbody = document.getElementById('DanhSachHDKH');
    const rows = tbody.querySelectorAll('tr');
    const totalRows = rows.length;

    // Calculate the number of pages
    const pageSize = 10;
    const totalPages = Math.ceil(totalRows / pageSize);

    // Display the first page by default
    showPage(1);

    // Generate pagination links
    const pagination = document.getElementById('pagination');
    for (let i = 1; i <= totalPages; i++) {
        const li = document.createElement('li');
        const a = document.createElement('a');
        a.textContent = i;
        a.href = '#';
        if (i === 1) {
            a.classList.add('active');
        }
        a.addEventListener('click', function (event) {
            event.preventDefault();
            showPage(i);
            const currentActive = document.querySelector('.pagination a.active');
            currentActive.classList.remove('active');
            a.classList.add('active');
        });
        li.appendChild(a);
        pagination.appendChild(li);
    }

    // Function to show a specific page
    function showPage(page) {
        const start = (page - 1) * pageSize;
        const end = start + pageSize;
        rows.forEach((row, index) => {
            if (index >= start && index < end) {
                row.style.display = '';
            } else {
                row.style.display = 'none';
            }
        });
    }
}
function XoaHoaDonCho(id) {
    $.ajax({
        type: 'POST',
        url: '/Admin/HoaDon/Delete',
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(id),// Điều chỉnh đường dẫn tùy thuộc vào định tuyến của bạn
        success: function (result) {
            alert(result.message);
            DanhSachHoaDon();
            console.log(result);
        },
        error: function (error) {
            console.error('Lỗi khi lấy dữ liệu từ Session:', error);
        }
    });
};
function HuyDonHang1(id) {
    var data = {
        ID: id
    }
    $.ajax({
        type: 'POST',
        url: '/KhachHang/HoaDonKH/HuyDonHang',
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(data),// Điều chỉnh đường dẫn tùy thuộc vào định tuyến của bạn
        success: function (result) {
            alert(result.message);
            DanhSachHoaDon();
            console.log(result);
        },
        error: function (error) {
            console.error('Lỗi khi lấy dữ liệu từ Session:', error);
        }
    });
};
function HuyDonHang(id) {
    var data = {
        ID: id
    }
    $.ajax({
        type: 'POST',
        url: '/KhachHang/HoaDonKH/HuyDonHang',
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(data),// Điều chỉnh đường dẫn tùy thuộc vào định tuyến của bạn
        success: function (result) {
            alert(result.message);
            DanhSachHoaDonTheoNguoiDungKH();
            console.log(result);
        },
        error: function (error) {
            console.error('Lỗi khi lấy dữ liệu từ Session:', error);
        }
    });
};
function DaNhan(id) {
    var data = {
        ID: id
    }
    $.ajax({
        type: 'POST',
        url: '/KhachHang/HoaDonKH/DaNhan',
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(data),// Điều chỉnh đường dẫn tùy thuộc vào định tuyến của bạn
        success: function (result) {
            alert(result.message);
            DanhSachHoaDonTheoNguoiDungKH();
            console.log(result);
        },
        error: function (error) {
            console.error('Lỗi khi lấy dữ liệu từ Session:', error);
        }
    });
};
function HoanHang(id) {
    var data = {
        ID: id
    }
    $.ajax({
        type: 'POST',
        url: '/KhachHang/HoaDonKH/HoanHang',
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(data),// Điều chỉnh đường dẫn tùy thuộc vào định tuyến của bạn
        success: function (result) {
            alert(result.message);
            DanhSachHoaDonTheoNguoiDungKH();
            console.log(result);
        },
        error: function (error) {
            console.error('Lỗi khi lấy dữ liệu từ Session:', error);
        }
    });
};
function XacNhanHoanHang(id) {
    var data = {
        ID: id
    }
    $.ajax({
        type: 'POST',
        url: '/KhachHang/HoaDonKH/XacNhanHoanHang',
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(data),// Điều chỉnh đường dẫn tùy thuộc vào định tuyến của bạn
        success: function (result) {
            alert(result.message);
            DanhSachHoaDonTheoNguoiDungKH();
            console.log(result);
        },
        error: function (error) {
            console.error('Lỗi khi lấy dữ liệu từ Session:', error);
        }
    });
};
function DaNhan1(id) {
    var data = {
        ID: id
    }
    $.ajax({
        type: 'POST',
        url: '/KhachHang/HoaDonKH/DaNhan',
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(data),// Điều chỉnh đường dẫn tùy thuộc vào định tuyến của bạn
        success: function (result) {
            alert(result.message);
            DanhSachHoaDon();
            console.log(result);
        },
        error: function (error) {
            console.error('Lỗi khi lấy dữ liệu từ Session:', error);
        }
    });
};
function DangGiao(id) {
    var data = {
        ID: id
    }
    $.ajax({
        type: 'POST',
        url: '/KhachHang/HoaDonKH/DangGiao',
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(data),// Điều chỉnh đường dẫn tùy thuộc vào định tuyến của bạn
        success: function (result) {
            alert(result.message);
            DanhSachHoaDonTheoNguoiDungKH();
            DanhSachHoaDon();
            console.log(result);
        },
        error: function (error) {
            console.error('Lỗi khi lấy dữ liệu từ Session:', error);
        }
    });
};
function XacNhanDonHang(id) {
    var data = {
        ID: id
    }
    $.ajax({
        type: 'POST',
        url: '/KhachHang/HoaDonKH/XacNhanDonHang',
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(data),// Điều chỉnh đường dẫn tùy thuộc vào định tuyến của bạn
        success: function (result) {
            alert(result.message);
            DanhSachHoaDon();
            console.log(result);
        },
        error: function (error) {
            console.error('Lỗi khi lấy dữ liệu từ Session:', error);
        }
    });
};
function ChinhSua() {
    var ThaoTac = document.querySelectorAll("#ThaoTac");
    ThaoTac.forEach(function (element) {
        // Thêm class mới cho mỗi phần tử trong danh sách ThaoTac
        element.classList.remove('hide');
    });
    var KhongSua = document.querySelectorAll("#KhongSua");
    KhongSua.forEach(function (element) {
        // Thêm class mới cho mỗi phần tử trong danh sách ThaoTac
        element.classList.add('hide');
    });
    loadtien();
}
function Xong() {
    var ThaoTac = document.querySelectorAll("#ThaoTac");
    const id = document.getElementById("IdCuaHoaDon").innerText;
    ThaoTac.forEach(function (element) {
        // Thêm class mới cho mỗi phần tử trong danh sách ThaoTac
        element.classList.add('hide');
    });
    var KhongSua = document.querySelectorAll("#KhongSua");
    KhongSua.forEach(function (element) {
        // Thêm class mới cho mỗi phần tử trong danh sách ThaoTac
        element.classList.remove('hide');
    });
    UpdateThongTinKh();
    loadtien();
    window.location.href = '/KhachHang/HoaDonKH/HoaDonChiTietKH?idhd=' + id + '';
};

function PhanTrangAdmin() {
    const table = document.getElementById('dataTable');
    const tbody = document.getElementById('DanhSachHoaDonjson');
    const rows = tbody.querySelectorAll('tr');
    const totalRows = rows.length;
    const pagination = document.getElementById('pagination');

    pagination.innerHTML = '';

    // Calculate the number of pages
    const pageSize = 10;
    const totalPages = Math.ceil(totalRows / pageSize);

    // Display the first page by default
    showPage(1);

    // Generate pagination links

    for (let i = 1; i <= totalPages; i++) {
        const li = document.createElement('li');
        const a = document.createElement('a');
        a.textContent = i;
        a.href = '#';
        if (i === 1) {
            a.classList.add('active');
        }
        a.addEventListener('click', function (event) {
            event.preventDefault();
            showPage(i);
            const currentActive = document.querySelector('.pagination a.active');
            currentActive.classList.remove('active');
            a.classList.add('active');
        });
        li.appendChild(a);
        pagination.appendChild(li);
    }

    // Function to show a specific page
    function showPage(page) {
        const start = (page - 1) * pageSize;
        const end = start + pageSize;
        rows.forEach((row, index) => {
            if (index >= start && index < end) {
                row.style.display = '';
            } else {
                row.style.display = 'none';
            }
        });
    }


}

function Xong1() {
    var ThaoTac = document.querySelectorAll("#ThaoTac");
    const id = document.getElementById("IdCuaHoaDon").innerText;
    ThaoTac.forEach(function (element) {
        // Thêm class mới cho mỗi phần tử trong danh sách ThaoTac
        element.classList.add('hide');
    });
    var KhongSua = document.querySelectorAll("#KhongSua");
    KhongSua.forEach(function (element) {
        // Thêm class mới cho mỗi phần tử trong danh sách ThaoTac
        element.classList.remove('hide');
    });
    UpdateThongTinKh();
    loadtien();
    window.location.href = '/Admin/HoaDon/HoaDonChiTiet?idhd=' + id + '';
};
function UpdateThongTinKh() {
    const id = document.getElementById("IdCuaHoaDon").innerText;
    var tenkh = document.getElementById("TenKH").value;
    var DiaChiKhachHang = document.getElementById("DiaChiKhachHang").value;
    var SdtKhachHang = document.getElementById("SdtKhachHang").value;
    var data = {
        ID: id,
        TenKhachHang: tenkh,
        DiaChi: DiaChiKhachHang,
        SDTKhachHang: SdtKhachHang,
    }
    $.ajax({
        type: 'POST',
        url: '/KhachHang/HoaDonKH/UpdateThongTinKHHD',
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(data),
        success: function (result) {
            alert(result.message);
            console.log(result);
        },
        error: function (error) {

        }
    });
};
function GiamSoLuong1(id) {
    event.preventDefault();
    var stringid = String(id);
    var quantityInput = $('input[id="' + stringid + '"]').val();
    var soluong = parseInt(quantityInput);
    var currentValue = soluong;
    if (currentValue > 1) { // Đảm bảo số lượng không nhỏ hơn 1
        var soluongsautru = currentValue - 1;
        $('input[id="' + stringid + '"]').val(soluongsautru);
        UpdateSoLuongHDCT(id);
    }
};
function TangSoLuong1(id) {
    var stringid = String(id);
    var quantityInput = $('input[id="' + stringid + '"]').val();
    var soluong = parseInt(quantityInput);
    var currentValue = soluong;
    var soluongsautru = currentValue + 1;
    $('input[id="' + stringid + '"]').val(soluongsautru);
    UpdateSoLuongHDCT(id);
    event.preventDefault();
};
function UpdateSoLuongHDCT(id) {
    var soluong = $('input[id="' + id + '"]').val();
    var gia = $('span[id="' + id + '"]').text();
    const gianguyenthuy = parseFloat(gia.replace(/[^\d]/g, ''));

    var sum = gianguyenthuy * soluong;
    var formattedNumber = sum.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
    $('p[id="' + id + '"]').text(formattedNumber);
    loadtien();
};

function loadtien() {
    var lstidhdct = [];

    lstidhdct.splice(0, lstidhdct.length);
    document.querySelectorAll("label").forEach(function (element) {
        var iddhct = element.innerText;
        console.log(element);
        lstidhdct.push(iddhct);
    });

    for (var i = 0; i < lstidhdct.length; i++) {
        var soluong = $('input[id="' + lstidhdct[i] + '"]').val();
        var gia = $('span[id="' + lstidhdct[i] + '"]').text();;
        var gianguyenthuy = parseFloat(gia.replace(/[^\d]/g, ''));
        var thanhtien = soluong * gianguyenthuy;
        var giatienhoanthien = thanhtien.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
        $('p[id="' + lstidhdct[i] + '"]').text(giatienhoanthien);
    };

    var sumthanhtien = 0;

    for (var i = 0; i < lstidhdct.length; i++) {
        var thanhtien = $('p[id="' + lstidhdct[i] + '"]').text();
        var thanhtiennguyenthuy = parseFloat(thanhtien.replace(/[^\d]/g, ''));
        sumthanhtien += thanhtiennguyenthuy;
    }
    var formattedthanhtien1 = sumthanhtien.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
    $('span[id="thanhtien1"]').text(formattedthanhtien1);
    var tienship = $('p[id="tienship"]').text();
    var tienshipnguyenthuy = parseFloat(tienship.replace(/[^\d]/g, ''));
    var tiengiamgia = $('p[id="tiengiamgia"]').text();
    var tiengiamgianguyenthuy = parseFloat(tiengiamgia.replace(/[^\d]/g, ''));

    var tongtien = sumthanhtien + tienshipnguyenthuy - tiengiamgianguyenthuy;
    var tongtienhoanthien = tongtien.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
    $('span[id="tongtien"]').text(tongtienhoanthien)
    console.log("Tổng của cột 4 là: " + formattedthanhtien1);
}
function LuuChinhSua(id) {
    var soluong = $('input[id="' + id + '"]').val();
    var idhd = $('p[id="IdCuaHoaDon"]').text();
    var data = {
        ID: id,
        SoLuong: soluong,
    }
    $.ajax({
        type: 'POST',
        url: '/Admin/BanHangTaiQuay/CapNhatSoLuongHDCT',
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(data),
        success: function (result) {
            if (result.message == "Cập nhật số lượng thành công") {

            }
            else if (result.message = "Sửa thất bại.") {
                alert("Cập nhật số lượng không thành công.");
            } else {

            }
            UpdateHD(idhd)
            console.log(result);
        },
        error: function (error) {

        }
    });
};
function XoaItemHDCT(id) {
    var idhd = $('p[id="IdCuaHoaDon"]').text();
    var idhdct = $('tr[id="' + id + '"]');
    $.ajax({
        type: 'POST',
        url: '/Admin/BanHangTaiQuay/XoaSanPhamTrongHoaDonChiTiet', // Điều chỉnh đường dẫn tùy thuộc vào định tuyến của bạn
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(id),
        success: function (result) {
            if (result != null) {
                if (result.message == "Xóa Thành Công.") {
                    alert("Xóa Thành Công.");
                    idhdct.hide();
                }
                else if (result.message = "Xóa Thất Bại.") {
                    alert("Xóa Thất Bại.");
                } else {
                    alert("Lỗi.")
                }
            };
            console.log(result);
            loadtien();
            UpdateHD(idhd);
            LstHoaDonChiTiet(idhd);
        },
        error: function (error) {
            console.error('Lỗi khi lấy dữ liệu từ Session:', error);
        }
    });
};
function UpdateHD(id) {
    var data = {
        ID: id,
    }
    $.ajax({
        type: 'POST',
        url: '/KhachHang/HoaDonKH/UpdateHoaDon',
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(data),
        success: function (result) {

            alert(result.message);
            console.log(result);
        },
        error: function (error) {

        }
    });
};
function LstHoaDonChiTiet(id) {

    var data = {
        ID: id
    }
    $.ajax({
        type: 'POST',
        url: '/Admin/BanHangTaiQuay/LstHoaDonChiTiet', // Điều chỉnh đường dẫn tùy thuộc vào định tuyến của bạn
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(data),
        success: function (result) {
            if (result.length == 0) {
                HuyDonHang(id);
            }
            console.log(result);
        },
        error: function (error) {
            console.error('Lỗi khi lấy dữ liệu từ Session:', error);
        }
    });
};

// Thêm sản phâm 
function DanhSachSanPhamThem() {
    $.ajax({
        type: 'GET',
        url: '/KhachHang/HoaDonKH/DanhSachSanPhamThemJson',// Điều chỉnh đường dẫn tùy thuộc vào định tuyến của bạn
        success: function (result) {
            $("#sanpham").empty();
            if (result != null) {
                var content = '';
                for (i = 0; i < result.length; i++) {
                    var giaban = result[i].giaBan.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
                    content += '<div class="col-lg-4 mb-4 text-center">';
                    content += ' <div class="product-entry border">';
                    content += '<a href="#" class="prod-img">';
                    if (result[i].lstAnhSanPham.length == 0) {
                        content += '<img src="https://congtygiaphat104.com/template/Default/img/no.png" class="img-fluid" alt="Free html5 bootstrap 4 template">';
                    } else {
                        content += '<img src="/Admin/Anh/DisplayImage?DuongDan=' + result[i].lstAnhSanPham[0].duongDan + '" class="img-fluid" alt="Free html5 bootstrap 4 template">';
                    }
                    content += '</a>';
                    content += '<div class="desc">';
                    content += '<h2><a href="/KhachHang/HoaDonKH/SanPhamChiTietThem?idspct=' + result[i].id + '">' + result[i].tenSP + '</a ></h2 > ';
                    content += '<span class="price">' + giaban + '</span>';
                    content += '</div>';
                    content += '</div>';
                    content += '</div>';
                }
                $("#sanpham").append(content);
            };
            console.log(result);

            PhanTrang();
        },
        error: function (error) {
            console.error('Lỗi khi lấy dữ liệu từ Session:', error);
        },

    });

};

function Timkiemsanpham() {
    var tukhoa = document.getElementById("tukhoa").value;
    if (tukhoa == "") {
        DanhSachSanPhamThem();
    } else {
        $.ajax({
            type: 'POST',
            url: '/Admin/SanPhamChiTiet/TimKiemTheoTenSanpham', // Điều chỉnh đường dẫn tùy thuộc vào định tuyến của bạn
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(tukhoa),
            success: function (result) {
                $("#sanpham").empty();
                if (result != null) {
                    var content = '';
                    for (i = 0; i < result.length; i++) {
                        var giaban = result[i].giaBan.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
                        content += '<div class="col-lg-4 mb-4 text-center">';
                        content += ' <div class="product-entry border">';
                        content += '<a href="#" class="prod-img">';
                        if (result[i].lstAnhSanPham.length == 0) {
                            content += '<img src="https://congtygiaphat104.com/template/Default/img/no.png" class="img-fluid" alt="Free html5 bootstrap 4 template">';
                        } else {
                            content += '<img src="~/uploads/' + result[i].lstAnhSanPham[0].DuongDan + '" class="img-fluid" alt="Free html5 bootstrap 4 template">';
                        }
                        content += '</a>';
                        content += '<div class="desc">';
                        content += '<h2><a href="/KhachHang/TrangChu/SanPhamChiTiet?idspct=' + result[i].id + '">' + result[i].tenSP + '</a ></h2 > ';
                        content += '<span class="price">' + giaban + '</span>';
                        content += '</div>';
                        content += '</div>';
                        content += '</div>';
                    }
                    $("#sanpham").append(content);
                };

                PhanTrang();
            },
            error: function (error) {
                console.error('Lỗi khi lấy dữ liệu từ Session:', error);
            }
        });
    }
};

function PhanTrang() {
    console.log("PhanTrang() has been called."); // Thêm dòng này để kiểm tra

    // Lấy danh sách tất cả các sản phẩm
    const products = document.querySelectorAll('.product-entry');

    // Số sản phẩm hiển thị trên mỗi trang
    const itemsPerPage = 6;

    // Tính số trang
    const numPages = Math.ceil(products.length / itemsPerPage);

    // Hiển thị trang đầu tiên khi tải trang
    showPage(1);

    // Tạo các nút phân trang
    const pagination = document.getElementById('phantrang');

    pagination.innerHTML = '';
    // Tạo các nút phân trang mới
    createPaginationButtons(numPages);

    // Hàm tạo các nút phân trang
    function createPaginationButtons(numPages) {
        const firstPage = createPaginationButton('First', 1);
        const lastPage = createPaginationButton('Last', numPages);
        pagination.appendChild(firstPage);
        for (let i = 1; i <= numPages; i++) {
            const page = createPaginationButton(i, i);
            pagination.appendChild(page);
        }
        pagination.appendChild(lastPage);
    }

    // Hàm tạo một nút phân trang
    function createPaginationButton(label, pageNum) {
        const li = document.createElement('li');
        const a = document.createElement('a');
        a.href = '#';
        a.textContent = label;
        a.addEventListener('click', function () {
            showPage(pageNum);
        });
        li.appendChild(a);
        return li;
    }

    // Hàm hiển thị các sản phẩm của một trang cụ thể
    function showPage(pageNum) {
        const startIndex = (pageNum - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        products.forEach(function (product, index) {
            if (index >= startIndex && index < endIndex) {
                product.style.display = 'block';
            } else {
                product.style.display = 'none';
            }
        });
    }
};

function ThemSanPhamVaoHoaDonChiTiet() {

    var size = document.getElementById("GiaTriSize").innerText;
    var mausac = document.getElementById("GiaTriMau").innerText;

    if (size == "") {
        alert("Bạn chưa chọn size.");
        return;
    } else if (mausac == "") {
        alert("Bạn chưa chọn màu.");
        return;
    }
    else {
        var idhdon = $('p[id="NhanIDHD"]').text();
        var idspct = document.getElementById("idsanpham").innerText;
        var soluongspct = document.getElementById("quantity").value;
        var data = {
            IDSPCT: idspct,
            SoLuong: soluongspct,
            IDHoaDon: idhdon,
        }
        $.ajax({
            type: 'POST',
            url: '/KhachHang/HoaDonKH/ThemVaoHDCT',
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(data),
            success: function (result) {
                console.log(result);
                alert(result.message);
                UpdateHoaDonTaiQuay(idhdon);
            },
            error: function (error) {
                alert(error);
            }
        });
    }
};

function UpdateHoaDonTaiQuay(id) {
    var data = {
        ID: id,
    }
    $.ajax({
        type: 'POST',
        url: '/KhachHang/HoaDonKH/UpdateHoaDon',
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(data),
        success: function (result) {
            console.log(result);
        },
        error: function (error) {

        }
    });
};

function xuatHoaDon() {
    var idhd = document.getElementById("IdCuaHoaDon").innerText;
    $.ajax({
        type: 'POST',
        url: '/Admin/HoaDon/InHoaDon',
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(idhd),
        success: function (result) {
            alert(result.message);
        },
        error: function (error) {

        }
    });
}