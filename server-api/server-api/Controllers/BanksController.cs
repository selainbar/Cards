using Microsoft.AspNetCore.Mvc;
using server_api.models;
using System;
using System.Collections.Generic;
using System.IO;
using System.Runtime.Caching;
using System.Security.Cryptography.X509Certificates;
using System.Text.Json;

namespace server_api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BanksController : ControllerBase
    {
        private static List<Bank> LoadBanks()
        {
            string filePath = (Directory.GetCurrentDirectory() + @"//Data//Cards.json""Data\Banks.json");

            try
            {
                string jsonData;
                using (StreamReader reader = new StreamReader(filePath))
                {
                    jsonData = reader.ReadToEnd();
                }

                List<Bank> banksList = JsonSerializer.Deserialize<List<Bank>>(jsonData);
                return banksList;
            }
            catch (Exception ex)
            {
                Console.WriteLine($"An error occurred while reading the file: {ex.Message}");
                return null;
            }
        }

        [HttpGet]
        public JsonResult GetBanks()
        {
            string cacheKey = "banksCacheKey";


            MemoryCache cache = MemoryCache.Default;
            List<Bank> cachedBanks = cache.Get(cacheKey) as List<Bank>;

            if (cachedBanks == null)
            {
                List<Bank> banksList = LoadBanks();

                if (banksList != null)
                {
                    CacheItemPolicy policy = new CacheItemPolicy
                    {
                        AbsoluteExpiration = DateTimeOffset.Now.AddMinutes(20)
                    };
                    cache.Set(cacheKey, banksList, policy);
                    return new JsonResult(Ok(banksList));
                }
                else
                {
                    return new JsonResult(NotFound("Failed to load banks data"));
                }
            }
            else
            {
                return new JsonResult(Ok(cachedBanks));
            }
        }
        [HttpGet("GetNames")]
        public ActionResult<string> GetName()
        {
            var banks = LoadBanks();
            Dictionary<int, string> codeToName = new();
            foreach (var bank in banks)
            {
                codeToName.Add(bank.BankCode, bank.Name);
            }
            return new JsonResult(Ok(codeToName));
        }
    }
}
