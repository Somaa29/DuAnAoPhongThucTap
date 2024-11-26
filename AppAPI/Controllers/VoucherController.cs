using AppData.DB_Context;
using AppData.Entities.Models;
using AppData.Entities.ViewModels;
using AppData.Repositories.ViewModel;
using AppData.Repositories.VoucherDetails;
using AppData.Repositories.Vouchers;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace AppAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class VoucherController : ControllerBase
    {
        IVoucherRepository<Voucher> _vcRepo;
        private readonly VoucherChiTietVM _voucherChiTietVM;
        ApplicationDbContext _context = new ApplicationDbContext();
        private readonly IVoucherDetailRepository voucherDetailRepository;
        private readonly HoaDonChiTietVm hoaDonChiTietVm;

        public VoucherController(ApplicationDbContext context)
        {
            IVoucherRepository<Voucher> repo = new VoucherRepository<Voucher>(context, context.voucher);
            hoaDonChiTietVm = new HoaDonChiTietVm(context);
            _voucherChiTietVM = new VoucherChiTietVM();
            voucherDetailRepository = new VoucherDetailRepository(context);
            _vcRepo = repo;
        }
        [HttpGet("[action]")]
        public IEnumerable<Voucher> DanhSach()
        {
            return _vcRepo.GetAllVoucher();
        }
        [HttpPost("[action]")]
        public bool CreateVC(string ma, DateTime NgayBatDau, DateTime NgayKetThuc, decimal GiaTriVoucher, decimal DKmin, decimal Dkmax, int SoLuong, string moTa, int trangThai)
        {
            Voucher voucher = new Voucher();
            voucher.ID = Guid.NewGuid();
            voucher.MaVoucher = ma;
            voucher.NgayTao = DateTime.Now;
            voucher.NgayBatDau = NgayBatDau;
            voucher.NgayKetThuc = NgayKetThuc;
            voucher.GiaTriVoucher = GiaTriVoucher;
            voucher.DieuKienMin = DKmin;
            voucher.DieuKienMax = Dkmax;
            voucher.SoLuong = SoLuong;
            voucher.MoTa = moTa;
            voucher.TrangThai = trangThai;
            return _vcRepo.CreateVoucher(voucher);
        }
        [HttpPut("[action]")]
        public bool UpdateVC(Guid id, DateTime NgayBatDau, DateTime NgayKetThuc, decimal GiaTriVoucher, decimal DieuKienMin, decimal DieuKienMax, int SoLuong, string MoTa, int TrangThai)
        {
            var voucher = _vcRepo.GetAllVoucher().FirstOrDefault(c => c.ID == id);
            voucher.NgayBatDau = NgayBatDau;
            voucher.NgayKetThuc = NgayKetThuc;
            voucher.GiaTriVoucher = GiaTriVoucher;
            voucher.DieuKienMin = DieuKienMin;
            voucher.DieuKienMax = DieuKienMax;
            voucher.SoLuong = SoLuong;
            voucher.MoTa = MoTa;
            voucher.TrangThai = TrangThai;
            return _vcRepo.UpdateVoucher(voucher);
        }

        [HttpDelete("[action]")]
        public bool DeleteVC(Guid id)
        {
            var voucher = _context.voucher.First(c => c.ID == id);
            return _vcRepo.DeleteVoucher(voucher);
        }

        [HttpGet("getByid-voucher/{id}")]
        public IActionResult GetById(Guid id)
        {
            var voucher = _vcRepo.GetById(id);
            if (voucher == null)
            {
                return NotFound();
            }
            return Ok(voucher);
        }

        [HttpGet("[action]")]
        public List<VoucherChiTiet> DanhSachVoucherChiTiet()
        {
            return voucherDetailRepository.GetAllVoucherDetail();
        }
        [HttpGet("[action]")]
        public List<VoucherChiTiet> DanhSachVoucherChiTietTheoIDnguoiDung(Guid idNguoiDung)
        {
            return voucherDetailRepository.GetAllVoucherByIDNguoiDung(idNguoiDung);
        }
        [HttpGet("[action]")]
        public List<HoaDonChiTietViewModel> DanhSachVoucherChiTietTheoIDhd(Guid idhd)
        {
            return hoaDonChiTietVm.DanhSachHoaDonTheoIDHD(idhd);
        }
        [HttpPost("[action]")]
        public bool CreateVoucherChiTiet(Guid IDVoucher, Guid IDnguoiDung, int soluong)
        {
            VoucherChiTiet voucherchitiet = new VoucherChiTiet()
            {
                ID = Guid.NewGuid(),
                IDVoucher = IDVoucher,
                IDNguoiDung = IDnguoiDung,
                SoLuong = soluong,
                TrangThai = 1,
            };
            return voucherDetailRepository.CreateVoucherDetail(voucherchitiet);
        }
        [HttpPut("[action]")]
        public bool UpdateVoucherChiTiet(Guid id, int soluong, int trangThai)
        {
            VoucherChiTiet voucherchitiet = voucherDetailRepository.GetAllVoucherDetail().FirstOrDefault(c => c.ID == id);
            voucherchitiet.SoLuong = soluong;
            voucherchitiet.TrangThai = trangThai;
            return voucherDetailRepository.UpdateVoucherDetail(voucherchitiet);
        }

        [HttpGet("[action]")]
        public List<VoucherDetailViewModel> DanhSachVoucherVM()
        {
            return _voucherChiTietVM.DanhSachVoucherChiTiet();
        }

        [HttpGet("[action]")]
        public List<VoucherDetailViewModel> DanhSachVoucherVMByIdNguoiDung(Guid idnguoidung)
        {
            return _voucherChiTietVM.DanhSachVoucherChiTietTheoIDNguoiDung(idnguoidung);
        }
        [HttpGet("[action]")]
        public VoucherDetailViewModel VoucherVMTheoID(Guid IDnguoidung , Guid idvoucherdetail)
        {
            return _voucherChiTietVM.DanhSachVoucherChiTietByID(IDnguoidung, idvoucherdetail);
        }
        [HttpGet("[action]")]
        public VoucherDetailViewModel DanhSachVMVoucherTheoMa(Guid idnguoidung, string ma)
        {
            return _voucherChiTietVM.DanhSachVoucherChiTietTheoMaVoucher(idnguoidung, ma);
        }
    }

}

