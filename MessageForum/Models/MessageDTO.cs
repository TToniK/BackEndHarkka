using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MessageForum.Models
{
    public class MessageDTO
    {
        public long Id { get; set; }
        public string Name { get; set; }
        
        public DateTime SendTime { get; set; }
    }
}
