using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace JT808.Messages
{
    


    /// <summary>
    /// 位置信息应答
    /// </summary>
    [MessageType(0x0201)]
    class PositionResponse
    {
        /// <summary>
        /// 应答流水号 (对应的终端消息的流水号)
        /// </summary>
        [UInt16Handler]
        public ushort No { get; set; }

        /// <summary>
        /// 应答参数个数  
        /// </summary>
        [ByteHandler]
        public byte Count { get; set; }
    }
}
