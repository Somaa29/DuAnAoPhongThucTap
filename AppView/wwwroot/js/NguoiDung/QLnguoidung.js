
var idnguoidung = "";
function DanhSachNguoiDung() {
    $.ajax({
        type: 'GET',
        url: '/Admin/QLNguoiDung/DanhSachNguoiDungJson', // Điều chỉnh đường dẫn tùy thuộc vào định tuyến của bạn
        success: function (result) {
            $("#table-user").empty();
            if (result != null) {
                var stt = 0;
                for (var i = 0; i < result.length; i++) {
                    stt++;
                    var content = '';
                    content += '<tr>';
                    content += '<td>' + stt;
                    content += '</td>';
                    content += '<td>' + result[i].tenNguoiDung;
                    content += '</td>';
                    content += '<td>';
                    content += '<ul class="list-inline">';
                    content += '<li class="list-inline-item">';
                    if (result[i].anh == null || result[i].anh == undefined || result[i].anh == "string") {
                        content += '<img alt="Avatar" class="table-avatar" src="https://ps.w.org/user-avatar-reloaded/assets/icon-256x256.png?rev=2540745">';
                    }
                    else {
                        content += '<img alt="Avatar" src="' + result[i].anh + '" class="img-fluid mb-2" alt = "' + result[i].anh + '" />';
                    }
                    content += '</li>';
                    content += '</ul>';
                    content += '</td>';
                    content += '<td>' + result[i].email;
                    content += '</td>';
                    content += '<td>' + result[i].sdt;
                    content += '</td >';
                    content += '<td class="project-state">';
                    if (result[i].trangThai == 1) {
                        content += '<span class="badge badge-success">Hoạt động</span>';
                    } else {
                        content += '<span class="badge badge-error">không hoạt động</span>';
                    }
                    content += '</td>';
                    content += '<td class="project-actions text-center">';
                    if (result[i].trangThai == 1) {
                        content += '<button onclick="TatHoatDongTaiKhoan(\'' + result[i].id + '\');" class="btn btn-danger btn-sm"><i class="fas fa-lock"></i> Khóa</button>';
                    } else {
                        content += '<button onclick="KichHoatTaiKhoan(\'' + result[i].id + '\')" class="btn btn-primary btn-sm" ><i class="fas fa-lock-open"></i> Kích hoạt</button>';
                    }

                    content += '</td>';
                    content += '</tr>'
                    $("#table-user").append(content);

                    //'<option value="' + result[i].wardCode + '" data-url="' + '/GioHang/TinhTienShip?WardCode=' + data[i].wardCode + '">' + data[i].wardName + '</option>'

                }
            }
            console.log(result);
        },
        error: function (error) {
            console.error('Lỗi khi lấy dữ liệu từ Session:', error);
        }
    });
}
function TimkiemNguoiDungTheoTuKhoa() {
    var tukhoa = document.getElementById("tukhoa").value;
    if (tukhoa == null || tukhoa == "" || tukhoa == undefined) {
        DanhSachNguoiDung();
    } else {
        $.ajax({
            type: 'POST',
            url: '/Admin/QLNguoiDung/DanhSachNguoiDungTheoTuKhoa',
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(tukhoa),
            success: function (result) {
                $("#table-user").empty();
                if (result.length > 0) {
                    var stt = 0;
                    for (var i = 0; i < result.length; i++) {
                        stt++;
                        var content = '';
                        content += '<tr>';
                        content += '<td>' + stt;
                        content += '</td>';
                        content += '<td>' + result[i].tenNguoiDung;
                        content += '</td>';
                        content += '<td>';
                        content += '<ul class="list-inline">';
                        content += '<li class="list-inline-item">';
                        if (result[i].anh == null || result[i].anh == undefined || result[i].anh == "string") {
                            content += '<img alt="Avatar" class="table-avatar" src="https://ps.w.org/user-avatar-reloaded/assets/icon-256x256.png?rev=2540745">';
                        }
                        else {
                            content += '<img alt="Avatar" src="' + result[i].anh + '" class="img-fluid mb-2" alt = "' + result[i].anh + '" />';
                        }
                        content += '</li>';
                        content += '</ul>';
                        content += '</td>';
                        content += '<td>' + result[i].email;
                        content += '</td>';
                        content += '<td>' + result[i].sdt;
                        content += '</td >';
                        content += '<td class="project-state">';
                        if (result[i].trangThai == 1) {
                            content += '<span class="badge badge-success">Hoạt động</span>';
                        } else {
                            content += '<span class="badge badge-error">không hoạt động</span>';
                        }
                        content += '</td>';
                        content += '<td class="project-actions text-center">';
                        if (result[i].trangThai == 1) {
                            content += '<button class="btn btn-danger btn-sm" onclick="TatHoatDongTaiKhoan(\'' + result[i].id + '\');" ><i class="fas fa-lock"></i> Khóa</button>';
                        } else {
                            content += '<button class="btn btn-primary btn-sm" onclick="KichHoatTaiKhoan(\'' + result[i].id + '\')" ><i class="fas fa-lock-open"></i> Kích hoạt</button>';
                        }

                        content += '</td>';
                        content += '</tr>'
                        $("#table-user").append(content);

                        //'<option value="' + result[i].wardCode + '" data-url="' + '/GioHang/TinhTienShip?WardCode=' + data[i].wardCode + '">' + data[i].wardName + '</option>'
                    }
                }

                console.log(result)
            },
            error: function (error) { }

        })
    }

};
document.getElementById("trangthaiFilter").addEventListener("change", function () {
    var selectedValue = this.value;
    if (selectedValue == "-1") {
        DanhSachNguoiDung();
    } else {
        $.ajax({
            type: 'POST',
            url: '/Admin/QLNguoiDung/DanhSachNguoiDungTrangThai',
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(selectedValue),
            success: function (result) {
                $("#table-user").empty();
                if (result.length > 0) {
                    var stt = 0;
                    for (var i = 0; i < result.length; i++) {
                        stt++;
                        var content = '';
                        content += '<tr>';
                        content += '<td>' + stt;
                        content += '</td>';
                        content += '<td>' + result[i].tenNguoiDung;
                        content += '</td>';
                        content += '<td>';
                        content += '<ul class="list-inline">';
                        content += '<li class="list-inline-item">';
                        if (result[i].anh == null || result[i].anh == undefined || result[i].anh == "string") {
                            content += '<img alt="Avatar" class="table-avatar" src="https://ps.w.org/user-avatar-reloaded/assets/icon-256x256.png?rev=2540745">';
                        }
                        else {
                            content += '<img alt="Avatar" src="' + result[i].anh + '" class="img-fluid mb-2" alt = "' + result[i].anh + '" />';
                        }
                        content += '</li>';
                        content += '</ul>';
                        content += '</td>';
                        content += '<td>' + result[i].email;
                        content += '</td>';
                        content += '<td>' + result[i].sdt;
                        content += '</td >';
                        content += '<td class="project-state">';
                        if (result[i].trangThai == 1) {
                            content += '<span class="badge badge-success">Hoạt động</span>';
                        } else {
                            content += '<span class="badge badge-error">không hoạt động</span>';
                        }
                        content += '</td>';
                        content += '<td class="project-actions text-center">';
                        if (result[i].trangThai == 1) {
                            content += '<button class="btn btn-danger btn-sm" onclick="TatHoatDongTaiKhoan(\'' + result[i].id + '\');"><i class="fas fa-lock"></i> Khóa</button>';
                        } else {
                            content += '<button class="btn btn-primary btn-sm" onclick="KichHoatTaiKhoan(\'' + result[i].id + '\')"><i class="fas fa-lock-open"></i> Kích hoạt</button>';
                        }

                        content += '</td>';
                        content += '</tr>'
                        $("#table-user").append(content);

                        //'<option value="' + result[i].wardCode + '" data-url="' + '/GioHang/TinhTienShip?WardCode=' + data[i].wardCode + '">' + data[i].wardName + '</option>'
                    }
                }
                console.log(result)
            },
            error: function (error) {

            }
        });
    }
});
function TatHoatDongTaiKhoan(id) {
    if (id == "" || id == null || id == undefined) {
        alert("Thất bại.");
    } else {
        var data = {
            Id: id
        }
        $.ajax({
            type: 'POST',
            url: '/Admin/QLNguoiDung/KhoaTaiKhoan',
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(data),
            success: function (result) {
                alert(result.message)
                console.log(result);
                DanhSachNguoiDung();
            },
            error: function (error) {

            }
        });
    }

};
function KichHoatTaiKhoan(id) {
    if (id == "" || id == null || id == undefined) {
        alert("Thất bại.");
    } else {
        var data = {
            Id: id
        }
        $.ajax({
            type: 'POST',
            url: '/Admin/QLNguoiDung/KichHoaTaiKhoan',
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(data),
            success: function (result) {
                alert(result.message);
                console.log(result);
                DanhSachNguoiDung();
            },
            error: function (error) {

            }
        });
    }
};

