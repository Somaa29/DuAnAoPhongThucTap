
function TimKiem(event) {
    // Lấy giá trị của trường nhập liệu tìm kiếm
    event.preventDefault();
    var searchValue = document.querySelector('.search').value;
    // Kiểm tra xem giá trị tìm kiếm có tồn tại không
    if (searchValue.trim() !== '') {
        window.location.href = 'https://localhost:7211/Home/TimKiem?tensp=' + searchValue;
    }
};

function LoaddanhsachTimkiem(tukhoa) {
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
                    content += '<h2><a href="/KhachHang/TrangChu/SanPhamChiTiet?idspct=' + result[i].id + '">' + result[i].tenSP + '</a ></h2>';
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
};
function DanhSachThuongHieu() {
    $.ajax({
        type: 'GET',
        url: '/KhachHang/TrangChu/DanhSachThuongHieu', // Điều chỉnh đường dẫn tùy thuộc vào định tuyến của bạn
        success: function (result) {
           /* $("#lstThuongHieu").empty();*/
            if (result.length > 0) {
                var content = '';
                for (var i = 0; i < result.length; i++) {
                    content += '<li><a href="#" style="color:white;">' + result[i].tenThuongHieu + '</a></li>';
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
function DanhSachTheLoai() {
    $.ajax({
        type: 'GET',
        url: '/KhachHang/TrangChu/DanhSachTheLoai', // Điều chỉnh đường dẫn tùy thuộc vào định tuyến của bạn
        success: function (result) {
            /*$("#lstTheLoai").empty();*/
            if (result.length > 0) {
                var content = '';
                for (var i = 0; i < result.length; i++) {
                    content += '<li style="color:white;">' + result[i].tenThuongHieu + '</li>';
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