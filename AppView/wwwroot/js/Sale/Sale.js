﻿// Admin
function DanhSachSaleChiTietAdmin() {
    $.ajax({
        type: 'GET',
        url: '/Admin/SaleChiTiet/DanhSachSaleChiTietJson',// Điều chỉnh đường dẫn tùy thuộc vào định tuyến của bạn
        success: function (result) {
            $("#DanhSachSPCTSale").empty();
            if (result != null) {
                var content = '';
                var stt = 0;
                for (var i = 0; i < result.length; i++) {
                    var tiengiamgia = result[i].giaGoc - result[i].giaGiam;
                    stt++;
                    var giagoc = result[i].giaGoc.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });;
                    var tiengiam = tiengiamgia.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });;
                    var giaBan = result[i].giaGiam.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
                    content += '<tr>';
                    content += '<td style="display:none;">' + result[i].id;
                    content += '</td>';
                    content += '<td>' + stt;
                    content += '</td>';
                    content += '<td>' + result[i].maSale;
                    content += '</td>';
                    content += '<td>' + result[i].tenSP;
                    content += '</td>';
                    content += '<td>';
                    if (result[i].lstAnhSanPham.length > 0) {
                        for (var j = 0; j < result[i].lstAnhSanPham.length; j++) {
                            content += '<img src="/Admin/Anh/DisplayImage?DuongDan=' + result[i].lstAnhSanPham[j].duongDan + '" alt="Image" width="20%" height="20%" />';
                        }
                    } else {
                        content += '';
                    }
                    content += '</td>';
                    content += '<td>' + result[i].soLuong;
                    content += '</td>';
                    content += '<td>' + result[i].phanTramGiam + '%';
                    content += '</td>';
                    content += '<td>' + giagoc;
                    content += '</td>';
                    content += '<td>' + tiengiam;
                    content += '</td>';
                    content += '<td>' + giaBan;
                    content += '</td>';

                    content += '<td>';
                    if (result[i].trangThai == 1) {
                        content += '<p>Còn hàng</p>';
                    } else {
                        content += '<p>Hết hàng</p>';
                    }
                    content += '</td>';
                    content += '<td style="display: flex;">';
                    if (result[i].trangThai == 1) {
                        content += '<a href="/Admin/SanPhamChiTiet/Update/' + result[i].id + '"><i class="fas fa-edit" style="color: #005eff;"></i></a>';
                        content += '<p>  </p>';
                        content += '<button class="btn" onclick="HetHang(\'' + result[i].id + '\');"><i class="fas fa-trash-alt" style="color: #ff0000;"></i></button>';
                    } else {
                        content += '<a href="/Admin/SanPhamChiTiet/Update/' + result[i].id + '"><i class="fas fa-edit" style="color: #005eff;"></i></a>';
                        content += '<p>  </p>';
                        content += '<button class="btn" onclick="ConHang(\'' + result[i].id + '\');"><i class="fas fa-redo-alt fa-rotate-180" style="color: #fbff00;"></i></button>';
                    }
                    content += '</td>';
                    content += '</tr>';
                }
                $("#DanhSachSPCTSale").append(content);
            };
            //PhanTrangChoSanPham();
            console.log(result);
        },
        error: function (error) {
            console.error('Lỗi khi lấy dữ liệu từ Session:', error);
        },

    });
};
function HetHang(id) {
    var data = {
        ID: id
    };
    $.ajax({
        type: 'POST',
        url: '/Admin/SaleChiTiet/Hethang',
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(data),
        success: function (result) {
            alert(result.message);
            console.log(result);
            DanhSachSaleChiTietAdmin();
        },
        error: function (error) {
            console.log(error);
        }
    });
};

function ConHang(id) {
    var data = {
        ID: id
    };
    $.ajax({
        type: 'POST',
        url: '/Admin/SaleChiTiet/ConHang',
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(data),
        success: function (result) {
            alert(result.message);
            console.log(result);
            DanhSachSaleChiTietAdmin();
        },
        error: function (error) {
            console.log(error);
        }
    });
};

