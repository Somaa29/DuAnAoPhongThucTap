using AppData.DB_Context;
using AppData.Entities.Models;
using AppData.Entities.ViewModels;
using AppData.Entities.ViewModels.GioHangCTVM;
using AppData.Repositories.CartDetail;
using AppData.Repositories.ViewModel;
using Microsoft.AspNetCore.Mvc;

namespace AppAPI.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    public class GioHangChiTietController : ControllerBase
    {
        private readonly ICartDetailRepository _cartDetailRepository;
        private readonly SaleChiTietVm saleChiTietVm;
        private readonly SPCTViewModel _viewModel;
        public GioHangChiTietController(ICartDetailRepository cartDetailRepository)
        {
            _cartDetailRepository = cartDetailRepository;
            _viewModel = new SPCTViewModel();
            saleChiTietVm = new SaleChiTietVm();
        }

        [HttpGet("get")]

        public async Task<IActionResult> Index()
        {
            var detail = await _cartDetailRepository.GetAllCartDetail();
            return Ok(detail);
        }
        [HttpGet("[action]")]
        public async Task<IActionResult> GioHangChitietTheoIDNguoiDung(Guid idnguoidung)
        {
            var detail =  _cartDetailRepository.GetCartDetailByIdGioHang(idnguoidung);
            return Ok(detail);
        }
        [HttpGet("getById/{id}")]
        public async Task<IActionResult> GetById(Guid idgiohang, Guid idspct)
        {
            var detail = await _cartDetailRepository.GetCartDetailById(idgiohang, idspct);
            return Ok(detail);
        }

        [HttpPost("add")]
        public string Create(Guid idnguoidung, Guid idsanphamct ,int soluong)
        {
            var spct = _viewModel.DanhSachSanPhamHoanThien().FirstOrDefault(c => c.ID == idsanphamct);
            if (spct != null)
            {
                if (soluong > spct.SoLuong)
                {
                    return "Số lượng sản phẩm hiện tại còn " + spct.SoLuong;
                }
                else if (soluong <= 0)
                {
                    return "Yêu cầu ít nhất 1 sản phẩm.";
                }
                else
                {
                    GioHangChiTiet ghct = new GioHangChiTiet()
                    {
                        ID = Guid.NewGuid(),
                        IDSaleCT = null,
                        IDSPCT = idsanphamct,
                        SoLuong = soluong
                    };
                    var detail = _cartDetailRepository.CreateCartDetail(idnguoidung, ghct);
                    return detail;
                }
            } else
            {
                var spctsale = saleChiTietVm.DanhSachSanPhamSale().FirstOrDefault(c => c.IDSalechitiet == idsanphamct);
                if (soluong > spctsale.SoLuong)
                {
                    return "Số lượng sản phẩm hiện tại còn " + spctsale.SoLuong;
                }
                else if (soluong <= 0)
                {
                    return "Yêu cầu ít nhất 1 sản phẩm.";
                }
                else
                {
                    GioHangChiTiet ghct = new GioHangChiTiet()
                    {
                        ID = Guid.NewGuid(),
                        IDSaleCT = idsanphamct,
                        IDSPCT = null,
                        SoLuong = soluong
                    };
                    var detail = _cartDetailRepository.CreateCartDetail(idnguoidung, ghct);
                    return detail;
                }
            }
        }
        [HttpPut("[action]")]
        public string UpdateSoLuong(Guid idnguoidung, Guid idghct, int soluong)
        {
            var ghct = _cartDetailRepository.GetCartDetailByIdNguoiDung(idnguoidung).FirstOrDefault(c => c.ID == idghct);
            var spct = _viewModel.DanhSachSanPhamHoanThien().FirstOrDefault(c => c.ID == ghct.IDSPCT);
            var salecht = saleChiTietVm.DanhSachSanPhamSale().FirstOrDefault(c => c.IDSalechitiet == ghct.IDSaleCT);
            if (spct == null)
            {
                if (soluong > salecht.SoLuong)
                {
                    return "Số lượng sản phẩm hiện tại còn " + salecht.SoLuong;
                }
                else if (soluong <= 0)
                {
                    return "Yêu cầu ít nhất 1 sản phẩm.";
                }
                else
                {
                    ghct.SoLuong = soluong;
                    ghct.IDSaleCT = ghct.IDSaleCT;
                    _cartDetailRepository.UpdateGiohangChiTiet(ghct);
                    if (_cartDetailRepository.UpdateGiohangChiTiet(ghct).Result == true)
                    {
                        return "Cập nhật số lượng thành công.";
                    }
                    else
                    {
                        return "Cập nhật số lượng thất bại.";
                    }
                }
            } else
            {
                if (soluong > spct.SoLuong)
                {
                    return "Số lượng sản phẩm hiện tại còn " + spct.SoLuong;
                }
                else if (soluong <= 0)
                {
                    return "Yêu cầu ít nhất 1 sản phẩm.";
                }
                else
                {
                    ghct.SoLuong = soluong;
                    ghct.IDSPCT = ghct.IDSPCT;
                    _cartDetailRepository.UpdateGiohangChiTiet(ghct);
                    if (_cartDetailRepository.UpdateGiohangChiTiet(ghct).Result == true)
                    {
                        return "Cập nhật số lượng thành công.";
                    }
                    else
                    {
                        return "Cập nhật số lượng thất bại.";
                    }
                }
            }
           
        }

        [HttpPut("update")]
        public async Task<IActionResult> Update(GioHangCTRequestVM gioHangCTRequestVM)
        {
            var detail = await _cartDetailRepository.UpdateCartDetail(gioHangCTRequestVM);
            return Ok(detail);
        }

        [HttpDelete("delete/{id}")]
        public bool Delete(Guid id)
        {
            var detail =  _cartDetailRepository.DeleteCartDetail(id);
            return detail;
        }

        [HttpGet("detail")]
        public async Task<IActionResult> Detail(Guid id)
        {
            var detail = await _cartDetailRepository.DetailCartDetail(id);
            return Ok(detail);
        }
    }
}
