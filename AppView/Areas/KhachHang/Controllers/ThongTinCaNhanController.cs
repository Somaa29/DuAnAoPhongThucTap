using AppData.DB_Context;
using AppData.Entities.Models;
using AppData.Entities.ViewModels;
using AppData.Repositories.Users;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System.Security.Claims;
using System.Text;

namespace AppView.Areas.KhachHang.Controllers
{
    public class ThongTinCaNhanController : Controller
    {
        // GET: ThongTinCaNhan
        HttpClient _httpClient;
        private readonly IUserRepository userRepository;
        ApplicationDbContext _context;
        public ThongTinCaNhanController()
        {
            _httpClient = new HttpClient();
            userRepository = new UserRepository();
        }
        public Guid IDNguoiDung()
        {
            var user = HttpContext.User;
            var email = user.FindFirstValue(ClaimTypes.Email);
            var id = userRepository.DanhSachNguoiDung().FirstOrDefault(c => c.Email == email).Id;
            return id;
        }
        [HttpGet]
        public ActionResult ThongTinCaNhan()
        {
            return View();
        }
        [HttpGet]
        public ActionResult ThongTinCaNhanJson()
        {
            var id = IDNguoiDung(); 
            string url = $"https://localhost:7265/api/NguoiDung/NguoiDungTheoId?idnguoidung={id}";
            var response = _httpClient.GetAsync(url).Result;
            string apiData = response.Content.ReadAsStringAsync().Result;
            NguoiDung result = JsonConvert.DeserializeObject<NguoiDung>(apiData);
            return Json(result);
        }
        [HttpGet]
        [HttpPost]
        public ActionResult ThayThoiThongTinCaNhan([FromBody]NguoiDung nguoidung)
        {
            string url = $"https://localhost:7265/api/NguoiDung/ChinhSuaNguoiDung?idnguoidung={nguoidung.Id}&name={nguoidung.TenNguoiDung}&Ngaysinh={nguoidung.NgaySinh}&anh={nguoidung.Anh}&sdt={nguoidung.SDT}&email={nguoidung.Email}&quanhuyen={nguoidung.QuanHuyen}&tinhthanh={nguoidung.TinhThanh}&phuongxa={nguoidung.PhuongXa}&diachi={nguoidung.DiaChi}";
            var obj = JsonConvert.SerializeObject(nguoidung);
            StringContent content = new StringContent(obj, Encoding.UTF8, "application/json");
            HttpResponseMessage message = _httpClient.PutAsJsonAsync(url, content).Result;
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
        [HttpGet]
        [HttpPost]
        public ActionResult DoiMatKhau([FromBody] NguoiDung nguoidung)
        {
            try
            {
                var user = _context.nguoidung.FirstOrDefault(u => u.Id == nguoidung.Id);
                user.MatKhau = nguoidung.MatKhau;
                _context.nguoidung.Update(user);
                _context.SaveChanges();
                return Json(new { message = "Thành công" });
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return Json(new { message = "Lỗi" });
            }

        }

        // GET: ThongTinCaNhan/Details/5

    }
}