function KiemtraEmail(event) {
    event.preventDefault();
    var email = document.getElementById("txt_email").value;
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email == "") {
        document.getElementById("CheckEmail").innerText = "Bạn chưa nhập email";
        return;
    } else if (!emailRegex.test(email)) {
        document.getElementById("CheckEmail").innerText = "Mời bạn nhập đúng dạng email.";
        return;
    } else {
        $.ajax({
            url: '/DangNhap/KiemTraEmail',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(email),
            success: function (result) {
                if (result.length == 0) {
                    document.getElementById("CheckEmail").innerText = "Email bạn nhập chưa được đăng ký.";
                    return;
                } else {
                    document.getElementById("CheckEmail").innerText = "";
                    document.getElementById("matkhau").style.display = "block";
                    document.getElementById("LuuMK").style.display = "block";
                    document.getElementById("kiemtraemail").style.display = "none";
                    console.log(result);
                    for (var i = 0; i < result.length; i++) {
                        idnguoidung = String(result[i].id);
                    }
                }
            },
            error: function (xhr, status, error) {
                alert('Lỗi: ', error);
            }
        });
    };
};

function DoiMatKhau(event) {
        event.preventDefault();
        var idnguoidung = document.getElementById("idnguoidung").innerText;
        var password = document.getElementById("password").value;
        var Repassword = document.getElementById("Repassword").value;
        if (password == "") {
            document.getElementById("Checkpassword").innerText = "Bạn chưa nhập mật khẩu.";
            document.getElementById("Repassword").value = "";
            return;
        } else if (Repassword == "" && password != "") {
            document.getElementById("CheckRepassword").innerText = "Bạn chưa xác nhận lại mật khẩu.";
            document.getElementById("Checkpassword").innerText = "";
            return;
        } else if (password != Repassword) {
            document.getElementById("CheckRepassword").innerText = "Mật khẩu không khớp mời bạn nhập lại.";
            document.getElementById("Repassword").value = "";
            return;
        } else {
            document.getElementById("Repassword").value = "";
            var data = {
                Id: idnguoidung,
                MatKhau: Repassword,
            }
            $.ajax({
                url: '/DangNhap/DoiMatKhau',
                type: 'POST',
                contentType: 'application/json',
                data: JSON.stringify(data),
                success: function (result) {
                    alert(result.message);
                },
                error: function (xhr, status, error) {
                    alert('Lỗi: ', error);
                }
            });
        }
    };
