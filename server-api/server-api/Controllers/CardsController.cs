using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using server_api.models;
using System.Text.Json;

namespace server_api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CardsController : ControllerBase
    {
        public CardsController()
        {
            LoadCards();
        }
        private static List<Card>? Cards;
        [HttpGet]
        public ActionResult<List<Card>> GetCards(string? FilterType, string? FilterSearch)
        {
            try
            {
                if (Cards == null)
                {
                    return NotFound();
                }

                var filterSearchLower = FilterSearch.ToLower();
                switch (FilterType)
                {
                    case "0":
                        {
                            return Ok(Cards);
                        }
                    case "1":
                        {
                            List<Card> FilteredCards = Cards!.Where(n => n.CardNumber.ToString().Contains(FilterSearch)).ToList();
                            return Ok(FilteredCards);
                        }
                    case "2":
                        {
                            List<Card> FilteredCards = new();
                            var searchBy = FilterSearch.ToLower();
                            if (searchBy == "yes")
                            {
                                FilteredCards = (List<Card>)Cards!.Where(n => n.IsBlocked == true).ToList();
                            }
                            else
                            {
                                FilteredCards = (List<Card>)Cards!.Where(n => n.IsBlocked == false).ToList();
                            }
                            return Ok(FilteredCards);
                        }
                    case "3":
                        {
                            List<Card> FilteredCards = Cards!.Where(n => n.BankCode.ToString().Contains(FilterSearch)).ToList();
                            return Ok(FilteredCards);
                        }

                    default: return NotFound();
                        //i can do other if needed
                }
            }
            catch (Exception ex) { return BadRequest(ex); }



        }

        [HttpPut]
        public ActionResult IncreaseCreditLimit(string cardNumber, string newCardFrame, string occupation, string averageIncome)
        {
            try
            {
                string answer = "";
                int card_frame;
                int average_income;

                bool b =(int.TryParse(newCardFrame, out card_frame));
                bool c = (int.TryParse(averageIncome, out average_income));


                if (!b && !c) return Ok("you can't lower you card's frame");

                if (card_frame >= 100_001)
                {
                    answer = "im sorry but the maximum card's frame is 100,000₪";
                    return Ok(answer);
                }
                Card client = Cards!.First(n => n.CardNumber.ToString().Contains(cardNumber));
                bool IsRecent = (client.CreationDate.AddMonths(3) < DateTime.Now);
                if (IsRecent)
                {

                    if (average_income <= 12_000)
                    {
                        answer = "we're sorry \n the minimum Average Income Requirment to Apply a request to Increase you're card's frame is \n 12,000₪";
                        return Ok(answer);
                    }
                    switch (occupation)
                    {
                        case "1":
                            {
                                if ((average_income / 2) >= card_frame)//approved
                                {
                                    answer = $"Congratulations  \n you're request to increase you're card frame to: \n{card_frame}₪ was approve! you're card's frame is now: {card_frame}₪";
                                    Updatejson(cardNumber, card_frame);
                                }
                                else
                                {
                                    answer = $"we're sorry you're request to increase you card's frame to: \n{card_frame}₪ has been denied you're card's maximus frame is:{average_income / 2}₪";
                                }
                                return Ok(answer);
                            }
                        case "2":
                            {
                                if ((average_income / 3) >= card_frame)//approved
                                {
                                    answer = $"Congratulations you're request to increase you're card frame to: \n{card_frame}₪ was approve! you're card's frame is now: {card_frame} ₪";
                                    Updatejson(cardNumber, card_frame);
                                }
                                else
                                {
                                    answer = $"we're sorry you're request to increase you card's frame to:\n {card_frame}₪ has been denied you're card's maximus frame is:" +
                                        $"{average_income / 3}₪";
                                }
                                return Ok(answer);
                            }
                        case "3":
                            {
                                answer = "im sorry but we can't increase you're frame\n as of now we you need an employment for us to increase you're card's frame";
                                return Ok(answer);
                            }
                    }
                }
                else
                {
                    answer = "sorry you're card is too new it has to be atleast  3 months old";
                    return Ok(answer);
                }
                {

                }
            }
            catch (Exception ex) { Console.WriteLine(ex.Message); }
                return NotFound();
        }
        private static void LoadCards()
        {
            string filePath = @"C:\Users\USER\Desktop\CardsProject\server-api\server-api\Data\Cards.json";
            try
            {
                string jsonData;
                using StreamReader reader = new(filePath);
                jsonData = reader.ReadToEnd();
                Cards = JsonSerializer.Deserialize<List<Card>>(jsonData);
            }
            catch (Exception ex)
            {
                Console.WriteLine($"An error occurred while reading the file: {ex.Message}");
            }
        }
        private void Updatejson(string CardNumber, int NewCardFrame)
        {
            var index = Cards!.FindIndex(c => c.CardNumber.ToString().Contains(CardNumber));
            Cards[index].CardFrame = NewCardFrame;
            var stringify = JsonSerializer.Serialize<List<Card>>(Cards);

            using StreamWriter writer = new(Directory.GetCurrentDirectory() + @"//Data//Cards.json");
            {
                writer.Write(stringify);
            }
            LoadCards();
        }
    }
}
