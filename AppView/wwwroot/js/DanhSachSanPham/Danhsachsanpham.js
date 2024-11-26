var danhsachmausac = [];
var danhsachthuonghieu = [];
var danhsachsize = [];
var danhsachtheloai = [];
var danhsachgia = [];
$(document).ready(function () {
    // Sự kiện hiển thị suggest khi click vào ô input
    $('#txt_Thuonghieu').on('focus', function () {
        suggestThuongHieu();
    });
   
    $('#txt_MauSac').on('focus', function () {
        suggestMauSac();
    });
    $('#txt_Size').on('focus', function () {
        suggestSize();
    });
    $('#txt_LoaiSanPham').on('focus', function () {
        suggestTheLoai();
    });

    // Sự kiện ẩn suggest khi click ra ngoài ô input
    $(document).on('click', function (event) {
        const target = $(event.target);
        // Kiểm tra nếu không phải là ô input hoặc các phần tử của suggestList
        if (!target.is('#txt_Thuonghieu') && !target.closest('#suggestionListThuonghieu').length) {
            $("#suggestionListThuonghieu").empty();
        }
        if (!target.is('#txt_MauSac') && !target.closest('#suggestionListMauSac').length) {
            $("#suggestionListMauSac").empty();
        }
        if (!target.is('#txt_Size') && !target.closest('#suggestionListSize').length) {
            $("#suggestionListSize").empty();
        }
        if (!target.is('#txt_LoaiSanPham') && !target.closest('#suggestionListSanPham').length) {
            $("#suggestionListSanPham").empty();
        }
    });
});
function DanhSachMauSac() {
    $.ajax({
        type: 'GET',
        url: '/KhachHang/TrangChu/DanhSachMauSac', // Điều chỉnh đường dẫn tùy thuộc vào định tuyến của bạn
        success: function (result) {
            $("#lstMauSac").empty();
            if (result.length > 0) {
                var content = '';
                content += '<option value="">Mời bạn chọn màu</option>';
                for (i = 0; i < result.length; i++) {
                    content += '<option value="' + result[i].tenMauSac + '">' + result[i].tenMauSac + '</option>';
                };
                $("#lstMauSac").append(content);
            }
            console.log(result);
        },
        error: function (error) {
            console.error('Lỗi khi lấy dữ liệu từ Session:', error);
        }
    });
};

function DanhSachSize() {
    $.ajax({
        type: 'GET',
        url: '/KhachHang/TrangChu/DanhsachSize', // Điều chỉnh đường dẫn tùy thuộc vào định tuyến của bạn
        success: function (result) {
            $("#lstSize").empty();
            if (result.length > 0) {
                var content = '';
                content += '<option value="">Mời bạn chọn size</option>';
                for (i = 0; i < result.length; i++) {
                    content += '<option  value="' + result[i].sizeNumber + '">' + result[i].sizeNumber + '</option>';
                };
                $("#lstSize").append(content);
            }
            console.log(result);
        },
        error: function (error) {
            console.error('Lỗi khi lấy dữ liệu từ Session:', error);
        }
    });
};

