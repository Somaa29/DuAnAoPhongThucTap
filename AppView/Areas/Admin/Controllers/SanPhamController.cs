using AppData.Entities.Models;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System.Text;

namespace AppView.Areas.Admin.Controllers
{
    public class SanPhamController : Controller
    {
        private HttpClient _httpClient;
        public SanPhamController()
        {
            _httpClient = new HttpClient();
        }
        [HttpGet]
        public async Task<IActionResult> DanhSach()
        {
            string apiUrl = "https://localhost:7265/api/SanPham/DanhSach";
            var httpClient = new HttpClient();
            var reponse = await httpClient.GetAsync(apiUrl);
            string apiData = await reponse.Content.ReadAsStringAsync();
            var sp = JsonConvert.DeserializeObject<List<SanPham>>(apiData);
            return View(sp);
        }
        public async Task<IActionResult> Create()
        {
            return View();
        }
        [HttpPost]
        public async Task<IActionResult> Create(SanPham sanPham)
        {
            string apiUrl = $"https://localhost:7265/api/SanPham/Create";
            var content = new StringContent(JsonConvert.SerializeObject(sanPham), Encoding.UTF8, "application/json");
            var reponse = await _httpClient.PostAsync(apiUrl, content);
            if (reponse.IsSuccessStatusCode)
            {
                return RedirectToAction("DanhSach", "SanPham");
            }
            else
            {
                return BadRequest();
            }
        }
        [HttpGet]
        public async Task<ActionResult> SanPhamDetail(Guid id)
        {
            string apiUrl = $"https://localhost:7265/api/SanPham/GetById/{id}";
            var httpClient = new HttpClient();
            var reponse = await httpClient.GetAsync(apiUrl);
            string apiData = await reponse.Content.ReadAsStringAsync();
            var sp = JsonConvert.DeserializeObject<SanPham>(apiData);
            return View(sp);
        }
        public async Task<IActionResult> Update(Guid id)
        {
            string apiURL = $"https://localhost:7265/api/SanPham/GetById/{id}";
            var response = await _httpClient.GetAsync(apiURL);
            var apiData = await response.Content.ReadAsStringAsync();
            var sp = JsonConvert.DeserializeObject<SanPham>(apiData);
            return View(sp);
        }
        [HttpPost]
        public async Task<IActionResult> Update(Guid id, SanPham sanPham)
        {
            string apiURL = $"https://localhost:7265/api/SanPham/GetById/{id}?tenSanPham={sanPham.TenSanPham}";
            var content = new StringContent(JsonConvert.SerializeObject(sanPham), Encoding.UTF8, "application/json");
            var response = await _httpClient.PutAsync(apiURL, content);
            if (response.IsSuccessStatusCode)
            {
                return RedirectToAction("DanhSach", "SanPham");
            }
            return View();
        }
        [HttpGet]
        public async Task<IActionResult> Delete(Guid id)
        {
            string apiURL = $"https://localhost:7265/api/SanPham/Delete/{id}";
            var response = await _httpClient.DeleteAsync(apiURL);
            if (response.IsSuccessStatusCode)
            {
                return RedirectToAction("DanhSach", "SanPham");
            }
            return BadRequest();
        }
    }
}
