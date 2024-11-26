using AppData.DB_Context;
using AppData.Entities.Models;
using AppData.Entities.ViewModels;
using AppData.Repositories.Users;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;
using System.Net.Mail;
using System.Text;
using System.Threading;

namespace AppView.Areas.Admin.Controllers
{
    public class QLNguoiDungController : Controller
    {
        HttpClient client;
        private readonly ApplicationDbContext _context;
        public readonly IUserRepository _inguoidung;
        public QLNguoiDungController()
        {
            client = new HttpClient();
            _inguoidung = new UserRepository();
            _context = new ApplicationDbContext();
        }
        // GET: QLNguoiDungController
        [HttpGet]
        public ActionResult DanhSachNguoiDung()
        {

            //string url = $"https://localhost:7265/api/NguoiDung/DanhSachNguoiDung";
            //var respos = client.GetAsync(url).Result;
            //var data = respos.Content.ReadAsStringAsync().Result;
            //List<NguoiDung> lstnguoidung = JsonConvert.DeserializeObject<List<NguoiDung>>(data);
            return View();
        }
        [HttpGet]
        public ActionResult DanhSachNguoiDungJson()
        {
            string url = $"https://localhost:7265/api/NguoiDung/DanhSachNguoiDung";
            var respos = client.GetAsync(url).Result;
            var data = respos.Content.ReadAsStringAsync().Result;
            List<NguoiDung> lstnguoidung = JsonConvert.DeserializeObject<List<NguoiDung>>(data);
            return Json( lstnguoidung );
            //return View(lstnguoidung);
        }
        [HttpGet]
        [HttpPost]
        public ActionResult DanhSachNguoiDungTheoTuKhoa([FromBody] string TuKhoa)
        {
            string urltimkiemtheoten = $"https://localhost:7265/api/NguoiDung/lstNguoiDungTheoTen?TenNguoiDung={TuKhoa}";
            var respos1 = client.GetAsync(urltimkiemtheoten).Result;
            var data1 = respos1.Content.ReadAsStringAsync().Result;
            List<NguoiDung> lstnguoidung1 = JsonConvert.DeserializeObject<List<NguoiDung>>(data1);
            return Json(lstnguoidung1);
            //return View(lstnguoidung1);

        }
        [HttpGet]
        [HttpPost]
        public ActionResult DanhSachNguoiDungTrangThai([FromBody] int trangThai)
        {
            List<NguoiDung> lsttheotrangthai = _inguoidung.DanhSachNguoiDung().Where(c => c.TrangThai == Convert.ToInt32(trangThai)).ToList();
            //return View(lsttheotrangthai);
            return Json(lsttheotrangthai);
        }
        [HttpGet]
        [HttpPost]
        public ActionResult KichHoaTaiKhoan([FromBody]NguoiDung nguoidung)
        {
            client.BaseAddress = new Uri("https://localhost:7265/");

            string url = $"api/NguoiDung/KichHoatTaiKhoan?IdNguoiDung={nguoidung.Id}";
            var obj = JsonConvert.SerializeObject(nguoidung);
            StringContent content = new StringContent(obj, Encoding.UTF8, "application/json");
            HttpResponseMessage message = client.PutAsync(url, content).Result;
            if (message.IsSuccessStatusCode)
            {
                var mess = message.Content.ReadAsStringAsync().Result;
                ThongBao tb = new ThongBao()
                {
                    message = mess
                };
                return Json(tb);
            }
            return Json(null);
            //return RedirectToAction("DanhSachNguoiDung", "QLNguoiDung");

        }
        [HttpGet]
        [HttpPost]
        public ActionResult KhoaTaiKhoan([FromBody] NguoiDung nguoidung)
        {
            client.BaseAddress = new Uri("https://localhost:7265/");
            
            string url = $"api/NguoiDung/TatHoatDong?IdNguoiDung={nguoidung.Id}";
            var obj = JsonConvert.SerializeObject(nguoidung);
            StringContent content = new StringContent(obj, Encoding.UTF8, "application/json");
            HttpResponseMessage message = client.PutAsync(url, content).Result;
            if (message.IsSuccessStatusCode)
            {
                var mess = message.Content.ReadAsStringAsync().Result;
                ThongBao tb = new ThongBao()
                {
                    message = mess
                };
                return Json(tb);
            }
            return Json(null);

        }
        // GET: QLNguoiDungController/Details/5
        [HttpGet]
        public ActionResult DangKyNhanVien()
        {
            ViewBag.chucvu = new SelectList(_context.chucvu.ToList().Where(c => c.TrangThai == 1).OrderBy(c => c.TenChucVu), "Id", "TenChucVu");
            return View();
        }
        //[HttpPost]
        //public ActionResult DangKyNhanVien(NguoiDung nguoidung)
        //{
        //    int thoigian = 0;
        //    nguoidung.MatKhau = MatKhauTuSinh();
        //    string url = $"https://localhost:7265/api/NguoiDung/DangKyNhanVien?IdChucVu={nguoidung.IdChucVu}&name={nguoidung.TenNguoiDung}&ngaysinh={nguoidung.NgaySinh}&sdt={nguoidung.SDT}&email={nguoidung.Email}&mk={nguoidung.MatKhau}";
        //    var obj = JsonConvert.SerializeObject(nguoidung);
        //    StringContent content = new StringContent(obj, Encoding.UTF8, "application/json");
        //    HttpResponseMessage message = client.PostAsync(url, content).Result;
        //    if (message.IsSuccessStatusCode)
        //    {
        //        string mess = message.Content.ReadAsStringAsync().Result;
        //        if (mess == "Email đã đăng ký. Mời bạn đăng ký lại.")
        //        {
        //            ViewBag.error = mess;
        //            return RedirectToAction("DangKyNhanVien", "QLNguoiDung");
        //        }
        //        else if (mess == "SDT đã đăng ký. Mời bạn đăng ký lại.")
        //        {
        //            ViewBag.error = mess;
        //            return RedirectToAction("DangKyNhanVien", "QLNguoiDung");
        //        }
        //        else if (mess == "Đăng ký nhân viên thất bại.")
        //        {
        //            ViewBag.error = mess;
        //            return RedirectToAction("DangKyNhanVien", "QLNguoiDung");
        //        }
        //        else
        //        {
        //            ViewBag.error = mess;
        //            MailMessage messagemail = new MailMessage();
        //            messagemail.From = new MailAddress("nguyentiennam20122003@gmail.com");
        //            messagemail.To.Add(new MailAddress(nguoidung.Email));
        //            messagemail.Subject = "Đăng ký tài khoản thành công với 6S";
        //            messagemail.Body = "Bạn đã đăng ký thành công tài khoản ở 6S. Đây là mật khẩu đăng nhập của bạn : " + nguoidung.MatKhau + "\nThanks";
        //            messagemail.IsBodyHtml = true;