function DanhSachGia() {
    $.ajax({
        type: 'GET',
        url: '/KhachHang/TrangChu/DanhSachGiaCuaSanPham', // Điều chỉnh đường dẫn tùy thuộc vào định tuyến của bạn
        success: function (result) {
            //$("#table-user").empty();
            if (result != null) {

            }
            console.log(result);
        },
        error: function (error) {
            console.error('Lỗi khi lấy dữ liệu từ Session:', error);
        }
    });
};
function DanhSachTheLoai() {
    $.ajax({
        type: 'GET',
        url: '/KhachHang/TrangChu/DanhSachTheLoai', // Điều chỉnh đường dẫn tùy thuộc vào định tuyến của bạn
        success: function (result) {
            $("#lstTheLoai").empty();
            if (result.length > 0) {
                var content = '';
                content += '<option value="">Mời bạn chọn thể loại</option>';
                for (i = 0; i < result.length; i++) {
                    content += '<option value="' + result[i].loaiSanPham + '">' + result[i].loaiSanPham + '</option>';
                };
                $("#lstTheLoai").append(content);
            }
            console.log(result);
        },
        error: function (error) {
            console.error('Lỗi khi lấy dữ liệu từ Session:', error);
        }
    });
};
function DanhSachThuongHieu() {
    $.ajax({
        type: 'GET',
        url: '/KhachHang/TrangChu/DanhSachThuongHieu', // Điều chỉnh đường dẫn tùy thuộc vào định tuyến của bạn
        success: function (result) {
            $("#lstThuongHieu").empty();
            if (result.length > 0) {
                var content = '';
                content += '<option value="">Mời bạn chọn thương hiệu</option>';
                for (i = 0; i < result.length; i++) {
                    content += '<option value="' + result[i].tenThuongHieu + '">' + result[i].tenThuongHieu + '</option>';
                };
                $("#lstThuongHieu").append(content);
            }
            console.log(result);
        },
        error: function (error) {
            console.error('Lỗi khi lấy dữ liệu từ Session:', error);
        }
    });
};
function LocSanPhamTheoMaiSizeThuongHieuLoaiSanPham() {
    var thuonghieu = document.getElementById("txt_Thuonghieu").value;
    var mausac = document.getElementById("txt_MauSac").value;
    var size = document.getElementById("txt_Size").value;
    var loaisanpham = document.getElementById("txt_LoaiSanPham").value;
    var data = {
        MauSac: mausac,
        Size: size,
        TenThuongHieu: thuonghieu,
        LoaiSanPham: loaisanpham,
    }
    $.ajax({
        type: 'POST',
        url: '/KhachHang/TrangChu/LocSanPhamTheoMaiSizeThuongHieuLoaiSanPham',// Điều chỉnh đường dẫn tùy thuộc vào định tuyến của bạn
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(data),
        success: function (result) {
            $("#sanpham").empty();

            if (result != null) {
                var content = '';
                for (i = 0; i < result.length; i++) {
                    var giaban = result[i].giaBan.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
                    content += '<div class="col-4 text-center">';
                    content += ' <div class="product-entry border">';
                    content += '<a href="#" class="prod-img">';
                    if (result[i].lstAnhSanPham.length == 0) {
                        content += '<img src="https://congtygiaphat104.com/template/Default/img/no.png" class="img-fluid" alt="Free html5 bootstrap 4 template">';
                    } else {
                        let filePath = result[i].lstAnhSanPham[0].duongDan;
                        content += '<img src="/Admin/Anh/DisplayImage?DuongDan=' + filePath + '" class="img-fluid" alt="Free html5 bootstrap 4 template" style="width:225px;height: 225px;">';
                    }
                    content += '</a>';
                    content += '<div class="desc">';
                    content += '<h2><a href="/KhachHang/TrangChu/SanPhamChiTiet?idspct=' + result[i].id + '" style="text-decoration:none;">' + result[i].tenSP + '</a ></h2 > ';
                    content += '<span class="price">' + giaban + '</span>';
                    content += '</div>';
                    content += '</div>';
                    content += '</div>';
                }

            } else {
                content += '<span>Không có sản phẩm nào tương ứng</span>';
            };
            $("#sanpham").append(content);
            console.log(result);

            PhanTrang();
        },
        error: function (error) {
            console.error('Lỗi khi lấy dữ liệu từ Session:', error);
        },

    });

};