function TimKiemSaleChiTietTheoTen(event) {
    event.preventDefault();
    var tukhoa = document.getElementById("tukhoa").value;
    if (tukhoa == "") {
        DanhSachSaleChiTietAdmin();
    } else {
        $.ajax({
            type: 'POST',
            url: '/Admin/SaleChiTiet/Timkiemtheoten',
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(tukhoa),
            success: function (result) {
                $("#DanhSachSPCTSale").empty();
                if (result != null) {
                    var content = '';
                    var stt = 0;
                    for (var i = 0; i < result.length; i++) {
                        var tiengiamgia = result[i].giaGoc - result[i].giaGiam;
                        stt++;
                        var giagoc = result[i].giaGoc.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });;
                        var tiengiam = tiengiamgia.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });;
                        var giaBan = result[i].giaGiam.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
                        content += '<tr>';
                        content += '<td style="display:none;">' + result[i].id;
                        content += '</td>';
                        content += '<td>' + stt;
                        content += '</td>';
                        content += '<td>' + result[i].maSale;
                        content += '</td>';
                        content += '<td>' + result[i].tenSP;
                        content += '</td>';
                        content += '<td>';
                        if (result[i].lstAnhSanPham.length > 0) {
                            for (var j = 0; j < result[i].lstAnhSanPham.length; j++) {
                                content += '<img src="/Admin/Anh/DisplayImage?DuongDan=' + result[i].lstAnhSanPham[j].duongDan + '" alt="Image" width="20%" height="20%" />';
                            }
                        } else {
                            content += '';
                        }
                        content += '</td>';
                        content += '<td>' + result[i].soLuong;
                        content += '</td>';
                        content += '<td>' + result[i].phanTramGiam + '%';
                        content += '</td>';
                        content += '<td>' + giagoc;
                        content += '</td>';
                        content += '<td>' + tiengiam;
                        content += '</td>';
                        content += '<td>' + giaBan;
                        content += '</td>';

                        content += '<td>';
                        if (result[i].trangThai == 1) {
                            content += '<p>Còn hàng</p>';
                        } else {
                            content += '<p>Hết hàng</p>';
                        }
                        content += '</td>';
                        content += '<td style="display: flex;">';
                        if (result[i].trangThai == 1) {
                            content += '<a href="/Admin/SanPhamChiTiet/Update/' + result[i].id + '"><i class="fas fa-edit" style="color: #005eff;"></i></a>';
                            content += '<p>  </p>';
                            content += '<button class="btn" onclick="HetHang(\'' + result[i].id + '\');"><i class="fas fa-trash-alt" style="color: #ff0000;"></i></button>';
                        } else {
                            content += '<a href="/Admin/SanPhamChiTiet/Update/' + result[i].id + '"><i class="fas fa-edit" style="color: #005eff;"></i></a>';
                            content += '<p>  </p>';
                            content += '<button class="btn" onclick="ConHang(\'' + result[i].id + '\');"><i class="fas fa-redo-alt fa-rotate-180" style="color: #fbff00;"></i></button>';
                        }
                        content += '</td>';
                        content += '</tr>';
                    }
                    $("#DanhSachSPCTSale").append(content);
                };
                console.log(result);
            },
            error: function (error) {
                console.log(error);
            }
        });
    }
};

function TimKiemTheoNgay() {
    const ngbd = document.getElementById("NgayBatDau");
    const selectedDatebd = ngbd.value;

    const ngkt = document.getElementById("NgayKetThuc");
    const selectedDatekt = ngkt.value;
    if (selectedDatebd == "") {
        alert("Bạn chưa chọn ngày bắt đầu");
        return;
    } else if (selectedDatekt == "") {
        alert("Bạn chưa chọn ngày kết thúc");
    } else {
        $.ajax({
            type: 'POST',
            url: '/Admin/SaleChiTiet/LocTheoNgay',
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(selectedDatebd),
            success: function (result) {

                if (result.message != "" || result.message != null) {
                    alert(result.message);
                } else {
                    $("#DanhSachSPCTSale").empty();
                    if (result != null) {
                        var content = '';
                        var stt = 0;
                        for (var i = 0; i < result.length; i++) {
                            var tiengiamgia = result[i].giaGoc - result[i].giaGiam;
                            stt++;
                            var giagoc = result[i].giaGoc.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });;
                            var tiengiam = tiengiamgia.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });;
                            var giaBan = result[i].giaGiam.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
                            content += '<tr>';
                            content += '<td style="display:none;">' + result[i].id;
                            content += '</td>';
                            content += '<td>' + stt;
                            content += '</td>';
                            content += '<td>' + result[i].maSale;
                            content += '</td>';
                            content += '<td>' + result[i].tenSP;
                            content += '</td>';
                            content += '<td>';
                            if (result[i].lstAnhSanPham.length > 0) {
                                for (var j = 0; j < result[i].lstAnhSanPham.length; j++) {
                                    content += '<img src="/Admin/Anh/DisplayImage?DuongDan=' + result[i].lstAnhSanPham[j].duongDan + '" alt="Image" width="20%" height="20%" />';
                                }
                            } else {
                                content += '';
                            }
                            content += '</td>';
                            content += '<td>' + result[i].soLuong;
                            content += '</td>';
                            content += '<td>' + result[i].phanTramGiam + '%';
                            content += '</td>';
                            content += '<td>' + giagoc;
                            content += '</td>';
                            content += '<td>' + tiengiam;
                            content += '</td>';
                            content += '<td>' + giaBan;
                            content += '</td>';

                            content += '<td>';
                            if (result[i].trangThai == 1) {
                                content += '<p>Còn hàng</p>';
                            } else {
                                content += '<p>Hết hàng</p>';
                            }
                            content += '</td>';
                            content += '<td style="display: flex;">';
                            if (result[i].trangThai == 1) {
                                content += '<a href="/Admin/SanPhamChiTiet/Update/' + result[i].id + '"><i class="fas fa-edit" style="color: #005eff;"></i></a>';
                                content += '<p>  </p>';
                                content += '<button class="btn" onclick="HetHang(\'' + result[i].id + '\');"><i class="fas fa-trash-alt" style="color: #ff0000;"></i></button>';
                            } else {
                                content += '<a href="/Admin/SanPhamChiTiet/Update/' + result[i].id + '"><i class="fas fa-edit" style="color: #005eff;"></i></a>';
                                content += '<p>  </p>';
                                content += '<button class="btn" onclick="ConHang(\'' + result[i].id + '\');"><i class="fas fa-redo-alt fa-rotate-180" style="color: #fbff00;"></i></button>';
                            }
                            content += '</td>';
                            content += '</tr>';
                        }
                        $("#DanhSachSPCTSale").append(content);
                    }
                    console.log(result);
                }
            },
            error: function (error) {
                console.log(error);
            }
        });
    }
};



