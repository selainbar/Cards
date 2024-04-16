using System;

namespace server_api.models
{
    public class Card
    {
        public long CardNumber { get; set; }

        public DateTime CreationDate { get; set; }

        public string? CardPicture { get; set; }

        public bool IsBlocked { get; set; }

        public bool IsDigital { get; set; }

        public int CardFrame { get; set; }

        public int BankCode { get; set; }
    }
}
