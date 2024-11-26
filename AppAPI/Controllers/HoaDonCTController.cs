using AppData.DB_Context;
using AppData.Entities.Models;
using AppData.Entities.ViewModels;
using AppData.Repositories.BillDetails;
using AppData.Repositories.ViewModel;
using Microsoft.AspNetCore.Mvc;

namespace AppAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class HoaDonCTController : Controller
    {
        private readonly IBillDetailRepository _billDtRepo;
        private readonly SPCTViewModel _viewModel;
        private readonly HoaDonChiTietVm hoaDonChiTietVm;
        private readonly SaleChiTietVm saleChiTietVm;
        public HoaDonCTController(ApplicationDbContext dbContext)
        {
            _billDtRepo = new BillDetailRepository(dbContext);
            _viewModel = new SPCTViewModel();
            saleChiTietVm = new SaleChiTietVm();
            hoaDonChiTietVm = new HoaDonChiTietVm(dbContext);
        }

        [HttpGet("[action]")]
        public async Task<ActionResult> Index()
        {
            var lst = _billDtRepo.GetAll();
            return Ok(lst);
        }
        [HttpGet("[action]")]
        public List<HoaDonChiTietViewModel> DanhSachHDChiTietTheoIDhd(Guid idhd)
        {
            return hoaDonChiTietVm.DanhSachHoaDonTheoIDHD(idhd);
        }
        [HttpPost("[action]")]
        public string Create(Guid idhd, Guid idspct, int soluong)
        {
            try
            {
                var sanpham = _viewModel.DanhSachSanPhamHoanThien().FirstOrDefault(c => c.ID == idspct);
                if (soluong > sanpham.SoLuong)
                {
                    return "Số lượng sản phẩm hiện tại còn " + sanpham.SoLuong;
                }
                else if (soluong <= 0)
                {
                    return "Yêu cầu ít nhất 1 sản phẩm.";
                }
                else
                {

                    HoaDonChiTiet hdCT = new HoaDonChiTiet();
                    if (sanpham == null)
                    {
                        var salesp = saleChiTietVm.DanhSachSanPhamSale().FirstOrDefault(c => c.IDSalechitiet == idspct);
                        hdCT.ID = Guid.NewGuid();
                        hdCT.IDHoaDon = idhd;
                        hdCT.IDSPCT = null;
                        hdCT.IDSaleCT = idspct;
                        hdCT.SoLuong = soluong;
                        hdCT.Gia = salesp.GiaGiam;
                    }
                    else
                    {
                        hdCT.ID = Guid.NewGuid();
                        hdCT.IDHoaDon = idhd;
                        hdCT.IDSPCT = idspct;
                        hdCT.IDSaleCT = null;
                        hdCT.SoLuong = soluong;
                        hdCT.Gia = sanpham.GiaBan;
                    }

                    if (_billDtRepo.Create(hdCT) == true)
                    {
                        return "Thêm Thành Công.";
                    }
                    else
                    {
                        return "Thêm thất bại.";
                    }
                }
            }
            catch (Exception ex)
            {
                return "Lỗi: " + ex.Message;
            }

        }

        [HttpPut("id")]
        public async Task<ActionResult> Update(HoaDonChiTiet hdCT)
        {
            if (hdCT != null)
            {
                if (await _billDtRepo.Update(hdCT, hdCT.ID))
                {
                    return Ok("Sửa Thành Công");
                }
                return BadRequest("Sửa không thành công");
            }
            else { return BadRequest("Sửa không thành công"); }
        }

        [HttpPut("[action]")]
        public string CapNhatSoLuongHDCT(Guid IDhdct, int soluong)
        {
            var hdct = _billDtRepo.GetAll().FirstOrDefault(c => c.ID == IDhdct);
            var spct = _viewModel.DanhSachSanPhamHoanThien().FirstOrDefault(c => c.ID == hdct.IDSPCT);
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
                if (hdct != null)
                {
                    hdct.SoLuong = soluong;
                    if (_billDtRepo.Update(hdct, hdct.ID).Result == true)
                    {
                        return "Cập nhật số lượng thành công";
                    }
                    else
                    {
                        return "Sửa thất bại.";
                    }
                }
                else
                {
                    return "Sửa không thành công";
                }
            }

        }

        [HttpDelete("id")]
        public async Task<ActionResult> Delete(Guid id)
        {
            if (await _billDtRepo.Delete(id))
            {
                return Ok("Xóa Thành Công.");
            }
            else { return BadRequest("Xóa Thất Bại."); }
        }

        [HttpGet("id")]
        public async Task<ActionResult> GetId(Guid id)
        {
            var gId = await _billDtRepo.GetId(id);
            return Ok(gId);
        }
        [HttpGet("[action]")]
        public List<HoaDonChiTiet> DanhSachHoaDonChiTietTheoIDHoaDon(Guid idHoaDon)
        {
            return _billDtRepo.GetByIdBill(idHoaDon);
        }
    }
}