function LocSanPhamTheoGiaSanPham() {
    $.ajax({
        type: 'GET',
        url: '/KhachHang/TrangChu/LocTheoGiaCuaSanPham',// Điều chỉnh đường dẫn tùy thuộc vào định tuyến của bạn
        success: function (result) {
            $("#sanpham").empty();
            if (result.length > 0) {
                var content = '';
                for (i = 0; i < result.length; i++) {
                    var giaban = result[i].giaBan.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
                    content += '<div class="col-4 text-center">';
                    content += ' <div class="product-entry border">';
                    content += '<a href="#" class="prod-img">';
                    if (result[i].lstAnhSanPham.length == 0) {
                        content += '<img src="https://congtygiaphat104.com/template/Default/img/no.png" class="img-fluid" alt="Free html5 bootstrap 4 template">';
                    } else {
                        content += '<img src="/Admin/Anh/DisplayImage?DuongDan=' + result[i].lstAnhSanPham[0].duongDan + '" class="img-fluid" alt="Free html5 bootstrap 4 template" style="width:225px;height: 225px;">';
                    }
                    content += '</a>';
                    content += '<div class="desc">';
                    content += '<h2><a href="/KhachHang/TrangChu/SanPhamChiTiet?idspct=' + result[i].id + '" style="text-decoration:none;">' + result[i].tenSP + '</a ></h2 > ';
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
function PhanTrang() {
    console.log("PhanTrang() has been called."); // Thêm dòng này để kiểm tra

    // Lấy danh sách tất cả các sản phẩm
    const products = document.querySelectorAll('.product-entry');
    const pagination = document.getElementById('phantrang');
    if (products.length == 0) {
        pagination.innerHTML = 'Không có sản phẩm tương ứng';
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

function ThemMauSac() {
    var mausac = document.getElementById("txt_mausac").value;
    if (mausac == "") {
        alert("Yêu cầu nhập thông tin.");
    } else {
        var data = {
            TenMauSac: mausac
        }
        $.ajax({
            type: 'POST',
            url: '/Admin/SanPhamChiTiet/ThemMau',
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(data),
            success: function (result) {
                if (result.message == "true") {
                    alert("Thêm thành công.");
                } else {
                    alert("Thêm thất bại. (Dữ liệu có thể bị trùng)");
                }
                mausac = "";
            },
            error: function (error) {
                alert("Thêm thất bại.");
            }
        });
    }
    event.preventDefault();
};
function ThemThuongHieu() {
    var thuonghieu = document.getElementById("txt_thuonghieu").value;
    if (thuonghieu == "") {
        alert("Yêu cầu nhập thông tin.");
    } else {
        var data = {
            TenThuongHieu: thuonghieu
        }
        $.ajax({
            type: 'POST',
            url: '/Admin/SanPhamChiTiet/ThemThuongHieu',
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(data),
            success: function (result) {
                if (result.message == "true") {
                    alert("Thêm thành công.");
                } else {
                    alert("Thêm thất bại. (Dữ liệu có thể bị trùng)");
                }
                thuonghieu = "";
            },
            error: function (error) {
                alert("Thêm thất bại.");
            }
        });
    }
    event.preventDefault();
};
function ThemSize() {
    var size = document.getElementById("txt_size").value;
    if (size == "") {
        alert("Yêu cầu nhập thông tin.");
    } else {
        var data = {
            SizeNumber: size
        }
        $.ajax({
            type: 'POST',
            url: '/Admin/SanPhamChiTiet/ThemSize',
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(data),
            success: function (result) {
                if (result.message == "true") {
                    alert("Thêm thành công.");
                } else {
                    alert("Thêm thất bại. (Dữ liệu có thể bị trùng)");
                }
                size = "";
            },
            error: function (error) {
                alert("Thêm thất bại.");
            }
        });
    }
    event.preventDefault();
};
function ThemSanPham() {
    var SanPham = document.getElementById("txt_tensanpham").value;
    var Khoiluong = document.getElementById("txt_khoiluong").value;
    if (SanPham == "") {
        alert("Yêu cầu nhập thông tin.");
    } else if (Khoiluong == "") {
        alert("Yêu cầu nhập thông tin.");
    }
    else {
        var data = {
            TenSanPham: SanPham,
            KhoiLuong: Khoiluong,
        }
        $.ajax({
            type: 'POST',
            url: '/Admin/SanPhamChiTiet/ThemSanPham',
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(data),
            success: function (result) {
                if (result.message == "true") {
                    alert("Thêm thành công.");
                } else {
                    alert("Thêm thất bại. (Dữ liệu có thể bị trùng)");
                }
                SanPham = "";
            },
            error: function (error) {
                alert("Thêm thất bại.");
            }
        });
    }
    event.preventDefault();
};
function Timkiemsanpham() {
    var tukhoa = document.getElementById("tukhoa").value;
    if (tukhoa == "") {
        LocSanPhamTheoMaiSizeThuongHieuLoaiSanPham();
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
                        content += '<div class="col-4 text-center">';
                        content += ' <div class="product-entry border">';
                        content += '<a href="#" class="prod-img">';
                        if (result[i].lstAnhSanPham.length == 0) {
                            content += '<img src="https://congtygiaphat104.com/template/Default/img/no.png" class="img-fluid" alt="Free html5 bootstrap 4 template">';
                        } else {
                            content += '<img src="/Admin/Anh/DisplayImage?DuongDan=' + result[i].lstAnhSanPham[0].duongDan + '" class="img-fluid" alt="Free html5 bootstrap 4 template" style="width:225px;height: 225px;">';
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
function LayDanhSachSanPhamHoanThienTheoTen() {
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
        url: '/KhachHang/TrangChu/LayDanhSachSanPhamHoanThienTheoTen',
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
                    contentmau += '<li><a href="#" onclick="HienThiMau(this);">' + result[i].mauSac + '</a></li>';
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
        TruyVanSanPham();
    }
};
function HienThiMau(element) {

    var giaTri = element.textContent;
    document.getElementById("GiaTriMau").textContent = giaTri;
    TruyVanSize();

    if (document.getElementById("GiaTriSize").innerText != "" && document.getElementById("GiaTriMau").innerText != "") {
        TruyVanSanPham();
    }
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
        url: '/KhachHang/TrangChu/TruyVanSize',
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
        url: '/KhachHang/TrangChu/TruyVanMau',
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(data),
        success: function (result) {
            $("#lst_mau").empty();
            if (result != null) {
                for (i = 0; i < result.length; i++) {
                    var contentmau = '';
                    contentmau = '<li><a href="#" onclick="HienThiMau(this);">' + result[i].mauSac + '</a></li>';
                }
                $("#lst_mau").append(contentmau);
            }
            console.log(result);
        },
        error: function (error) {
        }
    });
};

function TruyVanSanPham() {
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
            url: '/KhachHang/TrangChu/TruyVanSanPham',
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(data),
            success: function (result) {
                if (result != null) {
                    document.getElementById("idsanpham").textContent = result.id;
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
    TruyVanSanPham();
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
                    ViewSoLuong();
                } else if (result.message == "Thêm số lượng thành công.") {
                    alert("Đã thêm vào giỏ hàng.")
                } else if (result.message == "Đăng nhập trước khi mua hàng.") {
                    window.location.href = "/DangNhap/DanhNhap";
                }
                else {
                    alert("Thêm thất bại.");
                }
                console.log(result);
            },
            error: function (error) {
                window.location.href = "/DangNhap/DanhNhap";
            }
        });
    }
};

// Sản phẩm chi tiết 
function Sanphamchitiethoanthien() {
    $.ajax({
        type: 'GET',
        url: '/Admin/SanPhamChiTiet/GetProductDetailsJson',// Điều chỉnh đường dẫn tùy thuộc vào định tuyến của bạn
        success: function (result) {
            $("#DanhSachSPCT").empty();
            if (result != null) {
                var content = '';
                for (var i = 0; i < result.length; i++) {
                    var giaBan = result[i].giaBan.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
                    content += '<tr>';
                    content += '<td style="display:none;">' + result[i].id;
                    content += '</td>';
                    content += '<td>' + result[i].maSPCT;
                    content += '</td>';
                    content += '<td>' + result[i].tenSP;
                    content += '</td>';
                    content += '<td>' + result[i].mauSac;
                    content += '</td>';
                    content += '<td>' + result[i].size;
                    content += '</td>';
                    content += '<td>' + result[i].tenThuongHieu;
                    content += '</td>';
                    content += '<td>' + result[i].soLuong;
                    content += '</td>';
                    content += '<td>' + giaBan;
                    content += '</td>';
                    content += '<td>' + result[i].loaiSanPham;
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
                        content += '<button class="btn" onclick="XoaHetHang(\'' + result[i].id + '\');"><i class="fas fa-trash-alt" style="color: #ff0000;"></i></button>';
                    } else {
                        content += '<a href="/Admin/SanPhamChiTiet/Update/' + result[i].id + '"><i class="fas fa-edit" style="color: #005eff;"></i></a>';
                        content += '<p>  </p>';
                        content += '<button class="btn" onclick="KhoiPhucConHang(\'' + result[i].id + '\');"><i class="fas fa-redo-alt fa-rotate-180" style="color: #fbff00;"></i></button>';
                    }
                    content += '</td>';
                    content += '</tr>';
                }
                $("#DanhSachSPCT").append(content);
            };
            PhanTrangChoSanPham();
            console.log(result);
        },
        error: function (error) {
            console.error('Lỗi khi lấy dữ liệu từ Session:', error);
        },

    });
};

function XoaHetHang(id) {
    var data = {
        ID: id
    };
    $.ajax({
        type: 'POST',
        url: '/Admin/SanPhamChiTiet/Delete',
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(data),
        success: function (result) {
            alert(result.message);
            console.log(result);
            Sanphamchitiethoanthien();
        },
        error: function (error) {
            console.log(error);
        }
    });
};
function KhoiPhucConHang(id) {
    var data = {
        ID: id
    };
    $.ajax({
        type: 'POST',
        url: '/Admin/SanPhamChiTiet/ConHang',
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(data),
        success: function (result) {
            if (result.message == "true") {
                alert("Thành công.");
            } else {
                alert("Thất bại.");
            }
            console.log(result);
            Sanphamchitiethoanthien();
        },
        error: function (error) {
            window.location.href = "/DangNhap/DanhNhap";
        }
    });
};

function SanphamchitiethoanthienTheoTen(event) {
    event.preventDefault();
    var tukhoa = document.getElementById("tukhoa").value;
    if (tukhoa == "") {
        Sanphamchitiethoanthien();
    } else {
        $.ajax({
            type: 'POST',
            url: '/Admin/SanPhamChiTiet/TimKiemTheoTenSanpham',// Điều chỉnh đường dẫn tùy thuộc vào định tuyến của bạn
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(tukhoa),
            success: function (result) {
                $("#DanhSachSPCT").empty();
                if (result != null) {
                    var content = '';
                    for (var i = 0; i < result.length; i++) {
                        var giaBan = result[i].giaBan.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
                        content += '<tr>';
                        content += '<td style="display:none;">' + result[i].id;
                        content += '</td>';
                        content += '<td>' + result[i].maSPCT;
                        content += '</td>';
                        content += '<td>' + result[i].tenSP;
                        content += '</td>';
                        content += '<td>' + result[i].mauSac;
                        content += '</td>';
                        content += '<td>' + result[i].size;
                        content += '</td>';
                        content += '<td>' + result[i].tenThuongHieu;
                        content += '</td>';
                        content += '<td>' + result[i].soLuong;
                        content += '</td>';
                        content += '<td>' + giaBan;
                        content += '</td>';
                        content += '<td>' + result[i].loaiSanPham;
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
                        content += '<td>';
                        if (result[i].trangThai == 1) {
                            content += '<p>Còn hàng</p>';
                        } else {
                            content += '<p>Hết hàng</p>';
                        }
                        content += '</td>';
                        content += '<td>';
                        if (result[i].trangThai == 1) {
                            content += '<a href="/Admin/SanPhamChiTiet/Update/' + result[i].id + '"><i class="fas fa-edit" style="color: #005eff;"></i></a>';
                            content += '<p>  </p>';
                            content += '<button class="btn" onclick="XoaHetHang(\'' + result[i].id + '\');"><i class="fas fa-trash-alt" style="color: #ff0000;"></i></button>';
                        } else {
                            content += '<a href="/Admin/SanPhamChiTiet/Update/' + result[i].id + '"><i class="fas fa-edit" style="color: #005eff;"></i></a>';
                            content += '<p>  </p>';
                            content += '<button class="btn" onclick="KhoiPhucConHang(\'' + result[i].id + '\');"><i class="fas fa-redo-alt fa-rotate-180" style="color: #fbff00;"></i></button>';
                        }
                        content += '</td>';
                        content += '</tr>';
                    }
                    $("#DanhSachSPCT").append(content);
                };
                PhanTrangChoSanPham();
                console.log(result);
            },
            error: function (error) {
                console.error('Lỗi khi lấy dữ liệu từ Session:', error);
            },

        });
    }

};

function TimKiemNangCao() {
    var selectElementMauSac = document.getElementById("lstMauSac");
    var selectedMauSacValue = selectElementMauSac.value;

    var selectElementSize = document.getElementById("lstSize");
    var selectedSizeValue = selectElementSize.value;

    var selectElementTheLoai = document.getElementById("lstTheLoai");
    var selectedTheLoaiValue = selectElementTheLoai.value;

    var selectElementThuongHieu = document.getElementById("lstThuongHieu");
    var selectedThuongHieuValue = selectElementThuongHieu.value;
    if (selectedMauSacValue == "" && selectedSizeValue == "" && selectedTheLoaiValue == "" && selectedThuongHieuValue == "") {
        Sanphamchitiethoanthien();
    } else {
        var data = {
            MauSac: selectedMauSacValue,
            Size: selectedSizeValue,
            TenThuongHieu: selectedThuongHieuValue,
            LoaiSanPham: selectedTheLoaiValue,
        }
        $.ajax({
            type: 'POST',
            url: '/Admin/SanPhamChiTiet/TimKiemNangCao',// Điều chỉnh đường dẫn tùy thuộc vào định tuyến của bạn
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(data),
            success: function (result) {
                $("#DanhSachSPCT").empty();
                if (result != null) {
                    var content = '';
                    for (var i = 0; i < result.length; i++) {
                        content += '<tr>';
                        content += '<td style="display:none;">' + result[i].id;
                        content += '</td>';
                        content += '<td>' + result[i].maSPCT;
                        content += '</td>';
                        content += '<td>' + result[i].tenSP;
                        content += '</td>';
                        content += '<td>' + result[i].mauSac;
                        content += '</td>';
                        content += '<td>' + result[i].size;
                        content += '</td>';
                        content += '<td>' + result[i].soLuong;
                        content += '</td>';
                        content += '<td>' + result[i].giaBan;
                        content += '</td>';
                        content += '<td>' + result[i].loaiSanPham;
                        content += '</td>';
                        content += '<td>';
                        if (result[i].lstAnhSanPham.length > 0) {
                            for (var j = 0; j < result[i].lstAnhSanPham.length; j++) {
                                content += '<img src="/Admin/Anh/DisplayImage?DuongDan=' + result[i].lstAnhSanPham[j].duongDan + '" alt="Image" width="30%" height="30%" />';
                            }
                        } else {
                            content += '';
                        }
                        content += '</td>';
                        content += '<td>';
                        if (result[i].trangThai == 1) {
                            content += '<p>Còn hàng</p>';
                        } else {
                            content += '<p>Hết hàng</p>';
                        }
                        content += '</td>';
                        content += '<td>';
                        if (result[i].trangThai == 1) {
                            content += '<a href="/Admin/SanPhamChiTiet/Update/' + result[i].id + '"><i class="fas fa-edit" style="color: #005eff;"></i></a>';
                            content += '<p>  </p>';
                            content += '<button class="btn" onclick="XoaHetHang(\'' + result[i].id + '\');"><i class="fas fa-trash-alt" style="color: #ff0000;"></i></button>';
                        } else {
                            content += '<a href="/Admin/SanPhamChiTiet/Update/' + result[i].id + '"><i class="fas fa-edit" style="color: #005eff;"></i></a>';
                            content += '<p>  </p>';
                            content += '<button class="btn" onclick="KhoiPhucConHang(\'' + result[i].id + '\');"><i class="fas fa-redo-alt fa-rotate-180" style="color: #fbff00;"></i></button>';
                        }
                        content += '</td>';
                        content += '</tr>';
                    }
                    $("#DanhSachSPCT").append(content);
                };
                PhanTrangChoSanPham();
                console.log(result);
            },
            error: function (error) {
                console.error('Lỗi khi lấy dữ liệu từ Session:', error);
            },
        });
    }
}

function PhanTrangChoSanPham() {
    // Số dòng dữ liệu mỗi trang
    const rowsPerPage = 10;

    // Danh sách tất cả các dòng trong bảng
    const allRows = document.querySelectorAll("#DanhSachSPCT tr");

    let currentPage = 0; // Trang hiện tại

    // Hiển thị dữ liệu cho trang đầu tiên khi trang web được tải
    showPage(0);

    // Hàm hiển thị dữ liệu cho trang được chọn
    function showPage(pageIndex) {
        // Ẩn tất cả các dòng
        allRows.forEach(row => {
            row.style.display = "none";
        });

        // Tính chỉ số của dòng đầu tiên và dòng cuối cùng trong trang
        const startIndex = pageIndex * rowsPerPage;
        const endIndex = startIndex + rowsPerPage;

        // Hiển thị các dòng trong phạm vi của trang hiện tại
        for (let i = startIndex; i < endIndex; i++) {
            if (allRows[i]) {
                allRows[i].style.display = "table-row";
            }
        }

        // Cập nhật trang hiện tại
        currentPage = pageIndex;

        // Hiển thị các nút trang
        renderPaginationButtons();
    }

    // Hàm chuyển đến trang trước
    function previousPage() {
        if (currentPage > 0) {
            showPage(currentPage - 1);
        }
    }

    // Hàm chuyển đến trang tiếp theo
    function nextPage() {
        const totalPages = Math.ceil(allRows.length / rowsPerPage);
        if (currentPage < totalPages - 1) {
            showPage(currentPage + 1);
        }
    }

    // Hàm hiển thị các nút trang
    function renderPaginationButtons() {
        const totalPages = Math.ceil(allRows.length / rowsPerPage);
        const paginationContainer = document.getElementById("pagination");
        paginationContainer.innerHTML = ""; // Xóa nội dung cũ của phân trang

        // Thêm nút "Previous"
        const prevButton = document.createElement("button");
        prevButton.textContent = "Previous";
        prevButton.onclick = previousPage;
        paginationContainer.appendChild(prevButton);

        // Thêm các nút trang
        //for (let i = 0; i < totalPages; i++) {
        //    const pageButton = document.createElement("button");
        //    pageButton.textContent = i + 1;
        //    pageButton.onclick = () => showPage(i);
        //    paginationContainer.appendChild(pageButton);
        //}
        if (totalPages <= 5) {
            // Nếu tổng số trang ít hơn hoặc bằng 5, hiển thị tất cả các trang
            for (let i = 0; i < totalPages; i++) {
                const pageButton = document.createElement("button");
                pageButton.textContent = i + 1;
                pageButton.onclick = () => showPage(i);
                paginationContainer.appendChild(pageButton);
            }
        } else {
            // Nếu tổng số trang lớn hơn 5
            let startPage, endPage;

            if (currentPage <= 2) {
                startPage = 0;
                endPage = 4;
            } else if (currentPage >= totalPages - 3) {
                startPage = totalPages - 5;
                endPage = totalPages - 1;
            } else {
                startPage = currentPage - 2;
                endPage = currentPage + 2;
            }

            if (startPage > 0) {
                const pageButton = document.createElement("button");
                pageButton.textContent = "...";
                paginationContainer.appendChild(pageButton);
            }

            for (let i = startPage; i <= endPage; i++) {
                const pageButton = document.createElement("button");
                pageButton.textContent = i + 1;
                pageButton.onclick = () => showPage(i);
                paginationContainer.appendChild(pageButton);
            }

            if (endPage < totalPages - 1) {
                const pageButton = document.createElement("button");
                pageButton.textContent = "...";
                paginationContainer.appendChild(pageButton);
            }
        }

        // Thêm nút "Next"
        const nextButton = document.createElement("button");
        nextButton.textContent = "Next";
        nextButton.onclick = nextPage;
        paginationContainer.appendChild(nextButton);
    }
}
function TruyenGiaTriMaxAdmin() {
    var GiaMax = document.getElementById("GiaTriMax").value;
    $.ajax({
        type: 'POST',
        url: '/KhachHang/TrangChu/NhanGiaMax',// Điều chỉnh đường dẫn tùy thuộc vào định tuyến của bạn
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(GiaMax),
        success: function (result) {
        },
        error: function (error) {
            console.error('Lỗi khi lấy dữ liệu từ Session:', error);
        },
    });
}
function TimkiemTheoGia() {
    var GiaMin = document.getElementById("GiaTriMin").value;
    var GiaMax = document.getElementById("GiaTriMax").value;
    if (parseFloat(GiaMin) > parseFloat(GiaMax)) {
        alert("Gía tối thiểu của bạn đang lớn hơn giá tối đa của bạn.");
        return;
    } else if (GiaMin == "") {
        alert("Mời bạn nhập giá trị tối thiểu.");
        return;
    } else if (GiaMax == "") {
        alert("Mời bạn nhập giá trị tối đa.");
        return;
    } else {
        $.ajax({
            type: 'POST',
            url: '/KhachHang/TrangChu/LocTheoGiaCuaSanPham',// Điều chỉnh đường dẫn tùy thuộc vào định tuyến của bạn
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(GiaMin),
            success: function (result) {
                $("#DanhSachSPCT").empty();
                if (result != null) {
                    var content = '';
                    for (var i = 0; i < result.length; i++) {
                        var giaBan = result[i].giaBan.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
                        content += '<tr>';
                        content += '<td style="display:none;">' + result[i].id;
                        content += '</td>';
                        content += '<td>' + result[i].maSPCT;
                        content += '</td>';
                        content += '<td>' + result[i].tenSP;
                        content += '</td>';
                        content += '<td>' + result[i].mauSac;
                        content += '</td>';
                        content += '<td>' + result[i].size;
                        content += '</td>';
                        content += '<td>' + result[i].tenThuongHieu;
                        content += '</td>';
                        content += '<td>' + result[i].soLuong;
                        content += '</td>';
                        content += '<td>' + giaBan;
                        content += '</td>';
                        content += '<td>' + result[i].loaiSanPham;
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
                        content += '<td>';
                        if (result[i].trangThai == 1) {
                            content += '<p>Còn hàng</p>';
                        } else {
                            content += '<p>Hết hàng</p>';
                        }
                        content += '</td>';
                        content += '<td>';
                        if (result[i].trangThai == 1) {
                            content += '<a href="/Admin/SanPhamChiTiet/Update/' + result[i].id + '"><i class="fas fa-edit" style="color: #005eff;"></i></a>';
                            content += '<p>  </p>';
                            content += '<button class="btn" onclick="XoaHetHang(\'' + result[i].id + '\');"><i class="fas fa-trash-alt" style="color: #ff0000;"></i></button>';
                        } else {
                            content += '<a href="/Admin/SanPhamChiTiet/Update/' + result[i].id + '"><i class="fas fa-edit" style="color: #005eff;"></i></a>';
                            content += '<p>  </p>';
                            content += '<button class="btn" onclick="KhoiPhucConHang(\'' + result[i].id + '\');"><i class="fas fa-redo-alt fa-rotate-180" style="color: #fbff00;"></i></button>';
                        }
                        content += '</td>';
                        content += '</tr>';
                    }
                    $("#DanhSachSPCT").append(content);
                };
                PhanTrangChoSanPham();
                console.log(result);
            },
            error: function (error) {
                console.error('Lỗi khi lấy dữ liệu từ Session:', error);
            },

        });
    }
};
function LoadMoTa() {
    $.ajax({
        type: 'GET',
        url: '/Admin/SanPhamChiTiet/SanPhamChiTietTheoID',// Điều chỉnh đường dẫn tùy thuộc vào định tuyến của bạn
        success: function (result) {
            var spct = JSON.parse(result);
            document.getElementById("compose-textarea").value = spct.MoTa;
            console.log(result);
        },
        error: function (error) {
            console.error('Lỗi khi lấy dữ liệu từ Session:', error);
        },

    });
};

function LoadAnhCuaSanPham() {
    const idsp = document.getElementById("idspct").value;
    console.log(idsp);
    //var id = "eb16f2ab-72ac-4f72-a524-04f09b9e231d";
    $.ajax({
        type: 'POST',
        url: '/Admin/SanPhamChiTiet/DanhsachAnhCuaSP',// Điều chỉnh đường dẫn tùy thuộc vào định tuyến của bạn
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(idsp),
        success: function (result) {
            $("#DanhSachAnhCuaSanPham").empty();
            if (result != null) {
                var content = '';
                content += '<div class="row" style="position: relative;">';
                for (var i = 0; i < result.length; i++) {
                    content += '<div class="col-md-4 anh" style="border: 1px solid white; width: 150px; height: 150px; position: relative;">';
                    content += '<img src="/Admin/Anh/DisplayImage?DuongDan=' + result[i].duongDan + '" style="width: 100%; height: 100%;">';
                    content += '<div class="close" style="position: absolute; top: 0; right: 0; opacity: 1;">';
                    content += '<button onclick="XoaAnhSanPham(event,\'' + result[i].id + '\')" style="border: none;"><i class="fas fa-times fa-sm" style="color: #ff0000;"></i></button>';
                    content += '</div>';
                    content += '</div>';
                }
                content += '</div>'
            }
            $("#DanhSachAnhCuaSanPham").append(content);
            hienThiDuongDan(result);
            checkMatchingImages(result);
            GuiAnhLen(result);
            console.log(result);
        },
        error: function (error) {
            console.error('Lỗi khi lấy dữ liệu từ Session:', error);
        },

    });
};
function XoaAnhSanPham(event, id) {
    event.preventDefault();
    const idsp = document.getElementById("idspct").value;
    var data = {
        Idanh: id,
        IdSanPhamChiTiet: idsp
    }
    $.ajax({
        type: 'POST',
        url: '/Admin/SanPhamChiTiet/XoaAnhSP',// Điều chỉnh đường dẫn tùy thuộc vào định tuyến của bạn
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(data),
        success: function (result) {
            alert(result.message);
            LoadAnhCuaSanPham();
            console.log(result);
        },
        error: function (error) {
            console.error('Lỗi khi lấy dữ liệu từ Session:', error);
        },

    });
};

function hienThiDuongDan(images) {
    // Xóa nội dung hiện tại của input
    $('#imageFilename').val('');

    // Duyệt qua mảng các đối tượng hình ảnh
    images.forEach(function (image, index) {
        // Cắt chuỗi duongDan để chỉ lấy phần tên tệp
        var fileName = image.duongDan.substring(image.duongDan.lastIndexOf('\\') + 1);

        // Thêm dấu phẩy nếu không phải là phần tử đầu tiên
        if (index > 0) {
            $('#imageFilename').val($('#imageFilename').val() + ', ');
        }
        // Thêm tên tệp vào input
        $('#imageFilename').val($('#imageFilename').val() + '...\\' + fileName);
    });
};

function GuiAnhLen(image) {
    var selectedImages = [];
    for (var i = 0; i < image.length; i++) {
        selectedImages.push({ Id: image[i].id, Connect: image[i].duongDan });
    }

    var selectedFilenames = selectedImages.map(function (image) {
        return image.Connect;
    });
    $.ajax({
        type: "POST", // Sử dụng phương thức POST
        url: "/Admin/SanPhamChiTiet/LuuAnh", // Thay thế ControllerName và ActionName bằng tên thực của controller và action của bạn
        contentType: "application/json; charset=utf-8", // Chỉ định loại dữ liệu gửi lên là JSON
        data: JSON.stringify(selectedFilenames), // Dữ liệu gửi lên controller dưới dạng JSON
        success: function (data) {
            // Xử lý phản hồi từ controller nếu cần
        },
        error: function () {
            // Xử lý lỗi nếu có
        }
    });
};
function checkMatchingImages(images) {
    // Lặp qua tất cả các đường dẫn ảnh trả về từ AJAX
    images.forEach(function (image) {
        // Lấy đường dẫn của ảnh từ kết quả AJAX
        var duongDanAJAX = image.duongDan;

        // Tìm checkbox có đường dẫn ảnh tương ứng và kiểm tra nó
        $('.image-checkbox').each(function () {
            var duongDanHTML = $(this).data('image-filename');
            if (duongDanAJAX === duongDanHTML) {
                $(this).prop('checked', true);
            }
        });
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

function suggestThuongHieu(event) {
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
            const suggestionList = $("#suggestionListThuonghieu");
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
                    $('#txt_Thuonghieu').val(tenthuonghieu);

                    // Xóa danh sách gợi ý
                    $("#suggestionListThuonghieu").empty();
                });

            } else {
                data.forEach(thuonghieu => { // Sử dụng data trả về từ API
                    suggestionList.append(`<li>${thuonghieu.tenThuongHieu}</li>`);
                });
                suggestionList.find('li').on('click', function () {
                    // Lấy thông tin của gợi ý được chọn
                    const tenthuonghieu = $(this).text(); // Lấy tên từ thẻ li được chọn

                    // Điền thông tin vào các ô input
                    $('#txt_Thuonghieu').val(tenthuonghieu);

                    // Xóa danh sách gợi ý
                    $("#suggestionListThuonghieu").empty();
                });
            }
        },
        error: function (error) {
            // Xử lý lỗi nếu cần
        }
    });
};
function suggestMauSac(event) {
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
            const suggestionList = $("#suggestionListMauSac");
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
                    $('#txt_MauSac').val(mausac);

                    // Xóa danh sách gợi ý
                    $("#suggestionListMauSac").empty();
                });

            } else {
                data.forEach(mau => { // Sử dụng data trả về từ API
                    suggestionList.append(`<li>${mau.tenMauSac}</li>`);
                });
                suggestionList.find('li').on('click', function () {
                    // Lấy thông tin của gợi ý được chọn
                    const mausac = $(this).text(); // Lấy tên từ thẻ li được chọn

                    // Điền thông tin vào các ô input
                    $('#txt_MauSac').val(mausac);

                    // Xóa danh sách gợi ý
                    $("#suggestionListMauSac").empty();
                });
            }
        },
        error: function (error) {
            // Xử lý lỗi nếu cần
        }
    });
};
function suggestSize(event) {
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
            const suggestionList = $("#suggestionListSize");
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
                    $('#txt_Size').val(size);

                    // Xóa danh sách gợi ý
                    $("#suggestionListSize").empty();
                });

            } else {
                data.forEach(size => { // Sử dụng data trả về từ API
                    suggestionList.append(`<li>${size.sizeNumber}</li>`);
                });
                suggestionList.find('li').on('click', function () {
                    // Lấy thông tin của gợi ý được chọn
                    const size = $(this).text(); // Lấy tên từ thẻ li được chọn

                    // Điền thông tin vào các ô input
                    $('#txt_Size').val(size);

                    // Xóa danh sách gợi ý
                    $("#suggestionListSize").empty();
                });
            }
        },
        error: function (error) {
            // Xử lý lỗi nếu cần
        }
    });
};
function suggestTheLoai(event) {
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
            const suggestionList = $("#suggestionListSanPham");
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
                    $('#txt_LoaiSanPham').val(tl);

                    // Xóa danh sách gợi ý
                    $("#suggestionListSanPham").empty();
                });

            } else {
                data.forEach(tl => { // Sử dụng data trả về từ API
                    suggestionList.append(`<li>${tl.loaiSanPham}</li>`);
                });
                suggestionList.find('li').on('click', function () {
                    // Lấy thông tin của gợi ý được chọn
                    const tl = $(this).text(); // Lấy tên từ thẻ li được chọn

                    // Điền thông tin vào các ô input
                    $('#txt_LoaiSanPham').val(tl);

                    // Xóa danh sách gợi ý
                    $("#suggestionListSanPham").empty();
                });
            }
        },
        error: function (error) {
            // Xử lý lỗi nếu cần
        }
    });
};