function ThongTinCaNhan() {
    var data = {
        Id: idnguoidung,
        MatKhau: Repassword,
    }
    $.ajax({
        url: '/KhachHang/ThongTinCaNhan/ThongTinCaNhanJson',
        type: 'GET',
        contentType: 'application/json',
        data: JSON.stringify(data),
        success: function (result) {
            var ngaySinh = new Date(result.ngaySinh);

            // Lấy ra các thành phần ngày, tháng và năm
            var day = ngaySinh.getDate();
            var month = ngaySinh.getMonth() + 1; // Lưu ý: Tháng bắt đầu từ 0, nên cần cộng thêm 1
            var year = ngaySinh.getFullYear();

            // Đảm bảo rằng các giá trị ngày, tháng và năm đều có đủ chữ số
            day = day < 10 ? '0' + day : day;
            month = month < 10 ? '0' + month : month;

            // Tạo chuỗi có định dạng "dd/MM/yyyy"
            var formattedDate = day + '/' + month + '/' + year;

            // Gán chuỗi có định dạng hợp lệ vào trường nhập dạng date
            document.getElementById("NgaySinh").value = formattedDate;
            document.getElementById("HoVaTen").value = result.tenNguoiDung;
            //document.getElementById("ten").innerText = result.tenNguoiDung;
            document.getElementById("idnguoidung").innerText = result.id;
            //document.getElementById("NgaySinh").value = result.ngaySinh;
            document.getElementById("SDT").value = result.sdt;
            document.getElementById("Email").value = result.email;
            document.getElementById("Tinh").value = result.tinhThanh;
            document.getElementById("Quan").value = result.quanHuyen;
            document.getElementById("Phuong").value = result.phuongXa;
            document.getElementById("DiaChi").value = result.diaChi;
            $("#linkanh").empty();
            var content = '';
            if (result.anh == "") {
                content += '<img class="rounded-circle mt-5" width="150px" src="https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg">';
            } else {
                content += '<img class="rounded-circle mt-5" width="150px" src="' + result.anh +'">';
            }
            $("#linkanh").append(content);
            console.log(result);
        },
        error: function (xhr, status, error) {
            alert('Lỗi: ', error);
        }
    });
};