        //            SmtpClient smtp = new SmtpClient("smtp.gmail.com");
        //            smtp.Port = 587;
        //            //smtp.Host = "smtp.gamil.com";
        //            smtp.EnableSsl = true;
        //            smtp.UseDefaultCredentials = false;
        //            smtp.Credentials = new System.Net.NetworkCredential("nguyentiennam20122003@gmail.com", "yywsgcksxebyqaie");
        //            smtp.EnableSsl = true;
        //            smtp.Send(messagemail);
        //            thoigian = 60;
        //            return RedirectToAction("DanhSachNguoiDung", "QLNguoiDung");
        //        }
        //    }
        //    else
        //    {
        //        return RedirectToAction("DangKyNhanVien", "QLNguoiDung");
        //    }
        //}
        [HttpPost]
        public ActionResult DangKyNhanVien(NguoiDung nguoidung)
        {
            int thoigian = 0;
            string password = MatKhauTuSinh();
            if (DateTime.Now.Year - nguoidung.NgaySinh.Value.Year < 18)
            {
                return RedirectToAction("DangKyNhanVien", "QLNguoiDung");
            }
            else
            {
                NguoiDung nguoiDung = new NguoiDung()
                {
                    Id = Guid.NewGuid(),
                    IdChucVu = nguoidung.IdChucVu,
                    TenNguoiDung = nguoidung.TenNguoiDung,
                    NgaySinh = nguoidung.NgaySinh,
                    Anh = "",
                    SDT = nguoidung.SDT,
                    Email = nguoidung.Email,
                    MatKhau = password,
                    PhuongXa = "",
                    TinhThanh = "",
                    DiaChi = "",
                    QuanHuyen = "",
                    TrangThai = 1
                };
               //_inguoidung.CreateNhanVien(nguoiDung);
                var message = _inguoidung.CreateNhanVien(nguoiDung);
                if (message == "Email đã đăng ký. Mời bạn đăng ký lại.")
                {
                    return RedirectToAction("DangKyNhanVien", "QLNguoiDung");
                }
                else if (message == "SDT đã đăng ký. Mời bạn đăng ký lại.")
                {
                    return RedirectToAction("DangKyNhanVien", "QLNguoiDung");
                }
                else if (message == "Đăng ký nhân viên thất bại.")
                {
                    return RedirectToAction("DangKyNhanVien", "QLNguoiDung");
                }
                else
                {
                    MailMessage messagemail = new MailMessage();
                    messagemail.From = new MailAddress("nguyentiennam20122003@gmail.com");
                    messagemail.To.Add(new MailAddress(nguoidung.Email));
                    messagemail.Subject = "Đăng ký tài khoản thành công với 6S";
                    messagemail.Body = "Bạn đã đăng ký thành công tài khoản ở 6S. Đây là mật khẩu đăng nhập của bạn : " + password + "\nThanks";
                    messagemail.IsBodyHtml = true;

                    SmtpClient smtp = new SmtpClient("smtp.gmail.com");
                    smtp.Port = 587;
                    //smtp.Host = "smtp.gamil.com";
                    smtp.EnableSsl = true;
                    smtp.UseDefaultCredentials = false;
                    smtp.Credentials = new System.Net.NetworkCredential("nguyentiennam20122003@gmail.com", "yywsgcksxebyqaie");
                    smtp.EnableSsl = true;
                    smtp.Send(messagemail);
                    thoigian = 60;
                    //GioHang gh = new GioHang()
                    //{
                    //    ID = Guid.NewGuid(),
                    //    IDNguoiDung = nguoiDung.Id,
                    //};
                    //_context.gioHangs.Add(gh);
                    //_context.SaveChanges();

                    return RedirectToAction("DanhSachNguoiDung", "QLNguoiDung");
                }
            }


        }

        public string MatKhauTuSinh()
        {
            int length = 12;
            const string chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()";
            Random random = new Random();
            StringBuilder stringBuilder = new StringBuilder();

            for (int i = 0; i < length; i++)
            {
                stringBuilder.Append(chars[random.Next(chars.Length)]);
            }

            return stringBuilder.ToString();
        }

    }
}
