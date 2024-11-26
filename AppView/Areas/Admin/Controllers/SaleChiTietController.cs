using AppData.DB_Context;
using AppData.Entities.Models;
using AppData.Entities.ViewModels;
using AppData.Repositories.ViewModel;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using System.Net.Http;
using System.Security.Policy;
using System.Text;

namespace AppView.Areas.Admin.Controllers
{
    public class SaleChiTietController : Controller
    {
        private readonly HttpClient httpClient;
        private readonly ApplicationDbContext _context;
        private readonly SPCTViewModel _SpctViewModel;
        public SaleChiTietController()
        {
            httpClient = new HttpClient();
            _context = new ApplicationDbContext();
            _SpctViewModel = new SPCTViewModel();
        }

        [HttpGet]
        public ActionResult DanhSachTatCaSaleChiTiet()
        {
            return View();
        }
        [HttpGet]
        public ActionResult DanhSachSaleChiTietJson()
        {
            var url = $"https://localhost:7265/api/SaleChiTiet/DanhSach";
            var res = httpClient.GetAsync(url).Result;
            var data = res.Content.ReadAsStringAsync().Result;
            List<SaleChiTietViewModel> lst = JsonConvert.DeserializeObject<List<SaleChiTietViewModel>>(data);
            return Json(lst);
        }
        [HttpGet]
        [HttpPost]
        public ActionResult Hethang([FromBody] SaleChiTiet salect)
        {
            string apiURL = $"https://localhost:7265/api/SaleChiTiet/HetSale?id={salect.ID}";
            var obj = JsonConvert.SerializeObject(salect);
            var content = new StringContent(obj, Encoding.UTF8, "application/json");
            HttpResponseMessage response = httpClient.PostAsync(apiURL, content).Result;
            ThongBao tb = new ThongBao();
            if (response.IsSuccessStatusCode)
            {
                var mess = response.Content.ReadAsStringAsync().Result;
                tb.message = mess;
                return Json(tb);
            }
            else
            {
                tb.message = "Lỗi";
                return Json(tb);
            }
        }
        [HttpGet]
        [HttpPost]
        public ActionResult ConHang([FromBody] SaleChiTiet salect)
        {
            string apiURL = $"https://localhost:7265/api/SaleChiTiet/BatDauSale?id={salect.ID}";
            var obj = JsonConvert.SerializeObject(salect);
            var content = new StringContent(obj, Encoding.UTF8, "application/json");
            HttpResponseMessage response = httpClient.PostAsync(apiURL, content).Result;
            ThongBao tb = new ThongBao();
            if (response.IsSuccessStatusCode)
            {
                var mess = response.Content.ReadAsStringAsync().Result;
                tb.message = mess;
                return Json(tb);
            }
            else
            {
                tb.message = "Lỗi";
                return Json(tb);
            }
        }
        [HttpGet]
        [HttpPost]
        public ActionResult Timkiemtheoten([FromBody] string tukhoa)
        {
            var url = $"https://localhost:7265/api/SaleChiTiet/SanPhamSaleTheoTenSPAdmin?tensp={tukhoa}";

            var res = httpClient.GetAsync(url).Result;
            var data = res.Content.ReadAsStringAsync().Result;
            List<SaleChiTietViewModel> lst = JsonConvert.DeserializeObject<List<SaleChiTietViewModel>>(data);
            return Json(lst);
        }
        [HttpGet]
        [HttpPost]
        public string NhanNgay([FromBody] DateTime ngayketthuc)
        {
            string ngaykt = Convert.ToString(ngayketthuc);
            HttpContext.Session.Remove("ngayketthuc");
            HttpContext.Session.SetString("ngayketthuc", ngaykt);
            return ngaykt;
        }
        [HttpGet]
        [HttpPost]
        public ActionResult LocTheoNgay([FromBody] DateTime ngaybatdau)
        {
            string ngaykt = HttpContext.Session.GetString("ngayketthuc");
            string ngaybdstring = Convert.ToString(ngaybatdau);
            DateTime ngaybd;
            DateTime dateTime;
            string dateFormat = "yyyy-MM-dd";
            // Sử dụng DateTime.TryParseExact để kiểm tra và chuyển đổi
            if (DateTime.TryParseExact(ngaykt, dateFormat, null, System.Globalization.DateTimeStyles.None, out dateTime))
            {
                // Gán lại giá trị đã chuyển đổi vào biến
                ngaykt = dateTime.ToString();
            }
            if (DateTime.TryParseExact(ngaybdstring, dateFormat, null, System.Globalization.DateTimeStyles.None, out ngaybd))
            {
                // Gán lại giá trị đã chuyển đổi vào biến
                ngaybdstring = ngaybd.ToString();
            }
            if (ngaybd.Date > dateTime.Date)
            {
                ThongBao tb = new ThongBao();
                tb.message = "Ngày bắt đầu của bạn đang lớn hơn ngày kết thúc";
                return Json(tb);
            }
            else
            {
                var url = $"https://localhost:7265/api/SaleChiTiet/LocTheoNgay?ngaybatdau={ngaybdstring}&ngayketthuc={ngaykt}";

                var res = httpClient.GetAsync(url).Result;
                var data = res.Content.ReadAsStringAsync().Result;
                List<SaleChiTietViewModel> lst = JsonConvert.DeserializeObject<List<SaleChiTietViewModel>>(data);
                return Json(lst);
            }
        }
        // Tạo chương trình sale 