function HienThiDoiMatKhau(event) {
    event.preventDefault();
    document.getElementById("thongtin").style.display = "none";
    document.getElementById("doimk").style.display = "block";
    document.getElementById("fileanh").style.display = "none";
}
function HienThiThongTin(event) {
    event.preventDefault();
    document.getElementById("thongtin").style.display = "block";
    document.getElementById("doimk").style.display = "none"
    document.getElementById("fileanh").style.display = "block";
}

function LuuThongTin() {
    var id = document.getElementById("idnguoidung").innerText;
    var ten = document.getElementById("HoVaTen").value;
    var anh = document.getElementById("fileanh").value;
    var sdt = document.getElementById("SDT").value;
    var email = document.getElementById("Email").value;
    var tinh = document.getElementById("Tinh").value;
    var quan = document.getElementById("Quan").value;
    var phuong = document.getElementById("Phuong").value;
    var diachi = document.getElementById("DiaChi").value;
    var data = {
        Id: id,
        TenNguoiDung: ten,
        NgaySinh: Repassword,
        Anh: anh,
        SDT: sdt,
        Email: email,
        QuanHuyen: quan,
        TinhThanh: tinh,
        PhuongXa: phuong,
        DiaChi: diachi,
    }
    $.ajax({
        url: '/KhachHang/ThongTinCaNhan/ThayThoiThongTinCaNhan',
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(data),
        success: function (result) {
            if (result.message == "Chỉnh sửa thông tin thất bại.") {
                alert("Lưu thất bại.");
            } else if (result.message == "Chỉnh sửa thông tin thành công.") {
                alert("Lưu thành công.");

            } else {
                alert("Lỗi.");
            }
            console.log(result);
        },
        error: function (xhr, status, error) {
            alert('Lỗi: ', error);
        }
    });
};
