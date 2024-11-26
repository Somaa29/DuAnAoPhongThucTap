using AppData.Entities.Models;
using AppData.Entities.ViewModels;
using AppData.Repositories.Users;
using AppData.Repositories.ViewModel;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System.Collections.Generic;
using System.Security.Claims;

namespace AppView.Areas.KhachHang.Controllers
{
    public class VoucherKHController : Controller
    {
        HttpClient _httpClient;
        private readonly IUserRepository userRepository;
        public VoucherKHController()
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
        // GET: VoucherKHController
        [HttpGet]
        public ActionResult DanhSachVoucherTheoKhachHang()
        {
            var id = IDNguoiDung();
            string url = $"https://localhost:7265/api/Voucher/DanhSachVoucherVMByIdNguoiDung?idnguoidung={id}";
            var response = _httpClient.GetAsync(url).Result;
            string apiData = response.Content.ReadAsStringAsync().Result;
            List<VoucherDetailViewModel> result = JsonConvert.DeserializeObject<List<VoucherDetailViewModel>>(apiData);
            return View(result);
        }
        [HttpGet]
        public ActionResult VoucherTheoIdVoucher(Guid idvoucherdetail)
        {
            var id = IDNguoiDung();
            string url = $"https://localhost:7265/api/Voucher/VoucherVMTheoID?IDnguoidung={id}&idvoucherdetail={idvoucherdetail}";
            var response = _httpClient.GetAsync(url).Result;
            string apiData = response.Content.ReadAsStringAsync().Result;
            VoucherDetailViewModel result = JsonConvert.DeserializeObject<VoucherDetailViewModel>(apiData);
            return View(result);
        }

    }
}