        [HttpGet]
        public ActionResult ThemSanPhamSale()
        {
            ViewBag.Sale = new SelectList(_context.sales.ToList().OrderBy(c => c.MaSale), "ID", "MaSale");
            ViewBag.SanPham = new SelectList(_SpctViewModel.DanhSachSanPhamHoanThien().ToList().Where(c => c.TrangThai == 1).OrderBy(c => c.TenSP), "ID", "TenSP");
            return View();
        }
        [HttpPost]
        public ActionResult ThemSanPhamSale([FromBody]SaleChiTiet salect)
        {
            var idspct = HttpContext.Session.GetString("IDSanpham");
            var id = Guid.Parse(idspct);
            string url = $"https://localhost:7265/api/SaleChiTiet/ThemSaleChiTiet?idsale={salect.IDSale}&IDSPCT={id}&soluong={salect.SoLuong}";
            var obj = JsonConvert.SerializeObject(salect);
            StringContent content = new StringContent(obj, Encoding.UTF8, "application/json");
            HttpResponseMessage message = httpClient.PostAsync(url, content).Result;
            ThongBao tb = new ThongBao();
            if (message.IsSuccessStatusCode)
            {
                var mess = message.Content.ReadAsStringAsync().Result;
                tb.message = mess;
                return Json(tb);
            }
            else
            {
                tb.message = "Lỗi";
                return Json(tb);
            }
        }
        [HttpPost]
        public Guid TruyVanIDSanPham([FromBody] SanPhamChiTietViewModel spctvm)
        {
            string urlapi = $"https://localhost:7265/api/SanPhamChiTiet/SanPhamHoanThienTheotenmausize?ten={spctvm.TenSP}&mau={spctvm.MauSac}&size={spctvm.Size}&loaisp={spctvm.LoaiSanPham}&tenth={spctvm.TenThuongHieu}";
            var reponse = httpClient.GetAsync(urlapi).Result;
            string apiData = reponse.Content.ReadAsStringAsync().Result;
            SanPhamChiTietViewModel DanhsachKetQua = JsonConvert.DeserializeObject<SanPhamChiTietViewModel>(apiData);
            HttpContext.Session.Remove("IDSanpham");
            HttpContext.Session.SetString("IDSanpham", Convert.ToString(DanhsachKetQua.ID));
            return DanhsachKetQua.ID;
        }


    }
}