function suggest(event) {
    const inputValue = event.target.value.toLowerCase();
    if (inputValue === "") {
        clearSuggestionList();
        return;
    }

    $.ajax({
        type: 'GET',
        url: '/Admin/SanPhamChiTiet/GetProductDetailsJson',
        dataType: 'json',
        success: function (data) {
            const filteredSuggestions = data.filter(sanpham =>
                sanpham.tenSP.toLowerCase().includes(inputValue) ||
                sanpham.mauSac.includes(inputValue) ||
                sanpham.size.toLowerCase().includes(inputValue) ||
                sanpham.tenThuongHieu.toLowerCase().includes(inputValue) ||
                sanpham.loaiSanPham.toLowerCase().includes(inputValue) ||
                sanpham.soLuong.includes(inputValue)
            );
            const suggestionList = $("#suggestionList");
            suggestionList.empty();

            if (filteredSuggestions.length === 0) {
                suggestionList.append("<li class='noMatch'>Không có bản ghi tương ứng</li>");
            } else {
                filteredSuggestions.forEach(sanpham => {
                    suggestionList.append(`<li>${sanpham.tenSP} - ${sanpham.mauSac} - ${sanpham.size} - ${sanpham.tenThuongHieu} - ${sanpham.loaiSanPham} - SL:${sanpham.soLuong}</li>`);
                });
                suggestionList.find('li').on('click', function () {
                    // Lấy thông tin của gợi ý được chọn
                    const selectedUser = $(this).text().split(' - ');
                    const tenSP = selectedUser[0];
                    const mauSac = selectedUser[1];
                    const size = selectedUser[2];
                    const tenThuongHieu = selectedUser[3];
                    const loaiSanPham = selectedUser[4];

                    // Điền thông tin vào các ô input
                    $('#inputBox').val(tenSP);
                    $('#mausac').text(mauSac);
                    $('#size').text(size);
                    $('#thuonghieu').text(tenThuongHieu);
                    $('#loaisanpham').text(loaiSanPham);

                    truyvansanphamsale();
                    // Xóa danh sách gợi ý
                    clearSuggestionList();
                });
            }
        },
        error: function (error) {

        }
    });
};
function clearSuggestionList() {
    $("#suggestionList").empty();
};

function truyvansanphamsale() {
    var mausac = $('#mausac').text();
    var size = $('#size').text();
    var tenThuongHieu = $('#thuonghieu').text();
    var loaiSanPham = $('#loaisanpham').text();
    var tensp = document.getElementById("inputBox").value;
    var data = {
        TenSP: tensp,
        MauSac: mausac,
        Size: size,
        LoaiSanPham: loaiSanPham,
        TenThuongHieu: tenThuongHieu,
    }
    $.ajax({
        type: 'POST',
        url: '/Admin/SaleChiTiet/TruyVanIDSanPham',
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(data),
        success: function (result) {
            console.log(result);
        },
        error: function (error) {
            console.log(error);
        }
    });
};

function ThemSanPhamSale() {
    var idsale = $("#erroridsale").text();
    var guidPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    if (idsale == "") {
        $("#erroridsale").text("Bạn chưa chọn giá trị nào.");
        return;
    }
    else if (guidPattern.test(idsale) == false) {
        $("#erroridsale").text("Bạn chưa chọn giá trị nào.");
        return;
    } else {
        var soluong = document.getElementById("soluong").value;
        var data = {
            IDSale: idsale,
            SoLuong: soluong,
        }
        $.ajax({
            type: 'POST',
            url: '/Admin/SaleChiTiet/ThemSanPhamSale',
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(data),
            success: function (result) {
                if (result.message == "Thêm thành công") {
                    alert(result.message);
                    window.location.href = "/Admin/SaleChiTiet/DanhSachTatCaSaleChiTiet";
                } else {
                    alert(result.message);
                }
                console.log(result);
            },
            error: function (error) {
                console.log(error);
            }
        });
    }
};



// Khách hàng

$(document).ready(function () {
    // Sự kiện hiển thị suggest khi click vào ô input
    $('#txt_Thuonghieusale').on('focus', function () {
        suggestThuongHieuSale();
    });

    $('#txt_MauSacsale').on('focus', function () {
        suggestMauSacSale();
    });
    $('#txt_Sizesale').on('focus', function () {
        suggestSizeSale();
    });
    $('#txt_LoaiSanPhamsale').on('focus', function () {
        suggestTheLoaiSale();
    });

    // Sự kiện ẩn suggest khi click ra ngoài ô input
    $(document).on('click', function (event) {
        const target = $(event.target);
        // Kiểm tra nếu không phải là ô input hoặc các phần tử của suggestList
        if (!target.is('#txt_Thuonghieusale') && !target.closest('#suggestionListThuonghieuSale').length) {
            $("#suggestionListThuonghieuSale").empty();
        }
        if (!target.is('#txt_MauSacsale') && !target.closest('#suggestionListMauSacSale').length) {
            $("#suggestionListMauSacSale").empty();
        }
        if (!target.is('#txt_Sizesale') && !target.closest('#suggestionListSizeSale').length) {
            $("#suggestionListSizeSale").empty();
        }
        if (!target.is('#txt_LoaiSanPhamsale') && !target.closest('#suggestionListSanPhamSale').length) {
            $("#suggestionListSanPhamSale").empty();
        }
    });
});
function SanPhamSaleHK() {
    $.ajax({
        type: 'GET',
        url: '/KhachHang/SaleKH/DanhSachSaleJson',// Điều chỉnh đường dẫn tùy thuộc vào định tuyến của bạn
        success: function (result) {
            $("#SanPhamSale").empty();
            if (result.length > 0) {
                var content = '';
                for (i = 0; i < result.length; i++) {
                    var giaGiam = result[i].giaGiam.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
                    var giaGoc = result[i].giaGoc.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
                    content += '<div class="border col-md-4 text-center product-entry1">';
                    content += '<div class="prod-img">';
                    if (result[i].lstAnhSanPham.length == 0) {
                        content += '<img src="https://congtygiaphat104.com/template/Default/img/no.png" class="img-fluid" alt="Free html5 bootstrap 4 template">';
                    } else {
                        content += '<img src="/Admin/Anh/DisplayImage?DuongDan=' + result[i].lstAnhSanPham[0].duongDan + '" class="img-fluid" alt="Free html5 bootstrap 4 template" style="width:225px;height: 225px;">';
                    }
                    content += '<div class="phan-tram-giam">-' + result[i].phanTramGiam + '%</div>';
                    content += '</div>';
                    content += '<div class="desc">';
                    content += '<h2><a href="/KhachHang/SaleKH/SaleChiTiet/' + result[i].idSalechitiet + '" style="text-decoration: none;color: black; ">' + result[i].tenSP + '</a></h2>';

                    content += '<div class="price">';
                    content += '<span class="tien-sale">' + giaGiam + '</span>';
                    content += '<span class="tien-goc">' + giaGoc + '</span>';
                    content += '</div>';
                    content += '</div>';


                    content += '</div>';

                }
                $("#SanPhamSale").append(content);
            };
            console.log(result);

            PhanTrangsale();
        },
        error: function (error) {
            console.error('Lỗi khi lấy dữ liệu từ Session:', error);
        },

    });
};
function HienThiLenTrangChu() {
    $.ajax({
        type: 'GET',
        url: '/KhachHang/SaleKH/DanhSachSaleJson',// Điều chỉnh đường dẫn tùy thuộc vào định tuyến của bạn
        success: function (result) {
            $("#danhsachsanphamsale").empty();
            if (result.length > 0 && result.length < 8) {
                var content = '';
                content += '<div class="row row-pb-md">';
                for (i = 0; i < result.length; i++) {
                    var giaGiam = result[i].giaGiam.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
                    var giaGoc = result[i].giaGoc.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });

                    content += '<div class="col-md-3 col-lg-3 mb-4 text-center" >';
                    content += '<div class="product-entry border">'
                    content += '<div class="prod-img">';  //image - container
                    if (result[i].lstAnhSanPham.length == 0) {
                        content += '<img src="https://congtygiaphat104.com/template/Default/img/no.png" class="img-fluid" alt="Free html5 bootstrap 4 template">';
                    } else {
                        content += '<img src="/Admin/Anh/DisplayImage?DuongDan=' + result[i].lstAnhSanPham[0].duongDan + '" class="img-fluid" alt="Free html5 bootstrap 4 template" style="width:225px;height: 225px;">';
                    }
                    content += '<div class="phan-tram-giam">-' + result[i].phanTramGiam + '%</div>';
                    content += '</div>';
                    content += '<div class="desc">';
                    content += '<h2><a href="/KhachHang/SaleKH/SaleChiTiet/' + result[i].idSalechitiet + '" style="text-decoration: none;color: black; ">' + result[i].tenSP + '</a></h2> ';

                    content += '<div class="price">';
                    content += '<span class="tien-sale">' + giaGiam + '</span>';
                    content += '<span class="tien-goc">' + giaGoc + '</span>';
                    content += '</div>';
                    content += '</div>';
                    content += '</div>';
                    content += '</div>';

                }
                content += '</div>';
                $("#danhsachsanphamsale").append(content);
            };
            console.log(result);
        },
        error: function (error) {
            console.error('Lỗi khi lấy dữ liệu từ Session:', error);
        },

    });
};
// kh
function TimkiemsaleKH() {
    var tukhoa = document.getElementById("tukhoa").value;
    if (tukhoa == "") {
        SanPhamSaleHK();
    } else {
        $.ajax({
            type: 'POST',
            url: '/KhachHang/SaleKH/TimKiemSPSale',
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(tukhoa),
            success: function (result) {
                $("#SanPhamSale").empty();
                if (result.length > 0) {
                    var content = '';
                    for (i = 0; i < result.length; i++) {
                        var giaGiam = result[i].giaGiam.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
                        var giaGoc = result[i].giaGoc.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
                        content += '<div class="border col-md-4 text-center product-entry1">';
                        content += '<div class="prod-img">';
                        if (result[i].lstAnhSanPham.length == 0) {
                            content += '<img src="https://congtygiaphat104.com/template/Default/img/no.png" class="img-fluid" alt="Free html5 bootstrap 4 template">';
                        } else {
                            content += '<img src="/Admin/Anh/DisplayImage?DuongDan=' + result[i].lstAnhSanPham[0].duongDan + '" class="img-fluid" alt="Free html5 bootstrap 4 template" style="width:225px;height: 225px;">';
                        }
                        content += '<div class="phan-tram-giam">-' + result[i].phanTramGiam + '%</div>';
                        content += '</div>';
                        content += '<div class="desc">';
                        content += '<h2><a href="/KhachHang/SaleKH/SaleChiTiet/' + result[i].idSalechitiet + '" style="text-decoration: none;color: black; ">' + result[i].tenSP + '</a></h2>';

                        content += '<div class="price">';
                        content += '<span class="tien-sale">' + giaGiam + '</span>';
                        content += '<span class="tien-goc">' + giaGoc + '</span>';
                        content += '</div>';
                        content += '</div>';


                        content += '</div>';

                    }
                    $("#SanPhamSale").append(content);
                };
                console.log(result);
            },
            error: function (error) {
                console.log(error);
            }
        });
    }
}
function DanhSachTheoTenThuongHieuTheLoai() {
    var tensp = document.getElementById("TenSp").innerText;
    var thuonghieu = document.getElementById("idTenThuongHieu").innerText;
    var Loaisp = document.getElementById("loaiSanPham").innerText;
    var data = {
        TenSP: tensp,
        TenThuongHieu: thuonghieu,
        LoaiSanPham: Loaisp,
    }
    $.ajax({
        type: 'POST',
        url: '/KhachHang/SaleKH/TruyVanSanPhamTheoTenThuongHieuTheLoai',
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(data),
        success: function (result) {
            if (result != null) {
                $("#lst_size").empty();
                var contentsize = '';
                for (i = 0; i < result.length; i++) {
                    contentsize += '<li><a href="#" onclick="HienthiSize(this);">' + result[i].size + '</a></li>';
                }

                $("#lst_mau").empty();
                var contentmau = '';
                for (i = 0; i < result.length; i++) {
                    contentmau += '<li><a href="#" onclick="HienThiMau(this);">' + result[i].mau + '</a></li>';
                }
                $("#lst_size").append(contentsize);
                $("#lst_mau").append(contentmau);
            }
            console.log(result);
        },
        error: function (error) {
        }
    });
};
function HienthiSize(element) {
    var giaTri = element.textContent;
    document.getElementById("GiaTriSize").textContent = giaTri;
    TruyVanMau();

    if (document.getElementById("GiaTriSize").innerText != "" && document.getElementById("GiaTriMau").innerText != "") {
        TruyVanIDSanPhamSale();
    }
};
function HienThiMau(element) {

    var giaTri = element.textContent;
    document.getElementById("GiaTriMau").textContent = giaTri;
    TruyVanSize();

    if (document.getElementById("GiaTriSize").innerText != "" && document.getElementById("GiaTriMau").innerText != "") {
        TruyVanIDSanPhamSale();
    }
};
function TruyVanMau() {
    var tensp = document.getElementById("TenSp").innerText;
    var thuonghieu = document.getElementById("idTenThuongHieu").innerText;
    var Loaisp = document.getElementById("loaiSanPham").innerText;
    var size = document.getElementById("GiaTriSize").innerText;
    var data = {
        TenSP: tensp,
        Size: size,
        LoaiSanPham: Loaisp,
        TenThuongHieu: thuonghieu,
    }
    $.ajax({
        type: 'POST',
        url: '/KhachHang/SaleKH/TruyVanMau',
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(data),
        success: function (result) {
            $("#lst_mau").empty();
            if (result != null) {
                for (i = 0; i < result.length; i++) {
                    var contentmau = '';
                    contentmau = '<li><a href="#" onclick="HienThiMau(this);">' + result[i].mau + '</a></li>';
                }
                $("#lst_mau").append(contentmau);
            }
            console.log(result);
        },
        error: function (error) {
        }
    });
};
function TruyVanSize() {
    var tensp = document.getElementById("TenSp").innerText;
    var thuonghieu = document.getElementById("idTenThuongHieu").innerText;
    var Loaisp = document.getElementById("loaiSanPham").innerText;
    var mausac = document.getElementById("GiaTriMau").innerText;
    var data = {
        TenSP: tensp,
        MauSac: mausac,
        LoaiSanPham: Loaisp,
        TenThuongHieu: thuonghieu,
    }
    $.ajax({
        type: 'POST',
        url: '/KhachHang/SaleKH/TruyVanSize',
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(data),
        success: function (result) {
            $("#lst_size").empty();
            if (result != null) {
                for (i = 0; i < result.length; i++) {
                    var contentsize = '';
                    contentsize += '<li><a href="#" onclick="HienthiSize(this);">' + result[i].size + '</a></li>';
                }
                $("#lst_size").append(contentsize);
            }
            console.log(result);
        },
        error: function (error) {
        }
    });
};
function TruyVanIDSanPhamSale() {
    var tensp = document.getElementById("TenSp").innerText;
    var thuonghieu = document.getElementById("idTenThuongHieu").innerText;
    var Loaisp = document.getElementById("loaiSanPham").innerText;
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
        var data = {
            TenSP: tensp,
            Size: size,
            LoaiSanPham: Loaisp,
            MauSac: mausac,
            TenThuongHieu: thuonghieu,
        }
        $.ajax({
            type: 'POST',
            url: '/KhachHang/SaleKH/TruyVanIDSale',
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(data),
            success: function (result) {
                if (result != null) {
                    document.getElementById("idsanpham").textContent = result.idSalechitiet;
                }
                console.log(result);
            },
            error: function (error) {
            }
        });
    }
};
function ThemSanPhamVaoGioHang() {
    var idsp = document.getElementById("idsanpham").textContent;
    var soluong = document.getElementById("quantity").value;
    if (idsp == "") {

    } else if (soluong == 0) {
        alert("Mời bạn nhập số lượng.");
        return;
    }
    else {
        var data = {
            IDSPCT: idsp,
            SoLuong: soluong,
        }
        $.ajax({
            type: 'POST',
            url: '/KhachHang/GioHangChiTiet/CreateCartDetail',
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(data),
            success: function (result) {
                if (result.message == "Thêm thành công.") {
                    alert("Đã thêm vào giỏ hàng.");
                } else if (result.message == "Thêm số lượng thành công.") {
                    alert("Đã thêm vào giỏ hàng.")
                } else if (result.message == "Đăng nhập trước khi mua hàng.") {
                    window.location.href = "/DangNhap/DanhNhap";
                }
                else {
                    alert("Thêm thất bại.");
                }
                ViewSoLuong();
                console.log(result);
            },
            error: function (error) {
                window.location.href = "/DangNhap/DanhNhap";
            }
        });
    }
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
function LocSanPhamSaleTheoMauSizeThuongHieuLoaiSanPham() {
    var thuonghieu = document.getElementById("txt_Thuonghieusale").value;
    var mausac = document.getElementById("txt_MauSacsale").value;
    var size = document.getElementById("txt_Sizesale").value;
    var loaisanpham = document.getElementById("txt_LoaiSanPhamsale").value;
    var data = {
        MauSac: mausac,
        Size: size,
        TenThuongHieu: thuonghieu,
        LoaiSanPham: loaisanpham,
    }
    $.ajax({
        type: 'POST',
        url: '/KhachHang/SaleKH/LocSanPhamSaleTheoMauSizeThuongHieuLoaiSanPhamKH',// Điều chỉnh đường dẫn tùy thuộc vào định tuyến của bạn
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(data),
        success: function (result) {
            $("#SanPhamSale").empty();
            if (result.length > 0) {
                var content = '';
                for (i = 0; i < result.length; i++) {
                    var giaGiam = result[i].giaGiam.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
                    var giaGoc = result[i].giaGoc.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
                    content += '<div class="border col-md-4 text-center product-entry1">';
                    content += '<div class="prod-img">';
                    if (result[i].lstAnhSanPham.length == 0) {
                        content += '<img src="https://congtygiaphat104.com/template/Default/img/no.png" class="img-fluid" alt="Free html5 bootstrap 4 template">';
                    } else {
                        content += '<img src="/Admin/Anh/DisplayImage?DuongDan=' + result[i].lstAnhSanPham[0].duongDan + '" class="img-fluid" alt="Free html5 bootstrap 4 template" style="width:225px;height: 225px;">';
                    }
                    content += '<div class="phan-tram-giam">-' + result[i].phanTramGiam + '%</div>';
                    content += '</div>';
                    content += '<div class="desc">';
                    content += '<h2><a href="/KhachHang/SaleKH/SaleChiTiet/' + result[i].idSalechitiet + '" style="text-decoration: none;color: black; ">' + result[i].tenSP + '</a></h2>';

                    content += '<div class="price">';
                    content += '<span class="tien-sale">' + giaGiam + '</span>';
                    content += '<span class="tien-goc">' + giaGoc + '</span>';
                    content += '</div>';
                    content += '</div>';


                    content += '</div>';

                }
                $("#SanPhamSale").append(content);
            } else {
                content += '<span>Không có sản phẩm nào như vậy</span>';
            };
            $("#SanPhamSale").append(content);
            console.log(result);

            PhanTrangsale();
        },
        error: function (error) {
            console.error('Lỗi khi lấy dữ liệu từ Session:', error);
        },
    });
};

function LocTheoGiaCuaSanPhamSale() {
    $.ajax({
        type: 'GET',
        url: '/KhachHang/SaleKH/LocTheoGiaCuaSanPhamSale',// Điều chỉnh đường dẫn tùy thuộc vào định tuyến của bạn
        success: function (result) {
            console.log(result);
            $("#SanPhamSale").empty();
            if (result.length > 0) {
                var content = '';
                for (i = 0; i < result.length; i++) {
                    var giaGiam = result[i].giaGiam.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
                    var giaGoc = result[i].giaGoc.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
                    content += '<div class="product col-lg-3 mb-4 text-center" >';
                    content += '<div class="image-container">';
                    if (result[i].lstAnhSanPham.length == 0) {
                        content += '<img src="https://congtygiaphat104.com/template/Default/img/no.png" class="img-fluid" alt="Free html5 bootstrap 4 template">';
                    } else {
                        content += '<img src="/Admin/Anh/DisplayImage?DuongDan=' + result[i].lstAnhSanPham[0].duongDan + '" class="img-fluid" alt="Free html5 bootstrap 4 template" style="width:225px;height: 225px;">';
                    }
                    content += '<div class="phan-tram-giam">-' + result[i].phanTramGiam + '%</div>';
                    content += '</div>';
                    content += '<div class="details">';
                    content += '<h5><a href="/KhachHang/SaleKH/SaleChiTiet/' + result[i].idSalechitiet + '" style="text-decoration: none;color: black; ">' + result[i].tenSP + '</a ></h2 > ';

                    content += '<div class="price">';
                    content += '<span class="tien-sale"> ' + giaGiam + '</span>';
                    content += '<span class="tien-goc">' + giaGoc + '</span>';
                    content += '</div>';
                    content += '</div>';
                    content += '</div>';
                }
                $("#SanPhamSale").append(content);
            };


            PhanTrangsale();
        },
        error: function (error) {
            console.error('Lỗi khi lấy dữ liệu từ Session:', error);
        },

    });

};
function PhanTrangsale() {
    console.log("PhanTrang() has been called."); // Thêm dòng này để kiểm tra

    // Lấy danh sách tất cả các sản phẩm
    const products = document.querySelectorAll('.product-entry1');
    const pagination = document.getElementById('phantrangsale');
    if (products.length == 0) {
        pagination.innerHTML = '';
    } else {
        // Số sản phẩm hiển thị trên mỗi trang
        const itemsPerPage = 9;

        // Hàm tạo các nút phân trang
        function createPaginationButtons(numPages, currentPage) {

            if (pagination == null) {

            } else {
                pagination.innerHTML = '';

            }

            // Tạo nút "Previous" nếu không phải ở trang đầu tiên
            if (currentPage > 1) {
                const previousPage = createPaginationButton('<<', currentPage - 1);
                if (pagination == null) {

                } else {
                    pagination.appendChild(previousPage);
                }
            }

            // Tạo nút trang
            if (numPages <= 5) {
                for (let i = 1; i <= numPages; i++) {
                    const page = createPaginationButton(i, i);
                    if (pagination == null) {

                    } else {
                        pagination.appendChild(page);
                    }

                }
            } else {
                // Nếu tổng số trang lớn hơn 5, chỉ hiển thị trang trước, trang hiện tại và trang sau
                let startPage = currentPage - 2;
                let endPage = currentPage + 2;

                // Đảm bảo không hiển thị trang âm hoặc trang lớn hơn tổng số trang
                if (startPage < 1) {
                    startPage = 1;
                    endPage = 5;
                } else if (endPage > numPages) {
                    endPage = numPages;
                    startPage = numPages - 4;
                }

                for (let i = startPage; i <= endPage; i++) {
                    const page = createPaginationButton(i, i);
                    if (pagination == null) {

                    } else {
                        pagination.appendChild(page);
                    }

                }
            }

            // Tạo nút "Next" nếu không phải ở trang cuối cùng
            if (currentPage < numPages) {
                const nextPage = createPaginationButton('>>', currentPage + 1);
                if (pagination == null) {

                } else {
                    pagination.appendChild(nextPage);
                }
            }
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

            // Ẩn các sản phẩm của trang trước khi chuyển trang
            const previousPageNum = (pageNum === 1) ? numPages : pageNum - 1;
            const previousStartIndex = (previousPageNum - 1) * itemsPerPage;
            const previousEndIndex = previousStartIndex + itemsPerPage;
            products.forEach(function (product, index) {
                if (index >= previousStartIndex && index < previousEndIndex) {
                    product.style.display = 'none';
                }
            });

            // Hiển thị các sản phẩm của trang hiện tại
            products.forEach(function (product, index) {
                if (index >= startIndex && index < endIndex) {
                    product.style.display = 'block';
                } else {
                    product.style.display = 'none';
                }
            });

            // Hiển thị lại các nút phân trang sau khi chuyển trang
            createPaginationButtons(numPages, pageNum);
        }

        // Tính số trang và hiển thị trang đầu tiên khi tải trang
        const numPages = Math.ceil(products.length / itemsPerPage);
        showPage(1);
    }

};

function suggestThuongHieuSale(event) {
    var inputValue = "";
    if (event == undefined) {

    } else {
        inputValue = event.target.value.toLowerCase();
    }
    $.ajax({
        type: 'GET',
        url: '/KhachHang/TrangChu/DanhSachThuongHieu',
        dataType: 'json',
        success: function (data) {
            const suggestionList = $("#suggestionListThuonghieuSale");
            if (event != undefined) {
                const filteredSuggestions = data.filter(thuonghieu =>
                    thuonghieu.tenThuongHieu.toLowerCase().includes(inputValue)
                );
                suggestionList.empty();
                if (filteredSuggestions.length === 0) {
                    data.forEach(thuonghieu => { // Sử dụng data trả về từ API
                        suggestionList.append(`<li>${thuonghieu.tenThuongHieu}</li>`);
                    });
                } else {
                    filteredSuggestions.forEach(thuonghieu => { // Sử dụng data trả về từ API
                        suggestionList.append(`<li>${thuonghieu.tenThuongHieu}</li>`);
                    });
                }
                suggestionList.find('li').on('click', function () {
                    // Lấy thông tin của gợi ý được chọn
                    const tenthuonghieu = $(this).text(); // Lấy tên từ thẻ li được chọn

                    // Điền thông tin vào các ô input
                    $('#txt_Thuonghieusale').val(tenthuonghieu);

                    // Xóa danh sách gợi ý
                    $("#suggestionListThuonghieuSale").empty();
                });

            } else {
                data.forEach(thuonghieu => { // Sử dụng data trả về từ API
                    suggestionList.append(`<li>${thuonghieu.tenThuongHieu}</li>`);
                });
                suggestionList.find('li').on('click', function () {
                    // Lấy thông tin của gợi ý được chọn
                    const tenthuonghieu = $(this).text(); // Lấy tên từ thẻ li được chọn

                    // Điền thông tin vào các ô input
                    $('#txt_Thuonghieusale').val(tenthuonghieu);

                    // Xóa danh sách gợi ý
                    $("#suggestionListThuonghieuSale").empty();
                });
            }
        },
        error: function (error) {
            // Xử lý lỗi nếu cần
        }
    });
};
function suggestMauSacSale(event) {
    var inputValue = "";
    if (event == undefined) {

    } else {
        inputValue = event.target.value.toLowerCase();
    }
    $.ajax({
        type: 'GET',
        url: '/KhachHang/TrangChu/DanhSachMauSac',
        dataType: 'json',
        success: function (data) {
            const suggestionList = $("#suggestionListMauSacSale");
            if (event != undefined) {
                const filteredSuggestions = data.filter(mau =>
                    mau.tenMauSac.toLowerCase().includes(inputValue)
                );
                suggestionList.empty();
                if (filteredSuggestions.length === 0) {
                    data.forEach(mau => { // Sử dụng data trả về từ API
                        suggestionList.append(`<li>${mau.tenMauSac}</li>`);
                    });
                } else {
                    filteredSuggestions.forEach(mau => { // Sử dụng data trả về từ API
                        suggestionList.append(`<li>${mau.tenMauSac}</li>`);
                    });
                }
                suggestionList.find('li').on('click', function () {
                    // Lấy thông tin của gợi ý được chọn
                    const mausac = $(this).text(); // Lấy tên từ thẻ li được chọn

                    // Điền thông tin vào các ô input
                    $('#txt_MauSacsale').val(mausac);

                    // Xóa danh sách gợi ý
                    $("#suggestionListMauSacSale").empty();
                });

            } else {
                data.forEach(mau => { // Sử dụng data trả về từ API
                    suggestionList.append(`<li>${mau.tenMauSac}</li>`);
                });
                suggestionList.find('li').on('click', function () {
                    // Lấy thông tin của gợi ý được chọn
                    const mausac = $(this).text(); // Lấy tên từ thẻ li được chọn

                    // Điền thông tin vào các ô input
                    $('#txt_MauSacsale').val(mausac);

                    // Xóa danh sách gợi ý
                    $("#suggestionListMauSacSale").empty();
                });
            }
        },
        error: function (error) {
            // Xử lý lỗi nếu cần
        }
    });
};
function suggestSizeSale(event) {
    var inputValue = "";
    if (event == undefined) {

    } else {
        inputValue = event.target.value.toLowerCase();
    }
    $.ajax({
        type: 'GET',
        url: '/KhachHang/TrangChu/DanhsachSize',
        dataType: 'json',
        success: function (data) {
            const suggestionList = $("#suggestionListSizeSale");
            if (event != undefined) {
                const filteredSuggestions = data.filter(size =>
                    size.sizeNumber.toLowerCase().includes(inputValue)
                );
                suggestionList.empty();
                if (filteredSuggestions.length === 0) {
                    data.forEach(size => { // Sử dụng data trả về từ API
                        suggestionList.append(`<li>${size.sizeNumber}</li>`);
                    });
                } else {
                    filteredSuggestions.forEach(size => { // Sử dụng data trả về từ API
                        suggestionList.append(`<li>${size.sizeNumber}</li>`);
                    });
                }
                suggestionList.find('li').on('click', function () {
                    // Lấy thông tin của gợi ý được chọn
                    const size = $(this).text(); // Lấy tên từ thẻ li được chọn

                    // Điền thông tin vào các ô input
                    $('#txt_Sizesale').val(size);

                    // Xóa danh sách gợi ý
                    $("#suggestionListSizeSale").empty();
                });

            } else {
                data.forEach(size => { // Sử dụng data trả về từ API
                    suggestionList.append(`<li>${size.sizeNumber}</li>`);
                });
                suggestionList.find('li').on('click', function () {
                    // Lấy thông tin của gợi ý được chọn
                    const size = $(this).text(); // Lấy tên từ thẻ li được chọn

                    // Điền thông tin vào các ô input
                    $('#txt_Sizesale').val(size);

                    // Xóa danh sách gợi ý
                    $("#suggestionListSizeSale").empty();
                });
            }
        },
        error: function (error) {
            // Xử lý lỗi nếu cần
        }
    });
};
function suggestTheLoaiSale(event) {
    var inputValue = "";
    if (event == undefined) {

    } else {
        inputValue = event.target.value.toLowerCase();
    }
    $.ajax({
        type: 'GET',
        url: '/KhachHang/TrangChu/DanhSachTheLoai',
        dataType: 'json',
        success: function (data) {
            const suggestionList = $("#suggestionListSanPhamSale");
            if (event != undefined) {
                const filteredSuggestions = data.filter(tl =>
                    tl.loaiSanPham.toLowerCase().includes(inputValue)
                );
                suggestionList.empty();
                if (filteredSuggestions.length === 0) {
                    data.forEach(tl => { // Sử dụng data trả về từ API
                        suggestionList.append(`<li>${tl.loaiSanPham}</li>`);
                    });
                } else {
                    filteredSuggestions.forEach(tl => { // Sử dụng data trả về từ API
                        suggestionList.append(`<li>${tl.loaiSanPham}</li>`);
                    });
                }
                suggestionList.find('li').on('click', function () {
                    // Lấy thông tin của gợi ý được chọn
                    const tl = $(this).text(); // Lấy tên từ thẻ li được chọn

                    // Điền thông tin vào các ô input
                    $('#txt_LoaiSanPhamsale').val(tl);

                    // Xóa danh sách gợi ý
                    $("#suggestionListSanPhamSale").empty();
                });

            } else {
                data.forEach(tl => { // Sử dụng data trả về từ API
                    suggestionList.append(`<li>${tl.loaiSanPham}</li>`);
                });
                suggestionList.find('li').on('click', function () {
                    // Lấy thông tin của gợi ý được chọn
                    const tl = $(this).text(); // Lấy tên từ thẻ li được chọn

                    // Điền thông tin vào các ô input
                    $('#txt_LoaiSanPhamsale').val(tl);

                    // Xóa danh sách gợi ý
                    $("#suggestionListSanPhamSale").empty();
                });
            }
        },
        error: function (error) {
            // Xử lý lỗi nếu cần
        }
    });
};